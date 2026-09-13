import fetch from 'node-fetch'
import moment from 'moment'
import 'moment/locale/sv.js'

const VAL_URL_BASE = 'https://resultat.val.se/data/resultat'

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
  const parties = relevantvotes.partiroster.map((party) =>
    getPartyJson({
      ...party,
      partibeteckning:
        party.partiforkortning === 'ÖVR' ? 'Övriga' : party.partibeteckning,
      partiforkortning: party.partiforkortning === 'ÖVR' ? 'Ö' : party.partiforkortning,
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

async function fetchValData(valtillfalle) {
  const res = await fetch(
    `${VAL_URL_BASE}/${valtillfalle}/RD_P.json`,
    {
      headers: {
        'User-Agent': 'mandatkollen/1.0 (+https://mandatkollen.se)',
      },
    }
  )
  if (!res.ok) {
    throw new Error(`Valdata HTTP ${res.status} för ${valtillfalle}`)
  }
  return res.json()
}

function getParties(year = '2026') {
  const valtillfalle = `val${year}`
  return new Promise(async (resolve, reject) => {
    console.log('Requesting data from val.se:', new Date().toISOString())
    try {
      const json = await fetchValData(valtillfalle)
      const parties = getPartiesFromJson(json)
      parties.countPercentage = parseFloat(json.valdeltagande) || undefined
      resolve(parties)
    } catch (err) {
      reject(err)
    }
  })
}

export { getParties }
