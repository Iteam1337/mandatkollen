import fetch from 'node-fetch'
import moment from 'moment'
import 'moment/locale/sv.js'

const VAL_URL_BASE = 'https://resultat.val.se/data/resultat'

// Valnätter per år – valnattskoden skiftar automatiskt till nästa val
// (riksdagsval hålls andra söndagen i september vart fjärde år)
const ELECTIONS = {
  2026: '2026-09-13',
  2030: '2030-09-08',
}

// Valet som är aktuellt: senast tillträtt valdatum, annars nästkommande
function currentElectionYear(now = new Date()) {
  const years = Object.keys(ELECTIONS).map(Number).sort((a, b) => a - b)
  const passed = years.filter((y) => new Date(ELECTIONS[y]) <= now)
  if (passed.length) return passed[passed.length - 1]
  return years.find((y) => new Date(ELECTIONS[y]) > now) || years[0]
}

// Slutligt resultat först när samtliga valdistrikt räknats – under
// veckan efter valet pågår den slutliga protokollräkningen
const isCounted = (json) =>
  json.antalValdistriktRaknade != null &&
  json.antalValdistriktSomSkaRaknas != null &&
  json.antalValdistriktRaknade >= json.antalValdistriktSomSkaRaknas

async function fetchValResult(year, rakning) {
  const res = await fetch(
    `${VAL_URL_BASE}/val${year}/RD_${rakning}.json`,
    {
      headers: {
        'User-Agent': 'mandatkollen/1.0 (+https://mandatkollen.se)',
      },
    }
  )
  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error(`Valdata HTTP ${res.status} för val${year}/${rakning}`)
  }
  return res.json()
}

// Prioritera slutligt (S) om det finns och är fästräknat,
// annars preliminär (P) – på valnatten finns bara P
async function fetchCurrentValdata(year) {
  const finalJson = await fetchValResult(year, 'S')
  if (finalJson && isCounted(finalJson)) {
    return { json: finalJson, final: true }
  }
  const prelimJson = await fetchValResult(year, 'P')
  if (prelimJson) return { json: prelimJson, final: false }
  if (finalJson) return { json: finalJson, final: false }
  throw new Error(`Ingen valdata hittad för val${year}`)
}

const getPartyJson = ({
  partibeteckning: name,
  partiforkortning: abbreviation,
  fargkod: color,
  antalRoster: votes,
  andelRoster: percentage,
}) => ({
  name,
  abbreviation,
  percentage,
  votes,
  color,
})

function getPartiesFromJson(json) {
  const relevantvotes = json.rosterPaverkaMandat
  // partiroster innehåller redan 'Övriga anmälda partier' (ÖVR),
  // summan är samma som rosterOvrigaPartier
  const parties = relevantvotes.partiroster
    .filter((party) => party.partiforkortning)
    .map((party) =>
      getPartyJson({
        ...party,
        partibeteckning:
          party.partiforkortning === 'ÖVR' ? 'Övriga' : party.partibeteckning,
        partiforkortning:
          party.partiforkortning === 'ÖVR' ? 'Ö' : party.partiforkortning,
      })
    )

  const totalPercentage = parties.reduce((a, b) => a + b.percentage, 0)
  const totalVotes = parties.reduce((a, b) => a + b.votes, 0)
  const date = moment(
    json.senasteUppdateringstid,
    'D MMMM YYYY HH:mm:ss',
    'sv'
  ).isValid()
    ? moment(json.senasteUppdateringstid, 'D MMMM YYYY HH:mm:ss', 'sv')
    : moment()
  return { parties, totalPercentage, totalVotes, date }
}

async function getParties(requestedYear) {
  const year = Number(requestedYear) || currentElectionYear()
  console.log('Requesting data from val.se:', new Date().toISOString())
  const { json, final } = await fetchCurrentValdata(year)
  const result = getPartiesFromJson(json)
  result.countPercentage =
    parseFloat(String(json.valdeltagande).replace(',', '.')) || undefined
  result.year = year
  result.final = final
  result.valdatum = json.valdatum
  return result
}

export { getParties, currentElectionYear }
