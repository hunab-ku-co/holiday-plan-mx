// Roma Norte Airbnb candidates for 24–28 Dec 2026, 2 guests.
// Grade order when listings exist: (1) reviews (2) area safety (3) closeness to the Colima cluster.
// Do not invent titles, prices, ratings, or URLs. Leave this array empty until a listing is verified.

export const AIRBNB_SEARCH =
  'https://www.airbnb.com/s/Roma-Norte--Mexico-City--Mexico/homes?checkin=2026-12-24&checkout=2026-12-28&adults=2'

/**
 * @typedef {object} Stay
 * @property {string} id
 * @property {string} title
 * @property {string} area
 * @property {string} walkToColima
 * @property {number | null} [rating]
 * @property {number | null} [reviewCount]
 * @property {string | null} [price]  // only if known for 24–28 Dec 2026
 * @property {boolean | null} [selfCheckIn]
 * @property {string} url
 * @property {string} why  // 1-line why it ranks
 */

/** @type {Stay[]} */
export const stays = []
