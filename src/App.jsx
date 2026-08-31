import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ALL_BLOCKS,
  DEFAULT_ORDER,
  STATUSES,
  authoredA,
  authoredB,
  generateFromOrder,
  lookup,
  longDate,
  normalizeOrder,
  trip,
  warningsFor,
} from './engine.js'
import { decodePlan, defaultState, encodePlan } from './share.js'
import Stays from './Stays.jsx'
import OaxacaTravel from './OaxacaTravel.jsx'
import Maps from './Maps.jsx'
import Decisions from './Decisions.jsx'
import { asapDates } from './data/decisions.js'

const STORAGE_KEY = 'mx-trip-plan-26-27'
const WHO_KEY = 'mx-trip-who'

const TABS = [
  { id: 'trip', label: 'Trip' },
  { id: 'stays', label: 'Stays' },
  { id: 'oaxaca', label: 'CDMX–Oaxaca' },
]

function readTab() {
  try {
    const t = new URLSearchParams(window.location.search).get('tab')
    if (t === 'stays' || t === 'oaxaca') return t
  } catch {
    /* ignore */
  }
  return 'trip'
}

function urlForTab(id) {
  const params = new URLSearchParams(window.location.search)
  if (id === 'trip') params.delete('tab')
  else params.set('tab', id)
  const qs = params.toString()
  return window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash
}

function firstSentence(text) {
  if (!text) return ''
  const cut = text.indexOf('. ')
  return cut === -1 ? text : text.slice(0, cut + 1)
}

function loadInitial() {
  const fromHash = decodePlan(window.location.hash)
  if (fromHash) return { ...defaultState(), ...fromHash }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    /* ignore */
  }
  return defaultState()
}

function usePlan() {
  const [state, setState] = useState(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    const encoded = encodePlan(state)
    const next = window.location.pathname + window.location.search + '#' + encoded
    const current = window.location.pathname + window.location.search + window.location.hash
    if (current !== next) {
      history.replaceState(null, '', next)
    }
  }, [state])

  const patch = useCallback((partial) => {
    setState((s) => ({ ...s, ...partial }))
  }, [])

  return [state, patch, setState]
}

function daysFor(state) {
  if (state.scenario === 'A' && !state.includePuebla) return authoredA()
  if (state.scenario === 'B' && !state.includePuebla) return authoredB()
  return generateFromOrder(state.order, state.includePuebla)
}

