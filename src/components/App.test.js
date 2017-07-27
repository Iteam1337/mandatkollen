import React, {render} from 'pureact'
import App from './App'
import { Parliament } from '../lib/parliament'
import fetchHistory from '../lib/history'

const state = {
  parties: [
    { id: 1, votes: 10000},
    { id: 2, votes: 10000},
  ]
}

xit('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App {...state} />, div);
})

xit('fetches history data', () => {
  fetchHistory()
})

it('should be correctly calculated with percentages', () => {
  const parliament = new Parliament(state.parties)
  const result = state.parties.map(parliament.percentage)
  expect(result).toHaveLength(2)
  expect(result[0]).toHaveProperty('percentage')
  expect(result[1]).toHaveProperty('percentage')
  expect(result[0].percentage).toBe(50)
  expect(result[1].percentage).toBe(50)
})

it('should be correctly initialized', () => {
  const parliament = new Parliament(state.parties)
  const result = parliament.seats
  expect(result).toHaveLength(2)
  expect(result[0]).toHaveProperty('votes')
  expect(result[1]).toHaveProperty('votes')
  expect(result[0].votes).toBe(10000)
  expect(result[1].votes).toBe(10000)
})

it('should balance total votes according to their initial values', () => {
  const oneAdded = {parties: [...state.parties, {id: 3, votes: 5000}]}
  const parliament = new Parliament(oneAdded.parties, 20000)
  const result = parliament.seats
  expect(result).toHaveLength(3)
  expect(result[0]).toHaveProperty('votes')
  expect(result[0].votes).toBe(8000)
  expect(result[1].votes).toBe(8000)
  expect(result[2].votes).toBe(4000)
})

it('should not touch changed parties', () => {
  const oneAdded = {parties: [...state.parties, {id: 3, votes: 4, changed: new Date()}]}
  const parliament = new Parliament(oneAdded.parties, 20)
  const result = parliament.seats
  expect(result).toHaveLength(3)
  expect(Math.round(result[0].votes)).toBe(8)
  expect(Math.round(result[1].votes)).toBe(8)
  expect(Math.round(result[2].votes)).toBe(4)
})

it('should mix seats from each party evenly when they have equally amount of votes', () => {
  const parliament = new Parliament(state.parties, null, 349)
  const result = parliament.seats
  expect(result).toHaveLength(2)
  expect(result[0]).toHaveProperty('seats')
  expect(result[1]).toHaveProperty('seats')
  expect(result[0].seats).toBe(174)
  expect(result[1].seats).toBe(175)
})

/* Examples from https://sv.wikipedia.org/wiki/Jämkade_uddatalsmetoden */
it('it should correctly implement "jämkade uddatalsmetoden" according to the examples', () => {
  const parties = [
    {id:1, votes: 24657},
    {id:2, votes: 18312},
    {id:3, votes: 11976},
    {id:4, votes: 10824},
    {id:5, votes: 8137}
  ]
  const parliament = new Parliament(parties, null, 5)
  const result = parliament.seats
  expect(result).toHaveLength(5)
  expect(result[0].seats).toBe(2)
  expect(result[1].seats).toBe(1)
  expect(result[2].seats).toBe(1)
  expect(result[3].seats).toBe(1)
  expect(result[4].seats).toBe(0)
})

/* Examples from https://sv.wikipedia.org/wiki/Jämkade_uddatalsmetoden */
xit('should mix seats according to a real example', () => {

  // it's not working because we need to adjust for valdistrikt to make it accurate
  const parties = [
    { id: 1, name: "Kristdemokraterna", votes: 284806, realSeats: 16},
    { id: 2, name: "Moderaterna", votes: 1453517, realSeats: 84 },
    { id: 3, name: "Liberalerna", votes: 337773, realSeats: 19 },
    { id: 4, name: "Centerpartiet", votes: 380937, realSeats: 22 },
    { id: 5, name: "Socialdemokraterna", votes: 1932711, realSeats: 113 },
    { id: 6, name: "Miljöpartiet", votes: 429275, realSeats: 25 },
    { id: 7, name: "Vänsterpartiet", votes: 356331, realSeats: 21 },
    { id: 8, name: "Sverigedemokraterna", votes: 801178, realSeats: 49 },
    { id: 9, name: "FI", votes: 194719, realSeats: 0 },
    { id: 10, name: "Ö", votes: 60326, realSeats: 0 }
  ]
  const parliament = new Parliament(parties, null, 349, 1.4)
  console.log(parliament.seats.map(s => s.seats))
  parliament.seats.forEach(function(s) {
    expect(s.seats).toBe(s.realSeats)
  });

})