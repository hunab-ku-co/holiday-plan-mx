import { AIRBNB_SEARCH, BOOKING_SEARCH, stays } from './data/stays.js'

const CLUSTER = [
  { name: 'Rosetta', addr: 'Colima 166', walk: '1 min' },
  { name: 'Bar Mauro', addr: 'Tabasco 149', walk: '2 min' },
  { name: 'La 89', addr: 'Colima 134', walk: '3 min' },
  { name: 'Campobaja', addr: 'Colima 124-E', walk: '3 min' },
  { name: 'Despacho Margarita', addr: 'Córdoba 115', walk: 'about 5 min' },
  { name: 'Martínez', addr: 'Puebla 90', walk: '7 min' },
]

function StayCard({ stay }) {
  return (
    <article className="stay-card">
      <header>
        <h3>{stay.title}</h3>
        <p className="stay-area">{stay.area}</p>
      </header>
      <p className="stay-walk">{stay.walkToColima}</p>
      <dl className="stay-meta">
        {(stay.rating != null || stay.reviewCount != null) && (
          <>
            <dt>Reviews</dt>
            <dd>
              {stay.rating != null ? `${stay.rating}` : '—'}
              {stay.reviewCount != null ? ` · ${stay.reviewCount} reviews` : ''}
            </dd>
          </>
        )}
        <dt>Those dates</dt>
        <dd>{stay.price || 'Price not verified — will not guess.'}</dd>
        <dt>Check-in</dt>
        <dd>{stay.checkInNote || 'Check-in unknown'}</dd>
      </dl>
      <p className="stay-why">{stay.why}</p>
      {stay.url && (
        <a className="stay-link" href={stay.url} target="_blank" rel="noreferrer">
          {stay.linkLabel || 'Booking.com listing'}
        </a>
      )}
    </article>
  )
}

export default function Stays() {
  return (
    <section className="panel stays-panel" aria-label="Stays">
      <h2>Roma Norte · 24–26 Dec</h2>
      <p className="hint">
        Two adults, two nights (24–26 Dec). S lands AICM around midnight 24 Dec (possibly just after midnight on the
        25th). They may skip the airport hotel and go straight to Roma Norte. Late check-in from 24 Dec night is a must.
      </p>

      <article className="brief">
        <h3>Where to sleep</h3>
        <p>
          Sleep Roma Norte on the Colima / Plaza Río de Janeiro blocks. Centroid: Colima × Orizaba, south edge of the
          plaza. Target rectangle: Puebla (N) – Álvaro Obregón (S) – Córdoba or a little west (W) – Jalapa (E).
        </p>
        <p>
          Six kitchens in a 1–7 min walk from that centroid (OSM foot, 31 Aug 2026). That cluster is the stay magnet.
          Condesa is the only backup. Pujol (Tennyson 133, Polanco) is an Uber, not a reason to sleep in Polanco. Comal
          Oculto is lunch in San Miguel Chapultepec — daytime, not a home base.
        </p>
        <ul className="cluster">
          {CLUSTER.map((r) => (
            <li key={r.name}>
              <strong>{r.name}</strong>
              <span>
                {r.addr} · {r.walk}
              </span>
            </li>
          ))}
        </ul>
        <p>
          Prefer 2nd–4th floor, interior or quiet-side rooms. Avoid pins billed as Roma Norte that sit east toward
          Cuauhtémoc / Doctores, or south of Álvaro Obregón.
        </p>
      </article>

      <article className="brief">
        <h3>Midnight AICM → Roma</h3>
        <p>
          If they skip the airport hotel: Uber or DiDi from the designated bay, not the arrivals curb, and not a street
          hail. Metro will be closed. Have the Spanish address pasted before wheels-down. Kitchen / snacks matter —
          24 Dec restaurants will be thin (Nochebuena). Oxxo is the realistic arrival snack.
        </p>
        <p className="hint">Christmas 2026 venue hours were not published as of 31 Aug 2026. Do not treat regular weekly hours as 24–25 Dec confirmation.</p>
      </article>

      <article className="brief grade">
        <h3>How listings are ranked</h3>
        <ol>
          <li>Reviews</li>
          <li>Area safety (lit interior Roma / Condesa blocks)</li>
          <li>Closeness to the Colima cluster</li>
        </ol>
        <p className="hint">Late check-in from 24 Dec night is a must, not a scored nicety. A 24h desk is the insurance — not a lockbox. Fail a usable midnight arrival and the listing is out.</p>
      </article>

      <div className="listings">
        <h3>Listings</h3>
        <p className="hint">
          Band is more than €50 and less than €200 per night. Two adults, 1 room, 24–26 Dec 2026 (2 nights). The
          Booking quotes on the cards were pulled for 24–28 Dec (4 nights); per-night band still applies — do not invent
          2-night totals. Airbnb.com was unreachable (503) from this environment on 31 Aug 2026. Booking.com search was
          blocked this pass (bot / JS wall) — no new properties added; only previously verified cards, filtered to the
          band. Ranked by reviews, then interior Roma safety, then walk to Colima. 15:00–24:00 windows are tight if S
          lands 00:07 on 25 Dec — 24h desk is the insurance; message the property. Walk times are street estimates, not
          OSM. Dropped (not shown as cards): Casa Oliva, Colima 71, Xoma, Caliza, ONTO — over €200 per night. Tanat Art
          Apartments check-in only 15:00–18:00 — fails midnight arrival. Kukun Tonala 121 check-in ends 23:00 —
          borderline. Prices in MXN and euros, converted from Booking.com USD at Xe mid-market 1 USD = MXN 17.02 ·
          €0.8625 (31 Aug 2026).
        </p>
        <p className="hint">
          <a className="stay-link" href={BOOKING_SEARCH} target="_blank" rel="noreferrer">
            Booking.com search
          </a>
          {' · '}
          <a className="stay-link" href={AIRBNB_SEARCH} target="_blank" rel="noreferrer">
            Airbnb search
          </a>
          {' '}(secondary)
        </p>
        <div className="stay-grid">
          {stays.map((s) => (
            <StayCard key={s.id} stay={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
