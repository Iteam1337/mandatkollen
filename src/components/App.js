import React, { Component } from 'pureact'
import { dragOver, dropUpdate, dragEnter, dragLeave, dragStart } from '../lib/draganddrop'
import './App.css'
import Seating from './Seating'
import Sliders from './Sliders'
import Polls from './Polls'
import History from './History'
import Footer from './Footer'

class App extends Component {
  sumGroups(parties) {
    const regering = parties
      .filter(a => a.affiliation === 'regering')
      .sort((a, b) => b.seats - a.seats)
    const opposition = parties
      .filter(a => a.affiliation === 'opposition')
      .sort((a, b) => b.seats - a.seats)
    const center = parties
      .filter(a => a.affiliation === 'center')
      .sort((a, b) => b.seats - a.seats)

    return [
      {
        name: 'regering',
        parties: regering,
        title: `Regering`,
        seats: regering.reduce((t, party) => t + party.seats, 0),
        percentage:
          Math.round(
            regering.reduce((t, party) => t + party.seatPercentage, 0) * 1000
          ) / 10
      },
      {
        name: 'center',
        parties: center,
        title: `Övriga`,
        seats: center.reduce((t, party) => t + party.seats, 0),
        percentage:
          Math.round(
            center.reduce((t, party) => t + party.seatPercentage, 0) * 1000
          ) / 10
      },
      {
        name: 'opposition',
        parties: opposition,
        title: `Opposition`,
        percentage:
          Math.round(
            opposition.reduce((t, party) => t + party.seatPercentage, 0) * 1000
          ) / 10,
        seats: opposition.reduce((t, party) => t + party.seats, 0)
      }
    ]
  }

  render() {
    const { parties, coalitions, groups, history, polls } = this.props
    const legendGroups = this.sumGroups(parties)
    const allParties = legendGroups.reduce((a, b) => a.concat(b.parties), [])
    const totalPercentage = Math.round(
      parties.reduce((t, party) => t + party.percentage, 0)
    )

    return (
      <div className="App">
        <div className="App-header">
          <div className="App-header-inner">
            <img alt="Mandatkollen logotyp" src="/icon.png" />
            <h2>Mandatkollen</h2>
          </div>
        </div>
        <div className="App-main">
          <Seating parties={allParties} seatCount={false} />
          <small>Grafik: Mandatkollen.se</small>
          <div className="LegendContainer">
            {legendGroups.map(({ name, parties, title, seats, percentage }) =>
              <div
                className={`LegendGroup${groups[name].hover ? ' Drop' : ''}`}
                dragenter={e => e.preventDefault()}
                ondragover={dragOver}
                ondrop={dropUpdate(name)}
                ondragenter={dragEnter(name)}
                ondragleave={dragLeave(name)}
              >
                <div className="LegendTitle">
                  <h1>
                    {title}
                  </h1>
                  <h2 className="wide">
                    {seats} mandat - {percentage}%
                  </h2>
                  <h2 className="small">
                    {percentage}%
                  </h2>
                </div>
                {parties.map(
                  ({ name, seats, seatPercentage, eligable, abbreviation }) =>
                    <div
                      key={abbreviation}
                      className={[
                        'party',
                        eligable ? 'eligable' : 'below'
                      ].join(' ')}
                      draggable="true"
                      ondragstart={dragStart(abbreviation)}
                    >
                      <i className={abbreviation.toLowerCase()} />
                      <h1 className="wide">
                        {name}
                      </h1>
                      <h1 className="small">
                        {abbreviation}
                      </h1>
                      <h2 className="small">
                        {seats || '0'}
                      </h2>
                      <h2 className="wide">
                        {seats || '0'} mandat
                      </h2>
                    </div>
                )}
              </div>
            )}
          </div>
          <small>Dra och släpp partierna för olika scenarier. Justera även valresultat nedan.</small>
        </div>
        <div className="App-settings">
          <div className="App-settings-inner">
            <h2>Valresultat %</h2>
            <Sliders
              parties={parties}
              editCoalitions={coalitions.editCoalitions}
            />
            {totalPercentage < 99.6 || totalPercentage > 100.4
              ? <p className="invalid">
                  Vänligen justera manuellt. Totalt antal procent:{' '}
                  {totalPercentage}%
                </p>
              : null}
          </div>
          <h2>Välj opinionsundersökning</h2>
          <Polls polls={polls} />
          <h2>Historik</h2>
          <History history={history} />
          <small>Källa: pollofpolls.se</small>
        </div>
        <Footer history={history} />
      </div>
    )
  }
}

export default App
