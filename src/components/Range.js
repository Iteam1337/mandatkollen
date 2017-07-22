import React from 'pureact'
import Slider from './Slider'
import store from '../store'

const updatePartyValue = (partyId, value) => store.dispatch({type: 'UPDATE_PARTY_VALUE', partyId, value})
const updatePartyAffiliation = (partyId, affiliation) => store.dispatch({type: 'UPDATE_PARTY_AFFILIATION', partyId, affiliation })

const Range = ({party, editCoalitions}) => (
  <div className={[party.eligable ? 'valid' : 'below', 'App-range'].join(' ')}>
    <h3 className={party.abbreviation.toLowerCase()}>
      {party.abbreviation}
    </h3>
    { editCoalitions ? 
      <span>
        { party.affiliation === 'opposition' ? <button onclick={e => updatePartyAffiliation(party.id, 'center')}>⇠</button> : null }

        { party.affiliation === 'center' ? <button onclick={e => updatePartyAffiliation(party.id, 'regering')}>⇠</button> : null }
        { party.affiliation === 'center' ? <button onclick={e => updatePartyAffiliation(party.id, 'opposition')}>⇢</button> : null }

        { party.affiliation === 'regering' ? <button onclick={e => updatePartyAffiliation(party.id, 'center')}>⇢</button> : null }
      </span>
    : <span>
        <Slider party={party} oninput={e => updatePartyValue(party.id, parseInt(e.target.value, 10) / 10)} />
        <input type="text" value={party.percentage} onkeyup={e => updatePartyValue(party.id, parseInt(e.target.value, 10))} />
      </span>}
  </div>
)

export default Range
