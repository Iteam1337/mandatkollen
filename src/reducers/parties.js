import { Parliament } from '../lib/parliament'
import polls from '../lib/history'

const initialState = [
  {id: 1, name: 'Kristdemokraterna', percentage: 3.10, affiliation: 'opposition', colour: '#366da3', abbreviation: 'KD'},
  {id: 2, name: 'Moderaterna', percentage: 21.00, affiliation: 'opposition', colour: '#2F80ED', abbreviation: 'M'},
  {id: 3, name: 'Liberalerna', percentage: 5.70, affiliation: 'opposition', colour: '#378cab', abbreviation: 'L'},
  {id: 4, name: 'Centerpartiet', percentage: 11.00, affiliation: 'opposition', colour: '#78ae5a', abbreviation: 'C'},
  {id: 5, name: 'Sverigedemokraterna', percentage: 13.50, affiliation: 'center', colour: '#e7d960', abbreviation: 'SD'},
  {id: 6, name: 'Socialdemokraterna', percentage: 31.40, affiliation: 'regering', colour: '#c13b38', abbreviation: 'S'},
  {id: 7, name: 'Miljöpartiet', percentage: 5.00, affiliation: 'regering', colour: '#acc768', abbreviation: 'MP'},
  {id: 8, name: 'Vänsterpartiet', percentage: 7.10, affiliation: 'center', colour: '#992522', abbreviation: 'V'},
  {id: 9, name: 'FI', percentage: 2.40, affiliation: 'center', colour: '#fab', abbreviation: 'FI'},
  {id: 10, name: 'Övriga', affiliation: 'center', colour: '#000', percentage: 2.20, abbreviation: 'Ö'}
]

let parliament = new Parliament(initialState)

export default function (state = parliament.seats, action) {
  switch (action.type) {
    case 'UPDATE_PARTY_AFFILIATION': {
      const updatedParties = state
        .map(party => party.abbreviation === action.abbreviation ? {...party, affiliation: action.affiliation} : party)
        .sort(parliament.sort)
      return updatedParties
    }
    case 'UPDATE_PARTY_PERCENTAGE': {
      const updatedParties = state.map(party => party.abbreviation === action.abbreviation ? parliament.updateVotes(party, action.percentage) : party)
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
