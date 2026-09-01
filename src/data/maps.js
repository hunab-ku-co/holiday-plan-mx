// Trip corridor, neighborhood bboxes, and pin coordinates. Facts only —
// day / holiday labels are computed from the live `days` array in Maps.jsx.
// Existing pins: Nominatim, 31 Aug 2026. New pins: Nominatim, 1 Sep 2026.
// Do not invent further coordinates.
//
// Nominatim 1 Sep 2026 — skipped (empty, wrong address, or junk):
//   Au Pied de Cochon, Campos Elíseos 218 — restaurant hit was Andrés Bello 29
//     (JW Marriott), not InterContinental Campos Elíseos 218. Not used.
//   El Cardenal, Palma 23, Centro Histórico — empty.
//   Levadura de Olla, Oaxaca de Juárez — empty.
//   Asador Bacanora, 5 de Mayo 614, Jalatlaco — empty.
//   Martínez, Puebla 90, Roma Norte — empty.
//   Zona Arqueológica de Monte Albán / Monte Albán archaeological site — empty.
//     Hamlet Monte Albán, Santa María Atzompa (17.051667, -96.781944) skipped.
//     Clean attraction hit used: Monte Albán, Santa Cruz Xoxocotlán.

export const PINS = {
  plazaRio: {
    lat: 19.4205545,
    lon: -99.1603967,
    name: 'Plaza Río de Janeiro',
  },
  // Colima × Orizaba, south edge of the plaza — same block as Plaza Río.
  briefingCentroid: {
    lat: 19.42015,
    lon: -99.1601,
    name: 'Roma Norte stay centroid',
  },
  anthropology: {
    lat: 19.4261524,
    lon: -99.1866516,
    name: 'Museo Nacional de Antropología',
  },
  jardinCentenario: {
    lat: 19.3492611,
    lon: -99.1636691,
    name: 'Plaza Jardín Centenario',
  },
  casaAzul: {
    lat: 19.3551412,
    lon: -99.1623564,
    name: 'Frida Kahlo Museum (Casa Azul)',
  },
  temploMayor: {
    lat: 19.4350622,
    lon: -99.1314324,
    name: 'Templo Mayor',
  },
  santoDomingo: {
    lat: 17.0656246,
    lon: -96.7230004,
    name: 'Templo de Santo Domingo',
  },
  // Optional unlabeled speck only — never the 11-restaurant list.
  // Eat pin uses these coords; do not re-geocode.
  rosetta: {
    lat: 19.41977,
    lon: -99.15977,
    name: 'Rosetta Colima 166',
  },
  // Nominatim, 1 Sep 2026. q=Zócalo de Puebla, Puebla, Mexico
  // → Plaza de la Constitución, Centro Histórico de Puebla.
  pueblaZocalo: {
    lat: 19.0436856,
    lon: -98.1981095,
    name: 'Zócalo de Puebla',
  },
  // Nominatim, 1 Sep 2026. q=Zona Arqueológica de Cholula, Puebla, Mexico
  cholula: {
    lat: 19.0574295,
    lon: -98.3025011,
    name: 'Zona Arqueológica de Cholula',
  },

  // --- visits, Nominatim 1 Sep 2026 ---
  // q=Castillo de Chapultepec, Mexico City, Mexico
  // → Museo Nacional de Historia Castillo de Chapultepec (museum).
  castillo: {
    lat: 19.4204632,
    lon: -99.1820866,
    name: 'Castillo de Chapultepec',
  },
  // q=Palacio de Bellas Artes, Mexico City, Mexico
  bellas: {
    lat: 19.4355009,
    lon: -99.1412585,
    name: 'Palacio de Bellas Artes',
  },
  // q=Museo Anahuacalli, Calle Museo 150, Mexico City, Mexico
  // → Museo Diego Rivera Anahuacalli, San Pablo Tepetlapa.
  anahuacalli: {
    lat: 19.3225793,
    lon: -99.144077,
    name: 'Museo Anahuacalli',
  },
  // q=Museo Soumaya, Mexico City, Mexico
  // → Museo Soumaya, Plaza Carso / Nuevo Polanco.
  soumaya: {
    lat: 19.440782,
    lon: -99.2045659,
    name: 'Museo Soumaya',
  },
  // q=Biblioteca Palafoxiana, Puebla, Mexico
  palafoxiana: {
    lat: 19.0421498,
    lon: -98.1988894,
    name: 'Biblioteca Palafoxiana',
  },
  // q=Nuestra Señora de los Remedios, Cholula, Puebla, Mexico
  // Church on the pyramid, ~110 m from Zona Arqueológica de Cholula
  // (19.0574295, -98.3025011) — distinct place of worship, not the INAH zone.
  remedios: {
    lat: 19.0580939,
    lon: -98.301719,
    name: 'Santuario de los Remedios',
  },
  // q=Monte Albán, Santa Cruz Xoxocotlán, Oaxaca (attraction).
  // Site queries "Zona Arqueológica de Monte Albán" / "archaeological site" empty.
  monteAlban: {
    lat: 17.043341,
    lon: -96.7682878,
    name: 'Monte Albán',
  },
  // q=Zona Arqueológica de Mitla, Oaxaca, Mexico
  mitla: {
    lat: 16.9272875,
    lon: -96.3596037,
    name: 'Zona arqueológica de Mitla',
  },
  // q=Árbol del Tule, Santa María del Tule, Oaxaca, Mexico
  // Tree node (not the bus stop of the same name).
  tule: {
    lat: 17.0464679,
    lon: -96.6361632,
    name: 'Árbol del Tule',
  },
  // q=San Bartolo Coyotepec, Oaxaca, Mexico — town centroid.
  coyotepec: {
    lat: 16.9575983,
    lon: -96.7066199,
    name: 'San Bartolo Coyotepec',
  },
  // q=San Martín Tilcajete, Oaxaca, Mexico — administrative/village centroid.
  tilcajete: {
    lat: 16.8802012,
    lon: -96.691099,
    name: 'San Martín Tilcajete',
  },
  // q=Hierve el Agua, Oaxaca, Mexico — viewpoint (not the parking lot).
  hierve: {
    lat: 16.8656329,
    lon: -96.2759697,
    name: 'Hierve el Agua',
  },

  // --- eat, Nominatim 1 Sep 2026 (Rosetta coords pre-existing) ---
  // q=Los Danzantes, Coyoacán, Ciudad de México
  // → Los Danzantes, 12 Andador Jardín del Centenario.
  danzantesCoyo: {
    lat: 19.3488715,
    lon: -99.1636866,
    name: 'Los Danzantes Coyoacán',
  },
  // q=Comedor Jacinta, Virgilio 40, Polanco, Mexico City, Mexico
  jacinta: {
    lat: 19.4305201,
    lon: -99.1962677,
    name: 'Comedor Jacinta',
  },
  // q=Quintonil, Newton 55, Polanco, Mexico City, Mexico
  quintonil: {
    lat: 19.4308184,
    lon: -99.1918345,
    name: 'Quintonil',
  },
  // q=Restaurante Casa Oaxaca, Constitución, Oaxaca de Juárez
  // → Casa Oaxaca, Constitución 104-A (restaurant, not the hotel).
  casaOax: {
    lat: 17.0653023,
    lon: -96.7223764,
    name: 'Casa Oaxaca',
  },
  // q=Criollo, Oaxaca de Juárez, Mexico
  criollo: {
    lat: 17.0643404,
    lon: -96.7338818,
    name: 'Criollo',
  },
  // q=Los Danzantes, Macedonio Alcalá, Oaxaca de Juárez, Mexico
  // → Los Danzantes, 403-4 Calle de Macedonio Alcalá.
  danzantesOax: {
    lat: 17.0650892,
    lon: -96.7240474,
    name: 'Los Danzantes Oaxaca',
  },
  // q=Bar Mauro, Tabasco 149, Roma Norte, Mexico City, Mexico
  // ~65 m from Rosetta (Tabasco vs Colima) — not collapsed.
  mauro: {
    lat: 19.4193667,
    lon: -99.159323,
    name: 'Bar Mauro',
  },
}

