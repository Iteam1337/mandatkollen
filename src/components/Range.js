import React from 'pureact'
import Slider from './Slider'
import store from '../store'

const updatePartyValue = (partyId, value) => store.dispatch({type: 'UPDATE_PARTY_VALUE', partyId, value})
const updatePartySelection = (partyId, value) => store.dispatch({type: 'UPDATE_PARTY_SELECTION', partyId, value})
const updatePartyOpposition = (partyId, value) => store.dispatch({type: 'UPDATE_PARTY_OPPOSITION', partyId, value})

const Range = ({party, editCoalitions}) => (
  <div className={party.eligable ? 'valid' : 'below'}>
    { editCoalitions ? <h3>
      {party.abbreviation}
      { party.selected || party.opposition ? null : <button onclick={e => updatePartySelection(party.id, true)}>⇠</button>}
      { party.opposition ? <button onclick={e => updatePartySelection(party.id, false)}>⇠</button> : null}
      { !party.opposition && !party.selected ? <button onclick={e => updatePartyOpposition(party.id, true)}>⇢</button> : null}
      { party.selected  ? <button onclick={e => updatePartySelection(party.id, false)}>⇢</button> : null}
    </h3> : (
      <h3>
        {party.abbreviation}
      </h3>
    )}

    <Slider party={party} oninput={e => updatePartyValue(party.id, parseInt(e.target.value, 10) / 10)} />
        <input type="text" value={party.percentage} onkeyup={e => updatePartyValue(party.id, parseInt(e.target.value, 10))} />%<br/>
  </div>
)

export default Range
