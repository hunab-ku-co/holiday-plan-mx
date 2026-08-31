import { useEffect, useMemo, useRef, useState } from 'react'
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

function xToLon(x, z) {
  return (x / 2 ** z) * 360 - 180
}

function yToLat(y, z) {
  const n = Math.PI - (2 * Math.PI * y) / 2 ** z
  return (180 / Math.PI) * Math.atan(Math.sinh(n))
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
  const { west, south, east, north, zoom: z0 } = area
  const minZ = z0 - 1
  const maxZ = 18
  const stageRef = useRef(null)
  const drag = useRef(null)
  const pts = useRef(new Map())
  const pinch = useRef(null)
  const lastTap = useRef(null)
  const lastWheel = useRef(0)
  const viewRef = useRef(null)
  const zoomAtRef = useRef(() => {})

  const [view, setView] = useState(() => {
    const cx = (west + east) / 2
    const midY = (latToY(north, z0) + latToY(south, z0)) / 2
    return { z: z0, cx, cy: yToLat(midY, z0) }
  })
  viewRef.current = view

  const model = useMemo(() => {
    const { z, cx, cy } = view
    // Tile-span of the original bbox, scaled so one Carto zoom step is 2× geography.
    const spanX = (lonToX(east, z) - lonToX(west, z)) * 2 ** (z0 - z)
    const spanY = (latToY(south, z) - latToY(north, z)) * 2 ** (z0 - z)
    const ox = lonToX(cx, z) - spanX / 2
    const oy = latToY(cy, z) - spanY / 2
    const nTiles = 2 ** z
    const tx0 = Math.floor(ox) - 1
    const tx1 = Math.ceil(ox + spanX)
    const ty0 = Math.floor(oy) - 1
    const ty1 = Math.ceil(oy + spanY)
    const tiles = []
    for (let ty = ty0; ty <= ty1; ty++) {
      for (let tx = tx0; tx <= tx1; tx++) {
        if (tx < 0 || ty < 0 || tx >= nTiles || ty >= nTiles) continue
        const sub = SUBS[(tx + ty) & 3]
        tiles.push({
          key: `${z}/${tx}/${ty}`,
          src: `https://${sub}.basemaps.cartocdn.com/rastertiles/voyager/${z}/${tx}/${ty}@2x.png`,
          left: ((tx - ox) / spanX) * 100,
          top: ((ty - oy) / spanY) * 100,
          width: (1 / spanX) * 100,
          height: (1 / spanY) * 100,
        })
      }
    }
    const laidPins = (pins || []).map((p) => {
      const x = ((lonToX(p.lon, z) - ox) / spanX) * 100
      const y = ((latToY(p.lat, z) - oy) / spanY) * 100
      const ax = x > 62 ? 'w' : x < 38 ? 'e' : 'c'
      const ay = y < 34 ? 's' : 'n'
      return { ...p, x, y, anchor: `${ay}${ax}` }
    })
    return {
      aspect: `${spanX} / ${spanY}`,
      tiles,
      pins: laidPins,
    }
  }, [west, south, east, north, z0, view, pins])

  function clampView(z, cx, cy) {
    return {
      z: clamp(z, minZ, maxZ),
      cx: clamp(cx, west, east),
      cy: clamp(cy, south, north),
    }
  }

  function spans(z) {
    return {
      spanX: (lonToX(east, z) - lonToX(west, z)) * 2 ** (z0 - z),
      spanY: (latToY(south, z) - latToY(north, z)) * 2 ** (z0 - z),
    }
  }

  function zoomAt(nextZ, clientX, clientY) {
    const cur = viewRef.current
    nextZ = clamp(Math.round(nextZ), minZ, maxZ)
    if (nextZ === cur.z) return
    const el = stageRef.current
    let px = 0.5
    let py = 0.5
    if (el && clientX != null && clientY != null) {
      const r = el.getBoundingClientRect()
      const w = r.width || 1
      const h = r.height || 1
      px = clamp((clientX - r.left) / w, 0, 1)
      py = clamp((clientY - r.top) / h, 0, 1)
    }
    const { z, cx, cy } = cur
    const { spanX, spanY } = spans(z)
    const ox = lonToX(cx, z) - spanX / 2
    const oy = latToY(cy, z) - spanY / 2
    const focusLon = xToLon(ox + px * spanX, z)
    const focusLat = yToLat(oy + py * spanY, z)
    const { spanX: spanX2, spanY: spanY2 } = spans(nextZ)
    const ox2 = lonToX(focusLon, nextZ) - px * spanX2
    const oy2 = latToY(focusLat, nextZ) - py * spanY2
    setView(clampView(nextZ, xToLon(ox2 + spanX2 / 2, nextZ), yToLat(oy2 + spanY2 / 2, nextZ)))
  }
  zoomAtRef.current = zoomAt

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    function onWheel(e) {
      e.preventDefault()
      if (!e.deltaY) return
      const now = performance.now()
      if (now - lastWheel.current < 90) return
      lastWheel.current = now
      const dir = e.deltaY < 0 ? 1 : -1
      zoomAtRef.current(viewRef.current.z + dir, e.clientX, e.clientY)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  function onPointerDown(e) {
    if (e.button != null && e.button !== 0) return
    const el = stageRef.current
    if (!el) return
    el.setPointerCapture(e.pointerId)
    pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pts.current.size >= 2) {
      drag.current = null
      const [a, b] = [...pts.current.values()]
      pinch.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        z: viewRef.current.z,
        dirty: false,
      }
      return
    }
    pinch.current = null
    const cur = viewRef.current
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      cx: cur.cx,
      cy: cur.cy,
      z: cur.z,
      w: el.clientWidth,
      h: el.clientHeight,
      moved: false,
    }
  }

  function onPointerMove(e) {
    if (pts.current.has(e.pointerId)) {
      pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    }
    if (pinch.current && pts.current.size >= 2) {
      const [a, b] = [...pts.current.values()]
      const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1
      const ratio = dist / pinch.current.dist
      if (ratio >= 1.35 || ratio <= 1 / 1.35) {
        const dir = ratio >= 1.35 ? 1 : -1
        zoomAt(pinch.current.z + dir, (a.x + b.x) / 2, (a.y + b.y) / 2)
        pinch.current = {
          dist,
          z: clamp(pinch.current.z + dir, minZ, maxZ),
          dirty: true,
        }
      }
      return
    }
    if (!drag.current) return
    const dxPx = e.clientX - drag.current.x
    const dyPx = e.clientY - drag.current.y
    if (Math.hypot(dxPx, dyPx) > 8) drag.current.moved = true
    const z = drag.current.z
    const { spanX, spanY } = spans(z)
    const dx = dxPx / drag.current.w
    const dy = dyPx / drag.current.h
    const nx = xToLon(lonToX(drag.current.cx, z) - dx * spanX, z)
    const ny = yToLat(latToY(drag.current.cy, z) - dy * spanY, z)
    setView(clampView(z, nx, ny))
  }

  function onPointerUp(e) {
    pts.current.delete(e.pointerId)
    try {
      stageRef.current?.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
    if (pts.current.size < 2) {
      const wasPinch = pinch.current
      pinch.current = null
      if (wasPinch?.dirty) {
        drag.current = null
        lastTap.current = null
        return
      }
    }
    const d = drag.current
    if (pts.current.size === 0) drag.current = null
    if (!d || d.moved || pts.current.size > 0) return
    const now = performance.now()
    const prev = lastTap.current
    if (prev && now - prev.t < 400 && Math.hypot(e.clientX - prev.x, e.clientY - prev.y) < 28) {
      lastTap.current = null
      zoomAt(viewRef.current.z + 1, e.clientX, e.clientY)
      return
    }
    lastTap.current = { t: now, x: e.clientX, y: e.clientY }
  }

  function onDoubleClick(e) {
    e.preventDefault()
  }

  function stopPan(e) {
    e.stopPropagation()
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
        onDoubleClick={onDoubleClick}
      >
        <div className="area-world">
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
      <div className="map-zoom">
        <button
          type="button"
          aria-label="Zoom in"
          disabled={view.z >= maxZ}
          onPointerDown={stopPan}
          onClick={() => zoomAt(view.z + 1)}
        >
          +
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          disabled={view.z <= minZ}
          onPointerDown={stopPan}
          onClick={() => zoomAt(view.z - 1)}
        >
          −
        </button>
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
        Cropped to the blocks you use; zoom in for streets, not out to the whole city. Pins follow the timeline of the
        active scenario (A / B / C). Christmas Day / New Year’s Day mark where S &amp; V are those days, not every
        restaurant.
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
