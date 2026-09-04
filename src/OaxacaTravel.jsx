const FACTS = [
  {
    label: 'Three legs',
    body: 'This order is CDMX → Puebla 27 Dec, Puebla → Oaxaca 30 Dec, Oaxaca → TAPO 6 Jan. Buses, not internal flights. Times only, not tickets.',
  },
  {
    label: 'CDMX → Puebla · 27 Dec',
    body: 'Estrella Roja TAPO / Cholula is the existing fact, ~2–2.5 h. Fare not retrieved — will not guess. Book Estrella Roja / ado.com.mx. Sunday arrive; settle Centro. Cholula Mon+Tue closed — Wed 30 morning before the Oaxaca bus is the clean window, or skip.',
  },
  {
    label: 'Puebla → Oaxaca · 30 Dec',
    body: 'Not TAPO–Oaxaca. CAPU → Oaxaca is real (~4.5–5.5 h). Optional Cholula morning (Wed open; tunnels still closed), then the bus. Travel day belongs to Oaxaca. NYE dinner is 31 Dec, not tonight. Do not invent clocks. Fare not retrieved.',
  },
  {
    label: 'Oaxaca → TAPO · 6 Jan',
    body: 'ADO Oaxaca → ADO TAPO first-class, 6–7 h typical. Fastest current-week sample 5 h; other samples 6 h–7 h 35 m (Busbud / Wanderu, off-peak). Station is close to Centro (~10 min taxi / ~20 min walk). Overnight vs day still open. Travel day belongs to CDMX (mild check-in + evening).',
  },
  {
    label: 'Money (two adults, tickets only)',
    body: 'Christmas 2026 ADO / Clickbus / Estrella Roja fares were not retrieved — will not guess. Off-peak Platino ~MXN 1,530 · €78 (Wanderu current-week average, 31 Aug 2026) is a TAPO sample only, not a 27 Dec, 30 Dec, or 6 Jan quote.',
  },
  {
    label: 'Stations',
    body: 'TAPO (east, Metro San Lázaro) for the CDMX legs. Ignore Norte and Taxqueña/Sur from Roma Norte. CAPU is the Puebla station on the Oaxaca leg. ADO first-class Oaxaca station is close to Centro (~10 min taxi or ~20 min walk).',
  },
  {
    label: 'Baggage',
    body: 'ADO published policy: 25 kg checked free + one carry-on free.',
  },
  {
    label: 'Overnight vs day',
    body: '30 Dec outbound is a travel day (optional Cholula morning, then CAPU → Oaxaca). NYE is the next evening in Oaxaca — overnight on this leg is not the plan. Overnight vs day still open on 6 Jan. The 27 Dec Puebla hop is a short daylight ride.',
  },
  {
    label: 'Christmas-week sold-out risk',
    body: 'ADO flags Christmas as high season; Platino / GL sell first. Book now, not 23 Dec.',
  },
]

const SKETCHES = [
  {
    when: 'Outbound · Sun 27 Dec',
    title: 'Estrella Roja TAPO → Cholula / Puebla',
    body: '~2–2.5 h. Travel day belongs to Puebla. Settle Centro after the bus. Cholula Mon+Tue closed; prefer Wed 30 morning before departure, or skip. Times only, not tickets. Fare not retrieved. Book Estrella Roja / ado.com.mx.',
  },
  {
    when: 'Outbound · Wed 30 Dec',
    title: 'Puebla → Oaxaca (not TAPO)',
    body: 'Optional Cholula morning (Wed open; tunnels still closed), then CAPU → Oaxaca (~4.5–5.5 h). Travel day belongs to Oaxaca. NYE rooftop is tomorrow — not tonight. Do not invent clocks or fares. Confirm times on ado.com.mx. Times only, not tickets.',
  },
  {
    when: 'Return · Wed 6 Jan · typical coach times',
    title: 'Day or overnight ADO Oaxaca → TAPO',
    body: 'ADO Oaxaca first-class station is close to Centro (~10 min taxi / ~20 min walk), then 6–7 h to TAPO, then onward to Polanco. Mild arrival-back day — not museums. Overnight vs day still open. Confirm times on ado.com.mx. Christmas fare not retrieved. Times only, not tickets.',
  },
]

