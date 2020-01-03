import { Parliament } from '../lib/parliament'

const parties = [
  {id: 1, name: 'Kristdemokraterna', percentage: 6.32, seats: 22, affiliation: 'opposition', colour: '#3163A6', abbreviation: 'KD'},
  {id: 2, name: 'Moderaterna', percentage: 19.84, seats: 70, affiliation: 'opposition', colour: '#2F80ED', abbreviation: 'M'},
  {id: 3, name: 'Liberalerna', percentage: 5.49, seats: 20, affiliation: 'opposition', colour: '#56CCF2', abbreviation: 'L'},
  {id: 4, name: 'Centerpartiet', percentage: 8.61, seats: 31, affiliation: 'opposition', colour: '#27AE60', abbreviation: 'C'},
  {id: 5, name: 'Sverigedemokraterna', percentage: 17.53, seats: 62, affiliation: 'center', colour: '#F2C94C', abbreviation: 'SD'},
  {id: 6, name: 'Socialdemokraterna', percentage: 28.26, seats: 100, affiliation: 'regering', colour: '#E04B49', abbreviation: 'S'},
  {id: 7, name: 'Miljöpartiet', percentage: 4.41, seats: 16, affiliation: 'regering', colour: '#219653', abbreviation: 'MP'},
  {id: 8, name: 'Vänsterpartiet', percentage: 8, seats: 28, affiliation: 'center', colour: '#B12827', abbreviation: 'V'},
  {id: 9, name: 'FI', percentage: 0.46, seats: 0, affiliation: 'center', colour: '#D96B97', abbreviation: 'FI'},
  {id: 10, name: 'Övriga', affiliation: 'center', colour: '#4D4D4D', percentage: 1.07, seats: 0, abbreviation: 'Ö'}
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
