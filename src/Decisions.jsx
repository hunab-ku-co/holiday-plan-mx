import { sortedDecisions, TAB_HINT } from './data/decisions.js'

export default function Decisions({ days, done, onDone, onTab }) {
  const rows = sortedDecisions(days, done)
  if (!rows.length) return null
  return (
    <section className="decide" aria-label="Decisions">
      <h2>Decide soon</h2>
      <p className="hint">Bright red = do first; other left colors match stay / eat / see / travel.</p>
      <ul className="decisions">
        {rows.map((d) => {
          const isDone = Boolean(done?.[d.id])
          const hint = d.tab ? TAB_HINT[d.tab] : null
          return (
            <li
              key={d.id}
              className={`decision ${d.urgency}${isDone ? ' done' : ''}`}
              data-kind={d.kind}
            >
              <label className="decision-check">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={(e) => onDone(d.id, e.target.checked)}
                  aria-label={isDone ? `Mark “${d.title}” open` : `Mark “${d.title}” done`}
                />
              </label>
              <div className="decision-body">
                <strong>{d.title}</strong>
                <span>{d.detail}</span>
                {hint && onTab && (
                  <button type="button" className="textish tab-jump" onClick={() => onTab(d.tab)}>
                    {hint}
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
