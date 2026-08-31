// Neighborhood bboxes and pin coordinates. Facts only — day / holiday labels
// are computed from the live `days` array in Maps.jsx.
// Pins: Nominatim, 31 Aug 2026. Do not invent further coordinates.

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
  rosetta: {
    lat: 19.41977,
    lon: -99.15977,
    name: 'Rosetta Colima 166',
  },
}

/** west, south, east, north in WGS84. Zoom locked to the pocket. */
export const AREAS = {
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
