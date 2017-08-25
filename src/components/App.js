import React, { Component } from 'pureact'
import { dragOver, dropUpdate, dragEnter, dragLeave } from '../lib/draganddrop'
import { fetchHistory } from '../lib/history'
import { store } from '../store'
import './App.css'
import Seating from './Seating'
import Sliders from './Sliders'
import Polls from './Polls'
import Footer from './Footer'


class App extends Component {
  sumGroups(parties) {
    const regering = parties.filter(a => a.affiliation === 'regering').sort((a, b) => b.seats - a.seats)
    const opposition = parties.filter(a => a.affiliation === 'opposition').sort((a, b) => b.seats - a.seats)
    const center = parties.filter(a => a.affiliation === 'center').sort((a, b) => b.seats - a.seats)

    return [
      {
        name: 'regering',
        parties: regering,
        title: `Regering`,
        seats: regering.reduce((t, party) => t + party.seats, 0),
        percentage: Math.round(regering.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
      },
      {
        name: 'center',
        parties: center,
        title: `Övriga`,
        seats: center.reduce((t, party) => t + party.seats, 0),
        percentage: Math.round(center.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
      },
      {
        name: 'opposition',
        parties: opposition,
        title: `Opposition`,
        percentage: Math.round(opposition.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10,
        seats: opposition.reduce((t, party) => t + party.seats, 0)
      }
    ]
  }
  render () {
    const {parties, coalitions, groups, history} = this.props
    const legendGroups = this.sumGroups(parties)
    const allParties = legendGroups.reduce((a, b) => a.concat(b.parties), [])
    const totalPercentage = Math.round(parties.reduce((t, party) => t + party.percentage, 0))

    return (
      <div className="App">
        <div className="App-header">
          <img alt="Mandatkollen logotyp" src="/icon.png"/>
          <h2>Mandatkollen</h2>
        </div>
        <div className="App-main">
          <Seating parties={allParties} seatCount={false} />

          <div className="LegendContainer">
            { legendGroups.map(({name, parties, title, seats, percentage}) =>
              <div className={`LegendGroup${ groups[name].hover ? ' Drop' : '' }`} dragenter={e => e.preventDefault()} ondragover={dragOver} ondrop={dropUpdate(name)} ondragenter={dragEnter(name)} ondragleave={dragLeave(name)}>
                <h1>{title}</h1>
                <h2 className="wide">{seats} mandat - {percentage}%</h2>
                <h2 className="small">{percentage}%</h2>
                {parties.map(({name, seats, seatPercentage, eligable, abbreviation}) =>
                  <div key={abbreviation} className={["party", eligable ? "eligable" : "below"].join(' ')} draggable="true" ondragstart={e => e.dataTransfer.setData('Text', abbreviation)}>
                    <i className={abbreviation.toLowerCase()}/>
                    <h1 className="wide">{name}</h1>
                    <h1 className="small">{abbreviation}</h1>
                    <h2 className="small">{seats || "0" }</h2>
                    <h2 className="wide">{seats || "0" } mandat</h2>
                  </div>
                )}
              </div>
            )}
          </div>
          <small>Grafik: Mandatkollen (Iteam & Lennox PR)</small>
        </div>
        <div className="App-settings">
          <h2>Valresultat</h2>
          <Sliders parties={parties} editCoalitions={coalitions.editCoalitions} />
          {(totalPercentage < 99.6 || totalPercentage > 100.4) ? <p className="invalid">Vänligen justera  manuellt. Totalt antal procent: {totalPercentage}%</p> : null}
          <Polls polls={history} />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
