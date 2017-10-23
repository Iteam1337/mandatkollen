import { Parliament } from '../lib/parliament'
import polls from '../lib/polls'

const parties = [
  {id: 1, name: 'Kristdemokraterna', percentage: 3.10, affiliation: 'opposition', colour: '#3163A6', abbreviation: 'KD'},
  {id: 2, name: 'Moderaterna', percentage: 21.00, affiliation: 'opposition', colour: '#2F80ED', abbreviation: 'M'},
  {id: 3, name: 'Liberalerna', percentage: 5.70, affiliation: 'opposition', colour: '#56CCF2', abbreviation: 'L'},
  {id: 4, name: 'Centerpartiet', percentage: 11.00, affiliation: 'opposition', colour: '#27AE60', abbreviation: 'C'},
  {id: 5, name: 'Sverigedemokraterna', percentage: 13.50, affiliation: 'center', colour: '#F2C94C', abbreviation: 'SD'},
  {id: 6, name: 'Socialdemokraterna', percentage: 31.40, affiliation: 'regering', colour: '#E04B49', abbreviation: 'S'},
  {id: 7, name: 'Miljöpartiet', percentage: 5.00, affiliation: 'regering', colour: '#219653', abbreviation: 'MP'},
  {id: 8, name: 'Vänsterpartiet', percentage: 7.10, affiliation: 'center', colour: '#B12827', abbreviation: 'V'},
  {id: 9, name: 'FI', percentage: 2.40, affiliation: 'center', colour: '#D96B97', abbreviation: 'FI'},
  {id: 10, name: 'Övriga', affiliation: 'center', colour: '#4D4D4D', percentage: 2.20, abbreviation: 'Ö'}
]

let parliament = new Parliament(parties)
let initialState = polls.fetchHistory().then(polls => {
  parliament.updatePolls(polls[0].parties)
  return parliament.seats
})

      
export default function (state = initialState, action) {
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
      console.log('choose_base_vote', action)
      parliament = new Parliament(parliament.updatePolls(action.votes.parties))
      return parliament.seats
      
    }
    default: return state
  }
}
