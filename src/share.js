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

export function encodePlan(state) {
  const compact = {
    v: 1,
    s: state.scenario,
    o: state.order,
    p: state.includePuebla ? 1 : 0,
    n: state.notes,
    t: state.status,
    k: state.picks,
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
  }
}
