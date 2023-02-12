/** @jsx pureact.createElement */
import pureact from 'pureact'

import Mixer from './Mixer.jsx'
import { dragOver, dropUpdate, dragEnter } from '../lib/draganddrop'

const Sliders = ({ parties, editCoalitions }) => (
  <div className="App-sliders" id="sliders">
    <section
      ondragenter={dragEnter}
      ondragover={dragOver}
      ondrop={dropUpdate('regering')}
    >
      {parties
        .filter((x) => x.affiliation === 'regering')
        .map((party) => (
          <Mixer party={party} editCoalitions={editCoalitions} />
        ))}
    </section>
    <section
      ondragenter={dragEnter}
      ondragover={dragOver}
      ondrop={dropUpdate('stod')}
    >
      {parties
        .filter((x) => x.affiliation === 'stod')
        .map((party) => (
          <Mixer party={party} editCoalitions={editCoalitions} />
        ))}
    </section>
    <section
      ondragenter={dragEnter}
      ondragover={dragOver}
      ondrop={dropUpdate('opposition')}
    >
      {parties
        .filter((x) => x.affiliation === 'opposition')
        .map((party) => (
          <Mixer party={party} editCoalitions={editCoalitions} />
        ))}
    </section>
  </div>
)

export default Sliders
