/** @jsx pureact.createElement */

import pureact, { render } from 'pureact'
import './index.css'
import '@fontsource/miriam-libre/700.css'
import App from './components/App'
import store from './store.mjs'
import { polyfill } from 'mobile-drag-drop'
// import 'npm_package/mobile-drag-drop/default.css'
import polls from './lib/polls.mjs'
import { isValnatt } from './lib/elections.mjs'

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

setTimeout(() => store.dispatch({ type: 'LOAD_POLLS' }), 100)
store.dispatch()

const update = () => polls.fetchValnatt().then(valnatt => {
  if (!valnatt) return false
  store.dispatch({ type: 'CHOOSE_BASE_VOTES', votes: valnatt })
  return !!valnatt.final
})

// Valnattskoden aktiveras automatiskt vid nästa val (src/lib/elections.mjs)
// och pausas när räkningen är slutlig
if (isValnatt()) {
  const timer = setInterval(
    () => update().then((final) => final && clearInterval(timer)),
    60000
  )
  update()
}
