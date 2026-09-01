// Roma Norte stays for 24–26 Dec 2026 (2 nights), 2 adults, 1 room.
// Grade order: (1) reviews (2) interior Roma safety (3) closeness to the Colima cluster.
// Inventory is Airbnb.com search + listing pages pulled 1 Sep 2026. Booking.com returned an AWS WAF / JS challenge.
// Walk times are street estimates, not OSM measurements.
// Price range: more than €50 and less than €120 per night. Card quotes are Airbnb 24–26 Dec 2026 (2 nights).
// Per-night figures from the Airbnb 2-night breakdown; Xe 31 Aug 2026 (1 USD = MXN 17.02 · €0.8625).

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
 * @property {string | null} [price]  // MXN · euro per night from Airbnb.com quotes for 24–26 Dec 2026, 2 adults; Xe mid-market 31 Aug 2026 (1 USD = 17.02 MXN · €0.8625)
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
    id: 'art-deco-roma',
    title: "1930's Art Deco artist's apartment in La Roma",
    area: 'Roma Norte (Airbnb pin; exact street hidden until booking)',
    walkToColima: 'about 6 min to Colima cluster',
    rating: 4.79,
    reviewCount: 349,
    price: 'MXN 2,310 · €117 per night (2-BR apartment; 2 nights MXN 4,620 · €234). Airbnb 24–26 Dec 2026, 2 adults.',
    selfCheckIn: true,
    checkInNote: 'Self check-in with lockbox · listed after 15:00, no closing time',
    source: 'Airbnb.com',
    linkLabel: 'Airbnb listing',
    url: 'https://www.airbnb.com/rooms/23178897',
    why: 'Most reviews of the in-band set; lockbox after 15:00 with no cutoff. Pin sits south of Álvaro Obregón (Hospital General metro), not the interior Colima block.',
  },
  {
    id: 'loft-chic-roma',
    title: 'Loft Chic en Roma Norte',
    area: 'Roma Norte, 4th floor (Airbnb pin; exact street hidden until booking)',
    walkToColima: 'about 8 min to Colima cluster',
    rating: 5.0,
    reviewCount: 10,
    price: 'MXN 1,877 · €95 per night (1-BR loft, 1 queen; 2 nights MXN 3,754 · €190). Airbnb 24–26 Dec 2026, 2 adults.',
    selfCheckIn: false,
    checkInNote: '24h reception · listed after 15:00, no cutoff shown · doorman 24 hours to let guests in',
    source: 'Airbnb.com',
    linkLabel: 'Airbnb listing',
    url: 'https://www.airbnb.com/rooms/1394486296005018559',
    why: '24h reception on the 4th floor; far fewer reviews. Pin is on the Córdoba / Álvaro Obregón edge.',
  },
]
