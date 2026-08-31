import { useMemo, useRef, useState } from 'react'
import { AREAS, PINS } from './data/maps.js'

const XMAS = '2026-12-25'
const NYE = '2026-12-31'
const NYD = '2027-01-01'
const CASA_CLOSED = new Set([XMAS, NYD])
const SUBS = ['a', 'b', 'c', 'd']

function lonToX(lon, z) {
  return ((lon + 180) / 360) * 2 ** z
}

function latToY(lat, z) {
  const s = Math.sin((lat * Math.PI) / 180)
  return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * 2 ** z
}

function numOf(days, d) {
  if (!d) return null
  const i = days.findIndex((x) => x === d || x.date === d.date)
  return i >= 0 ? i + 1 : null
}

export function formatDayChip(nums) {
  const sorted = [...new Set(nums.filter((n) => Number.isFinite(n)))].sort((a, b) => a - b)
  if (!sorted.length) return ''
  const parts = []
  let a = sorted[0]
  let b = a
  for (let i = 1; i <= sorted.length; i++) {
    if (i < sorted.length && sorted[i] === b + 1) {
      b = sorted[i]
      continue
    }
    parts.push(a === b ? `${a}` : `${a}–${b}`)
    if (i < sorted.length) a = b = sorted[i]
  }
  const body = parts.join(', ')
  const multi = sorted.length > 1 || body.includes('–')
  return multi ? `Days ${body}` : `Day ${body}`
}

function isAnthro(d) {
  if (!d || d.theme !== 'cdmx-museums') return false
  return /chapultepec|anthropolog/i.test(`${d.place} ${d.title}`)
}

function isCentro(d) {
  if (!d || d.theme !== 'cdmx-museums') return false
  return /centro|templo mayor/i.test(`${d.place} ${d.title}`)
}

