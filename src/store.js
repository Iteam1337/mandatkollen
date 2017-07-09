import {createStore} from 'pureact'
import parties from './reducers/parties'

const reducer = (state, action) => ({
  parties: parties(state.parties, action)
})

const store = createStore(reducer)

export default store
