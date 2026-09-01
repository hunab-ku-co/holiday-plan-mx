import { useState } from 'react'
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

export default function Board({ board, onColumn }) {
  const [openId, setOpenId] = useState(null)
  const byCol = { maybe: [], decided: [], booked: [] }
  for (const card of BOARD_CARDS) {
    byCol[columnOf(board, card.id)].push(card)
  }

  return (
    <section className="panel board-panel" aria-label="Decisions board">
      <h2>Decisions</h2>
      <p className="hint">
        Move a card when S or V actually decide. Copy the share link so the other sees the board.
        Who writes comments is still S or V; the columns travel in the same URL hash.
      </p>
      <div className="board-scroll">
        <div className="board">
          {COL_META.map((col) => (
            <div key={col.id} className={`board-col col-${col.id}`}>
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
                    onToggle={() => setOpenId((cur) => (cur === card.id ? null : card.id))}
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

function BoardCard({ card, column, open, onToggle, onColumn }) {
  const kind = KIND_LABEL[card.kind] || card.kind
  return (
    <li className={`board-card${open ? ' open' : ''}`} data-kind={card.kind}>
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
