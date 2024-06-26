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
const EU = import.meta.env.VITE_EU === 'true'

class App extends Component {
  sumGroups(parties, groups) {
    const partiesByGroup = Object.entries(groups).reduce(
      (acc, [key, group]) => [
        ...acc,
        {
          ...group,
          name: key,
          parties: parties
            .filter((a) => (EU ? a.eu === key : a.affiliation === key))
            .sort((a, b) => b.seats - a.seats),
        },
      ],
      []
    )

    return partiesByGroup.map((group) => ({
      ...group,
      seats: group.parties.reduce((t, party) => t + party.seats, 0),
      percentage:
        Math.round(
          group.parties.reduce((t, party) => t + party.seatPercentage, 0) * 1000
        ) / 10,
    }))
  }

  render() {
    const { parties, coalitions, groups, polls } = this.props
    const legendGroups = this.sumGroups(parties, groups)
    const allParties = legendGroups.reduce((a, b) => [...a, ...b.parties], [])
    const totalPercentage = Math.round(
      parties.reduce((t, party) => t + party.percentage, 0)
    )

    return (
      <div className={`App ${EU ? 'EU' : 'Riksdag'}`}>
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
            groups={groups}
            parties={allParties}
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
