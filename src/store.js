import { createStore } from "pureact"
import reducers from "./reducers/index"

const store = createStore(reducers)

export default store
