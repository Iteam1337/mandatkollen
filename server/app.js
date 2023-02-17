import express from 'express'
import fetch from 'node-fetch'
import apicache from 'apicache'
import cheerio from 'cheerio'
import { getParties } from './valnatt.js'
import staticGzip from 'express-static-gzip'

const app = express()
const cache = apicache.middleware

// Serve static assets
app.use(
  staticGzip('dist', {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    serveStatic: {
      maxAge: '30d',
      setHeaders: (res, path) => {
        res.setHeader('Cache-Control', 'public, max-age=31536000')
      },
    },
  })
)
app.use('/images', staticGzip('images'))
app.use('/.well-known/', staticGzip('/.well-known/'))

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
