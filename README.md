# S and V Mexico 26-27

In-browser trip planner. 24 Dec 2026 to 8 Jan 2027.
Live: https://hunab-ku-co.github.io/holiday-plan-mx/

Travelers: S and V only. S arrives MEX around midnight 24 Dec.

## Run locally
Install dependencies, then start the Vite dev server, then build to docs/.
Base path is /holiday-plan-mx/. GitHub Pages serves main/docs (legacy static).

## Share links
Plan state lives in the URL hash and in localStorage. No backend. Comments are an S/V thread on the plan or a day. Copy the share link after posting. Do not put secrets in notes or comments.

## Privacy
No flight numbers, PNR, ticket codes, passport numbers, phone numbers, tokens, or full names.
Dates, local times, and airport codes are allowed.

## Scenarios
A baseline: Christmas in Roma Norte, Puebla 26–30 Dec (4 nights), Oaxaca for NYE, back 5 Jan, Frida 7 Jan.
B altitude reverse: Oaxaca as soon as humane after the airport hotel, Christmas and NYE at 1542 m.
Playground reorders chapters and regenerates dates with closure warnings. Puebla is four overnight days.

## Commands

npm install
npm run dev
npm run build   # writes docs/
npm run preview
