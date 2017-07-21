import React, { Component } from 'pureact'
import './App.css'
import store from '../store'
import Seating from './Seating'
import Range from './Range'
import Labels from './Labels'
import Footer from './Footer'
import Switch from './Switch'

const updateCoalitions = (value) => store.dispatch({type: 'EDIT_COALITIONS', value})
const updatePartyAffiliation = (partyId, affiliation) => store.dispatch({type: 'UPDATE_PARTY_AFFILIATION', partyId, value: affiliation })

const Sliders = ({parties, editCoalitions}) => 
  <div className="sliders">
    <section>
      {parties.filter(x => x.selected).map(party => (
        <Range party={party} editCoalitions={editCoalitions}/>
      ))}
    </section>
    <section>
      {parties.filter(x => !x.selected && !x.opposition).map(party => (
        <Range party={party} editCoalitions={editCoalitions}/>
      ))}
    </section>
    <section>
      {parties.filter(x => x.opposition).map(party => (
        <Range party={party} editCoalitions={editCoalitions}/>
      ))}
    </section>
  </div>

class App extends Component {
  render () {
    const {parties, coalitions} = this.props
    const regering = parties.filter(a => a.selected && a.eligable).sort((a, b) => b.seats - a.seats)
    const opposition = parties.filter(a => a.opposition && a.eligable).sort((a, b) => a.seats - b.seats)
    const center = parties.filter(a => a.eligable && !a.opposition && !a.selected).sort((a, b) => b.id - a.id)
    const allParties = regering.concat(center).concat(opposition)
    const regeringPercentage = Math.round(regering.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const oppositionPercentage = Math.round(opposition.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const centerPercentage = Math.round(center.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const sumPercentage = Math.round((centerPercentage + regeringPercentage) * 10) / 10

    const dragover = event => {
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
    }

    const dropUpdate = (arg) => event => {
      event.preventDefault()
      updatePartyAffiliation(+event.dataTransfer.getData('text'), arg)
    }

    const dropRegeringen = dropUpdate({
      selected: true,
      opposition: false
    })

    const dropOpposition = dropUpdate({
      selected: false,
      opposition: true
    })

    const dropCenter = dropUpdate({
      selected: false,
      opposition: false
    })

    return (
      <div className="App">
        <div className="App-header">
          <h2>Riksdagskollen</h2>
        </div>
        <div className="App-main">
          <Seating parties={allParties} seatCount={false} />

          <div className="LegendContainer">
            <div className="LegendGroup" ondragover={dragover} ondrop={dropRegeringen}>
              <h1>Regering {regeringPercentage}%</h1>
              <Labels key="regeringen" parties={regering} />
            </div>
            <div className="LegendGroup" ondragover={dragover} ondrop={dropCenter}>
              <h1>Övriga {centerPercentage}%</h1>
              <Labels key="center" parties={center} />
            </div>
            <div className="LegendGroup" ondragover={dragover} ondrop={dropOpposition}>
              <h1>Opposition {oppositionPercentage}%</h1>
              <Labels key="opposition" parties={opposition} />
            </div>
          </div>

          <small>Grafik: Riksdagskollen. Av: Iteam och Lennox PR.</small>
          <div className="App-divider">
            <h2>Hypotetiskt valresultat</h2>
            <p>Dra i reglagen nedan för att simulera ett valresultatet.</p>
          </div>         
          <Sliders parties={parties} editCoalitions={coalitions.editCoalitions} />
        </div>
        <div className="App-divider">
          <h3>Redigera koalitioner</h3>
          <p>Dra och släpp partisymbolerna i grafiken ovan för att justera simulera olika koalitionsalternativ, eller använd reglaget nedan för att visa pilknappar. </p>
          <Switch checked={coalitions.editCoalitions} onchange={e => updateCoalitions(e.target.checked)}/>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
