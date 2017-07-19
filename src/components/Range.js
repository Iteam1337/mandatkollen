import React from 'pureact'
import Slider from './Slider'
import store from '../store'

const updatePartyValue = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_VALUE', partyName, value})
const updatePartySelection = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_SELECTION', partyName, value})
const updatePartyOpposition = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_OPPOSITION', partyName, value})

const Range = ({party, editCoalitions}) => (
  <div className={party.eligable ? 'valid' : 'below'}>
    { editCoalitions ? <h3>
      { party.selected || party.opposition ? null : <button onclick={e => updatePartySelection(party.name, true)}>⇠</button>}
      { party.opposition ? <button onclick={e => updatePartySelection(party.name, false)}>⇠</button> : null}
      {party.abbreviation}
      { !party.opposition && !party.selected ? <button onclick={e => updatePartyOpposition(party.name, true)}>⇢</button> : null}
      { party.selected  ? <button onclick={e => updatePartySelection(party.name, false)}>⇢</button> : null}
    </h3> : (
      <h3>
        {party.abbreviation}
      </h3>
    )}

    <Slider party={party} oninput={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} />
        <input type="text" value={party.percentage} onkeyup={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} />%<br/>
  </div>
)

export default Range
