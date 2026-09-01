// Open decisions that sell out this far out (today: 31 Aug 2026).
// Do not invent booking deadlines. Christmas 2026 hours and NYE menus stay on the watch clips.

export const DECISIONS = [
  {
    id: 'roma-stay',
    title: 'Book Roma Norte 24–26 Dec',
    detail: 'Two nights. Late/self check-in for the midnight landing. Shortlist is on the Stays tab; nothing is booked.',
    kind: 'stay',
    urgency: 'now',
    tab: 'stays',
    match: { theme: 'arrival' },
  },
  {
    id: 'puebla-stay',
    title: 'Book Puebla/Cholula 26–30 Dec, 4 nights',
    detail: 'Urgency now. Overnight stay, not a day trip. Shortlist not on the Stays tab yet — do not invent a listing.',
    kind: 'stay',
    urgency: 'now',
    match: { theme: 'puebla' },
  },
  {
    id: 'oax-stay',
    title: 'Book Oaxaca Centro/Jalatlaco 30 Dec–5 Jan',
    detail: 'Through NYE. Peak week. Centro/Jalatlaco inventory this far out actually sells out.',
    kind: 'stay',
    urgency: 'now',
    match: { date: '2026-12-31', city: 'OAX' },
  },
  {
    id: 'ado-seats',
    title: 'Book three buses: CDMX→Puebla 26 Dec, Puebla→Oaxaca 30 Dec, Oaxaca→TAPO 5 Jan',
    detail: 'Locked: bus, not flights. Christmas 2026 fares were not retrieved. Book on ado.com.mx; Estrella Roja for the Puebla leg. Overnight vs day still open on the long Oaxaca legs. Details on the CDMX–Oaxaca tab.',
    kind: 'move',
    urgency: 'now',
    tab: 'oaxaca',
    match: { city: 'OAX' },
  },
  {
    id: 'levadura',
    title: 'Book Levadura de Olla Sat 2 Jan 19:00',
    detail: 'Closed Sunday and Monday. Moved off Tue 29 Dec because that night is now Puebla.',
    kind: 'eat',
    urgency: 'soon',
    match: { date: '2027-01-02', city: 'OAX' },
  },
  {
    id: 'frida',
    title: 'Casa Azul timed tickets',
    detail: 'No door sales. Closed 25 Dec and 1 Jan.',
    kind: 'see',
    urgency: 'soon',
    match: { theme: 'frida' },
  },
]

const CLOSED_FRIDA = new Set(['2026-12-25', '2027-01-01'])

export function dayMatches(day, match) {
  if (!day || !match) return false
  if (match.date && day.date !== match.date) return false
  if (match.theme && day.theme !== match.theme) return false
  if (match.city && day.city !== match.city) return false
  return true
}

/** Days this decision attaches to. Unpinned matches (no date) take the first hit in the live timeline. */
export function matchingDays(days, match) {
  if (!match || !Array.isArray(days)) return []
  const hits = days.filter((d) => dayMatches(d, match))
  if (!match.date && hits.length) return [hits[0]]
  return hits
}

export function isDecisionVisible(dec, days) {
  if (dec.id === 'frida') {
    const hits = matchingDays(days, dec.match)
    if (hits.some((d) => CLOSED_FRIDA.has(d.date))) return false
  }
  return true
}

export function visibleDecisions(days) {
  return DECISIONS.filter((d) => isDecisionVisible(d, days))
}

function rank(dec, done) {
  if (done?.[dec.id]) return 2
  if (dec.urgency === 'now') return 0
  return 1
}

export function sortedDecisions(days, done) {
  return visibleDecisions(days)
    .map((d, i) => ({ d, i }))
    .sort((a, b) => rank(a.d, done) - rank(b.d, done) || a.i - b.i)
    .map((x) => x.d)
}

/** Dates whose day cards should get the bright-red left edge (open `now` only). */
export function asapDates(days, done) {
  const set = new Set()
  for (const dec of DECISIONS) {
    if (dec.urgency !== 'now') continue
    if (done?.[dec.id]) continue
    if (!isDecisionVisible(dec, days)) continue
    for (const day of matchingDays(days, dec.match)) set.add(day.date)
  }
  return set
}

export const TAB_HINT = {
  stays: 'Stays tab',
  oaxaca: 'CDMX–Oaxaca tab',
  decisions: 'Decisions tab',
}
