import React, {render} from 'pureact'
import './index.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import App from './components/App'
import store from './store'

let oldTree
store.subscribe(() => {
  const state = store.getState()
  oldTree = render(<App {...state} />, document.getElementById('root'), oldTree)
})
