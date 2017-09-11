import history from '../lib/history.js'

const initialState = history.fetchHistory().catch(Promise.resolve(history.baseVotes))

export default function (state = initialState, action) {
  switch (action.type) {
    default: return state
  }
}
