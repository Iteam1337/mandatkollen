import React, { Component } from 'pureact';
import logo from './logo.svg';
import './App.css';
import store from './store'

const updatePartyValue = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_VALUE', partyName, value})

const Range = ({party}) => (
  <div className={ party.eligable ? "valid" : "below"}>
    <label>{party.name}</label>
    <input type="range" value={party.percentage} oninput={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} step="1" max="60" min="0" />
    <input type="text" value={party.percentage} onchange={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} />% 
    <label>{party.seats || "0"} mandat ({Math.round(party.seatPercentage * 1000)/10}%)</label>
  </div>
)

class App extends Component {
  render() {
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
      </div>
    );
  }
}

export default App;
