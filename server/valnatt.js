const xml = require('xml2json')
const iconv = require('iconv-lite')
const request = require('request')
const unzip = require('unzip-stream')
const moment = require('moment')

function getPartiesFromXml(xmlString) {
  const json = JSON.parse(xml.toJson(xmlString))
  const parties = json.VAL.NATION.GILTIGA.map( (
    {
      PARTI: abbreviation, 
      MANDAT: seats, 
      PROCENT: percentage, 
      RÖSTER: votes
    }) => ({
      abbreviation, 
      seats: parseInt(seats, 10), 
      percentage: parseFloat(percentage.replace(',', '.')), 
      votes: parseInt(votes, 10)
    }))

  const totalPercentage = parties.reduce((a,b) => a + b.percentage, 0)
  const totalVotes = parties.reduce((a,b) => a + b.votes, 0)
  const date = json.VAL.NATION.TID_RAPPORT ? moment(json.VAL.NATION.TID_RAPPORT, 'YYYYMMDDhhmmss') : moment()
  const countPercentage = json.VAL.NATION.KLARA_VALDISTRIKT / json.VAL.NATION.ALLA_VALDISTRIKT
  console.log('parsed valnatt:', date)
  return {parties, totalPercentage, totalVotes, countPercentage, date}
}

function getParties(year = 2018) {
  return new Promise((resolve, reject) => {
    request(`https://data.val.se/val/val${year}/valnatt/valnatt.zip`, {headers: {'User-Agent': 'mandatkollen/1.0 (+https://mandatkollen.se)'}})
    .pipe(unzip.Parse())
    .on('error', err => reject(err))
    .on('entry', entry => {
      if (entry.path.endsWith('00R.xml')) {
        // this is the droid/file you are looking for
        let buffer = ''
        entry.pipe(iconv.decodeStream('ISO-8859-1'))
        .on('data', fragment => buffer += fragment)
        .on('finish', () => {
          const parties = getPartiesFromXml(buffer)
          resolve(parties)
        })
      } else {
        entry.autodrain()
      }
    })
  })
}

module.exports = {
  getParties
}
