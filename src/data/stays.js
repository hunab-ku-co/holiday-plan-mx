// Roma Norte stays for 24–27 Dec 2026 (3 nights), 2 adults, 1 room.
// Grade order: (1) reviews (2) interior Roma safety (3) closeness to the Colima cluster.
// Inventory is Airbnb.com search + listing pages pulled 1 Sep 2026 for 24–26 Dec (2 nights).
// Re-search for 24–28 Dec on 2 Sep 2026 (then dates moved to 24–27): Airbnb listing pages returned no dated prices (JS);
// Booking.com timed out / WAF. Cards keep the 24–26 quotes already on file — not multiplied to 3 nights.
// Walk times are street estimates, not OSM measurements.
// Price range: more than €50 and less than €120 per day.
// Per-night figures from the Airbnb 2-night breakdown; Xe 31 Aug 2026 (1 USD = MXN 17.02 · €0.8625). Search dates are 24–27 Dec (3 nights).

export const AIRBNB_SEARCH =
  'https://www.airbnb.com/s/Roma-Norte--Mexico-City--Mexico/homes?checkin=2026-12-24&checkout=2026-12-27&adults=2'

export const BOOKING_SEARCH =
  'https://www.booking.com/searchresults.html?ss=Mexico+City%2C+Mexico&dest_type=city&checkin=2026-12-24&checkout=2026-12-27&group_adults=2&no_rooms=1&group_children=0&order=bayesian_review_score&nflt=di%3D2262%3Bht_id%3D201%3Breview_score%3D80'

/**
 * @typedef {object} Stay
 * @property {string} id
 * @property {string} title
 * @property {string} area
 * @property {string} walkToColima
 * @property {number | null} [rating]
 * @property {number | null} [reviewCount]
 * @property {string | null} [price]  // MXN · euro per day; leftover Airbnb quotes for 24–26 Dec 2026 (2 nights), not 24–27 totals; Xe 31 Aug 2026 (1 USD = 17.02 MXN · €0.8625)
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
    price: 'MXN 2,310 · €117 per day leftover — quoted for 24–26 Dec 2026 (2 nights MXN 4,620 · €234), not a 24–27 total. Airbnb, 2 adults. Do not multiply.',
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
    price: 'MXN 1,877 · €95 per day leftover — quoted for 24–26 Dec 2026 (2 nights MXN 3,754 · €190), not a 24–27 total. Airbnb, 2 adults. Do not multiply.',
    selfCheckIn: false,
    checkInNote: '24h reception · listed after 15:00, no cutoff shown · doorman 24 hours to let guests in',
    source: 'Airbnb.com',
    linkLabel: 'Airbnb listing',
    url: 'https://www.airbnb.com/rooms/1394486296005018559',
    why: '24h reception on the 4th floor; far fewer reviews. Pin is on the Córdoba / Álvaro Obregón edge.',
  },
]
