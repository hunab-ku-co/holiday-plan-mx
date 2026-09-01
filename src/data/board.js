import { DECISIONS } from './decisions.js'

export const COLUMNS = ['maybe', 'decided', 'booked']

const COLUMN_SET = new Set(COLUMNS)

export const BOOKING_IDS = new Set(DECISIONS.map((d) => d.id))

/** Catalog of board cards. defaultColumn is what a missing hash/localStorage id means. */
export const BOARD_CARDS = [
  {
    id: 'no-xmas-travel',
    title: 'No travel on Christmas Day',
    detail: '25 Dec stays in CDMX. Not a bus or flight day.',
    city: 'CDMX',
    kind: 'policy',
    defaultColumn: 'decided',
  },
  {
    id: 'bus-only',
    title: 'No flights inside Mexico',
    detail: 'CDMX–Puebla–Oaxaca by bus only.',
    city: '',
    kind: 'policy',
    defaultColumn: 'decided',
  },
  {
    id: 'nye-dinner',
    title: 'Celebrate New Year’s',
    detail:
      'Book a nice dinner. Proposal: Casa Oaxaca rooftop, then Centro on foot. 2026 menus are not published.',
    city: 'Oaxaca',
    kind: 'policy',
    defaultColumn: 'decided',
  },
  {
    id: 'stay-band',
    title: 'Stay / Airbnb band',
    detail: 'More than €50 and less than €200 per night. The Stays tab uses this band.',
    city: '',
    kind: 'stay',
    defaultColumn: 'decided',
  },

  // Must-do visits — wording from trip.json mustDos. Skip NYE (covered by nye-dinner).
  {
    id: 'sun-stone',
    title: 'Sun Stone, Sala Mexica — Anthropology (highlights, not the whole museum)',
    detail: 'Must-do in CDMX. Highlights only — not the whole museum.',
    city: 'CDMX',
    kind: 'visit',
    defaultColumn: 'maybe',
  },
  {
    id: 'templo',
    title: 'Templo Mayor + original Coyolxauhqui',
    detail: 'Must-do in CDMX.',
    city: 'CDMX',
    kind: 'visit',
    defaultColumn: 'maybe',
  },
  {
    id: 'casa-azul',
    title: 'Casa Azul timed ticket (no door sales) + Anahuacalli the same ticket',
    detail: 'Must-do in CDMX. Booking the timed tickets is the separate Frida card.',
    city: 'CDMX',
    kind: 'visit',
    defaultColumn: 'maybe',
  },
  {
    id: 'coyoacan',
    title: 'Coyoacán on foot — plazas, not a museum stack on 25 Dec',
    detail: 'Must-do in CDMX.',
    city: 'CDMX',
    kind: 'visit',
    defaultColumn: 'maybe',
  },
  {
    id: 'roma-tacos',
    title: 'Tacos in Roma–Condesa on a normal evening, not Christmas or Frida day',
    detail: 'Must-do in CDMX.',
    city: 'CDMX',
    kind: 'eat',
    defaultColumn: 'maybe',
  },
  {
    id: 'monte-alban',
    title: 'Monte Albán at opening with a private driver, then the pool',
    detail: 'Must-do in Oaxaca.',
    city: 'Oaxaca',
    kind: 'visit',
    defaultColumn: 'maybe',
  },
  {
    id: 'levadura-visit',
    title: 'Levadura de Olla — Saturday 2 Jan 19:00 (closed Sun & Mon)',
    detail: 'Must-do in Oaxaca. Booking the table is the separate Levadura card.',
    city: 'Oaxaca',
    kind: 'eat',
    defaultColumn: 'maybe',
  },
  {
    id: 'south-crafts',
    title: 'South valley handicrafts: Coyotepec → Jalieza → Tilcajete (not five villages)',
    detail: 'Must-do in Oaxaca.',
    city: 'Oaxaca',
    kind: 'visit',
    defaultColumn: 'maybe',
  },
  {
    id: 'east-mezcal',
    title: 'East valley mezcal: Tule → Mitla → two palenques, not a warehouse tour',
    detail: 'Must-do in Oaxaca.',
    city: 'Oaxaca',
    kind: 'visit',
    defaultColumn: 'maybe',
  },
  {
    id: 'criollo',
    title: 'Criollo last night if it is a Monday–Saturday',
    detail: 'Must-do in Oaxaca.',
    city: 'Oaxaca',
    kind: 'eat',
    defaultColumn: 'maybe',
  },
  {
    id: 'cholula',
    title: 'Cholula ceremonial area + site museum (tunnels closed)',
    detail: 'Must-do in Puebla.',
    city: 'Puebla',
    kind: 'visit',
    defaultColumn: 'maybe',
  },
  {
    id: 'remedios',
    title: 'Remedios church stairs for the volcano view',
    detail: 'Must-do in Puebla / Cholula.',
    city: 'Puebla',
    kind: 'visit',
    defaultColumn: 'maybe',
  },
  {
    id: 'puebla-centro',
    title: 'Puebla Centro: Zócalo, Palafoxiana, Rosario if short — skip Amparo on a combo day',
    detail: 'Must-do in Puebla.',
    city: 'Puebla',
    kind: 'visit',
    defaultColumn: 'maybe',
  },
  {
    id: 'ciudadela',
    title: 'La Ciudadela artisan market (Balderas)',
    detail:
      'Mercado de Artesanías de la Ciudadela, Balderas esq. Emilio Donde, Colonia Centro, Cuauhtémoc 06040. Official CDMX page (1 Sep 2026): open every day until 18:00; 350 vendors. Opening time not stated there (other sources disagree 9 vs 10 — not used). 6–7 Jan 2027 holiday hours not published. Last couple of CDMX days after the 5 Jan Oaxaca→TAPO bus; 8 Jan is a fly day, not a market day. Prefer Wed 6 Jan (Día de Reyes, ordinary Wednesday) over stacking with Frida on Thu 7 Jan. Metro Balderas.',
    city: 'CDMX',
    kind: 'visit',
    defaultColumn: 'maybe',
    url: 'https://www.mexicocity.cdmx.gob.mx/venues/la-ciudadela-artisan-market/',
  },

  // Booking cards — ids match src/data/decisions.js so Trip checkboxes stay in sync.
  {
    id: 'roma-stay',
    title: 'Book Roma Norte 24–26 Dec',
    detail: 'Two nights. Late/self check-in for the midnight landing. Shortlist is on the Stays tab; nothing is booked.',
    city: 'CDMX',
    kind: 'stay',
    defaultColumn: 'maybe',
  },
  {
    id: 'puebla-stay',
    title: 'Book Puebla/Cholula 26–30 Dec, 4 nights',
    detail: 'Urgency now. Overnight stay, not a day trip. Shortlist not on the Stays tab yet — do not invent a listing.',
    city: 'Puebla',
    kind: 'stay',
    defaultColumn: 'maybe',
  },
  {
    id: 'oax-stay',
    title: 'Book Oaxaca Centro/Jalatlaco 30 Dec–5 Jan',
    detail: 'Through NYE. Peak week. Centro/Jalatlaco inventory this far out actually sells out.',
    city: 'Oaxaca',
    kind: 'stay',
    defaultColumn: 'maybe',
  },
  {
    id: 'ado-seats',
    title: 'Book three buses: CDMX→Puebla 26 Dec, Puebla→Oaxaca 30 Dec, Oaxaca→TAPO 5 Jan',
    detail: 'Locked: bus, not flights. Christmas 2026 fares were not retrieved. Book on ado.com.mx; Estrella Roja for the Puebla leg. Overnight vs day still open on the long Oaxaca legs. Details on the CDMX–Oaxaca tab.',
    city: '',
    kind: 'move',
    defaultColumn: 'maybe',
  },
  {
    id: 'levadura',
    title: 'Book Levadura de Olla Sat 2 Jan 19:00',
    detail: 'Closed Sunday and Monday. Moved off Tue 29 Dec because that night is now Puebla.',
    city: 'Oaxaca',
    kind: 'eat',
    defaultColumn: 'maybe',
  },
  {
    id: 'frida',
    title: 'Casa Azul timed tickets',
    detail: 'No door sales. Closed 25 Dec and 1 Jan.',
    city: 'CDMX',
    kind: 'visit',
    defaultColumn: 'maybe',
  },
]

