import {createStore} from 'pureact'
import parties from './reducers/parties'
import coalitions from './reducers/coalitions'
import groups from './reducers/groups'

const reducer = (state, action) => ({
  parties: parties(state.parties, action),
  coalitions: coalitions(state.coalitions, action),
  groups: groups(state.groups, action)
})

const store = createStore(reducer)

export default store
