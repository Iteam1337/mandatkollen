import history from '../lib/history.js'

export default function (state = history.fetchHistory(), action) {
  switch (action.type) {
    default: return state
  }
}
