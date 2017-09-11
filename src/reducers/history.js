import history from '../lib/history.js'

let initialState = history.fetchHistory().then(polls => {
  return polls[0].date
})

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CHOOSE_BASE_VOTES': {
      return action.votes.date
    }
    default: return state
  }
}