export default function App() {
  const [state, patch] = usePlan()
  const [copied, setCopied] = useState(false)
  const [openDate, setOpenDate] = useState(null)
  const [flippingDate, setFlippingDate] = useState(null)
  const flipLock = useRef(false)
  const [showPlay, setShowPlay] = useState(false)
  const [showPuebla, setShowPuebla] = useState(false)
  const [tab, setTabState] = useState(readTab)

  function flipDay(date) {
    if (flipLock.current) return
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setOpenDate((cur) => (cur === date ? null : date))
      return
    }
    flipLock.current = true
    setFlippingDate(date)
    window.setTimeout(() => {
      setOpenDate((cur) => (cur === date ? null : date))
      setFlippingDate(null)
      flipLock.current = false
    }, 180)
  }

  function setTab(id) {
    setTabState(id)
    const next = urlForTab(id)
    const current = window.location.pathname + window.location.search + window.location.hash
    if (current !== next) history.replaceState(null, '', next)
  }

  const days = useMemo(() => daysFor(state), [state.scenario, state.order, state.includePuebla])
  const warnings = useMemo(() => warningsFor(days, state.scenario), [days, state.scenario])
  const asap = useMemo(() => asapDates(days, state.done), [days, state.done])

  function setNote(date, notes) {
    patch({ notes: { ...state.notes, [date]: notes } })
  }
  function setStatus(date, status) {
    patch({ status: { ...state.status, [date]: status } })
  }
  function setPick(date, field, value) {
    const prev = state.picks[date] || {}
    patch({ picks: { ...state.picks, [date]: { ...prev, [field]: value } } })
  }
  function setDone(id, value) {
    const done = { ...(state.done || {}) }
    if (value) done[id] = true
    else delete done[id]
    patch({ done })
  }

  const comments = Array.isArray(state.comments) ? state.comments : []

  function addComment(who, text, day) {
    const body = text.trim().slice(0, 600)
    if (!body) return
    const item = {
      id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
      who: who === 'S' ? 'S' : 'V',
      text: body,
      day: day || null,
      at: Date.now(),
    }
    patch({ comments: [...comments, item].slice(-80) })
  }

  function removeComment(id) {
    patch({ comments: comments.filter((c) => c.id !== id) })
  }

  const dayLabel = (iso) => {
    if (!iso) return 'Plan'
    const d = days.find((x) => x.date === iso)
    if (!d) return iso.slice(8) + ' ' + (iso.slice(5, 7) === '12' ? 'Dec' : 'Jan')
    return `${d.dow} ${iso.slice(8)} ${iso.slice(5, 7) === '12' ? 'Dec' : 'Jan'}`
  }

  async function copyShare() {
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}${window.location.hash}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = url
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  function moveBlock(id, dir) {
    const order = normalizeOrder(state.order, state.includePuebla)
    const i = order.indexOf(id)
    const j = i + dir
    if (i < 0 || j < 0 || j >= order.length) return
    const next = order.slice()
    ;[next[i], next[j]] = [next[j], next[i]]
    patch({ scenario: 'C', order: next })
  }

  function togglePuebla() {
    const include = !state.includePuebla
    patch({
      includePuebla: include,
      scenario: 'C',
      order: normalizeOrder(state.order, include),
    })
  }

  const hotelsByCity = (city) => trip.hotels.filter((h) => h.city === city || (city === 'CDMX' && h.city === 'MEX'))
  const restByCity = (city) => trip.restaurants.filter((r) => r.city === city)
  const toursByCity = (city) => trip.tours.filter((t) => t.city === city)

  return (
    <div className="page">
      <div className="paper">
        <header className="masthead">
          <div className="folio">Travel dossier · winter 26–27</div>
          <h1>
            <span className="title-kicker">{trip.meta.short}</span>
            {trip.meta.title}
          </h1>
          <TabNav tab={tab} onTab={setTab} />
          {tab === 'trip' && <p className="lede">{trip.meta.blurb}</p>}
          {tab === 'trip' && (
          <div className="meta-row">
            <span>24 Dec 2026 → 8 Jan 2027</span>
            <span className="dot" />
            <span>S lands MEX ~midnight 24 Dec</span>
            <span className="dot" />
            <span>In-browser editable</span>
          </div>
          )}
          {tab !== 'trip' && (
            <div className="toolbar tab-share">
              <button className="share" onClick={copyShare}>
                {copied ? 'Link copied' : 'Copy share link'}
              </button>
            </div>
          )}
          {tab === 'trip' && (
          <>
          <div className="toolbar">
            <div className="seg" role="tablist" aria-label="Scenario">
              <button className={state.scenario === 'A' ? 'on' : ''} onClick={() => patch({ scenario: 'A', includePuebla: false, order: DEFAULT_ORDER })}>
                A · Baseline
              </button>
              <button className={state.scenario === 'B' ? 'on' : ''} onClick={() => patch({ scenario: 'B', includePuebla: false, order: ['oaxaca', 'cdmx-xmas', 'cdmx-museums', 'frida'] })}>
                B · Altitude
              </button>
              <button className={state.scenario === 'C' ? 'on' : ''} onClick={() => patch({ scenario: 'C' })}>
                Playground
              </button>
            </div>
            <button className="share" onClick={copyShare}>
              {copied ? 'Link copied' : 'Copy share link'}
            </button>
          </div>
          <p className="scenario-lede">
            {state.scenario === 'A' && trip.scenarioA.lede}
            {state.scenario === 'B' && trip.scenarioB.lede}
            {state.scenario === 'C' && 'Dates regenerate from the chapter order below. Warnings fire for closures, stacked travel, Frida, 8 Jan, NYE, and Cholula Mon/Tue.'}
          </p>
          </>
          )}
        </header>

        {tab === 'trip' && (
        <>
        <section className="alt-band" aria-label="Altitude">
          {trip.altitudes.map((a) => (
            <article key={a.place}>
              <div className="alt-m">{a.m.toLocaleString('en-US')} m</div>
              <div className="alt-p">{a.place}</div>
              <p>{a.note}</p>
            </article>
          ))}
        </section>

        <Decisions days={days} done={state.done || {}} onDone={setDone} onTab={setTab} />

        <Maps days={days} />

        <section className="must">
          <h2>Must-do, not maybe</h2>
          <div className="must-grid">
            <Must city="CDMX" items={trip.mustDos.cdmx} />
            <Must city="Oaxaca" items={trip.mustDos.oaxaca} />
            <Must city="Puebla" items={trip.mustDos.puebla} />
          </div>
        </section>

        <section className="puebla-slots">
          <h2>Puebla · ranked slots</h2>
          <p className="hint">Not in A or B. Ranked day-trip slots.</p>
          <button type="button" className="textish" onClick={() => setShowPuebla((v) => !v)}>
            {showPuebla ? 'Hide ranked slots' : 'Show ranked slots'}
          </button>
          {showPuebla && (
            <ol>
              {trip.pueblaSlots.map((s) => (
                <li key={s.rank}>
                  <strong>{s.title}</strong>
                  <span>{s.why}</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="play">
          <div className="play-head">
            <h2>Chapter playground</h2>
            <button className="textish" onClick={() => setShowPlay((v) => !v)}>
              {showPlay ? 'Hide' : 'Reorder chapters'}
            </button>
          </div>
          {(showPlay || state.scenario === 'C') && (
            <>
              <p className="hint">
                Arrival 24 Dec and the 8 Jan homebound day stay locked. Oaxaca stretches to fill leftover days. Puebla is a one-day trip with no extra hotel.
              </p>
              <ul className="blocks">
                {normalizeOrder(state.order, state.includePuebla).map((id, i, arr) => {
                  const meta = trip.playgroundBlocks.find((b) => b.id === id)
                  return (
                    <li key={id} className="block-chip">
                      <div>
                        <strong>{meta?.label || id}</strong>
                        <small>{meta?.hint}</small>
                      </div>
                      <span className="nudge">
                        <button type="button" disabled={i === 0} onClick={() => moveBlock(id, -1)} aria-label="Move earlier">
                          ↑
                        </button>
                        <button type="button" disabled={i === arr.length - 1} onClick={() => moveBlock(id, 1)} aria-label="Move later">
                          ↓
                        </button>
                      </span>
                    </li>
                  )
                })}
              </ul>
              <label className="check">
                <input type="checkbox" checked={state.includePuebla} onChange={togglePuebla} />
                Place Puebla / Cholula as a one-day chapter
              </label>
            </>
          )}
        </section>

        {warnings.length > 0 && (
          <section className="warns" aria-label="Warnings">
            {warnings.map((w, i) => (
              <p key={i} className={w.level}>
                <span>{w.level === 'alert' ? 'Alert' : w.level === 'warn' ? 'Watch' : 'Note'}</span>
                {w.text}
              </p>
            ))}
          </section>
        )}

        <section className="timeline">
          <h2>The days</h2>
          <p className="hint">Tap a day to flip it.</p>
          <ol className="days">
            {days.map((d) => {
              const status = state.status[d.date] || 'idea'
              const note = state.notes[d.date] || ''
              const picks = state.picks[d.date] || {}
              const hotelId = picks.hotel || d.hotel
              const restId = picks.restaurant || d.restaurant
              const tourId = picks.tour || d.tour
              const open = openDate === d.date
              const teaser = firstSentence(d.summary)
              const dayComments = comments.filter((c) => c.day === d.date)
              const flipping = flippingDate === d.date
              return (
                <li key={d.date} className={`day theme-${d.theme} st-${status}${asap.has(d.date) ? ' asap' : ''}${open ? ' flipped' : ''}${flipping ? ' flipping' : ''}`}>
                  <div className="day-inner">
                    {!open ? (
                      <div className="day-face day-front">
                        <button type="button" className="day-toggle" onClick={() => flipDay(d.date)} aria-expanded={false}>
                          <DayWhen d={d} />
                          <div className="day-main">
                            <h3>{d.title}</h3>
                            <p className="place">
                              {d.place}
                              <span className="alt-badge">{d.altitude.toLocaleString('en-US')} m</span>
                              <StatusPill status={status} />
                            </p>
                            {teaser ? <p className="summary teaser">{teaser}</p> : null}
                            <p className="flip-hint">Tap for details</p>
                          </div>
                        </button>
                        {(hotelId || restId || note || dayComments.length > 0) && (
                          <p className="picked">
                            {hotelId && <span>{lookup(trip.hotels, hotelId)?.name}</span>}
                            {restId && <span>{lookup(trip.restaurants, restId)?.name}</span>}
                            {note && <span className="note-preview">{note}</span>}
                            {dayComments.length > 0 && (
                              <span>{dayComments.length} comment{dayComments.length === 1 ? '' : 's'}</span>
                            )}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="day-face day-back">
                        <div className="day-back-head">
                          <DayWhen d={d} />
                          <div className="day-main">
                            <div className="day-back-title">
                              <h3>{d.title}</h3>
                              <button type="button" className="flip-back" onClick={() => flipDay(d.date)} aria-expanded={true}>
                                Flip back
                              </button>
                            </div>
                            <p className="place">
                              {d.place}
                              <span className="alt-badge">{d.altitude.toLocaleString('en-US')} m</span>
                              <StatusPill status={status} />
                            </p>
                          </div>
                        </div>
                        <p className="summary">{d.summary}</p>
                        <ul className="items">
                          {d.items.map((it, idx) => (
                            <li key={idx} data-kind={it.kind}>
                              <em>{it.title}</em>
                              <span>{it.detail}</span>
                            </li>
                          ))}
                        </ul>
                        {d.research?.length > 0 && (
                          <div className="research">
                            {d.research.map((r) => (
                              <div key={r.label} className="clip">
                                <strong>{r.label}</strong>
                                <span>{r.state}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="editor">
                          <div className="status-row">
                            {STATUSES.map((s) => (
                              <button key={s.id} className={status === s.id ? 'on' : ''} type="button" onClick={() => setStatus(d.date, s.id)}>
                                {s.label}
                              </button>
                            ))}
                          </div>
                          <label>
                            Hotel
                            <select value={hotelId || ''} onChange={(e) => setPick(d.date, 'hotel', e.target.value)}>
                              <option value="">—</option>
                              {hotelsByCity(d.city).map((h) => (
                                <option key={h.id} value={h.id}>
                                  {h.name}
                                </option>
                              ))}
                            </select>
                          </label>
                          <PickHint item={lookup(trip.hotels, hotelId)} />
                          <label>
                            Restaurant
                            <select value={restId || ''} onChange={(e) => setPick(d.date, 'restaurant', e.target.value)}>
                              <option value="">—</option>
                              {restByCity(d.city).map((r) => (
                                <option key={r.id} value={r.id}>
                                  {r.name}
                                </option>
                              ))}
                            </select>
                          </label>
                          <PickHint item={lookup(trip.restaurants, restId)} />
                          <label>
                            Tour / ticket
                            <select value={tourId || ''} onChange={(e) => setPick(d.date, 'tour', e.target.value)}>
                              <option value="">—</option>
                              {toursByCity(d.city).map((t) => (
                                <option key={t.id} value={t.id}>
                                  {t.name}
                                </option>
                              ))}
                            </select>
                          </label>
                          <PickHint item={lookup(trip.tours, tourId)} />
                          <label>
                            Notes
                            <textarea
                              rows={4}
                              value={note}
                              placeholder="Private to this share link — still public if you send the URL."
                              onChange={(e) => setNote(d.date, e.target.value)}
                            />
                          </label>
                        </div>
                        <DayComments
                          date={d.date}
                          comments={dayComments}
                          onAdd={addComment}
                          onRemove={removeComment}
                        />
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        <Feedback
          comments={comments}
          days={days}
          dayLabel={dayLabel}
          onAdd={addComment}
          onRemove={removeComment}
        />

        <section className="catalog">
          <h2>The lists</h2>
          <details className="catalog-fold">
            <summary>Hotels, tables, tickets</summary>
            <p className="hint">Research slots stay typeset even when the 2026–27 circular has not landed. No invented hours. No flight numbers.</p>
            <Catalog title="Hotels" items={trip.hotels} />
            <Catalog title="Tables" items={trip.restaurants} />
            <Catalog title="Tickets & days out" items={trip.tours} />
          </details>
        </section>
        </>
        )}

        {tab === 'stays' && <Stays />}
        {tab === 'oaxaca' && <OaxacaTravel />}

        <footer className="colophon">
          <p>
            Share links encode the active scenario, chapter order, notes, comments, statuses, picks, and checked decisions in the URL hash. Nothing is stored on a server. Copy the share link after you write feedback so the other person sees it. Anyone with the link can read comments — do not put passport numbers, ticket codes, or phone numbers in them.
          </p>
          <p>
            Live at{' '}
            <a href="https://hunab-ku-co.github.io/holiday-plan-mx/">hunab-ku-co.github.io/holiday-plan-mx</a>
            . Source on GitHub. Travelers referred to as S and V only.
          </p>
        </footer>
      </div>
    </div>
  )
}

function loadWho() {
  try {
    const w = localStorage.getItem(WHO_KEY)
    if (w === 'S' || w === 'V') return w
  } catch {
    /* ignore */
  }
  return 'V'
}

function Composer({ days, defaultDay, onAdd, compact }) {
  const [who, setWho] = useState(loadWho)
  const [text, setText] = useState('')
  const [day, setDay] = useState(defaultDay || '')

  function submit(e) {
    e.preventDefault()
    if (!text.trim()) return
    try {
      localStorage.setItem(WHO_KEY, who)
    } catch {
      /* ignore */
    }
    onAdd(who, text, day || null)
    setText('')
  }

  return (
    <form className={compact ? 'composer compact' : 'composer'} onSubmit={submit}>
      <div className="who-row" role="group" aria-label="Who is writing">
        <button type="button" className={who === 'V' ? 'on' : ''} onClick={() => setWho('V')}>
          V
        </button>
        <button type="button" className={who === 'S' ? 'on' : ''} onClick={() => setWho('S')}>
          S
        </button>
      </div>
      {days && (
        <select value={day} onChange={(e) => setDay(e.target.value)} aria-label="About which day">
          <option value="">Whole plan</option>
          {days.map((d) => (
            <option key={d.date} value={d.date}>
              {d.dow} {d.date.slice(8)} {d.date.slice(5, 7) === '12' ? 'Dec' : 'Jan'} · {d.title}
            </option>
          ))}
        </select>
      )}
      <textarea
        rows={compact ? 2 : 3}
        value={text}
        placeholder={who === 'S' ? 'Feedback from S' : 'Feedback from V'}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="post">
        Post
      </button>
    </form>
  )
}

function CommentList({ comments, dayLabel, onRemove }) {
  if (!comments.length) return <p className="hint">No comments yet.</p>
  return (
    <ul className="thread">
      {comments.map((c) => (
        <li key={c.id} className={`bubble who-${c.who}`}>
          <header>
            <strong>{c.who}</strong>
            {dayLabel ? <span>{c.day ? dayLabel(c.day) : 'Plan'}</span> : null}
            {c.at ? <time>{new Date(c.at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</time> : null}
            <button type="button" className="x" onClick={() => onRemove(c.id)} aria-label="Remove comment">
              ×
            </button>
          </header>
          <p>{c.text}</p>
        </li>
      ))}
    </ul>
  )
}

function Feedback({ comments, days, dayLabel, onAdd, onRemove }) {
  return (
    <section className="feedback" id="feedback">
      <h2>Feedback</h2>
      <p className="hint">Write as S or V. Copy the share link after you post so the other person sees the thread. Still public if you send the URL.</p>
      <Composer days={days} onAdd={onAdd} />
      <CommentList comments={[...comments].reverse()} dayLabel={dayLabel} onRemove={onRemove} />
    </section>
  )
}

function DayComments({ date, comments, onAdd, onRemove }) {
  return (
    <div className="day-thread">
      <h4>Comments on this day</h4>
      <CommentList comments={comments} onRemove={onRemove} />
      <Composer compact defaultDay={date} onAdd={onAdd} />
    </div>
  )
}

function TabNav({ tab, onTab }) {
  return (
    <nav className="tabs" aria-label="Trip sections">
      {TABS.map((t) => (
        <button
          key={t.id}
          type="button"
          className={tab === t.id ? 'on' : ''}
          aria-current={tab === t.id ? 'page' : undefined}
          onClick={() => onTab(t.id)}
        >
          {t.label}
        </button>
      ))}
    </nav>
  )
}

function Must({ city, items, extra }) {
  return (
    <article>
      <h3>{city}</h3>
      {extra && <p className="extra">{extra}</p>}
      <ul className="must-chips">
        {items.map((x) => (
          <MustChip key={x} text={x} />
        ))}
      </ul>
    </article>
  )
}

function MustChip({ text }) {
  const [open, setOpen] = useState(false)
  return (
    <li className={open ? 'must-chip open' : 'must-chip'}>
      <button type="button" title={text} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {text}
      </button>
    </li>
  )
}

function DayWhen({ d }) {
  return (
    <div className="when">
      <span className="dow">{d.dow}</span>
      <span className="num">{d.date.slice(8)}</span>
      <span className="mon">{d.date.slice(5, 7) === '12' ? 'Dec' : 'Jan'}</span>
    </div>
  )
}

function StatusPill({ status }) {
  const s = STATUSES.find((x) => x.id === status)
  return <span className={`pill p-${status}`}>{s?.label || status}</span>
}

function PickHint({ item }) {
  if (!item) return null
  return (
    <p className="pick-hint">
      {item.note}
      {item.url && (
        <>
          {' '}
          <a href={item.url} target="_blank" rel="noreferrer">
            Link
          </a>
        </>
      )}
    </p>
  )
}

function Catalog({ title, items }) {
  return (
    <div className="cat-block">
      <h3>{title}</h3>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <strong>{it.name}</strong>
            <em>{it.city}</em>
            <span>{it.note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

void longDate
void ALL_BLOCKS
