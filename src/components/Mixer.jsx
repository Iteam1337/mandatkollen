/** @jsx pureact.createElement */
import pureact from 'pureact'

import Slider from './Slider'
import store from '../store'
import { dragStart } from '../lib/draganddrop'
import './Mixer.css'

const updatePartyPercentage = (abbreviation, percentage) =>
  store.dispatch({ type: 'UPDATE_PARTY_PERCENTAGE', abbreviation, percentage })

const Mixer = ({ party, editCoalitions }) => {
  return (
    <div
      className={[party.eligable ? 'valid' : 'below', 'App-mixer'].join(' ')}
    >
      <Slider
        party={party}
        onchange={(percentage) =>
          updatePartyPercentage(party.abbreviation, percentage)
        }
      />
      <h3 draggable="true" ondragstart={dragStart(party.abbreviation)}>
        {party.abbreviation}
      </h3>
      <input
        type="text"
        attrs={{
          'aria-label': percentage,
          'aria-valuemin': 0,
          'aria-valuemax': 100,
          'aria-valuenow': party.percentage,
        }}
        className={party.changed ? 'changed' : ''}
        value={party.percentage}
        onchange={(e) =>
          updatePartyPercentage(
            party.abbreviation,
            parseFloat(e.target.value.replace(',', '.') || '0')
          )
        }
      />
    </div>
  )
}

export default Mixer
