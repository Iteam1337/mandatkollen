import React from 'pureact'
import store from '../store'
import './History.css'

const chooseBaseVotes = (votes) => store.dispatch({type: 'CHOOSE_BASE_VOTES', votes})

const History = ({history}) => {
  return (<div className="App-history">
    <img src="https://pollofpolls.se/poll_img/pollofpolls.svg"/>
    <input type="range" className="polls" max={history.length-1} value="100" oninput={event => chooseBaseVotes(history[history.length - 1 - event.target.value])} />
    <small>{history.date}</small>
  </div>)
}


export default History