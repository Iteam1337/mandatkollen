import polls from '../lib/polls'

let initialState = polls.fetchPolls()

export default function (state = initialState, action) {
  console.log(action, state)
  switch (action.type) {
    default: return state
  }
}
