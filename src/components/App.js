import React, { Component } from 'pureact'
import './App.css'
import store from '../store'
import Seating from './Seating'
import Range from './Range'
import Labels from './Labels'
import Footer from './Footer'

const updateCoalitions = (value) => store.dispatch({type: 'EDIT_COALITIONS', value})



class App extends Component {
  render () {
    const {parties, coalitions} = this.props
    const regering = parties.filter(a => a.selected && a.eligable).sort((a, b) => b.id - a.id)
    const opposition = parties.filter(a => a.opposition && a.eligable).sort((a, b) => b.id - a.id)
    const center = parties.filter(a => a.eligable && !a.opposition && !a.selected).sort((a, b) => b.id - a.id)
    const regeringPercentage = Math.round(regering.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const oppositionPercentage = Math.round(opposition.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const centerPercentage = Math.round(center.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const sumPercentage = Math.round((centerPercentage + regeringPercentage) * 10) / 10
    return (
      <div className="App">
        <div className="App-header">
          <h2>Riksdagskollen</h2>
        </div>
        <Seating parties={parties.slice().reverse()} seatCount={false} />

        <div className="legend">
          <fieldset>
            <legend>Summa {sumPercentage}%</legend>
            <fieldset>
              <legend>{regeringPercentage}%</legend>
              <Labels key="regering" parties={regering} />
            </fieldset>
            <fieldset>
              <legend>Övriga {centerPercentage}%</legend>
              <Labels key="center" parties={center} />
            </fieldset>
          </fieldset>
          <fieldset>
            <legend>{oppositionPercentage}%</legend>
            <Labels key="opposition" parties={opposition} />
          </fieldset>
        </div>
        <small>Grafik: Riksdagskollen. Av: Iteam och Lennox PR.</small>
        <h2>Hypotetiskt valresultat</h2>
        <div className="sliders">
          <section>
            {parties.filter(x => x.selected).map(party => (
              <Range party={party} editCoalitions={coalitions.editCoalitions}/>
            ))}
          </section>
          <section>
            {parties.filter(x => !x.selected && !x.opposition).map(party => (
              <Range party={party} editCoalitions={coalitions.editCoalitions}/>
            ))}
          </section>
          <section>
            {parties.filter(x => x.opposition).map(party => (
              <Range party={party} editCoalitions={coalitions.editCoalitions}/>
            ))}
          </section>
        </div>
        <div className="App-divider">
          <label htmlFor="coalitions">Redigera koalitioner</label><input type="checkbox" checked={coalitions.editCoalitions} onchange={e => updateCoalitions(e.target.checked)} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
