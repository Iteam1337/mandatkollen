const express = require('express');
const path = require('path');
const fetch = require('node-fetch')
const csv = require('csv-parse/lib/sync')
const cache = require('apicache').middleware
const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/polls', cache('12 hours'), (req, res) => {
  const transform = ({Datum, M, L, C, KD, S, V, MP, SD, FI}) => ({date: Datum, parties:{M,L,C,KD,S,V,MP,SD,FI}})
  fetch('http://pollofpolls.se/poll_img/data_table_tot.csv', {headers: {'User-Agent': 'mandatkollen/1.0 (+https://mandatkollen.se)'}})
    .then(res => res.text())
    .then(text => csv(text, {columns: true, delimiter: ','}))
    .then(polls => polls.map(transform).reverse())
    .then(polls => res.json(polls))
    .catch(err => res.status(500).json(err))
})
// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;