import {
  balanceRemainingVotes,
  calculatePercentages,
  control,
  sort,
  selectAndAssignSeat
} from '../lib/parties'

const rawState = [
  {id: 1, name: 'Kristdemokraterna', votes: 44},
  {id: 2, name: 'Moderaterna', votes: 164},
  {id: 3, name: 'Liberalerna', votes: 42},
  {id: 4, name: 'Centerpartiet', votes: 128},
  {id: 5, name: 'Socialdemokraterna', votes: 274},
  {id: 6, name: 'Miljöpartiet', votes: 31},
  {id: 7, name: 'Vänsterpartiet', votes: 67},
  {id: 8, name: 'Sverigedemokraterna', votes: 204},
  {id: 9, name: 'FI', votes: 24},
  {id: 10, name: 'Övriga', votes: 22}
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
        .map(party => party.name === action.partyName ? {...party, selected: action.value} : party)
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
