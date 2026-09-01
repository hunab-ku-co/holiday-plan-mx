import { useEffect, useRef, useState } from 'react'
import { BOARD_CARDS, COLUMNS, columnOf } from './data/board.js'

const COL_META = [
  { id: 'maybe', label: 'Maybe' },
  { id: 'decided', label: 'Decided' },
  { id: 'booked', label: 'Booked' },
]

const KIND_LABEL = {
  policy: 'Policy',
  visit: 'Visit',
  stay: 'Stay',
  eat: 'Eat',
  move: 'Move',
}

const DRAG_PX = 8

function hitColumn(boardEl, x, y) {
  if (!boardEl) return null
  for (const el of boardEl.querySelectorAll('.board-col')) {
    const r = el.getBoundingClientRect()
    if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
      return el.dataset.col || null
    }
  }
  return null
}

function ignoreFrom(target) {
  const el = target instanceof Element ? target : target && target.parentElement
  if (!el) return true
  return Boolean(el.closest('.board-move, a'))
}

export default function Board({ board, onColumn }) {
  const [openId, setOpenId] = useState(null)
  const [dragId, setDragId] = useState(null)
  const [dropCol, setDropCol] = useState(null)
  const boardRef = useRef(null)
  const session = useRef(null)
  const skipToggle = useRef(false)
  const onColumnRef = useRef(onColumn)
  onColumnRef.current = onColumn

  useEffect(() => {
    function onMove(e) {
      const s = session.current
      if (!s || e.pointerId !== s.pointerId) return
      const dx = e.clientX - s.x
      const dy = e.clientY - s.y
      if (!s.active) {
        if (dx * dx + dy * dy < DRAG_PX * DRAG_PX) return
        s.active = true
        setDragId(s.id)
        setDropCol(s.from)
        try {
          s.host.setPointerCapture(e.pointerId)
        } catch {
          /* capture is optional; window listeners still track the pointer */
        }
      }
      if (e.cancelable) e.preventDefault()
      const over = hitColumn(boardRef.current, e.clientX, e.clientY)
      if (over !== s.over) {
        s.over = over
        setDropCol(over)
      }
    }

    function end(e, drop) {
      const s = session.current
      if (!s || (e && e.pointerId !== s.pointerId)) return
      session.current = null
      if (s.active) {
        skipToggle.current = true
        window.setTimeout(() => {
          skipToggle.current = false
        }, 250)
        if (drop && s.over && s.over !== s.from) onColumnRef.current(s.id, s.over)
        try {
          s.host.releasePointerCapture(s.pointerId)
        } catch {
          /* already released or never captured */
        }
      }
      setDragId(null)
      setDropCol(null)
    }

    function onUp(e) {
      end(e, true)
    }
    function onCancel(e) {
      end(e, false)
    }

    window.addEventListener('pointermove', onMove, { capture: true, passive: false })
    window.addEventListener('pointerup', onUp, { capture: true })
    window.addEventListener('pointercancel', onCancel, { capture: true })
    return () => {
      window.removeEventListener('pointermove', onMove, { capture: true })
      window.removeEventListener('pointerup', onUp, { capture: true })
      window.removeEventListener('pointercancel', onCancel, { capture: true })
    }
  }, [])

  function onCardPointerDown(e, card, column) {
    if (e.button != null && e.button !== 0) return
    if (ignoreFrom(e.target)) return
    session.current = {
      id: card.id,
      from: column,
      over: column,
      x: e.clientX,
      y: e.clientY,
      pointerId: e.pointerId,
      host: e.currentTarget,
      active: false,
    }
  }

  function onToggle(id) {
    if (skipToggle.current) {
      skipToggle.current = false
      return
    }
    setOpenId((cur) => (cur === id ? null : id))
  }

  const byCol = { maybe: [], decided: [], booked: [] }
  for (const card of BOARD_CARDS) {
    byCol[columnOf(board, card.id)].push(card)
  }

  return (
    <section className="panel board-panel" aria-label="Decisions board">
      <h2>Decisions</h2>
      <p className="hint">
        Drag a card to another column, or tap Maybe / Decided / Booked. Copy the share link so the other person sees it.
      </p>
      <div className="board-scroll">
        <div ref={boardRef} className={`board${dragId ? ' is-dragging' : ''}`}>
          {COL_META.map((col) => (
            <div
              key={col.id}
              className={`board-col col-${col.id}${dropCol === col.id ? ' drop' : ''}`}
              data-col={col.id}
            >
              <header>
                <h3>{col.label}</h3>
                <span className="count">{byCol[col.id].length}</span>
              </header>
              <ul>
                {byCol[col.id].length === 0 && <li className="board-empty">Nothing here yet.</li>}
                {byCol[col.id].map((card) => (
                  <BoardCard
                    key={card.id}
                    card={card}
                    column={col.id}
                    open={openId === card.id}
                    dragging={dragId === card.id}
                    onPointerDown={(e) => onCardPointerDown(e, card, col.id)}
                    onToggle={() => onToggle(card.id)}
                    onColumn={onColumn}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BoardCard({ card, column, open, dragging, onPointerDown, onToggle, onColumn }) {
  const kind = KIND_LABEL[card.kind] || card.kind
  return (
    <li
      className={`board-card${open ? ' open' : ''}${dragging ? ' dragging' : ''}`}
      data-kind={card.kind}
      onPointerDown={onPointerDown}
    >
      <button type="button" className="board-flip" aria-expanded={open} onClick={onToggle}>
        <strong>{card.title}</strong>
        <span className="board-meta">
          {card.city ? `${card.city} · ${kind}` : kind}
        </span>
        {open && <span className="board-detail">{card.detail}</span>}
      </button>
      {open && card.url && (
        <a className="board-link" href={card.url} target="_blank" rel="noreferrer">
          Official page
        </a>
      )}
      <div className="board-move" role="group" aria-label={`Move “${card.title}”`}>
        {COLUMNS.map((id) => (
          <button
            key={id}
            type="button"
            className={column === id ? 'on' : ''}
            aria-pressed={column === id}
            disabled={column === id}
            onClick={() => onColumn(card.id, id)}
          >
            {id === 'maybe' ? 'Maybe' : id === 'decided' ? 'Decided' : 'Booked'}
          </button>
        ))}
      </div>
    </li>
  )
}
