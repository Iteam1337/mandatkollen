import React from 'pureact'
import Slider from './Slider'
import store from '../store'

const updatePartyValue = (abbreviation, value) => store.dispatch({type: 'UPDATE_PARTY_VALUE', abbreviation, value})
const updatePartyAffiliation = (abbreviation, affiliation) => store.dispatch({type: 'UPDATE_PARTY_AFFILIATION', abbreviation, affiliation })

const Mixer = ({party, editCoalitions}) => (
  <div className={[party.eligable ? 'valid' : 'below', 'App-range'].join(' ')}>
    <h3 className={party.abbreviation.toLowerCase()}>
      {party.abbreviation}
    </h3>
    { editCoalitions ? 
      <span>
        { party.affiliation === 'opposition' ? <button onclick={e => updatePartyAffiliation(party.abbreviation, 'center')}>⇠</button> : null }

        { party.affiliation === 'center' ? <button onclick={e => updatePartyAffiliation(party.abbreviation, 'regering')}>⇠</button> : null }
        { party.affiliation === 'center' ? <button onclick={e => updatePartyAffiliation(party.abbreviation, 'opposition')}>⇢</button> : null }

        { party.affiliation === 'regering' ? <button onclick={e => updatePartyAffiliation(party.abbreviation, 'center')}>⇢</button> : null }
      </span>
    : <span>
        <input type="text" value={party.percentage} onchange={e => updatePartyValue(party.abbreviation, parseFloat(e.target.value.replace(',', '.') || '0'))} />
        <Slider party={party} oninput={e => updatePartyValue(party.abbreviation, parseInt(e.target.value, 10) / 10)} />
      </span>}
  </div>
)

export default Mixer
