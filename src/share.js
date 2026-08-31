const PREFIX = 'mx1.'

function toB64url(bytes) {
  let bin = ''
  bytes.forEach((b) => {
    bin += String.fromCharCode(b)
  })
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromB64url(s) {
  const pad = s.length % 4 === 0 ? '' : '='.repeat(4 - (s.length % 4))
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + pad
  const bin = atob(b64)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

function compactComments(list) {
  if (!Array.isArray(list)) return []
  return list.slice(-80).map((c) => ({
    i: String(c.id || ''),
    w: c.who === 'S' ? 'S' : 'V',
    t: String(c.text || '').slice(0, 600),
    d: c.day || '',
    a: Number(c.at) || 0,
  }))
}

function expandComments(list) {
  if (!Array.isArray(list)) return []
  return list
    .map((c) => ({
      id: String(c.i || c.id || ''),
      who: c.w === 'S' || c.who === 'S' ? 'S' : 'V',
      text: String(c.t || c.text || '').slice(0, 600),
      day: c.d || c.day || null,
      at: Number(c.a || c.at) || 0,
    }))
    .filter((c) => c.text)
}

export function encodePlan(state) {
  const compact = {
    v: 1,
    s: state.scenario,
    o: state.order,
    p: state.includePuebla ? 1 : 0,
    n: state.notes,
    t: state.status,
    k: state.picks,
    f: compactComments(state.comments),
  }
  const json = JSON.stringify(compact)
  const bytes = new TextEncoder().encode(json)
  return PREFIX + toB64url(bytes)
}

export function decodePlan(hash) {
  if (!hash) return null
  let raw = hash.startsWith('#') ? hash.slice(1) : hash
  if (raw.startsWith(PREFIX)) raw = raw.slice(PREFIX.length)
  if (!raw) return null
  try {
    const json = new TextDecoder().decode(fromB64url(raw))
    const c = JSON.parse(json)
    if (!c || c.v !== 1) return null
    return {
      scenario: c.s || 'A',
      order: Array.isArray(c.o) ? c.o : null,
      includePuebla: Boolean(c.p),
      notes: c.n && typeof c.n === 'object' ? c.n : {},
      status: c.t && typeof c.t === 'object' ? c.t : {},
      picks: c.k && typeof c.k === 'object' ? c.k : {},
      comments: expandComments(c.f),
    }
  } catch {
    return null
  }
}

export function defaultState() {
  return {
    scenario: 'A',
    order: ['cdmx-xmas', 'cdmx-museums', 'oaxaca', 'frida'],
    includePuebla: false,
    notes: {},
    status: {},
    picks: {},
    comments: [],
  }
}
