import React, { Component } from 'pureact';
import logo from './logo.svg';
import './App.css';
import store from './store'

const updatePartyValue = (party, value) => store.dispatch({type: 'UPDATE_PARTY_VALUE', party, value})

const Range = ({name, value}) => (
  <div>
    <label htmlFor="SD">{name}</label>
    <input type="range" value={value} oninput={e => updatePartyValue(name, parseInt(e.target.value, 10))} max="60" min="0" name={name} id={name} />
    <input type="text" value={value} onchange={e => updatePartyValue(name, parseInt(e.target.value, 10))} />%
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
          {Object.keys(this.props.parties).map(party => (
            <Range name={party} value={this.props.parties[party].value} />
          ))}
          Totalt: {Math.round(Object.keys(this.props.parties).reduce((total, party) => total+this.props.parties[party].value,0))}
          
        </p>
      </div>
    );
  }
}

export default App;
