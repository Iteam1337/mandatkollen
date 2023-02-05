import express from 'express'
import path from 'path'
import fetch from 'node-fetch'
import { parse } from 'csv-parse/sync'
import apicache from 'apicache'
import cheerio from 'cheerio'
import { getParties } from './valnatt.js'

const app = express()
const cache = apicache.middleware

// Serve static assets
app.use(express.static('dist'))
app.use('/images', express.static('images'))

app.get('/history', cache('12 hours'), (req, res) => {
  const transform = ({ Datum, M, L, C, KD, S, V, MP, SD, FI }) => ({
    date: Datum,
    parties: { M, L, C, KD, S, V, MP, SD, FI },
  })
  fetch('http://pollofpolls.se/poll_img/data_table_tot.csv', {
    headers: { 'User-Agent': 'mandatkollen/1.0 (+https://mandatkollen.se)' },
  })
    .then((res) => res.text())
    .then((text) =>
      parse(text, {
        columns: true,
        rowDelimiter: '\n',
        delimiter: ',',
        skip_lines_with_error: true,
      })
    )
    .then((polls) => {
      return polls.map(transform).reverse()
    })
    .then((polls) => res.json(polls))
    .catch((err) => res.status(500).json(err))
})

app.get('/valnatt', cache('24 hours'), (req, res) => {
  getParties(req.query.year).then((valnatt) => {
    console.log('valnatt', valnatt)
    const parties = valnatt.parties.reduce(
      (parties, { percentage, abbreviation }) =>
        Object.assign(parties, { [abbreviation]: percentage || 0 }),
      {}
    )
    parties.date = parties.date
    res.json({
      parties,
      date: valnatt.date,
      totalVotes: valnatt.totalVotes,
      countPercentage: valnatt.countPercentage,
    })
  })
})

app.get('/polls', cache('12 hours'), (req, res) => {
  fetch(`http://pollofpolls.se`, {
    headers: {
      // chrome headers
      'User-Agent': 'Mandatkollen.se',
    },
  })
    .then((res) => res.text())
    .then((text) => {
      return cheerio.load(text)
    })
    .then(($) => {
      return $('table.csvtohtml tbody')
        .find('tr')
        .map(function () {
          return [
            $(this)
              .find('td')
              .map(function () {
                return $(this).text()
              })
              .get(),
          ]
        })
        .get()
    })
    .then((table) =>
      table.map(([institute, M, L, C, KD, S, V, MP, SD, FI, Ö, date]) => ({
        institute,
        dates: date,
        parties: { M, L, C, KD, S, V, MP, SD, FI, Ö },
      }))
    )
    .then((institutes) => res.json(institutes))
    .catch((err) => res.status(500).json(err))
})

export default app
