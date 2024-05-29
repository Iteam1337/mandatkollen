/** @jsx pureact.createElement */
import pureact from 'pureact'

import Mixer from './Mixer.jsx'
import { dragOver, dropUpdate, dragEnter } from '../lib/draganddrop'

const Sliders = ({ groups, parties, editCoalitions }) => (
  <div className="App-sliders" id="sliders">
    {Object.entries(groups).map(([group, { title }]) => (
      <section
        ondragenter={dragEnter}
        ondragover={dragOver}
        ondrop={dropUpdate(group)}
      >
        {parties
          .filter((x) => x.affiliation === group || x.eu === group)
          .map((party) => (
            <Mixer party={party} editCoalitions={editCoalitions} />
          ))}
      </section>
    ))}
  </div>
)

export default Sliders
