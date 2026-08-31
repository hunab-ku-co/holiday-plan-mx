const ROWS = [
  {
    label: 'Rolling / air time',
    flight: 'Airborne 1 h 04–1 h 25 nonstop (Google Flights + FlightConnections, 31 Aug 2026).',
    bus: 'Typically 6–7 h TAPO → Oaxaca first-class. Fastest current-week sample 5 h; other samples 6 h–7 h 35 m (Busbud / Wanderu, off-peak).',
  },
  {
    label: 'Door-to-door from Roma Norte',
    flight: '~4 h 15–5 h 45 via MEX: Uber 20–50 min + 2 h domestic buffer + flight + 15–20 min exit + OAX taxi 20–30 min (~9 km to Centro).',
    bus: 'Day bus ~7 h 30–9 h: Uber TAPO 25–40 min + 30 min station buffer + 6–7 h ride + ~10 min taxi. Overnight: leave after dinner, arrive ~05:00–07:00 — clock similar, waking day is not eaten.',
  },
  {
    label: 'Money (two adults, tickets only)',
    flight: 'Live Google Flights 31 Aug 2026, MEX not NLU: Viva RT 27 Dec–5 Jan $325 pp (~$650 for two, no overhead bin). Aeroméxico $454–$495 pp (~$900–$1,000 for two) before ULCC bags.',
    bus: 'Christmas 2026 ADO / Clickbus fares were not retrieved — will not guess MXN. Off-peak Platino ~$90 (Wanderu current-week average, 31 Aug 2026) is a sample only, not a 27 Dec quote.',
  },
  {
    label: 'Terminals',
    flight: 'Aeroméxico = MEX T2. Viva and Volaris = MEX T1. Arrive OAX (one small terminal). Filter searches to MEX — NLU / AIFA cheap rows are 60–90 min north of Roma and not a bargain.',
    bus: 'TAPO (east, Metro San Lázaro). Ignore Norte and Taxqueña/Sur from Roma Norte. ADO first-class Oaxaca station is much closer to Centro than the airport (~10 min taxi or ~20 min walk).',
  },
  {
    label: 'Baggage',
    flight: 'Viva cheapest: personal item only, no overhead bin on the $168 / $157 quotes. Price the bag in checkout before comparing to AM. Aeroméxico is fare-dependent; exact bag fee was not on an official checkout page in this research.',
    bus: 'ADO published policy: 25 kg checked free + one carry-on free. Real comfort/money difference vs ULCC air.',
  },
  {
    label: 'Overnight vs day',
    flight: 'Daylight hop on typical schedules — not an overnight.',
    bus: 'Day coach usually the worse of both worlds (sits through lunch, does not save a hotel night). Overnight Platino trades a hotel night for sleep on the coach.',
  },
  {
    label: 'Christmas-week sold-out risk',
    flight: 'GDS is already pricing 27/28 Dec and 5 Jan. December is the expensive month. Book sooner; this page will not guess remaining seats.',
    bus: 'ADO flags Christmas as high season; Platino / GL sell first. Book now, not 23 Dec. Remaining 27 Dec seats were not visible.',
  },
]

const QUOTES = [
  {
    when: '27 Dec MEX → OAX',
    items: [
      'Viva 11:00–12:04 · $168 pp · no overhead bin',
      'Aeroméxico 13:15–14:37 · $235 pp',
    ],
  },
  {
    when: '28 Dec MEX → OAX',
    items: [
      'Viva 11:00 · $168 pp · similar to the 27th',
      'Aeroméxico 05:45 and 13:50 · $235 pp',
    ],
  },
  {
    when: '5 Jan OAX → MEX',
    items: [
      'Viva 12:49–14:00 · $157 pp · no overhead bin',
      'Aeroméxico cluster · $199–$213 pp',
    ],
  },
  {
    when: 'Round-trip 27 Dec – 5 Jan',
    items: [
      'Viva MEX $325 pp · two adults ~$650 before bags',
      'Aeroméxico MEX $454–$495 pp · two adults ~$900–$1,000',
    ],
  },
]

const SKETCHES = [
  {
    when: 'Outbound · Sun 27 Dec · Google Flights quote',
    title: 'Viva 11:00 or AM 13:15 from MEX',
    body: 'Viva: Uber Roma ~08:00–08:15 to T1, 2 h buffer, airborne 11:00–12:04 (1 h 04), OAX taxi 20–30 min, hotel ~12:30–13:00. Door-to-door ~4 h 45–5 h 15. Late lunch is realistic. AM 13:15 T2: leave Roma ~10:15–10:30, hotel ~15:15–15:45 — still a dinner night. $168 vs $235 pp as of 31 Aug 2026. Times only, not tickets.',
  },
  {
    when: 'Outbound · Sun 27 Dec · typical coach times',
    title: 'Overnight Platino TAPO',
    body: 'The only bus that competes on restaurant time. Full CDMX day, Uber Roma → TAPO 20:30–21:00 (25–40 min), board ~21:30–22:30, arrive ~05:00–07:00 28 Dec. 25 kg + cabin included. Breakfast in Oaxaca is the prize. Clock time similar to a day bus; waking day is not eaten. Typical night pattern from current TAPO tables — confirm on ado.com.mx. Christmas fare not retrieved.',
  },
  {
    when: 'Outbound · Sun 27 or Mon 28 Dec',
    title: 'Day ADO — usually skip',
    body: 'Door-to-door ~7 h 30–9 h. You did not save a hotel night and you sat Highway 135D through lunch. Off-peak samples exist; Christmas 2026 fares were not retrieved. For two people who care about dinners, this is the option that loses.',
  },
  {
    when: 'Return · Tue 5 Jan · Google Flights quote',
    title: 'Viva 12:49 OAX → MEX (or AM afternoon)',
    body: 'Taxi to OAX ~10:00, 2 h buffer at a small airport, Viva 12:49–14:00 $157 pp, Uber MEX → Roma 20–50 min. Still a Roma dinner. AM afternoon cluster $213 pp if you want a last Oaxaca lunch (lands T2). Skip NLU evening cheap fares (60–90 min transfer; home 22:00–23:30).',
  },
]

