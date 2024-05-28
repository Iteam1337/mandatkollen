/** @jsx pureact.createElement */
import pureact from 'pureact'
import { Component } from 'pureact'
import {
  dragOver,
  dropUpdate,
  dragEnter,
  dragLeave,
  dragStart,
} from '../lib/draganddrop'
import './App.css'
import Seating from './Seating'
import Sliders from './Sliders'
import Polls from './Polls'
import Footer from './Footer'

class App extends Component {
  sumGroups(parties) {
    const regering = parties
      .filter((a) => a.affiliation === 'regering')
      .sort((a, b) => b.seats - a.seats)
    const opposition = parties
      .filter((a) => a.affiliation === 'opposition')
      .sort((a, b) => b.seats - a.seats)
    const stod = parties
      .filter((a) => a.affiliation === 'stod')
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
          ) / 10,
      },

      {
        name: 'stod',
        parties: stod,
        title: `Stödpartier`,
        seats: stod.reduce((t, party) => t + party.seats, 0),
        percentage:
          Math.round(
            stod.reduce((t, party) => t + party.seatPercentage, 0) * 1000
          ) / 10,
      },
      {
        name: 'opposition',
        parties: opposition,
        title: `Opposition`,
        percentage:
          Math.round(
            opposition.reduce((t, party) => t + party.seatPercentage, 0) * 1000
          ) / 10,
        seats: opposition.reduce((t, party) => t + party.seats, 0),
      },
    ]
  }

  render() {
    const { parties, coalitions, groups, polls } = this.props
    const legendGroups = this.sumGroups(parties)
    const allParties = legendGroups.reduce((a, b) => a.concat(b.parties), [])
    const totalPercentage = Math.round(
      parties.reduce((t, party) => t + party.percentage, 0)
    )

    return (
      <div className="App">
        <div className="App-header">
          <header className="App-header-inner">
            <img alt="Mandatkollen logotyp" src="/images/icon.png" />
            <h1>Mandatkollen</h1>
          </header>
        </div>
        <main className="App-main">
          <Seating parties={allParties} seatCount={false} />
          <small>Grafik: Mandatkollen</small>
          <div className="LegendContainer" id="summary">
            {legendGroups.map(({ name, parties, title, seats, percentage }) => (
              <section
                className={`LegendGroup${groups[name]?.hover ? ' Drop' : ''}`}
                dragenter={(e) => e.preventDefault()}
                ondragover={dragOver}
                ondrop={dropUpdate(name)}
                ondragenter={dragEnter(name)}
                ondragleave={dragLeave(name)}
              >
                <div className="LegendTitle">
                  <h1>{title}</h1>
                  <h2 className="wide">
                    {seats} mandat - {percentage}%
                  </h2>
                  <h2 className="small">
                    {percentage}% ({seats})
                  </h2>
                </div>
                {parties.map(
                  ({ name, seats, seatPercentage, eligable, abbreviation }) => (
                    <div
                      key={abbreviation}
                      className={[
                        'party',
                        eligable ? 'eligable' : 'below',
                      ].join(' ')}
                      draggable="true"
                      ondragstart={dragStart(abbreviation)}
                    >
                      <i className={abbreviation.toLowerCase()} />
                      <h1 className="wide">{name}</h1>
                      <h1 className="small" ariaLabel={name}>
                        {abbreviation}
                      </h1>
                      <h2
                        className="small"
                        ariaLabel={(seats || '0') + ' mandat'}
                      >
                        {seats || '0'}
                      </h2>
                      <h2 className="wide">{seats || '0'} mandat</h2>
                    </div>
                  )
                )}
              </section>
            ))}
          </div>
          <small>
            Dra och släpp partierna för olika scenarier. Välj
            opinionsundersökning nedan eller justera själv.
          </small>
        </main>
        <div className="App-settings">
          <h2>Välj opinionsundersökning:</h2>
          <Polls polls={polls} />
          <br />
          <h2>Eller experimentera själv %</h2>
          <Sliders
            parties={parties}
            editCoalitions={coalitions.editCoalitions}
          />
          {totalPercentage < 99.6 || totalPercentage > 100.4 ? (
            <p className="invalid">
              Vänligen justera manuellt. Totalt antal procent: {totalPercentage}
              %
            </p>
          ) : null}
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
