import coalitions from './coalitions'
import parties from './parties'
import history from './history'

const reducer = (state, action) => ({
  history: history(state.history, action),
  parties: parties(state.parties, action),
  coalitions: coalitions(state.coalitions, action)
})

export default reducer