// Roma Norte stays for 24–28 Dec 2026, 2 adults, 1 room.
// Grade order: (1) reviews (2) interior Roma safety (3) closeness to the Colima cluster.
// Inventory is Booking.com apartments pulled 31 Aug 2026. Airbnb.com returned 503.
// Walk times are street estimates, not OSM measurements.

export const AIRBNB_SEARCH =
  'https://www.airbnb.com/s/Roma-Norte--Mexico-City--Mexico/homes?checkin=2026-12-24&checkout=2026-12-28&adults=2'

export const BOOKING_SEARCH =
  'https://www.booking.com/searchresults.html?ss=Mexico+City%2C+Mexico&dest_type=city&checkin=2026-12-24&checkout=2026-12-28&group_adults=2&no_rooms=1&group_children=0&order=bayesian_review_score&nflt=di%3D2262%3Bht_id%3D201%3Breview_score%3D80'

/**
 * @typedef {object} Stay
 * @property {string} id
 * @property {string} title
 * @property {string} area
 * @property {string} walkToColima
 * @property {number | null} [rating]
 * @property {number | null} [reviewCount]
 * @property {string | null} [price]  // USD for 24–28 Dec 2026, 2 adults, as shown 31 Aug 2026
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
    price: '$606–$662 / 4 nights (deluxe queen studio; 1BR loft ~$696–766)',
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
    price: '$622–$721 / 4 nights (1-BR loft)',
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
    price: '$738–$1,039 / 4 nights',
    selfCheckIn: false,
    checkInNote: '24h front desk · listed from 15:00, no cutoff shown',
    source: 'Booking.com',
    linkLabel: 'Booking.com listing',
    url: 'https://www.booking.com/hotel/mx/casa-cibeles-by-lumina.html',
    why: 'Lots of reviews, 24h desk; Oaxaca is a busier avenue.',
  },
  {
    id: 'casa-oliva',
    title: 'Casa Oliva',
    area: '74 Puebla, Roma Norte',
    walkToColima: 'about 7 min to Colima cluster',
    rating: 9.2,
    reviewCount: 383,
    price: '$1,031–$1,146 / 4 nights (2-BR)',
    selfCheckIn: false,
    checkInNote: '24h front desk · listed 15:00–24:00',
    source: 'Booking.com',
    linkLabel: 'Booking.com listing',
    url: 'https://www.booking.com/hotel/mx/casa-oliva.html',
    why: 'On Puebla (near Martínez), 2BR, 24h desk.',
  },
  {
    id: 'colima-71',
    title: 'Colima 71 – Casa de Arte Hotel',
    area: 'Colima 71, Roma Norte',
    walkToColima: 'about 5 min to Colima cluster',
    rating: 9.4,
    reviewCount: 88,
    price: '$3,851–$4,043 / 4 nights (opened-page range; search card also showed $3,660 mobile)',
    selfCheckIn: false,
    checkInNote: '24h front desk · listed 15:00–24:00',
    source: 'Booking.com',
    linkLabel: 'Booking.com listing',
    url: 'https://www.booking.com/hotel/mx/colima71-art-community-ciudad-de-mexico.html',
    why: 'On Colima itself, pricey.',
  },
  {
    id: 'xoma-viadora',
    title: 'Xoma by Viadora',
    area: '80 Zacatecas, Roma Norte',
    walkToColima: 'about 10 min to Colima cluster',
    rating: 9.5,
    reviewCount: 188,
    price: '$2,213–$2,432 / 4 nights',
    selfCheckIn: false,
    checkInNote: '24h front desk · listed 15:00–24:00',
    source: 'Booking.com',
    linkLabel: 'Booking.com listing',
    url: 'https://www.booking.com/hotel/mx/xoma-boutique-apartments-by-viadora.html',
    why: 'Highest score, expensive, Zacatecas edge. Free cancel before 19 Dec 2026.',
  },
  {
    id: 'caliza-roma',
    title: 'Caliza Roma Residences by Tasman',
    area: 'Jalapa 17, Roma Norte',
    walkToColima: 'about 8 min to Colima cluster',
    rating: 8.9,
    reviewCount: 302,
    price: '$1,085–$1,245 / 4 nights',
    selfCheckIn: false,
    checkInNote: 'Listed 15:00–24:00 · early 10:00 checkout',
    source: 'Booking.com',
    linkLabel: 'Booking.com listing',
    url: 'https://www.booking.com/hotel/mx/caliza-roma-residences-by-tasman.html',
    why: 'Solid, early checkout is the ding.',
  },
  {
    id: 'onto-alvaro-obregon',
    title: 'ONTO Álvaro Obregón',
    area: 'Av. Álvaro Obregón 43, Roma Norte',
    walkToColima: 'about 10 min to Colima cluster',
    rating: 9.1,
    reviewCount: 272,
    price: '$1,526–$2,329 / 4 nights',
    selfCheckIn: false,
    checkInNote: '24h front desk · listed from 15:00',
    source: 'Booking.com',
    linkLabel: 'Booking.com listing',
    url: 'https://www.booking.com/hotel/mx/onto-alvaro-obregon-mexico-city.html',
    why: 'Last because the avenue is noisy.',
  },
]
