import { Parliament } from '../lib/parliament'
import polls from '../lib/polls'

const parties = [
  {id: 1, name: 'Kristdemokraterna', percentage: 6.32, seats: 22, affiliation: 'abstaining', colour: '#3163A6', abbreviation: 'KD'},
  {id: 2, name: 'Moderaterna', percentage: 19.84, seats: 70, affiliation: 'abstaining', colour: '#2F80ED', abbreviation: 'M'},
  {id: 3, name: 'Liberalerna', percentage: 5.49, seats: 20, affiliation: 'abstaining', colour: '#56CCF2', abbreviation: 'L'},
  {id: 4, name: 'Centerpartiet', percentage: 8.61, seats: 31, affiliation: 'coalition', colour: '#27AE60', abbreviation: 'C'},
  {id: 5, name: 'Sverigedemokraterna', percentage: 17.53, seats: 62, affiliation: 'abstaining', colour: '#F2C94C', abbreviation: 'SD'},
  {id: 6, name: 'Socialdemokraterna', percentage: 28.26, seats: 100, affiliation: 'coalition', colour: '#E04B49', abbreviation: 'S'},
  {id: 7, name: 'Miljöpartiet', percentage: 4.41, seats: 16, affiliation: 'coalition', colour: '#219653', abbreviation: 'MP'},
  {id: 8, name: 'Vänsterpartiet', percentage: 8, seats: 28, affiliation: 'coalition', colour: '#B12827', abbreviation: 'V'},
  {id: 10, name: 'Övriga', affiliation: 'opposition', colour: '#4D4D4D', percentage: 1.07, seats: 0, abbreviation: 'Ö'}
]

let parliament = new Parliament(parties)
let initialState = parliament.seats
      
export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_PARTY_AFFILIATION': {
      const updatedParties = state
        .map(party => party.abbreviation === action.abbreviation ? {...party, affiliation: action.affiliation} : party)
        .sort(parliament.sort)
      return updatedParties
    }
    case 'UPDATE_PARTY_PERCENTAGE': {
      const seatsRemoved = state.map(party => (delete party.seats) && party)
      const updatedParties = seatsRemoved.map(party => party.abbreviation === action.abbreviation ? parliament.updateVotes(party, action.percentage) : party)
      parliament = new Parliament(updatedParties)
      return parliament.seats
    }
    case 'CHOOSE_BASE_VOTES': {
      parliament = new Parliament(parliament.updatePolls(action.votes.parties))
      return parliament.seats
      
    }
    default: return state
  }
}
