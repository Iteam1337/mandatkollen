import React, {render} from 'pureact'
import './index.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import App from './App'
import store from './store'
import DragDropPolyfill from "drag-drop-polyfill";
import "drag-drop-polyfill/drag-drop-polyfill.css";

//DragDropPolyfill.Initialize();

let oldTree
store.subscribe(() => {
  const state = store.getState()
  oldTree = render(<App {...state} />, document.getElementById('root'), oldTree)
})
