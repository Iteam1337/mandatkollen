import React, { Component } from 'pureact'
import { dragOver, dropUpdate, dragEnter, dragLeave } from '../lib/draganddrop'
import { fetchHistory } from '../lib/history'
import { store } from '../store'
import './App.css'
import Seating from './Seating'
import Mixer from './Mixer'
import Labels from './Labels'
import Polls from './Polls'
import Footer from './Footer'

const Sliders = ({parties, editCoalitions}) =>
  <div className="App-sliders">
    <section ondragenter={dragEnter} ondragover={dragOver} ondrop={dropUpdate('regering')}>
      {parties.filter(x => x.affiliation === 'regering').map(party => (
        <Mixer party={party} editCoalitions={editCoalitions}/>
      ))}
    </section>
    <section ondragenter={dragEnter} ondragover={dragOver} ondrop={dropUpdate('center')}>
      {parties.filter(x =>x.affiliation === 'center').map(party => (
        <Mixer party={party} editCoalitions={editCoalitions}/>
      ))}
    </section>
    <section ondragenter={dragEnter} ondragover={dragOver} ondrop={dropUpdate('opposition')}>
      {parties.filter(x => x.affiliation === 'opposition').map(party => (
        <Mixer party={party} editCoalitions={editCoalitions}/>
      ))}
    </section>
  </div>

class App extends Component {
  render () {
    const {parties, coalitions, groups, history} = this.props
    const regering = parties.filter(a => a.affiliation === 'regering').sort((a, b) => b.seats - a.seats)
    const opposition = parties.filter(a => a.affiliation === 'opposition').sort((a, b) => b.seats - a.seats)
    const center = parties.filter(a => a.affiliation === 'center').sort((a, b) => b.seats - a.seats)
    const allParties = regering.concat(center).concat(opposition)
    const regeringPercentage = Math.round(regering.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const regeringSeats = regering.reduce((t, party) => t + party.seats, 0)
    const oppositionPercentage = Math.round(opposition.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const oppositionSeats = opposition.reduce((t, party) => t + party.seats, 0)
    const centerPercentage = Math.round(center.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const centerSeats = center.reduce((t, party) => t + party.seats, 0)
    const totalPercentage = Math.round(parties.reduce((t, party) => t + party.percentage, 0))

    const legendGroups = [
      {
        name: 'regering',
        parties: regering,
        title: `Regering`,
        subtitle: `${regeringSeats} mandat - ${regeringPercentage}%`
      },
      {
        name: 'center',
        parties: center,
        title: `Övriga`,
        subtitle: `${centerSeats} mandat - ${centerPercentage}%`
      },
      {
        name: 'opposition',
        parties: opposition,
        title: `Opposition`,
        subtitle: `${oppositionSeats} mandat - ${oppositionPercentage}%`
      }
    ]

    return (
      <div className="App">
        <div className="App-header">
          <img alt="Mandatkollen logotyp" src="/icon.png"/>
          <h2>Mandatkollen</h2>
        </div>
        <div className="App-main">
          <Seating parties={allParties} seatCount={false} />

          <div className="LegendContainer">
            { legendGroups.map(({name, parties, title, subtitle}) =>
              <div className={`LegendGroup${ groups[name].hover ? ' Drop' : '' }`} dragenter={e => e.preventDefault()} ondragover={dragOver} ondrop={dropUpdate(name)} ondragenter={dragEnter(name)} ondragleave={dragLeave(name)}>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                {parties.map(({name, seats, seatPercentage, eligable, abbreviation}) =>
                  <div className={["party", eligable ? "eligable" : "below"].join(' ')} draggable="true" ondragstart={e => e.dataTransfer.setData('Text', abbreviation)}>
                    <i className={abbreviation.toLowerCase()}/>
                    <h1>{name}</h1>
                    <h2>{seats || "0" } mandat</h2>
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