const BY_ID = Object.fromEntries(BOARD_CARDS.map((c) => [c.id, c]))

export function cardById(id) {
  return BY_ID[id] || null
}

export function defaultBoard() {
  const board = {}
  for (const card of BOARD_CARDS) board[card.id] = card.defaultColumn
  return board
}

function asColumn(v) {
  if (v === 0 || v === 1 || v === 2) return COLUMNS[v]
  if (v === '0' || v === '1' || v === '2') return COLUMNS[Number(v)]
  if (typeof v === 'string' && COLUMN_SET.has(v)) return v
  return null
}

/** Expand compact `{ id: 0|1|2 }` (or a partial named map) onto defaults. */
export function expandBoard(raw) {
  const board = defaultBoard()
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return board
  for (const [id, v] of Object.entries(raw)) {
    if (!BY_ID[id]) continue
    const col = asColumn(v)
    if (col) board[id] = col
  }
  return board
}

/** Compact non-default columns only: `{ id: 0|1|2 }`. */
export function compactBoard(board) {
  const out = {}
  for (const card of BOARD_CARDS) {
    const col = asColumn(board?.[card.id]) || card.defaultColumn
    if (col !== card.defaultColumn) out[card.id] = COLUMNS.indexOf(col)
  }
  return out
}

/** Fill defaults, then force booking-id cards to Booked when `done[id]` is set. */
export function hydrateBoard(raw, done) {
  const board = expandBoard(raw)
  if (done && typeof done === 'object') {
    for (const id of BOOKING_IDS) {
      if (!BY_ID[id]) continue
      if (done[id]) board[id] = 'booked'
    }
  }
  return board
}

export function columnOf(board, id) {
  const card = BY_ID[id]
  const col = asColumn(board?.[id])
  return col || card?.defaultColumn || 'maybe'
}
