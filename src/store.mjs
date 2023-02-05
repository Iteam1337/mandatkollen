import { createStore } from 'pureact'
import reducers from './reducers/index.mjs'

const store = createStore(reducers)

export default store
