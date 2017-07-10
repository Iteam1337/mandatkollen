import React, { Component } from 'pureact';
import logo from './logo.svg';
import './App.css';
import store from './store'
import Charts from './Charts'

const updatePartyValue = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_VALUE', partyName, value})
const updatePartySelection = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_SELECTION', partyName, value})

const Range = ({party}) => (
  <div className={ party.eligable ? "valid" : "below"}>
    <label>{party.name}</label>
    <input type="checkbox" checked={party.selected} onchange={e => updatePartySelection(party.name, e.target.checked)} />
    <input type="range" value={party.percentage} oninput={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} step="1" max="60" min="0" />
    <input type="text" value={party.percentage} onchange={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} />% 
  </div>
)

class App extends Component {
  render() {

    const regering = this.props.parties.filter(a => a.selected && a.eligable).sort((a,b) => b.seatPercentage - a.seatPercentage)
    const opposition = this.props.parties.filter(a => !a.selected && a.eligable).sort((a,b) => b.seatPercentage - a.seatPercentage)
    const regeringPercentage = Math.round(regering.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const oppositionPercentage = Math.round(opposition.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Riksdagskollen</h2>
        </div>
        <p className="App-intro">
          {this.props.parties.map(party => (
            <Range party={party} />
          ))}
        </p>
        {regering.length ? <p className="App-summary">
          <section>
          <h1>Regeringsalternativ {regeringPercentage}%</h1>
          {regering.map(party => (
            <div>
              <h2>{party.name}</h2>
              <small>{party.seats} mandat {Math.round(party.seatPercentage * 100)}%</small>
            </div>
          ))}
          </section>
          <section>
          <h1>Opposition {oppositionPercentage}%</h1>
          {opposition.map(party => (
            <div>
              <h3>{party.name}</h3>
              <small>{party.seats} mandat {Math.round(party.seatPercentage * 100)}%</small>
            </div>
          ))}
          </section>
        </p> : null}
      </div>
    );
  }
}

export default App;
