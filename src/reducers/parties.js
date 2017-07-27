import { Parliament } from '../lib/parliament'
import polls from '../lib/history'

const rawState = [
  {id: 1, name: 'Kristdemokr.', votes: 31, affiliation: 'opposition', colour: '#366da3', abbreviation: 'KD'},
  {id: 2, name: 'Moderaterna', votes: 210, affiliation: 'opposition', colour: '#88c7d9', abbreviation: 'M'},
  {id: 3, name: 'Liberalerna', votes: 57, affiliation: 'opposition', colour: '#378cab', abbreviation: 'L'},
  {id: 4, name: 'Centerpartiet', votes: 110, affiliation: 'opposition', colour: '#78ae5a', abbreviation: 'C'},
  {id: 5, name: 'Sverigedemokr.', votes: 135, affiliation: 'center', colour: '#e7d960', abbreviation: 'SD'},
  {id: 6, name: 'Socialdemokr.', votes: 314, affiliation: 'regering', colour: '#c13b38', abbreviation: 'S'},
  {id: 7, name: 'Miljöpartiet', votes: 50, affiliation: 'regering', colour: '#acc768', abbreviation: 'MP'},
  {id: 8, name: 'Vänsterpartiet', votes: 71, affiliation: 'center', colour: '#992522', abbreviation: 'V'},
  {id: 9, name: 'FI', votes: 24, affiliation: 'center', colour: '#fab', abbreviation: 'FI'},
  {id: 10, name: 'Övriga', affiliation: 'center', votes: 22, abbreviation: 'Ö'}
]

let parliament = new Parliament(rawState)

export default function (state = parliament.seats, action) {
  switch (action.type) {
    case 'UPDATE_PARTY_AFFILIATION': {
      const updatedParties = state
        .map(party => party.abbreviation === action.abbreviation ? {...party, affiliation: action.affiliation} : party)
        .sort(parliament.sort)
      return updatedParties
    }
    case 'UPDATE_PARTY_VALUE': {
      const updatedParties = state
        .map(party => party.abbreviation === action.abbreviation ? parliament.updateVotes(party, action.value) : party)
      console.log(updatedParties)
      parliament = new Parliament(updatedParties)
      return parliament.seats
    }
    case 'CHOOSE_BASE_VOTES': {
      const parties = state.map(party => ({...party, votes: polls.baseVotes[action.source].find(a=>a.abbreviation === party.abbreviation).votes}))
      console.log('parties', parties)
      return parties
    }
    default: return state
  }
}
