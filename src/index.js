import React, {render} from 'pureact';
import './index.css';
import App from './App';
import store from './store';

let oldTree
store.subscribe(() => {
  const state = store.getState()
  oldTree = render(<App {...state} />, document.getElementById('root'), oldTree);
})