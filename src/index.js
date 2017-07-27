import React, {render} from 'pureact'
import './index.css'
import 'roboto-fontface/css/roboto-condensed/roboto-condensed-fontface.css'
import App from './components/App'
import store from './store'
import {polyfill} from 'mobile-drag-drop'
import 'mobile-drag-drop/default.css'

let oldTree
store.subscribe(() => {
  const state = store.getState()
  oldTree = render(<App {...state} />, document.getElementById('root'), oldTree)
})
