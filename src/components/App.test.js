import React, {render} from 'pureact'
import App from './App'

const range = nr => [...Array(nr).keys()]

import {
  balanceRemainingVotes, 
  calculatePercentages, 
  selectAndAssignSeat,
  balanceAndCalculateSeats
} from '../lib/parties'

const state = {
  parties: [
    { id: 1, votes: 10},
    { id: 2, votes: 10},
  ]
}

xit('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App {...state} />, div);
})

it('should be correctly calculated with percentages', () => {
  const result = state.parties.map(calculatePercentages(state.parties))
  expect(result).toHaveLength(2)
  expect(result[0]).toHaveProperty('percentage')
  expect(result[1]).toHaveProperty('percentage')
  expect(result[0].percentage).toBe(50)
  expect(result[1].percentage).toBe(50)
})

it('should be correctly initialized', () => {
  const result = balanceRemainingVotes(state.parties, 20)
  expect(result).toHaveLength(2)
  expect(result[0]).toHaveProperty('votes')
  expect(result[1]).toHaveProperty('votes')
  expect(result[0].votes).toBe(10)
  expect(result[1].votes).toBe(10)
})

it('should balance remaining votes', () => {
  const oneAdded = {parties: [...state.parties, {votes: 5}]}
  const result = balanceRemainingVotes(oneAdded.parties, 20)
  expect(result).toHaveLength(3)
  expect(result[0]).toHaveProperty('votes')
  expect(result[0].votes).toBe(8)
  expect(result[1].votes).toBe(8)
  expect(result[2].votes).toBe(4)
})

it('should not touch changed parties', () => {
  const oneAdded = {parties: [...state.parties, {id: 3, votes: 5, changed: new Date()}]}
  const result = balanceRemainingVotes(oneAdded.parties, 20)
  expect(result).toHaveLength(3)
  expect(result[0].votes).toBe(8)
  expect(result[1].votes).toBe(8)
  expect(result[2].votes).toBe(5)
})

it('should mix seats from each party evenly when they have equally amount of votes', () => {
  const parties = state.parties.map(calculatePercentages(state.parties))
  const result = range(20)
    .reduce((parties, nr) => selectAndAssignSeat(parties, nr), parties)
  expect(result).toHaveLength(2)
  expect(result[0]).toHaveProperty('seats')
  expect(result[1]).toHaveProperty('seats')
  expect(result[0].seats).toBe(10)
  expect(result[1].seats).toBe(10)
})

it('should add one more seats to the party with highest amount of votes', () => {
  const parties = [...state.parties, {id: 3, votes: 11}].map(calculatePercentages(state.parties))
  const result = range(30)
    .reduce((parties, nr) => {
      const seats = selectAndAssignSeat(parties, nr)
      return seats
    }, parties)
  expect(result).toHaveLength(3)
  expect(result[0]).toHaveProperty('seats')
  expect(result[1]).toHaveProperty('seats')
  expect(result[0].seats).toBe(9)
  expect(result[1].seats).toBe(10)
  expect(result[3].seats).toBe(11)
})


it('should mix seats according to the percentage', () => {
  const rawState = [
    { id: 1, name: "Kristdemokraterna", votes: 284806},
    { id: 2, name: "Moderaterna", votes: 1453517},
    { id: 3, name: "Liberalerna", votes: 337773},
    { id: 4, name: "Centerpartiet", votes: 380937},
    { id: 5, name: "Socialdemokraterna", votes: 1932711},
    { id: 6, name: "Miljöpartiet", votes: 429275},
    { id: 7, name: "Vänsterpartiet", votes: 356331},
    { id: 8, name: "Sverigedemokraterna", votes: 801178},
    { id: 9, name: "FI", votes: 194719},
    { id: 10, name: "Övriga", votes: 60326}
  ]

  const other = rawState.slice(0, -1).reduce((total, party) => total + party.votes, 0)
  const parties = balanceRemainingVotes(rawState, 6231573).map(calculatePercentages(rawState, 6231573))
  const seats = range(349).reduce((parties, seat) => selectAndAssignSeat(parties, seat), parties)

  console.log('seats', seats)

})