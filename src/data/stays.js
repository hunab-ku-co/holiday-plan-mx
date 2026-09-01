// Roma Norte stays for 24–26 Dec 2026 (2 nights), 2 adults, 1 room.
// Grade order: (1) reviews (2) interior Roma safety (3) closeness to the Colima cluster.
// Inventory is Booking.com apartments pulled 31 Aug 2026. Airbnb.com returned 503.
// Walk times are street estimates, not OSM measurements.
// Price range: more than €50 and less than €200 per night. Booking quotes on the cards were pulled for 24–28 Dec (4 nights); per-night range still applies. Do not invent 2-night totals.
// Per-night figures are the existing 4-night Booking quotes divided by 4; Xe 31 Aug 2026 (1 USD = MXN 17.02 · €0.8625). No new rates.

export const AIRBNB_SEARCH =
  'https://www.airbnb.com/s/Roma-Norte--Mexico-City--Mexico/homes?checkin=2026-12-24&checkout=2026-12-26&adults=2'

export const BOOKING_SEARCH =
  'https://www.booking.com/searchresults.html?ss=Mexico+City%2C+Mexico&dest_type=city&checkin=2026-12-24&checkout=2026-12-26&group_adults=2&no_rooms=1&group_children=0&order=bayesian_review_score&nflt=di%3D2262%3Bht_id%3D201%3Breview_score%3D80'

/**
 * @typedef {object} Stay
 * @property {string} id
 * @property {string} title
 * @property {string} area
 * @property {string} walkToColima
 * @property {number | null} [rating]
 * @property {number | null} [reviewCount]
 * @property {string | null} [price]  // MXN · euro per night from existing 4-night Booking.com quotes for 24–28 Dec 2026; stay is now 24–26 Dec — do not invent 2-night totals at Xe mid-market 31 Aug 2026 (1 USD = 17.02 MXN · €0.8625)
 * @property {boolean | null} [selfCheckIn]  // true only for lockbox; 24h desk is not self-check-in
 * @property {string} [checkInNote]
 * @property {string} [source]
 * @property {string} [linkLabel]
 * @property {string} url
 * @property {string} why  // 1-line why it ranks
 */

/** @type {Stay[]} */
export const stays = [
  {
    id: 'nido-roma',
    title: 'Nido Roma',
    area: 'Calle Querétaro 168, Roma Norte 06700',
    walkToColima: 'about 8 min to Colima cluster',
    rating: 9.0,
    reviewCount: 445,
    price: 'MXN 2,578–2,818 · €131–143 per night (deluxe queen studio; 4 nights MXN 10,310–11,270 · €523–571). 1BR loft MXN 2,963–3,260 · €150–165 per night (4 nights MXN 11,850–13,040 · €600–661), still under €200.',
    selfCheckIn: false,
    checkInNote: 'Open-ended late check-in · listed from 15:00, no closing time · 24/7 security in reviews',
    source: 'Booking.com',
    linkLabel: 'Booking.com listing',
    url: 'https://www.booking.com/hotel/mx/nido-roma.html',
    why: 'Most reviews of the cheap strong set, quiet interior street, open-ended late check-in.',
  },
  {
    id: 'mint-roma-residence',
    title: 'Mint Roma Residence',
    area: 'Frontera 151, Roma Norte',
    walkToColima: 'about 8 min to Colima cluster',
    rating: 9.0,
    reviewCount: 158,
    price: 'MXN 2,648–3,068 · €134–156 per night (1-BR loft; 4 nights MXN 10,590–12,270 · €536–622).',
    selfCheckIn: false,
    checkInNote: '24h front desk · listed 15:00–24:00',
    source: 'Booking.com',
    linkLabel: 'Booking.com listing',
    url: 'https://www.booking.com/hotel/mx/mint-roma-residence.html',
    why: '24h desk, interior street, best value with a real desk for midnight.',
  },
  {
    id: 'casa-cibeles',
    title: 'Casa Cibeles by Lumina',
    area: '88 Avenida Oaxaca, Roma Norte',
    walkToColima: 'about 12 min to Colima cluster',
    rating: 9.0,
    reviewCount: 441,
    price: 'MXN 3,140 · €159 per night at the cheap end (4 nights MXN 12,560 · €637). Top of the quoted range MXN 4,420 · €224 per night (4 nights MXN 17,680 · €896) is over €200 — skip those rooms.',
    selfCheckIn: false,
    checkInNote: '24h front desk · listed from 15:00, no cutoff shown',
    source: 'Booking.com',
    linkLabel: 'Booking.com listing',
    url: 'https://www.booking.com/hotel/mx/casa-cibeles-by-lumina.html',
    why: 'Lots of reviews, 24h desk; Oaxaca is a busier avenue. Cheapest quoted rooms sit under €200 per night.',
  },
]
