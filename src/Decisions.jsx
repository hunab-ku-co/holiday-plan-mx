import { useState } from 'react'
import { sortedDecisions, TAB_HINT } from './data/decisions.js'

export default function Decisions({ days, done, onDone, onTab }) {
  const rows = sortedDecisions(days, done)
  const [openId, setOpenId] = useState(null)
  if (!rows.length) return null
  return (
    <section className="decide" aria-label="Decisions">
      <h2>Decide soon</h2>
      <p className="hint">Bright red = do first; other left colors match stay / eat / see / travel.</p>
      <ul className="decisions">
        {rows.map((d) => {
          const isDone = Boolean(done?.[d.id])
          const hint = d.tab ? TAB_HINT[d.tab] : null
          const open = openId === d.id
          return (
            <li
              key={d.id}
              className={`decision ${d.urgency}${isDone ? ' done' : ''}${open ? ' open' : ''}`}
              data-kind={d.kind}
            >
              <label className="decision-check" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={(e) => onDone(d.id, e.target.checked)}
                  aria-label={isDone ? `Mark “${d.title}” open` : `Mark “${d.title}” done`}
                />
              </label>
              <div className="decision-body">
                <button
                  type="button"
                  className="decision-flip"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : d.id)}
                >
                  <strong>{d.title}</strong>
                </button>
                {open && (
                  <>
                    <span>{d.detail}</span>
                    {hint && onTab && (
                      <button type="button" className="textish tab-jump" onClick={() => onTab(d.tab)}>
                        {hint}
                      </button>
                    )}
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
