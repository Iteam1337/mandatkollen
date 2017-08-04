import React from 'pureact'
import Slider from './Slider'
import store from '../store'

const updatePartyPercentage = (abbreviation, percentage) => store.dispatch({type: 'UPDATE_PARTY_PERCENTAGE', abbreviation, percentage})

const Mixer = ({party, editCoalitions}) => {
  const dragstart = (event) => {
    event.dataTransfer.setData('Text', party.abbreviation)
    event.dataTransfer.effectAllowed = 'move';
  }
  return (
    <div className={[party.eligable ? 'valid' : 'below', 'App-range'].join(' ')}>
      <span>
        <input type="text" value={party.percentage} onchange={e => updatePartyPercentage(party.abbreviation, parseFloat(e.target.value.replace(',', '.') || '0'))} />
        <Slider party={party} onchange={percentage => updatePartyPercentage(party.abbreviation, percentage)} />
      </span>
      <h3 draggable="true" ondragstart={dragstart} className={party.abbreviation.toLowerCase()}>
        {party.abbreviation}
      </h3>
    </div>
  )
}

export default Mixer
