const csvToJson = text =>
  text
    .split('/r/n')
    .then(lines => {
      const fieldNames = lines.splice(0,1)
      console.log('fieldNames', fieldNames)
      return lines.map(line => line.split(',').reduce((result, value, i) => ({[fieldNames[i]]: value.trim()}), {}))
    })

export const fetchHistory = () => 
  fetch('http://pollofpolls.se/poll_img/data_table_tot.csv')
    .then(result => result.text())
    .then(csvToJson)
    .catch(err => console.error(err))

export const baseVotes = {
  'Riksdagsvalet 2014': [
    { abbreviation: 'KD', votes: 284806},
    { abbreviation: 'M', votes: 1453517},
    { abbreviation: 'L', votes: 337773},
    { abbreviation: 'C', votes: 380937},
    { abbreviation: 'S', votes: 1932711},
    { abbreviation: 'MP', votes: 429275},
    { abbreviation: 'V', votes: 356331},
    { abbreviation: 'SD', votes: 801178},
    { abbreviation: 'FI', votes: 194719},
    { abbreviation: 'Ö', votes: 60326}
  ],
  'SCB Maj 2017': [
    { abbreviation: 'KD', votes: 32},
    { abbreviation: 'M', votes: 181},
    { abbreviation: 'L', votes: 50},
    { abbreviation: 'C', votes: 113},
    { abbreviation: 'S', votes: 311},
    { abbreviation: 'MP', votes: 45},
    { abbreviation: 'V', votes: 63},
    { abbreviation: 'SD', votes: 184},
    { abbreviation: 'FI', votes: 0},
    { abbreviation: 'Ö', votes: 22}
  ],
  'Poll of polls 2017-07-19': [
    { abbreviation: 'KD', votes: 3.3},
    { abbreviation: 'M', votes: 14.8},
    { abbreviation: 'L', votes: 6.5},
    { abbreviation: 'C', votes: 12.1},
    { abbreviation: 'S', votes: 26.4},
    { abbreviation: 'MP', votes: 4.3},
    { abbreviation: 'V', votes: 7.9},
    { abbreviation: 'SD', votes: 21.3},
    { abbreviation: 'FI', votes: 1.8},
    { abbreviation: 'Ö', votes: 0}
  ]
}

export default {
  fetchHistory,
  baseVotes
}