/** west, south, east, north in WGS84. */
export const AREAS = {
  // Trip corridor from stored pins + modest padding (~0.20° lon / ~0.15° lat).
  // West: CDMX / Soumaya. East: Hierve / Mitla. South: Hierve / Tilcajete.
  // North: CDMX. Monte Albán sits west of Oaxaca Centro, still inside.
  // Pan clamp only — not the whole country, not a Roma block.
  trip: {
    id: 'trip',
    title: 'CDMX → Puebla → Oaxaca',
    zoom: 7,
    minZ: 7,
    maxZ: 18,
    west: -99.39,
    south: 16.72,
    east: -96.08,
    north: 19.59,
  },
  roma: {
    id: 'roma',
    title: 'Roma Norte',
    zoom: 16,
    west: -99.1642,
    south: 19.4168,
    east: -99.1566,
    north: 19.4233,
  },
  chapultepec: {
    id: 'chapultepec',
    title: 'Chapultepec',
    zoom: 16,
    west: -99.1902,
    south: 19.4234,
    east: -99.183,
    north: 19.4289,
  },
  coyoacan: {
    id: 'coyoacan',
    title: 'Coyoacán',
    zoom: 16,
    west: -99.1668,
    south: 19.3472,
    east: -99.1592,
    north: 19.3572,
  },
  centro: {
    id: 'centro',
    title: 'Centro Histórico',
    zoom: 16,
    west: -99.1349,
    south: 19.4324,
    east: -99.1278,
    north: 19.4377,
  },
  oaxaca: {
    id: 'oaxaca',
    title: 'Oaxaca Centro',
    zoom: 16,
    west: -96.7268,
    south: 17.0618,
    east: -96.7192,
    north: 17.069,
  },
}
