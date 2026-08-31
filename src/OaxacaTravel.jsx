const FACTS = [
  {
    label: 'Ride',
    body: 'Typically 6–7 h TAPO ↔ Oaxaca first-class. Fastest current-week sample 5 h; other samples 6 h–7 h 35 m (Busbud / Wanderu, off-peak).',
  },
  {
    label: 'Door-to-door from Roma Norte',
    body: 'Day bus ~7 h 30–9 h: Uber TAPO 25–40 min + 30 min station buffer + 6–7 h ride + ~10 min taxi. Overnight: leave after dinner, arrive ~05:00–07:00 — clock similar, waking day is not eaten.',
  },
  {
    label: 'Money (two adults, tickets only)',
    body: 'Christmas 2026 ADO / Clickbus fares were not retrieved — will not guess. Off-peak Platino ~MXN 1,530 · €78 (Wanderu current-week average, 31 Aug 2026) is a sample only, not a 27 Dec quote.',
  },
  {
    label: 'Stations',
    body: 'TAPO (east, Metro San Lázaro). Ignore Norte and Taxqueña/Sur from Roma Norte. ADO first-class Oaxaca station is close to Centro (~10 min taxi or ~20 min walk).',
  },
  {
    label: 'Baggage',
    body: 'ADO published policy: 25 kg checked free + one carry-on free.',
  },
  {
    label: 'Overnight vs day',
    body: 'Still open — not locked. Day coach usually sits through lunch and does not save a hotel night. Overnight Platino trades a hotel night for sleep on the coach.',
  },
  {
    label: 'Christmas-week sold-out risk',
    body: 'ADO flags Christmas as high season; Platino / GL sell first. Book now, not 23 Dec. Remaining 27 Dec seats were not visible.',
  },
]

const SKETCHES = [
  {
    when: 'Outbound · Sun 27 Dec · typical coach times',
    title: 'Overnight Platino TAPO',
    body: 'The bus that protects restaurant time. Full CDMX day, Uber Roma → TAPO 20:30–21:00 (25–40 min), board ~21:30–22:30, arrive ~05:00–07:00 28 Dec. 25 kg + cabin included. Breakfast in Oaxaca is the prize. Clock time similar to a day bus; waking day is not eaten. Typical night pattern from current TAPO tables — confirm on ado.com.mx. Overnight vs day still open. Christmas fare not retrieved.',
  },
  {
    when: 'Outbound · Sun 27 or Mon 28 Dec',
    title: 'Day ADO',
    body: 'Door-to-door ~7 h 30–9 h. You did not save a hotel night and you sat Highway 135D through lunch. Off-peak samples exist; Christmas 2026 fares were not retrieved. Still on the table — usually worse for dinners. Times only, not tickets.',
  },
  {
    when: 'Return · Tue 5 Jan · typical coach times',
    title: 'Day or overnight ADO Oaxaca → TAPO',
    body: 'ADO Oaxaca first-class station is close to Centro (~10 min taxi / ~20 min walk), then 6–7 h to TAPO, then onward to Polanco. Overnight vs day still open. Confirm times on ado.com.mx. Christmas fare not retrieved. Times only, not tickets.',
  },
]

const SPLIT = [
  {
    n: '1',
    title: 'Overnight Platino outbound + day or overnight return 5 Jan',
    body: 'The bus plan that still protects dinners. Keep 27 Dec in Roma if they overnight TAPO, breakfast in Oaxaca the 28th. Return 5 Jan day or overnight — still open. Book Platino / GL on ado.com.mx now; Christmas fare not retrieved. Do not donate 5 Jan or 28 Dec to a daylight window over Puebla.',
  },
  {
    n: '2',
    title: 'Day TAPO both ways',
    body: 'Usually worse for restaurants: sits Highway 135D through lunch and does not save a hotel night. Still a legal bus plan if they prefer daylight. Confirm times on ado.com.mx. Christmas fare not retrieved.',
  },
  {
    n: '3',
    title: 'Cholula 27 Dec, then bus 28 Dec TAPO',
    body: 'Come back to CDMX that night. Day or overnight TAPO on Mon 28 Dec — not Puebla → Oaxaca the same day. CAPU → Oaxaca is real (~4.5–5.5 h) and not better than leaving from the city they already live in that week. No extra Puebla hotel.',
  },
]

export default function OaxacaTravel() {
  return (
    <section className="panel oax-panel" aria-label="CDMX to Oaxaca">
      <h2>CDMX–Oaxaca · bus both ways</h2>
      <p className="hint">
        Locked 31 Aug 2026. Two adults from Roma Norte. Outbound likely Sun 27 or Mon 28 Dec 2026;
        return Tue 5 Jan 2027. Overnight vs day still open. Times only, not tickets. Book on{' '}
        <a href="https://www.ado.com.mx/" target="_blank" rel="noreferrer">
          ado.com.mx
        </a>
        .
      </p>

      <p className="fare-note">
        Christmas 2026 ADO / Clickbus fares were not retrieved — will not guess. Off-peak Platino ~MXN
        1,530 · €78 is a current-week Wanderu sample only (31 Aug 2026), not a 27 Dec fare. Platino / GL
        sell first at Christmas — book now, not 23 Dec.
      </p>

      <div className="compare compare-bus" role="table" aria-label="ADO TAPO–Oaxaca bus facts">
        <div className="compare-head" role="row">
          <span role="columnheader"> </span>
          <span role="columnheader">ADO / OCC · TAPO ↔ Oaxaca</span>
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
          Daytime TAPO both ways is the weak bus choice if they care about dinners — still legal, just
          the option that loses restaurant time. AU / Santa Rosa. Coaches that arrive after 21:00 and
          then a colectivo. Do not bus Puebla → Oaxaca the same day as Cholula. Christmas fares are
          still not guessed.
        </p>
      </article>

      <p className="hint">
        Book both ways on{' '}
        <a href="https://www.ado.com.mx/" target="_blank" rel="noreferrer">
          ado.com.mx
        </a>
        . Times only, not tickets.
      </p>
    </section>
  )
}
