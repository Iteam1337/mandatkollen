import React, { render } from "pureact"
import "./index.css"
import "typeface-miriam-libre"
import App from "./components/App"
import store from "./store"
import { polyfill } from "mobile-drag-drop"
import "mobile-drag-drop/default.css"
import polls from "./lib/polls"

polyfill()

let oldTree

store.subscribe(() => {
  const state = store.getState()
  oldTree = render(
    <App {...state} />,
    document.getElementById("mandatkollen"),
    oldTree
  )
})
/*

This is for next election to activate to get live polls

const update = () => polls.fetchValnatt().then(valnatt => {
  store.dispatch({ type: 'CHOOSE_BASE_VOTES', votes: valnatt })
})

setInterval(update, 60000)
update()
*/
store.dispatch()