const SPLIT = [
  {
    n: '1',
    title: 'Three buses as locked',
    body: 'CDMX → Puebla 27 Dec (Estrella Roja TAPO / Cholula ~2–2.5 h), Puebla → Oaxaca 30 Dec (CAPU ~4.5–5.5 h; optional Cholula morning), Oaxaca → TAPO 6 Jan (6–7 h). Overnight vs day still open on 6 Jan. Book now; fare not retrieved.',
  },
  {
    n: '2',
    title: 'Overnight vs day on the long legs',
    body: '30 Dec Puebla → Oaxaca is a travel day so there is a full NYE evening on 31 Dec — overnight on the 30th leg is not the plan. Overnight vs day still open for 6 Jan Oaxaca → TAPO. A day coach sits through lunch and does not save a hotel night. Confirm times on ado.com.mx. Fare not retrieved.',
  },
  {
    n: '3',
    title: 'Do not go back to TAPO for the Oaxaca outbound',
    body: 'Leave Puebla Wednesday 30 Dec from CAPU (after optional Cholula morning). Do not add an invented Puebla hotel listing here — shortlist is not on the Stays tab yet.',
  },
]

export default function OaxacaTravel() {
  return (
    <section className="panel oax-panel" aria-label="Bus legs">
      <h2>Buses · CDMX → Puebla → Oaxaca → CDMX</h2>
      <p className="hint">
        Locked 31 Aug 2026, reframed for this order. Two adults. Outbound is CDMX → Puebla 27 Dec then Puebla → Oaxaca
        30 Dec; return Oaxaca → TAPO 6 Jan. Overnight vs day still open on 6 Jan. Times only, not
        tickets. Book on{' '}
        <a href="https://www.ado.com.mx/" target="_blank" rel="noreferrer">
          ado.com.mx
        </a>
        {' '}
        / Estrella Roja for the Puebla leg.
      </p>

      <p className="fare-note">
        Christmas 2026 ADO / Clickbus / Estrella Roja fares were not retrieved — will not guess. Off-peak Platino ~MXN
        1,530 · €78 is a current-week Wanderu TAPO sample only (31 Aug 2026), not a dated fare. Platino / GL sell first
        at Christmas — book now, not 23 Dec.
      </p>

      <div className="compare compare-bus" role="table" aria-label="Bus facts for this order">
        <div className="compare-head" role="row">
          <span role="columnheader"> </span>
          <span role="columnheader">Three bus legs</span>
        </div>
        {FACTS.map((row) => (
          <div className="compare-row" role="row" key={row.label}>
            <strong role="rowheader">{row.label}</strong>
            <p role="cell">{row.body}</p>
          </div>
        ))}
      </div>

      <h3 className="subhead">Timed sketches · typical clocks, not tickets</h3>
      <div className="sketches">
        {SKETCHES.map((s) => (
          <article key={s.title} className="sketch">
            <span className="sketch-when">{s.when}</span>
            <h4>{s.title}</h4>
            <p>{s.body}</p>
          </article>
        ))}
      </div>

      <h3 className="subhead">A bus plan, not a sermon</h3>
      <ol className="split">
        {SPLIT.map((s) => (
          <li key={s.n} className="brief">
            <h3>
              {s.n}. {s.title}
            </h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>

      <article className="brief">
        <h3>Skip</h3>
        <p>
          Internal flights. AU / Santa Rosa. Going back to TAPO for a TAPO–Oaxaca outbound (leave Puebla from CAPU on
          30 Dec). Daytime TAPO both ways is the retired CDMX–Oaxaca sketch. Fares are still not guessed.
        </p>
      </article>

      <p className="hint">
        Book on{' '}
        <a href="https://www.ado.com.mx/" target="_blank" rel="noreferrer">
          ado.com.mx
        </a>
        . Estrella Roja for the 27 Dec Puebla leg. Times only, not tickets.
      </p>
    </section>
  )
}
