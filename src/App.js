import React, { Component } from 'pureact'
import logo from './logo.svg'
import './App.css'
import store from './store'
import Seating from './Seating'
import Slider from './Slider'
import Labels from './Labels'

const updatePartyValue = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_VALUE', partyName, value})
const updatePartySelection = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_SELECTION', partyName, value})
const updatePartyOpposition = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_OPPOSITION', partyName, value})

const Range = ({party}) => (
  <div className={ party.eligable ? 'valid' : 'below'}>
    <h3>{party.name}
      <input type="text" value={party.percentage} onchange={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} />%
    </h3>
    <label htmlFor={party.name + 'block1'}>Regering</label>
    <input id={party.name + 'block1'} type="checkbox" checked={party.selected} onchange={e => updatePartySelection(party.name, e.target.checked)} />
    <Slider value={party.percentage} color={party.colour} oninput={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} step="1" max="60" min="0" />
    <input type="checkbox" id={party.name + 'block2'} checked={party.opposition} onchange={e => updatePartyOpposition(party.name, e.target.checked)} />
    <label htmlFor={party.name + 'block2'}>Opposition</label>
  </div>
)


class App extends Component {
  render () {
    const regering = this.props.parties.filter(a => a.selected && a.eligable).sort((a, b) => b.seatPercentage - a.seatPercentage)
    const opposition = this.props.parties.filter(a => a.opposition && a.eligable).sort((a, b) => b.seatPercentage - a.seatPercentage)
    const center = this.props.parties.filter(a => a.eligable && !a.opposition && !a.selected).sort((a, b) => b.seatPercentage - a.seatPercentage)
    const regeringPercentage = Math.round(regering.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const oppositionPercentage = Math.round(opposition.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const centerPercentage = Math.round(center.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Riksdagskollen</h2>
        </div>
        <Seating parties={this.props.parties.reverse()} seatCount={false} />
        <small>Visualisering: Iteam. Idé: Lennox PR. Data: Inizio juni 2017. </small>

         {regering.length ? <p className="App-summary">
          <section>
            <h1>Regering {regeringPercentage}%</h1>
            <Labels key="regering" parties={regering} />
          </section>
          <section>
            <h1>Opposition {oppositionPercentage}%</h1>
            <Labels key="opposition" parties={opposition} />
          </section>
          <section>
            <h1>Vågmästare {centerPercentage}%</h1>
            <Labels key="center" parties={center} />
          </section>
        </p> : null}

        <p className="App-intro">
          {this.props.parties.reverse().map(party => (
            <Range party={party} />
          ))}
        </p>
       
      </div>
    )
  }
}

export default App
