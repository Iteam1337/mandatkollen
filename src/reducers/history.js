import polls from '../lib/polls'

let initialState = polls.fetchHistory().then(history => {
  return history[0] ? Object.assign(history, {date: history[0].date}) : history
})

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CHOOSE_BASE_VOTES': {
      console.log('choose_base_vote', action)
      return Object.assign(state, {date: action.votes.date})
    }
    default: return state
  }
}
