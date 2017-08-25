import React from 'pureact'
import Slider from './Slider'
import store from '../store'
import { dragStart } from '../lib/draganddrop'
import './Mixer.css'

const updatePartyPercentage = (abbreviation, percentage) => store.dispatch({type: 'UPDATE_PARTY_PERCENTAGE', abbreviation, percentage})

const Mixer = ({party, editCoalitions}) => {

  return (
    <div className={[party.eligable ? 'valid' : 'below', 'App-mixer'].join(' ')}>
      <span>
        <input type="text" className={party.changed ? 'changed' : ''} value={party.percentage} onchange={e => updatePartyPercentage(party.abbreviation, parseFloat(e.target.value.replace(',', '.') || '0'))} />
        <Slider party={party} onchange={percentage => updatePartyPercentage(party.abbreviation, percentage)} />
      </span>
      <h3 draggable="true" ondragstart={dragStart(party.abbreviation)} className={party.abbreviation.toLowerCase()}>
        {party.abbreviation}
      </h3>
    </div>
  )
}

export default Mixer
