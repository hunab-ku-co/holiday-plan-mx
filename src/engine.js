import trip from './data/trip.json'

export const STATUSES = [
  { id: 'idea', label: 'Idea' },
  { id: 'researching', label: 'Researching' },
  { id: 'booked', label: 'Booked' },
  { id: 'skip', label: 'Skip' },
]

const START = new Date(Date.UTC(2026, 11, 24))
const END = new Date(Date.UTC(2027, 0, 8))

export function iso(d) {
  return d.toISOString().slice(0, 10)
}

export function parseIso(s) {
  const [y, m, day] = s.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, day))
}

export function addDays(s, n) {
  const d = parseIso(s)
  d.setUTCDate(d.getUTCDate() + n)
  return iso(d)
}

export function dow(s) {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][parseIso(s).getUTCDay()]
}

export function longDate(s) {
  const d = parseIso(s)
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function rangeDays(from, to) {
  const out = []
  let cur = from
  while (cur <= to) {
    out.push(cur)
    cur = addDays(cur, 1)
  }
  return out
}

function day({ date, title, place, city, altitude, theme, summary, items, research, hotel, restaurant, tour, flags }) {
  return {
    date,
    dow: dow(date),
    title,
    place,
    city,
    altitude,
    theme,
    summary,
    items: items || [],
    research: research || [],
    hotel: hotel || '',
    restaurant: restaurant || '',
    tour: tour || '',
    flags: flags || [],
  }
}

function arrivalDay() {
  return day({
    date: '2026-12-24',
    title: 'Landing night',
    place: 'MEX or Roma Norte',
    city: 'CDMX',
    altitude: 2240,
    theme: 'arrival',
    summary:
      'S arrives MEX around midnight (possibly just after midnight on the 25th). Zero-expectations night. Fork: sleep the terminal-matched airport hotel, or skip it and go straight to Roma Norte if self-check-in is confirmed for 24 Dec night. Authorized taxis 24/365 from prepaid kiosks inside; Uber/DiDi from the designated bay — no touts, no street hail at the arrivals kerb with bags at 00:30.',
    items: [
      { kind: 'stay', title: 'Fork: airport hotel or Roma Norte', detail: 'Airport hotel still on the table: T1 Hilton inside the terminal (Gate 8, 3rd level) or Courtyard / Camino Real. T2: NH Collection inside T2. Skip Fiesta Inn unless a 24 h transfer is confirmed in writing. Roma Norte: self/late check-in from 24 Dec night is a must — listings live on the Stays tab. Metro will be closed.' },
      { kind: 'note', title: 'Mexican Christmas dinner is Nochebuena', detail: 'The 24th is the feast night in Mexico. S is landing; this is not a dinner reservation night. 25 Dec is the open question. If going to Roma, kitchen/snacks matter — restaurants will be thin.' },
      { kind: 'note', title: 'Aerotrén is for connecting passengers only', detail: 'Hotel shuttles if staying airside: T1 Puerta 4; T2 hotel desks on the ground floor. If skipping the hotel: designated rideshare bay, not the arrivals curb.' },
    ],
    research: [
      { label: 'S arrival terminal (T1 vs T2)', state: 'Confirm closer in. Airport-hotel choice follows the terminal if that fork is taken.' },
      { label: 'Dated airport-hotel rates for 24 Dec 2026', state: 'Not published as a static list.' },
      { label: 'Roma Norte self-check-in 24 Dec night', state: 'Required if skipping the airport hotel. See the Stays tab.' },
    ],
    hotel: 'hilton-t1',
    flags: ['locked'],
  })
}

function departDay() {
  return day({
    date: '2027-01-08',
    title: 'Homebound',
    place: 'MEX → DFW → HEL',
    city: 'CDMX',
    altitude: 2240,
    theme: 'depart',
    summary: trip.homeLeg.summary,
    items: [
      { kind: 'fly', title: 'International departure', detail: 'Confirm terminal. 3 h before departure. Polanco taxi 30–60 min. No sightseeing.' },
    ],
    research: [{ label: '8 Jan departure terminal', state: 'Confirm with the ticket closer in.' }],
    flags: ['locked', 'travel-day'],
  })
}

function xmasCdmx() {
  return day({
    date: '2026-12-25',
    title: 'Christmas Day · Coyoacán',
    place: 'Coyoacán',
    city: 'CDMX',
    altitude: 2240,
    theme: 'cdmx-xmas',
    summary:
      'No museums on 25 Dec. Do not stack Cholula stairs or Chapultepec hills — first 48 h at altitude, mild only. Daytime Coyoacán on foot. Dinner: confirm Los Danzantes that week; if closed, Uber to Au Pied de Cochon in Polanco (the only kitchen that officially never closes).',
    items: [
      { kind: 'see', title: 'Coyoacán plazas, not museums', detail: 'Casa Azul is closed. Keep it a walk: Jardín Centenario, coffee at El Jarocho, no ticketed indoor agenda.' },
      { kind: 'eat', title: 'Dinner fork', detail: 'Los Danzantes Coyoacán if they confirm open. Otherwise Au Pied de Cochon, Campos Elíseos 218 — 24 h / 365. 2026 25 Dec menus are not published. Hotel brunches were the 2025 pattern, not a dinner plan.' },
      { kind: 'note', title: 'Nochebuena was last night', detail: 'Do not book 25 Dec on Eve-only data from Hacienda de los Morales, St. Regis, or Ritz-Carlton Samos.' },
    ],
    research: [
      { label: '25 Dec 2026 restaurant open/closed lists', state: 'Not yet published.' },
      { label: 'Los Danzantes Coyoacán holiday hours', state: 'Confirm that week.' },
    ],
    restaurant: 'danzantes-coyo',
    hotel: 'las-alcobas',
    flags: ['no-museums'],
  })
}

function anthroDay(date) {
  return day({
    date,
    title: 'Anthropology + Chapultepec highlights',
    place: 'Chapultepec',
    city: 'CDMX',
    altitude: 2240,
    theme: 'cdmx-museums',
    summary:
      'A normal INAH day if it is Tue–Sun. Anthropology 09:00–18:00, Sun Stone in Sala Mexica. Castillo is at least 1.5 h inside up a paved ramp with no elevator — highlights only, do not stack the full castle on the same ticketed day.',
    items: [
      { kind: 'see', title: 'Museo Nacional de Antropología', detail: 'Tue–Sun 09:00–18:00, closed Mon. MXN 210 · €11 general. Tickets: ventadeboletosenlinea.inah.gob.mx. 26 Dec 2026 is a Saturday (normal). 2024–25 the museum stayed open 24, 25, 31 Dec and 1 Jan — still reconfirm 2026–27 circulars.' },
      { kind: 'see', title: 'Castillo de Chapultepec — highlights only', detail: 'Tue–Sun 09:00–17:00. MXN 210 · €11. If energy is low at altitude, skip the castle and keep Anthropology.' },
      { kind: 'eat', title: 'Tacos Roma–Condesa in the evening', detail: 'Orinoco or El Califa. This is the right night if the date is Sat 26 Dec. Skip tacos on 25 Dec and on Frida day.' },
    ],
    research: [{ label: 'INAH 2026–27 holiday circular', state: 'Not yet published. 26 Dec should be ordinary Saturday hours.' }],
    restaurant: 'orinoco',
    tour: 'anthropology',
    hotel: 'las-alcobas',
  })
}

function centroDay(date) {
  return day({
    date,
    title: 'Centro · Templo Mayor · Bellas Artes',
    place: 'Centro Histórico',
    city: 'CDMX',
    altitude: 2240,
    theme: 'cdmx-museums',
    summary:
      '6 Jan 2027 is Wednesday, Día de Reyes — not a federal rest day. Templo Mayor Tue–Sun 09:00–17:00, expected open. Bellas Artes museum same-day taquilla only. Palacio Postal is a different building.',
    items: [
      { kind: 'see', title: 'Templo Mayor', detail: 'Tue–Sun 09:00–17:00. MXN 210 · €11 INAH (older SIC $100 listings are stale). Includes the archaeological zone. Original Coyolxauhqui in the museum.' },
      { kind: 'see', title: 'Palacio de Bellas Artes museum', detail: 'Tue–Sun 10:00–18:00, last entry 17:30. MXN 95 · €5, same-day taquilla, no online. Sun free. Concert hall is a separate ticket. 2024–25 INBAL closed 25 Dec and 1 Jan; 24 and 31 Dec closed 14:00.' },
      { kind: 'eat', title: 'Centro lunch', detail: 'El Cardenal Palma (lunch only 08:00–18:30) or Azul Histórico or Café de Tacuba.' },
    ],
    research: [
      { label: 'Templo Mayor price INAH 210 vs stale SIC 100', state: 'Treat 210 as current; reconfirm at the desk.' },
      { label: 'INBAL 2026–27 holiday circular', state: 'Not yet published.' },
    ],
    restaurant: 'el-cardenal',
    tour: 'templo',
    hotel: 'las-alcobas',
  })
}

function polancoReturn(date, fromOaxaca) {
  return day({
    date,
    title: fromOaxaca ? 'Return to Polanco' : 'Polanco evening',
    place: 'Polanco',
    city: 'CDMX',
    altitude: 2240,
    theme: 'cdmx-return',
    summary: fromOaxaca
      ? 'Return from Oaxaca to CDMX by bus. ADO Oaxaca → ADO TAPO first-class, 6–7 h typical. Station is close to Centro (~10 min taxi / ~20 min walk). Day or overnight still open; Christmas fare not retrieved. Park-edge Campos Elíseos cluster if Anthropology is still ahead on foot. Soumaya is the light add-on (daily 10:30–18:30, free).'
      : 'Polanco night. Park-edge stay.',
    items: fromOaxaca
      ? [
          { kind: 'move', title: 'OAX → CDMX', detail: 'ADO Oaxaca → ADO TAPO first-class, 6–7 h typical. Station is close to Centro (~10 min taxi / ~20 min walk). Then onward to Polanco. Day or overnight still open; Christmas fare not retrieved. Details on the CDMX–Oaxaca tab.' },
          { kind: 'see', title: 'Soumaya Plaza Carso if the arrival is early enough', detail: 'Every day 10:30–18:30, free. Tuesday 5 Jan is an ordinary opening.' },
          { kind: 'eat', title: 'Polanco dinner', detail: 'Comedor Jacinta (Bib Gourmand) or Chapulín or Au Pied. Quintonil is a tasting (MXN 6090 · €309, Sun closed) — better as 7 Jan if they want a special.' },
        ]
      : [{ kind: 'stay', title: 'Polanco', detail: 'Campos Elíseos / Lincoln cluster.' }],
    research: [
      { label: 'Dated Polanco rates 5–8 Jan', state: 'Not published as a static list.' },
      { label: 'ADO TAPO–Oaxaca Christmas inventory', state: 'Book now; dated fares not retrieved.' },
    ],
    hotel: 'las-alcobas',
    restaurant: 'comedor-jacinta',
    flags: fromOaxaca ? ['travel-day'] : [],
  })
}

function fridaDay(date) {
  return day({
    date,
    title: 'Frida · Coyoacán · Anahuacalli',
    place: 'Coyoacán',
    city: 'CDMX',
    altitude: 2240,
    theme: 'frida',
    summary:
      'Timed tickets only — boletos.museofridakahlo.org.mx — no door sales. Closed 25 Dec and 1 Jan 2027. 7 Jan 2027 is Thursday 10:00–18:00. The ticket includes courtesy Anahuacalli, 15–20 min by car, not walkable. Evening geography then points to Sud 777 or back to Polanco for Quintonil.',
    items: [
      { kind: 'see', title: 'Casa Azul', detail: 'Mon closed. Tue 10–18, Wed 11–18, Thu–Sun 10–18. General MXN 320 · €16 / national 160. Reduced hours 24 and 31 Dec 10:00–14:00 (English visit page; Spanish homepage says 11:00–14:00 — recheck).' },
      { kind: 'see', title: 'Anahuacalli', detail: 'Tue–Sun 11:00–17:30. MXN 130 · €7 if bought separately. Calle Museo 150, San Pablo Tepetlapa.' },
      { kind: 'eat', title: 'Coyoacán by day, special by night', detail: 'Los Danzantes or Corazón de Maguey for lunch. Quintonil (Thu is a service day) or Sud 777 after Anahuacalli. Skip Roma tacos tonight.' },
    ],
    research: [
      { label: 'Casa Azul 24/31 Dec 10:00 vs 11:00', state: 'English and Spanish pages disagree. Recheck before a reduced-day visit.' },
      { label: 'Anahuacalli holiday hours', state: 'Not separately published.' },
      { label: 'Quintonil / Pujol Jan 2027 inventory', state: 'Pujol has had recent closure banners — reconfirm. Quintonil is the safer special.' },
    ],
    restaurant: 'quintonil',
    tour: 'frida',
    hotel: 'las-alcobas',
    flags: ['book-ahead'],
  })
}

function pueblaDay(date) {
  const d = dow(date)
  const closed = d === 'Mon' || d === 'Tue'
  return day({
    date,
    title: closed ? 'Puebla Centro (Cholula closed)' : 'Cholula + Puebla Centro',
    place: 'Cholula / Puebla',
    city: 'PUE',
    altitude: 2140,
    theme: 'puebla',
    summary: closed
      ? 'Cholula INAH is closed Monday and Tuesday. Centro-only is possible; tunnels are closed anyway. This is not a lower-altitude rest — Puebla sits at ~2,140 m.'
      : 'One-day trip, no extra hotel. Cholula first (09:00 zone + museum, no tunnels), Remedios stairs, then Puebla Zócalo, Palafoxiana, cathedral only if Sunday 15:00–16:45. Skip Museo Amparo on a combo day. ADO ~2–2.5 h each way. Private car is the comfortable way.',
    items: closed
      ? [
          { kind: 'note', title: 'Cholula closed today', detail: 'Wed–Sun 09:00–17:00 only. Tunnels cerrado al público hasta nuevo aviso (still as of 29 Jun 2026).' },
          { kind: 'see', title: 'Puebla Centro fallback', detail: 'Zócalo, cathedral, Capilla del Rosario, Palafoxiana (Tue–Thu 10–17, Fri–Sun 10–18, closed Mon). Mole / cemitas. Do not add a hotel.' },
        ]
      : [
          { kind: 'see', title: 'Zona Arqueológica de Cholula', detail: 'One ticket: ceremonial area + Museo de Sitio. Foreigner MXN 210 · €11. Tunnels closed. Church of Remedios on top is separate, 07:00–19:00, stairs, volcano views.' },
          { kind: 'see', title: 'Puebla Centro afternoon', detail: 'Skip Amparo. Palafoxiana and Rosario if short. Sunday cathedral tourist visit only 15:00–16:45.' },
          { kind: 'move', title: 'There and back in a day', detail: 'Estrella Roja TAPO ↔ Cholula 12 Poniente is the cleanest if Cholula first. Uber Puebla–Cholula ~24 min. Overland Oaxaca → Puebla → CDMX the same day is 12–16 h — do not.' },
        ],
    research: [{ label: 'Cholula tunnel reopening', state: 'Still closed as of 29 Jun 2026.' }],
    tour: 'cholula',
    flags: closed ? ['cholula-closed'] : ['day-trip'],
  })
}

function oaxacaArrival(date, christmas) {
  return day({
    date,
    title: christmas ? 'Oaxaca · Christmas' : 'Oaxaca · Centro',
    place: 'Oaxaca Centro',
    city: 'OAX',
    altitude: 1542,
    theme: 'oaxaca',
    summary: christmas
      ? 'As soon as a midnight landing is humane: late morning rest, then CDMX → Oaxaca by bus. Christmas dinner at 1,542 m. ADO TAPO → ADO Oaxaca first-class, 6–7 h typical. Day or overnight still open; Christmas fare not retrieved. 2026 menus are not published. Levadura is open on a Friday but this is an arrival day — save it. Casa Oaxaca or Los Danzantes, confirm that week.'
      : 'CDMX → Oaxaca by bus. ADO TAPO → ADO Oaxaca first-class, 6–7 h typical. Station is close to Centro (~10 min taxi / ~20 min walk). Day or overnight still open; Christmas fare not retrieved. Stay Centro or Jalatlaco. Pool hotels after the later Monte Albán day.',
    items: christmas
      ? [
          { kind: 'move', title: 'CDMX → Oaxaca', detail: 'ADO TAPO → ADO Oaxaca first-class, 6–7 h typical. Station is close to Centro (~10 min taxi / ~20 min walk). Day or overnight still open; Christmas fare not retrieved. Details on the CDMX–Oaxaca tab.' },
          { kind: 'eat', title: 'Christmas dinner in Oaxaca', detail: 'Casa Oaxaca rooftop or Los Danzantes. Levadura is a Friday service day but too ambitious after a travel day. Menus not published.' },
          { kind: 'stay', title: 'Centro or Jalatlaco', detail: 'Otro (facing Santo Domingo), Escondido, Quinta Real (skip a locked gala), Casa Oaxaca Hotel, Siglo 17, Los Pilares, City Centro Marriott.' },
        ]
      : [
          { kind: 'move', title: 'CDMX → Oaxaca', detail: 'ADO TAPO → ADO Oaxaca first-class, 6–7 h typical. Station is close to Centro (~10 min taxi / ~20 min walk). Day or overnight still open; Christmas fare not retrieved. Details on the CDMX–Oaxaca tab.' },
          { kind: 'see', title: 'Centro, Santo Domingo, light walking', detail: 'Arrival day is not Monte Albán. Jalatlaco dinner keeps it close to a pool hotel.' },
          { kind: 'eat', title: 'Asador Bacanora or Tierra del Sol', detail: 'Levadura is closed Sunday. Proposal: Bacanora in Jalatlaco.' },
        ],
    research: [
      { label: 'ADO TAPO–Oaxaca Christmas inventory', state: 'Book now; dated fares not retrieved.' },
      { label: 'NYE and Christmas 2026 menus', state: 'Not yet published. Watch October–November.' },
      { label: 'Winter Expo-Venta de Alebrijes 2026–27', state: 'Not listed yet. Last winter: 19 Dec 2025–4 Jan 2026, Galera Municipal, San Martín Tilcajete, 10:00–18:00.' },
    ],
    hotel: 'otro',
    restaurant: christmas ? 'casa-oax-roof' : 'bacanora',
    flags: ['travel-day', 'altitude-easier'],
  })
}

function oaxacaCity(date) {
  return day({
    date,
    title: 'Oaxaca city · food · markets',
    place: 'Oaxaca Centro',
    city: 'OAX',
    altitude: 1542,
    theme: 'oaxaca',
    summary: 'A walking day. Markets, Santo Domingo, mezcal tasting in town if In Situ is open. No ruins, no five-village rush.',
    items: [
      { kind: 'see', title: 'Centro and markets', detail: 'Keep it in town. Atzompa is a Monte Albán pairing, not today.' },
      { kind: 'eat', title: 'Los Danzantes dinner', detail: 'Andador. Book in the order: Levadura, Criollo, Casa Oaxaca restaurant, Los Danzantes.' },
    ],
    hotel: 'otro',
    restaurant: 'danzantes-oax',
  })
}

function monteAlban(date) {
  return day({
    date,
    title: 'Monte Albán, then the pool',
    place: 'Monte Albán',
    city: 'OAX',
    altitude: 1542,
    theme: 'oaxaca',
    summary: 'Private driver for 08:00. Daily 08:00–17:00, last access 16:00, MXN 210 · €11. About 2–3 h on site. Valley ~1,500 m, ridge ~400 m above — sun and stairs, not extra altitude vs CDMX. Then the hotel pool. Optional Atzompa on the way back, not a second ruin marathon.',
    items: [
      { kind: 'see', title: 'Monte Albán at opening', detail: '8 km west of Centro. INAH zone 94.' },
      { kind: 'stay', title: 'Pool afternoon', detail: 'This is why Otro, Escondido, Quinta Real, Siglo 17, or Los Pilares matter.' },
    ],
    hotel: 'otro',
    tour: 'monte-alban',
    restaurant: '',
  })
}

function craftsDay(date) {
  const d = dow(date)
  const alfonsina = d !== 'Sun'
  return day({
    date,
    title: 'South valley handicrafts',
    place: 'Coyotepec · Jalieza · Tilcajete',
    city: 'OAX',
    altitude: 1542,
    theme: 'oaxaca',
    summary: 'Unhurried south: Coyotepec (barro negro, Doña Rosa / Nieto Real) → Jalieza (backstrap, plaza) → lunch → Tilcajete (alebrijes). Not five villages. Teotitlán belongs on the mezcal day. Private driver 8–9 h; red flags are commission warehouses and vehicles with no tourism plates.',
    items: [
      { kind: 'see', title: 'Three stops, not five', detail: 'Winter alebrije expo 2026–27 is not listed yet. Watch oaxaca.travel.' },
      { kind: 'eat', title: alfonsina ? 'Alfonsina lunch (La Raya) or Origen dinner' : 'Origen dinner — Alfonsina is out of Centro and Sundays are a worse fit', detail: 'Alfonsina is in San Juan Bautista La Raya, on the south-valley geography.' },
    ],
    hotel: 'otro',
    restaurant: alfonsina ? 'alfonsina' : 'origen',
    tour: 'south-crafts',
  })
}

function nyeDay() {
  return day({
    date: '2026-12-31',
    title: 'New Year’s Eve',
    place: 'Oaxaca Centro',
    city: 'OAX',
    altitude: 1542,
    theme: 'oaxaca',
    summary: 'NYE 2026 menus are not published. Watch October–November. Do not lock a hotel gala (Quinta Real 2025 ran 20:00–02:00). Proposal: Casa Oaxaca rooftop ~19:00–20:00, then walk to Santo Domingo and the Zócalo. Backup: Los Danzantes.',
    items: [
      { kind: 'eat', title: 'Rooftop, then the plaza on foot', detail: 'Watch-list also includes Origen, Pitiona, Criollo (Thu dinner 18:00–21:00), Tierra del Sol, Levadura (Thu seatings 13/16/19), Asador Bacanora.' },
      { kind: 'note', title: 'Stay in Oaxaca tonight', detail: 'The playground will warn if NYE is moved out of Oaxaca.' },
    ],
    research: [{ label: 'NYE 2026 menus and hotel galas', state: 'Not yet published. Watch Oct–Nov. Skip locked galas.' }],
    hotel: 'otro',
    restaurant: 'casa-oax-roof',
    flags: ['nye'],
  })
}

function recoveryDay() {
  return day({
    date: '2027-01-01',
    title: 'Recovery',
    place: 'Oaxaca Centro',
    city: 'OAX',
    altitude: 1542,
    theme: 'oaxaca',
    summary: 'Hotel breakfast. Terranova on the Zócalo claims 365 days, 08:00–midnight. Markets may be late or thin. No ruins, no 07:00 tour. Casa Azul in CDMX is closed today anyway.',
    items: [
      { kind: 'eat', title: 'Light', detail: 'Mercado if open, else Tierra del Sol + ask In Situ on the 31st (1 Jan is Friday).' },
      { kind: 'note', title: 'Sleep', detail: 'This is the point of having NYE in Oaxaca rather than on a travel day.' },
    ],
    hotel: 'otro',
    restaurant: 'tierra-sol',
    flags: ['recovery'],
  })
}

function mezcalDay(date) {
  return day({
    date,
    title: 'East valley mezcal',
    place: 'Tule · Mitla · palenques',
    city: 'OAX',
    altitude: 1542,
    theme: 'oaxaca',
    summary: 'East: Tule → optional Teotitlán → Mitla (INAH daily 08:00–17:00 last 16:30, MXN 210 · €11) → two palenques toward Matatlán. Two or three palenques max. Eat first. Buy bottles where you like them. Real Minero (south) is a different day — reserved, not combined with Mitla.',
    items: [
      { kind: 'see', title: 'Mitla + two palenques', detail: 'Juan Montes-Lara is a usual private guide pattern (normally three palenques — hold to two or three).' },
      { kind: 'eat', title: 'Pitiona or leftover', detail: 'If this lands on Sat 2 Jan, Pitiona fits. Otherwise Origen.' },
    ],
    hotel: 'otro',
    restaurant: 'pitiona',
    tour: 'east-mezcal',
  })
}

function flexDay(date) {
  return day({
    date,
    title: 'Flexible · Hierve / cooking / rest',
    place: 'Oaxaca',
    city: 'OAX',
    altitude: 1542,
    theme: 'oaxaca',
    summary: 'Hierve el Agua is ~1.5–1 h 45, locally managed, hours conflict, can shut with little warning — private and early or skip. Casa Crespo public class Tue–Sun 10:00 MXN 1350 · €68 (Sunday is published). Casa de los Sabores group is Wed/Fri only and does not fit a Sunday.',
    items: [
      { kind: 'see', title: 'Pick one', detail: 'Hierve, Casa Crespo, Seasons of My Heart (full day Etla), or a pool day.' },
    ],
    research: [{ label: 'Hierve hours and closures', state: 'Conflict in published hours; can close with little warning.' }],
    hotel: 'otro',
    tour: 'casa-crespo',
    restaurant: 'origen',
  })
}

function oaxacaFinale(date) {
  const d = dow(date)
  const criolloOk = d !== 'Sun'
  return day({
    date,
    title: 'Final Oaxaca',
    place: 'Oaxaca Centro',
    city: 'OAX',
    altitude: 1542,
    theme: 'oaxaca',
    summary: criolloOk
      ? 'Last full day in town. Levadura is closed Sunday and Monday — if this is Monday 4 Jan, Criollo at 18:00 is the plan (dinner Mon–Sat 18:00–21:00). Casa Oaxaca restaurant is the other closer.'
      : 'Last full day. Criollo does not serve Sunday dinner. Casa Oaxaca restaurant Sundays 13:00–21:00, or a quiet market lunch.',
    items: [
      { kind: 'eat', title: criolloOk ? 'Criollo 18:00' : 'Casa Oaxaca restaurant', detail: 'Book Criollo on OpenTable when the last night is Mon–Sat.' },
      { kind: 'see', title: 'Anything still open on the must-do list', detail: 'No new valley. Pack for an OAX → CDMX move the next morning.' },
    ],
    hotel: 'otro',
    restaurant: criolloOk ? 'criollo' : 'casa-oax-roof',
  })
}

function levaduraOverlay(d) {
  if (d.city !== 'OAX') return d
  if (d.date !== '2026-12-29') return d
  return {
    ...d,
    restaurant: 'levadura',
    items: [
      ...d.items,
      { kind: 'eat', title: 'Levadura de Olla 19:00 — book now', detail: 'Tuesday is the first legal night this trip (closed Sun & Mon). No under-12. Reserva on levaduradeolla.mx.' },
    ],
    flags: [...(d.flags || []), 'book-ahead'],
  }
}

function extraOaxaca(date) {
  return day({
    date,
    title: 'Oaxaca · settle',
    place: 'Oaxaca Centro',
    city: 'OAX',
    altitude: 1542,
    theme: 'oaxaca',
    summary: 'An extra valley day from the altitude-reverse calendar. Centro, coffee, a second look at Santo Domingo. Keep dinner in town.',
    items: [
      { kind: 'see', title: 'Centro without an agenda', detail: 'Useful the morning after a Christmas-Day arrival.' },
      { kind: 'eat', title: 'Tierra del Sol or Asador Bacanora', detail: 'Save Levadura for Tuesday 29 Dec.' },
    ],
    hotel: 'otro',
    restaurant: 'tierra-sol',
  })
}

function assignOaxacaDays(dates) {
  if (!dates.length) return []
  const special = new Map()
  for (const d of dates) {
    if (d === '2026-12-25') special.set(d, 'xmas')
    else if (d === '2026-12-31') special.set(d, 'nye')
    else if (d === '2027-01-01') special.set(d, 'recovery')
  }
  const first = dates[0]
  const last = dates[dates.length - 1]
  special.set(first, special.get(first) === 'xmas' ? 'arrive-xmas' : 'arrive')
  if (last !== first) {
    if (!special.has(last)) special.set(last, 'finale')
  }
  const remaining = dates.filter((d) => !special.has(d))
  const slots = ['city', 'monte', 'crafts', 'mezcal', 'flex']
  remaining.forEach((d, i) => {
    special.set(d, slots[Math.min(i, slots.length - 1)])
  })
  return dates.map((d) => {
    const kind = special.get(d)
    let built
    if (kind === 'arrive-xmas') built = oaxacaArrival(d, true)
    else if (kind === 'arrive') built = oaxacaArrival(d, false)
    else if (kind === 'xmas') built = oaxacaArrival(d, true)
    else if (kind === 'nye') built = nyeDay()
    else if (kind === 'recovery') built = recoveryDay()
    else if (kind === 'finale') built = oaxacaFinale(d)
    else if (kind === 'city') built = oaxacaCity(d)
    else if (kind === 'monte') built = monteAlban(d)
    else if (kind === 'crafts') built = craftsDay(d)
    else if (kind === 'mezcal') built = mezcalDay(d)
    else if (kind === 'flex') built = flexDay(d)
    else built = extraOaxaca(d)
    return levaduraOverlay(built)
  })
}

export function authoredA() {
  const oax = assignOaxacaDays(rangeDays('2026-12-27', '2027-01-04'))
  return [
    arrivalDay(),
    xmasCdmx(),
    anthroDay('2026-12-26'),
    ...oax,
    polancoReturn('2027-01-05', true),
    centroDay('2027-01-06'),
    fridaDay('2027-01-07'),
    departDay(),
  ]
}

export function authoredB() {
  const oax = assignOaxacaDays(rangeDays('2026-12-25', '2027-01-04'))
  return [
    arrivalDay(),
    ...oax,
    polancoReturn('2027-01-05', true),
    anthroDay('2027-01-06'),
    fridaDay('2027-01-07'),
    departDay(),
  ]
}

const BLOCK_DAYS = {
  'cdmx-xmas': 1,
  'cdmx-museums': 2,
  oaxaca: 0,
  puebla: 1,
  frida: 1,
}

export const DEFAULT_ORDER = ['cdmx-xmas', 'cdmx-museums', 'oaxaca', 'frida']
export const ALL_BLOCKS = ['cdmx-xmas', 'cdmx-museums', 'oaxaca', 'puebla', 'frida']

export function normalizeOrder(order, includePuebla) {
  const allowed = new Set(ALL_BLOCKS)
  let next = (order || DEFAULT_ORDER).filter((id) => allowed.has(id))
  if (includePuebla && !next.includes('puebla')) next = [...next.slice(0, -1), 'puebla', 'frida'].filter((v, i, a) => a.indexOf(v) === i)
  if (!includePuebla) next = next.filter((id) => id !== 'puebla')
  for (const id of ['cdmx-xmas', 'cdmx-museums', 'oaxaca', 'frida']) {
    if (!next.includes(id)) {
      if (id === 'oaxaca') next.splice(Math.max(0, next.length - 1), 0, id)
      else next.unshift(id)
    }
  }
  if (!next.includes('oaxaca')) next.splice(1, 0, 'oaxaca')
  return next
}

function buildBlockDays(id, dates) {
  if (id === 'cdmx-xmas') return [xmasCdmx()].map((d, i) => ({ ...d, date: dates[i], dow: dow(dates[i]) }))
  if (id === 'cdmx-museums') {
    const a = anthroDay(dates[0])
    const b = dates[1] ? centroDay(dates[1]) : null
    return b ? [a, b] : [a]
  }
  if (id === 'puebla') return [pueblaDay(dates[0])]
  if (id === 'frida') return [fridaDay(dates[0])]
  if (id === 'oaxaca') return assignOaxacaDays(dates)
  return dates.map((d) => extraOaxaca(d))
}

export function generateFromOrder(order, includePuebla) {
  const seq = normalizeOrder(order, includePuebla)
  const flexible = rangeDays('2026-12-25', '2027-01-07')
  const fixed = seq.map((id) => (id === 'oaxaca' ? 0 : BLOCK_DAYS[id] || 1))
  const reserved = fixed.reduce((a, b) => a + b, 0)
  const oaxLen = Math.max(6, flexible.length - reserved)
  const lengths = seq.map((id) => (id === 'oaxaca' ? oaxLen : BLOCK_DAYS[id] || 1))
  let used = lengths.reduce((a, b) => a + b, 0)
  if (used > flexible.length) {
    const idx = seq.indexOf('oaxaca')
    lengths[idx] = Math.max(5, lengths[idx] - (used - flexible.length))
    used = lengths.reduce((a, b) => a + b, 0)
  }
  if (used < flexible.length) {
    const idx = seq.indexOf('oaxaca')
    lengths[idx] += flexible.length - used
  }
  const days = [arrivalDay()]
  let cursor = 0
  for (let i = 0; i < seq.length; i++) {
    const slice = flexible.slice(cursor, cursor + lengths[i])
    cursor += lengths[i]
    days.push(...buildBlockDays(seq[i], slice))
  }
  days.push(departDay())
  return days
}

export function warningsFor(days, scenario) {
  const out = []
  const byDate = Object.fromEntries(days.map((d) => [d.date, d]))
  const nye = byDate['2026-12-31']
  if (nye && nye.city !== 'OAX') {
    out.push({ level: 'warn', text: 'NYE is not in Oaxaca. Baseline was always a Centro night on foot after a rooftop dinner — menus for 2026 are not published, and a locked hotel gala is a trap.' })
  }
  const frida = days.find((d) => d.theme === 'frida')
  if (frida) {
    if (frida.date === '2026-12-25' || frida.date === '2027-01-01') {
      out.push({ level: 'alert', text: `Casa Azul is closed on ${longDate(frida.date)}. Move Frida. No door sales on any day — book boletos.museofridakahlo.org.mx.` })
    } else if (dow(frida.date) === 'Mon') {
      out.push({ level: 'alert', text: 'Casa Azul is closed Mondays. Move Frida off this date.' })
    } else {
      out.push({ level: 'info', text: `Frida sits on ${longDate(frida.date)}. Timed tickets only; the same ticket includes Anahuacalli (15–20 min drive).` })
    }
  }
  const depart = byDate['2027-01-08']
  if (depart && (depart.theme !== 'depart' || days.some((d) => d.date === '2027-01-08' && d.theme !== 'depart'))) {
    out.push({ level: 'alert', text: '8 Jan is a travel day (MEX 12:22 → DFW 15:15 → HEL). No sightseeing.' })
  }
  days.forEach((d) => {
    if (d.theme === 'puebla' && (d.dow === 'Mon' || d.dow === 'Tue')) {
      out.push({ level: 'alert', text: `Cholula INAH is closed ${d.dow} ${d.date.slice(8)} — tunnels are closed anyway. Centro-only or move to Wed–Sun.` })
    }
    if (d.theme === 'puebla') {
      const same = days.find((x) => x.date === d.date && x.flags?.includes('travel-day'))
      const neighbor = [addDays(d.date, -1), addDays(d.date, 1)].some((x) => byDate[x]?.flags?.includes('travel-day') && byDate[x]?.theme === 'oaxaca')
      if (same || (d.flags || []).includes('travel-day')) {
        out.push({ level: 'alert', text: 'Puebla is stacked on a travel day. Do not squeeze Cholula onto a MEX–OAX morning.' })
      } else if (neighbor) {
        out.push({ level: 'warn', text: 'Puebla sits next to an Oaxaca travel day. Slot 1 (Sun 27 day trip, travel Mon 28 from CDMX) is the only version of that idea that does not stack.' })
      }
    }
    if (d.theme === 'cdmx-museums' && (d.date === '2026-12-25' || d.date === '2027-01-01')) {
      out.push({ level: 'alert', text: `Museums on ${longDate(d.date)}: treat 25 Dec as closed. 1 Jan was closed in 2024–25 for Templo Mayor / INBAL / Casa Azul. Do not plan ticketed rooms.` })
    }
    if (d.theme === 'cdmx-museums' && dow(d.date) === 'Mon') {
      out.push({ level: 'alert', text: `INAH museums are closed Mondays (${longDate(d.date)}).` })
    }
    if (d.city === 'OAX' && d.restaurant === 'levadura' && (dow(d.date) === 'Sun' || dow(d.date) === 'Mon')) {
      out.push({ level: 'alert', text: `Levadura de Olla is closed ${dow(d.date)}. Not 27 Dec, not 4 Jan. Move to a Tue–Sat, ideally Tue 29 Dec 19:00.` })
    }
  })
  const oaxNights = days.filter((d) => d.city === 'OAX' && d.theme !== 'depart').length
  const cdmxSleeps = days.filter((d) => d.city === 'CDMX' && d.theme !== 'depart' && d.date !== '2027-01-08').length
  if (scenario === 'A' && cdmxSleeps >= 4) {
    out.push({ level: 'info', text: `Baseline sleeps ${cdmxSleeps} nights at ~2,240 m before / after Oaxaca (${oaxNights} nights at 1,542 m). Scenario B moves Christmas to Oaxaca so the easier altitude starts on the 25th.` })
  }
  if (scenario === 'B') {
    out.push({ level: 'info', text: 'Altitude reverse: Christmas and NYE in Oaxaca. 6 Jan is Anthropology (the day that moved); Centro / Templo Mayor is the piece that no longer has its own date — steal an hour from 6 Jan only if energy is high, do not stack a full Castillo.' })
  }
  const puebla = days.find((d) => d.theme === 'puebla')
  if (!puebla) {
    out.push({ level: 'info', text: 'Puebla is not placed. Ranked slots: (1) Sun 27 Dec day trip then travel Oaxaca Mon 28 from CDMX; (2) leave Oaxaca Sat 2 Jan, Cholula Sun 3 Jan; (3) skip. Tunnels closed. No extra hotel.' })
  }
  const overloaded = days.filter((d) => (d.items || []).length >= 4 && d.flags?.includes('travel-day'))
  if (overloaded.length) {
    out.push({ level: 'warn', text: 'A travel day is carrying a full sightseeing list. Strip it back — 8 Jan and the Oaxaca travel days are movement, not museums.' })
  }
  return out
}

export function lookup(list, id) {
  return list.find((x) => x.id === id) || null
}

export { trip }
