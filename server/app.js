const express = require('express');
const path = require('path');
const fetch = require('node-fetch')
const csv = require('csv-parse/lib/sync')
const cache = require('apicache').middleware
const cheerio = require('cheerio')
const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/history', cache('12 hours'), (req, res) => {
  const transform = ({Datum, M, L, C, KD, S, V, MP, SD, FI}) => ({date: Datum, parties:{M,L,C,KD,S,V,MP,SD,FI}})
  fetch('http://pollofpolls.se/poll_img/data_table_tot.csv', {headers: {'User-Agent': 'mandatkollen/1.0 (+https://mandatkollen.se)'}})
    .then(res => res.text())
    .then(text => csv(text, {columns: true, delimiter: ','}))
    .then(polls => polls.map(transform).reverse())
    .then(polls => res.json(polls))
    .catch(err => res.status(500).json(err))
})

app.get('/polls', cache('12 hours'), (req, res) => {
  fetch(`http://pollofpolls.se`)
  .then(res => res.text())
  .then(text => {
    return cheerio.load(text)
  })
  .then($ => {
    return $('table.csvtohtml tbody')
      .find('tr').map(function () {
        return [$(this).find('td').map(function () {
          return $(this).text()
        }).get()]
      }).get()
  })
  .then(table => table.map(([institute, M, L, C, KD, S, V, MP, SD, FI, Ö, date]) => ({institute, date, parties: {M, L, C, KD, S, V, MP, SD, FI, Ö}})))
  .then(institutes => res.json(institutes))
  .catch(err => res.status(500).json(err))
})
/*
app.post('/save', (req, res) => {
  .... save to elasticsearch ...
  res.json(true)
})
*/
// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;