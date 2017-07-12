import {
  balanceRemainingVotes,
  calculatePercentages,
  control,
  sort,
  selectAndAssignSeat
} from '../lib/parties'

const rawState = [
  {id: 1, name: 'Kristdemokr.', votes: 44, opposition: true, colour: '#366da3', abbrivation: 'KD'},
  {id: 2, name: 'Moderaterna', votes: 164, opposition: true, colour: '#88c7d9', abbrivation: 'M'},
  {id: 3, name: 'Liberalerna', votes: 42, opposition: true, colour: '#378cab', abbrivation: 'L'},
  {id: 4, name: 'Centerpartiet', votes: 128, opposition: true, colour: '#78ae5a', abbrivation: 'C'},
  {id: 5, name: 'Sverigedemokr.', votes: 204, colour: '#e7d960', abbrivation: 'SD'},
  {id: 6, name: 'Socialdemokr.', votes: 274, selected: true, colour: '#c13b38', abbrivation: 'S'},
  {id: 7, name: 'Miljöpartiet', votes: 31, selected: true, colour: '#acc768', abbrivation: 'MP'},
  {id: 8, name: 'Vänsterpartiet', votes: 67, colour: '#992522', abbrivation: 'V'},
  {id: 9, name: 'FI', votes: 24, colour: '#fab', abbrivation: 'FI'},
  {id: 10, name: 'Övriga', votes: 22, abbrivation: 'Ö'}
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
    case 'UPDATE_PARTY_SELECTION': {
      const updatedParties = state
        .map(party => party.name === action.partyName ? {...party, selected: action.value, opposition: false} : party)
        .sort(sort)
      return updatedParties
    }
    case 'UPDATE_PARTY_OPPOSITION': {
      const updatedParties = state
        .map(party => party.name === action.partyName ? {...party, selected: false, opposition: action.value} : party)
        .sort(sort)
      return updatedParties
    }
    case 'UPDATE_PARTY_VALUE': {
      const updatedParties = state
        .map(party => party.name === action.partyName ? updateVotes(party, action.value) : party)
        .map(percentage)

      return balanceAndCalculateSeats(updatedParties)
    }
    default: return state
  }
}
