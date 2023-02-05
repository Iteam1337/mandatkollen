import coalitions from './coalitions'
import parties from './parties'
import history from './history'
import polls from './polls'
import groups from './groups'

const reducer = async (state, action) => ({
  history: await history(state.history, action),
  polls: await polls(state.polls, action),
  parties: await parties(state.parties, action),
  groups: groups(state.groups, action),
  coalitions: coalitions(state.coalitions, action),
})

export default reducer
