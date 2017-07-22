import {
  balanceRemainingVotes,
  calculatePercentages,
  control,
  sort,
  selectAndAssignSeat
} from '../lib/parties'

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

const range = nr => [...Array(nr).keys()]
const countTotal = parties => parties.reduce((total, party) => total + party.votes, 0)
const maxVotes = countTotal(rawState)
const percentage = calculatePercentages(rawState)
const updateVotes = (party, votes) => ({
  ...party,
  votes: Math.round(votes / 100 * maxVotes),
  changed: new Date()
})

const balanceAndCalculateSeats = parties => {
  const balanced = range(10)
    .reduce((parties) => balanceRemainingVotes(parties, maxVotes), parties)
    .map(percentage)
    .map(control)

  const seats = range(349)
    .reduce((parties, seat) => selectAndAssignSeat(parties, seat), balanced)

  return seats
}

const initialState = balanceAndCalculateSeats(balanceRemainingVotes(rawState, maxVotes).map(percentage))

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_PARTY_AFFILIATION': {
      const updatedParties = state
        .map(party => party.id === action.partyId ? {...party, affiliation: action.affiliation} : party)
        .sort(sort)
      return updatedParties
    }
    case 'UPDATE_PARTY_VALUE': {
      const updatedParties = state
        .map(party => party.id === action.partyId ? updateVotes(party, action.value) : party)
        .map(percentage)

      return balanceAndCalculateSeats(updatedParties)
    }
    default: return state
  }
}