const SPLIT = [
  {
    n: '1',
    title: 'Fly MEX both ways',
    body: 'Still protects the most dinners. 27 Dec Viva 11:00 or AM 13:15; 5 Jan Viva 12:49 (or AM afternoon for a last Oaxaca lunch). Book T1 vs T2 correctly. Buy bags with the Viva ticket. This matches how they already planned to travel.',
  },
  {
    n: '2',
    title: 'Overnight Platino 27 Dec + fly 5 Jan',
    body: 'The one bus actually in the same sport. Keep 27 Dec in Roma, 28 Dec breakfast in Oaxaca, return flight on the 5th still gets Roma for dinner. Do not donate 5 Jan or 28 Dec to a daylight window over Puebla.',
  },
  {
    n: '3',
    title: 'Cholula on 27 Dec → fly 28 Dec from MEX',
    body: 'Come back to CDMX that night. Fly 28 Dec 11:00 Viva or 13:50 AM from MEX ($168 / $235 pp, 31 Aug 2026). Do not bus Puebla → Oaxaca unless sleeping in Puebla. CAPU → Oaxaca is real (~4.5–5.5 h) and not better than flying the next morning from the city they already live in that week. No useful PBC → OAX flight.',
  },
]

export default function OaxacaTravel() {
  return (
    <section className="panel oax-panel" aria-label="CDMX to Oaxaca">
      <h2>CDMX–Oaxaca · bus vs flight</h2>
      <p className="hint">
        Two adults, from Roma Norte. They previously planned to fly both ways. The bus is now in play. Outbound likely
        Sun 27 or Mon 28 Dec 2026; return Tue 5 Jan 2027. Fair comparison — times only, not tickets. Quote date 31 Aug
        2026. Filter Google Flights to MEX, not “Mexico City” (strips NLU / AIFA).
      </p>

      <p className="fare-note">
        Flight USD figures are live Google Flights quotes, 31 Aug 2026, two adults, MEX not NLU. Christmas 2026 ADO /
        Clickbus fares were not retrieved — will not guess MXN. Off-peak Platino ~$90 is a current-week Wanderu sample
        only, not a 27 Dec fare.
      </p>

      <div className="compare" role="table" aria-label="Flight versus bus">
        <div className="compare-head" role="row">
          <span role="columnheader"> </span>
          <span role="columnheader">Flight (MEX)</span>
          <span role="columnheader">Bus (ADO / OCC)</span>
        </div>
        {ROWS.map((row) => (
          <div className="compare-row" role="row" key={row.label}>
            <strong role="rowheader">{row.label}</strong>
            <p role="cell">
              <span className="compare-k">Flight · </span>
              {row.flight}
            </p>
            <p role="cell">
              <span className="compare-k">Bus · </span>
              {row.bus}
            </p>
          </div>
        ))}
      </div>

      <h3 className="subhead">Live flight quotes · MEX only · 31 Aug 2026</h3>
      <p className="hint">USD as shown on Google Flights. Volaris times exist; prices were unavailable. No flight numbers on this page.</p>
      <div className="quotes">
        {QUOTES.map((q) => (
          <article key={q.when} className="quote-card">
            <h4>{q.when}</h4>
            <ul>
              {q.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="hint">
        NLU / AIFA one-ways look cheaper on paper ($86–$134 outbound; $76 / $81 on 5 Jan). They cost 60–90 min transfer
        (Uber ~500–900 MXN) and often a late arrival. Not a bargain from Roma Norte.
      </p>

      <h3 className="subhead">Timed sketches · quotes and typical clocks, not tickets</h3>
      <div className="sketches">
        {SKETCHES.map((s) => (
          <article key={s.title} className="sketch">
            <span className="sketch-when">{s.when}</span>
            <h4>{s.title}</h4>
            <p>{s.body}</p>
          </article>
        ))}
      </div>

      <h3 className="subhead">A fair split, not a sermon</h3>
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
          Daytime TAPO both ways. AU / Santa Rosa. NLU “deals.” Anything that lands OAX after 21:00 and then a
          colectivo. Viva $168 is not a $168 trip if a roll-aboard needs the bin — price the bag before comparing it to
          AM $235.
        </p>
      </article>
    </section>
  )
}