export function mapsFromDays(days) {
  const list = Array.isArray(days) ? days : []
  const byDate = Object.fromEntries(list.map((d) => [d.date, d]))
  const firstOax = list.findIndex((d) => d.city === 'OAX')
  const romaDays = list.filter((d, i) => {
    if (d.city !== 'CDMX') return false
    if (d.theme === 'depart') return false
    if (firstOax >= 0 && i >= firstOax) return false
    return true
  })
  const xmas = byDate[XMAS]
  const nye = byDate[NYE]
  const nyd = byDate[NYD]
  const xmasDay = list.find((d) => d.theme === 'cdmx-xmas')
  const anthro = list.find(isAnthro)
  const centro = list.find(isCentro)
  const frida = list.find((d) => d.theme === 'frida')
  const oaxDays = list.filter((d) => d.city === 'OAX')
  const out = []

  if (romaDays.length) {
    const holidays = []
    if (xmas?.city === 'CDMX') holidays.push({ text: 'Christmas Day', tone: 'xmas' })
    out.push({
      id: 'roma',
      title: AREAS.roma.title,
      accent: 'roma',
      area: AREAS.roma,
      pins: [
        {
          id: 'home',
          lat: PINS.plazaRio.lat,
          lon: PINS.plazaRio.lon,
          place: 'HOME',
          chip: formatDayChip(romaDays.map((d) => numOf(list, d))),
          holidays,
        },
      ],
    })
  }

  if (anthro) {
    out.push({
      id: 'chapultepec',
      title: AREAS.chapultepec.title,
      accent: 'chap',
      area: AREAS.chapultepec,
      pins: [
        {
          id: 'anthro',
          lat: PINS.anthropology.lat,
          lon: PINS.anthropology.lon,
          place: 'Anthropology',
          chip: formatDayChip([numOf(list, anthro)]),
          holidays: [],
        },
      ],
    })
  }

  const coyoPins = []
  if (xmasDay) {
    const holidays = xmasDay.date === XMAS ? [{ text: 'Christmas Day', tone: 'xmas' }] : []
    coyoPins.push({
      id: 'jardin',
      lat: PINS.jardinCentenario.lat,
      lon: PINS.jardinCentenario.lon,
      place: 'Jardín Centenario',
      chip: formatDayChip([numOf(list, xmasDay)]),
      holidays,
    })
  }
  if (frida && !CASA_CLOSED.has(frida.date)) {
    const n = numOf(list, frida)
    coyoPins.push({
      id: 'casa-azul',
      lat: PINS.casaAzul.lat,
      lon: PINS.casaAzul.lon,
      place: 'Casa Azul',
      chip: n ? `Day ${n} · Frida` : 'Frida',
      holidays: [],
    })
  }
  if (coyoPins.length) {
    out.push({
      id: 'coyoacan',
      title: AREAS.coyoacan.title,
      accent: 'coyo',
      area: AREAS.coyoacan,
      pins: coyoPins,
    })
  }

  if (centro) {
    out.push({
      id: 'centro',
      title: AREAS.centro.title,
      accent: 'centro',
      area: AREAS.centro,
      pins: [
        {
          id: 'templo',
          lat: PINS.temploMayor.lat,
          lon: PINS.temploMayor.lon,
          place: 'Templo Mayor',
          chip: formatDayChip([numOf(list, centro)]),
          holidays: [],
        },
      ],
    })
  }

  if (oaxDays.length) {
    const holidays = []
    if (xmas?.city === 'OAX') holidays.push({ text: 'Christmas Day', tone: 'xmas' })
    if (nye?.city === 'OAX') holidays.push({ text: 'New Year’s Eve', tone: 'nye' })
    if (nyd?.city === 'OAX') holidays.push({ text: 'New Year’s Day', tone: 'nyd' })
    out.push({
      id: 'oaxaca',
      title: AREAS.oaxaca.title,
      accent: 'oax',
      area: AREAS.oaxaca,
      pins: [
        {
          id: 'santo',
          lat: PINS.santoDomingo.lat,
          lon: PINS.santoDomingo.lon,
          place: 'Santo Domingo',
          chip: formatDayChip(oaxDays.map((d) => numOf(list, d))),
          holidays,
        },
      ],
    })
  }

  return out
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

function AreaMap({ area, pins }) {
  const { west, south, east, north, zoom } = area
  const stageRef = useRef(null)
  const drag = useRef(null)
  const [pan, setPan] = useState({ x: 0, y: 0 })

  const model = useMemo(() => {
    const vx0 = lonToX(west, zoom)
    const vx1 = lonToX(east, zoom)
    const vy0 = latToY(north, zoom)
    const vy1 = latToY(south, zoom)
    const vw = vx1 - vx0
    const vh = vy1 - vy0
    // One extra tile around the pocket so a light pan stays at this zoom.
    const tx0 = Math.floor(vx0) - 1
    const tx1 = Math.ceil(vx1)
    const ty0 = Math.floor(vy0) - 1
    const ty1 = Math.ceil(vy1)
    const tiles = []
    for (let ty = ty0; ty <= ty1; ty++) {
      for (let tx = tx0; tx <= tx1; tx++) {
        if (tx < 0 || ty < 0) continue
        const sub = SUBS[(tx + ty) & 3]
        tiles.push({
          key: `${zoom}/${tx}/${ty}`,
          src: `https://${sub}.basemaps.cartocdn.com/rastertiles/voyager/${zoom}/${tx}/${ty}@2x.png`,
          left: ((tx - vx0) / vw) * 100,
          top: ((ty - vy0) / vh) * 100,
          width: (1 / vw) * 100,
          height: (1 / vh) * 100,
        })
      }
    }
    const maxX = Math.max(0, (vx0 - tx0) / vw)
    const maxY = Math.max(0, (vy0 - ty0) / vh)
    const minX = Math.min(0, (vx1 - (tx1 + 1)) / vw)
    const minY = Math.min(0, (vy1 - (ty1 + 1)) / vh)
    const laidPins = (pins || []).map((p) => {
      const x = ((lonToX(p.lon, zoom) - vx0) / vw) * 100
      const y = ((latToY(p.lat, zoom) - vy0) / vh) * 100
      const ax = x > 62 ? 'w' : x < 38 ? 'e' : 'c'
      const ay = y < 34 ? 's' : 'n'
      return { ...p, x, y, anchor: `${ay}${ax}` }
    })
    return {
      aspect: `${vw} / ${vh}`,
      tiles,
      pins: laidPins,
      panMin: { x: minX, y: minY },
      panMax: { x: maxX, y: maxY },
    }
  }, [west, south, east, north, zoom, pins])

  function onPointerDown(e) {
    if (e.button != null && e.button !== 0) return
    const el = stageRef.current
    if (!el) return
    el.setPointerCapture(e.pointerId)
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      px: pan.x,
      py: pan.y,
      w: el.clientWidth,
      h: el.clientHeight,
    }
  }

  function onPointerMove(e) {
    if (!drag.current) return
    const dx = (e.clientX - drag.current.x) / drag.current.w
    const dy = (e.clientY - drag.current.y) / drag.current.h
    setPan({
      x: clamp(drag.current.px + dx, model.panMin.x, model.panMax.x),
      y: clamp(drag.current.py + dy, model.panMin.y, model.panMax.y),
    })
  }

  function onPointerUp() {
    drag.current = null
  }

  return (
    <div className="area-map" style={{ aspectRatio: model.aspect }}>
      <div
        ref={stageRef}
        className="area-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="area-world"
          style={{ transform: `translate(${pan.x * 100}%, ${pan.y * 100}%)` }}
        >
          {model.tiles.map((t) => (
            <img
              key={t.key}
              className="area-tile"
              alt=""
              draggable="false"
              loading="lazy"
              src={t.src}
              style={{
                left: `${t.left}%`,
                top: `${t.top}%`,
                width: `${t.width}%`,
                height: `${t.height}%`,
              }}
            />
          ))}
          {model.pins.map((p) => (
            <div
              key={p.id}
              className={`map-pin anchor-${p.anchor}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className={`map-dot${p.holidays?.length ? ' hol' : ''}`} />
              <div className="map-flag">
                {p.holidays?.map((h) => (
                  <span key={h.text} className={`map-hol ${h.tone}`}>
                    {h.text}
                  </span>
                ))}
                {p.chip ? <span className="map-chip">{p.chip}</span> : null}
                {p.place ? <span className="map-place">{p.place}</span> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="map-attrib">
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
          © OpenStreetMap
        </a>
        {' · '}
        <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">
          © CARTO
        </a>
      </p>
    </div>
  )
}

export default function Maps({ days }) {
  const maps = useMemo(() => mapsFromDays(days), [days])
  if (!maps.length) return null
  return (
    <section className="maps" aria-label="Neighborhood maps">
      <h2>Where, not everywhere</h2>
      <p className="hint">
        Cropped to the blocks you actually use. Pins follow the timeline of the active scenario (A / B / C). Christmas
        Day / New Year’s Day mark where S &amp; V are those days, not every restaurant.
      </p>
      <div className="maps-grid">
        {maps.map((m) => (
          <figure key={m.id} className={`map-card ${m.accent}`}>
            <figcaption>
              <h3>{m.title}</h3>
            </figcaption>
            <AreaMap area={m.area} pins={m.pins} />
          </figure>
        ))}
      </div>
    </section>
  )
}
