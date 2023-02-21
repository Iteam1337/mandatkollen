/** @jsx pureact.createElement */

import pureact, { render } from 'pureact'
import './index.css'
import '@fontsource/miriam-libre/700.css'
import App from './components/App'
import store from './store.mjs'
import { init } from './lib/matomo.mjs'
import { polyfill } from 'mobile-drag-drop'
// import 'npm_package/mobile-drag-drop/default.css'
import polls from './lib/polls.mjs'

polyfill()

let oldTree

store.subscribe(() => {
  const state = store.getState()
  oldTree = render(
    <App {...state} />,
    document.getElementById('mandatkollen'),
    oldTree
  )

})

store.dispatch({ type: 'LOAD_POLLS' })

init()

/*

This is for next election to activate to get live polls

const update = () => polls.fetchValnatt().then(valnatt => {
  store.dispatch({ type: 'CHOOSE_BASE_VOTES', votes: valnatt })
})

setInterval(update, 60000)
update()
*/
store.dispatch()

