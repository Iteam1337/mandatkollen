import React, { Component } from 'pureact'
import './App.css'
import store from '../store'
import Seating from './Seating'
import Mixer from './Mixer'
import Labels from './Labels'
import Footer from './Footer'
import Switch from './Switch'

const updateCoalitions = (value) => store.dispatch({type: 'EDIT_COALITIONS', value})
const updatePartyAffiliation = (partyId, affiliation) => store.dispatch({type: 'UPDATE_PARTY_AFFILIATION', partyId, affiliation })

const Sliders = ({parties, editCoalitions}) => 
  <div className="App-sliders">
    <section>
      {parties.filter(x => x.affiliation === 'regering').map(party => (
        <Mixer party={party} editCoalitions={editCoalitions}/>
      ))}
    </section>
    <section>
      {parties.filter(x =>x.affiliation === 'center').map(party => (
        <Mixer party={party} editCoalitions={editCoalitions}/>
      ))}
    </section>
    <section>
      {parties.filter(x => x.affiliation === 'opposition').map(party => (
        <Mixer party={party} editCoalitions={editCoalitions}/>
      ))}
    </section>
  </div>

class App extends Component {
  render () {
    const {parties, coalitions} = this.props
    const regering = parties.filter(a => a.affiliation === 'regering' && a.eligable).sort((a, b) => b.seats - a.seats)
    const opposition = parties.filter(a => a.affiliation === 'opposition' && a.eligable).sort((a, b) => a.seats - b.seats)
    const center = parties.filter(a => a.eligable && a.affiliation === 'center').sort((a, b) => b.id - a.id)
    const allParties = regering.concat(center).concat(opposition)
    const regeringPercentage = Math.round(regering.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const oppositionPercentage = Math.round(opposition.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const centerPercentage = Math.round(center.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const totalPercentage = Math.round(parties.reduce((t, party) => t + party.percentage, 0))

    const dragover = event => {
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
    }

    const dropUpdate = (arg) => event => {
      event.preventDefault()
      updatePartyAffiliation(+event.dataTransfer.getData('text'), arg)
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Riksdagskollen</h2>
        </div>
        <div className="App-main">
          <Seating parties={allParties} seatCount={false} />

          <div className="LegendContainer">
            <div className="LegendGroup" ondragover={dragover} ondrop={dropUpdate('regering')}>
              <h1>Regering {regeringPercentage}%</h1>
              <Labels key="regeringen" parties={regering} />
            </div>
            <div className="LegendGroup" ondragover={dragover} ondrop={dropUpdate('center')}>
              <h1>Övriga {centerPercentage}%</h1>
              <Labels key="center" parties={center} />
            </div>
            <div className="LegendGroup" ondragover={dragover} ondrop={dropUpdate('opposition')}>
              <h1>Opposition {oppositionPercentage}%</h1>
              <Labels key="opposition" parties={opposition} />
            </div>
          </div>

          <small>Grafik: Riksdagskollen. Av: Iteam och Lennox PR.</small>
          <Sliders parties={parties} editCoalitions={coalitions.editCoalitions} />
          {(totalPercentage < 99.6 || totalPercentage > 100.4) ? <p className="invalid">Vänligen justera  manuellt. Totalt antal procent: {totalPercentage}%</p> : null}
          <div className="App-divider">
            <p>Dra och släpp partisymbolerna i grafiken ovan eller använd pilknappar:</p>
            <Switch checked={coalitions.editCoalitions} onchange={e => updateCoalitions(e.target.checked)}/>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
