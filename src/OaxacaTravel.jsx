const FACTS = [
  {
    label: 'Three legs',
    body: 'This order is CDMX → Puebla 28 Dec, Puebla → Oaxaca 31 Dec, Oaxaca → TAPO 5 Jan. Buses, not internal flights. Times only, not tickets.',
  },
  {
    label: 'CDMX → Puebla · 28 Dec',
    body: 'Estrella Roja TAPO / Cholula is the existing fact, ~2–2.5 h. Fare not retrieved — will not guess. Book Estrella Roja / ado.com.mx. Cholula INAH is closed Monday; Centro after the bus.',
  },
  {
    label: 'Puebla → Oaxaca · 31 Dec',
    body: 'Not TAPO–Oaxaca. CAPU → Oaxaca is real (~4.5–5.5 h). Morning bus so NYE dinner in Oaxaca that evening is possible. Travel morning + dinner is tight — do not invent clocks. Fare not retrieved.',
  },
  {
    label: 'Oaxaca → TAPO · 5 Jan',
    body: 'ADO Oaxaca → ADO TAPO first-class, 6–7 h typical. Fastest current-week sample 5 h; other samples 6 h–7 h 35 m (Busbud / Wanderu, off-peak). Station is close to Centro (~10 min taxi / ~20 min walk). Overnight vs day still open.',
  },
  {
    label: 'Money (two adults, tickets only)',
    body: 'Christmas 2026 ADO / Clickbus / Estrella Roja fares were not retrieved — will not guess. Off-peak Platino ~MXN 1,530 · €78 (Wanderu current-week average, 31 Aug 2026) is a TAPO sample only, not a 28 Dec, 31 Dec, or 5 Jan quote.',
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
    body: '31 Dec outbound is a morning bus because NYE dinner is that evening — overnight is not the plan. Overnight vs day still open on 5 Jan. The 28 Dec Puebla hop is a short daylight ride.',
  },
  {
    label: 'Christmas-week sold-out risk',
    body: 'ADO flags Christmas as high season; Platino / GL sell first. Book now, not 23 Dec.',
  },
]

const SKETCHES = [
  {
    when: 'Outbound · Mon 28 Dec',
    title: 'Estrella Roja TAPO → Cholula / Puebla',
    body: '~2–2.5 h. Travel day belongs to Puebla. Cholula INAH closed Monday — Centro after the bus. Times only, not tickets. Fare not retrieved. Book Estrella Roja / ado.com.mx.',
  },
  {
    when: 'Outbound · Thu 31 Dec',
    title: 'Puebla → Oaxaca (not TAPO)',
    body: 'CAPU → Oaxaca is real (~4.5–5.5 h). Morning bus. NYE dinner in Oaxaca that evening is tight — do not invent clocks or fares. Confirm times on ado.com.mx. Arrival is the rooftop proposal, not Levadura. Times only, not tickets.',
  },
  {
    when: 'Return · Tue 5 Jan · typical coach times',
    title: 'Day or overnight ADO Oaxaca → TAPO',
    body: 'ADO Oaxaca first-class station is close to Centro (~10 min taxi / ~20 min walk), then 6–7 h to TAPO, then onward in CDMX. Overnight vs day still open. Confirm times on ado.com.mx. Christmas fare not retrieved. Times only, not tickets.',
  },
]

const SPLIT = [
  {
    n: '1',
    title: 'Three buses as locked',
    body: 'CDMX → Puebla 28 Dec (Estrella Roja TAPO / Cholula ~2–2.5 h), Puebla → Oaxaca 31 Dec morning (CAPU ~4.5–5.5 h; tight with NYE dinner), Oaxaca → TAPO 5 Jan (6–7 h). Overnight vs day still open on 5 Jan. Book now; fare not retrieved.',
  },
  {
    n: '2',
    title: 'Overnight vs day on the long legs',
    body: '31 Dec Puebla → Oaxaca is a morning bus so there is an evening in Oaxaca — overnight is not the plan. Overnight vs day still open for 5 Jan Oaxaca → TAPO. A day coach sits through lunch and does not save a hotel night. Confirm times on ado.com.mx. Fare not retrieved.',
  },
  {
    n: '3',
    title: 'Do not go back to TAPO for the Oaxaca outbound',
    body: 'The old Cholula-27-then-TAPO-28 split is retired. Leave Puebla Thursday morning 31 Dec from CAPU. Do not add an invented Puebla hotel listing here — shortlist is not on the Stays tab yet.',
  },
]

export default function OaxacaTravel() {
  return (
    <section className="panel oax-panel" aria-label="Bus legs">
      <h2>Buses · CDMX → Puebla → Oaxaca → CDMX</h2>
      <p className="hint">
        Locked 31 Aug 2026, reframed for this order. Two adults. Outbound is CDMX → Puebla 28 Dec then Puebla → Oaxaca
        31 Dec morning; return Oaxaca → TAPO 5 Jan. Overnight vs day still open on 5 Jan. Times only, not
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
          31 Dec). Daytime TAPO both ways is the retired CDMX–Oaxaca sketch. Fares are still not guessed.
        </p>
      </article>

      <p className="hint">
        Book on{' '}
        <a href="https://www.ado.com.mx/" target="_blank" rel="noreferrer">
          ado.com.mx
        </a>
        . Estrella Roja for the 28 Dec Puebla leg. Times only, not tickets.
      </p>
    </section>
  )
}
