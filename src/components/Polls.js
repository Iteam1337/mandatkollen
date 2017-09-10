import React from 'pureact'
import store from '../store'

const chooseBaseVotes = (votes) => store.dispatch({type: 'CHOOSE_BASE_VOTES', votes})

const Polls = ({polls}) => {
  return (
    <div>
      <select onchange={event => chooseBaseVotes(polls[event.target.value])}>
        {Object.keys(polls).map((key) => (
          <option value={key}>{polls[key].date}</option>
        ))}
      </select>
    </div>
  )
}


export default Polls