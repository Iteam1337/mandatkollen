import {createStore} from 'pureact'
import parties from './reducers/parties'
import coalitions from './reducers/coalitions'

const reducer = (state, action) => ({
  parties: parties(state.parties, action),
  coalitions: coalitions(state.coalitions, action)
})

const store = createStore(reducer)

export default store
