import React from 'pureact'
import store from '../store'

const chooseBaseVotes = (source) => store.dispatch({type: 'CHOOSE_BASE_VOTES', source})
const updatePolls = (polls) => store.dispatch({type: 'UPDATE_POLLS', polls})

const Polls = ({history}) => {

  return Object.keys(history.baseVotes).map(source => (
    <button onclick={e => chooseBaseVotes(source)}>{source}</button>)
  )
}


export default Polls