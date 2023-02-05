import fetch from 'node-fetch'
import unzip from 'unzip-stream'
import moment from 'moment'

const getPartyJson = ({
  andelRoster: percentage,
  antalRoster: votes,
  fargkod: color,
  partibeteckning: name,
  partiforkortning: abbreviation,
}) => ({
  name,
  abbreviation,
  percentage,
  votes,
  color,
})

function getPartiesFromJson(jsonString) {
  const json = JSON.parse(jsonString)
  const relevantvotes = json.valomrade.rostfordelning.rosterPaverkaMandat
  const other = {
    ...relevantvotes.rosterOvrigaPartier,
    partibeteckning: 'Övriga',
    partiforkortning: 'Ö',
  }
  const parties = [...relevantvotes.partiRoster, other].map(getPartyJson)

  const totalPercentage = parties.reduce((a, b) => a + b.percentage, 0)
  const totalVotes = parties.reduce((a, b) => a + b.votes, 0)
  const date = json.senasteUppdateringstid
    ? moment(json.senasteUppdateringstid)
    : moment()
  return { parties, totalPercentage, totalVotes, date }
}

const readFileStream = (file) => require('fs').createReadStream(file)

function getParties(date = '20220911') {
  return new Promise(async (resolve, reject) => {
    console.log('Requesting data from val.se:', new Date().toISOString())
    const stream = await fetch(
      `https://resultat.val.se/resultatfiler/p/rd/Val_${date}_preliminar_00_RD.zip`,
      {
        headers: {
          'User-Agent': 'mandatkollen/1.0 (+https://mandatkollen.se)',
        },
      }
    ).then((res) => res.body)
    // readFileStream('data/prelresultat.zip')
    stream
      .pipe(unzip.Parse())
      .on('error', (err) => reject(err))
      .on('entry', (entry) => {
        if (entry.path.endsWith('mandatfordelning_00_RD.json')) {
          // this is the droid/file you are looking for
          let buffer = ''
          entry //.pipe(iconv.decodeStream('ISO-8859-1'))
            .on('data', (fragment) => (buffer += fragment))
            .on('finish', () => {
              const parties = getPartiesFromJson(buffer)
              resolve(parties)
            })
        } else {
          entry.autodrain()
        }
      })
  })
}

export { getParties }
