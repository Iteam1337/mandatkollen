/** @jsx pureact.createElement */
import pureact from 'pureact'

import React from 'pureact'
import store from '../store.mjs'
import './Polls.css'

const chooseBaseVotes = (votes) => {
  store.dispatch({ type: 'CHOOSE_BASE_VOTES', votes })
  window?.scrollTo({
    top: document.getElementById('summary').offsetTop - 10,
    behavior: 'smooth',
  })
}

const Polls = ({ polls }) => {
  return (
    <div className="App-polls">
      {polls.map((poll) => (
        <div className="poll">
          <button
            onclick={(event) => chooseBaseVotes(poll)}
          >{`${poll.institute}`}</button>
          <small>{poll.dates}</small>
        </div>
      ))}
    </div>
  )
}

export default Polls
