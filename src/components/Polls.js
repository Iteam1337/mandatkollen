import React from 'pureact'
import store from '../store'

const chooseBaseVotes = (votes) => store.dispatch({type: 'CHOOSE_BASE_VOTES', votes})

const Polls = ({polls}) => {
  return <input type="range" className="polls" max={polls.length-1} oninput={event => chooseBaseVotes(polls[event.target.value])} />
}


export default Polls