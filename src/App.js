import React, { Component } from 'pureact'
import logo from './logo.png'
import './App.css'
import store from './store'
import Seating from './Seating'
import Slider from './Slider'
import Labels from './Labels'
import Switch from './Switch'

const updatePartyValue = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_VALUE', partyName, value})
const updatePartySelection = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_SELECTION', partyName, value})
const updatePartyOpposition = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_OPPOSITION', partyName, value})
const updatePartyAffiliation = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_AFFILIATION', partyName, value})

const Range = ({party}) => (
  <div className={party.eligable ? 'valid' : 'below'}>
    <h3>
      {party.name}
      <input type="text" value={party.percentage} onchange={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} />%
    </h3>

    <Slider party={party} oninput={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} />
  </div>
)


class App extends Component {
  render () {
    const regering = this.props.parties.filter(a => a.affiliation === 'regering' && a.eligable).sort((a, b) => b.seats - a.seats)
    const opposition = this.props.parties.filter(a => a.affiliation === 'opposition' && a.eligable).sort((a, b) => a.seats - b.seats)
    const center = this.props.parties.filter(a => a.affiliation === 'center' && a.eligable).sort((a, b) => a.seats - b.seats)
    const allParties = regering.concat(center).concat(opposition)
    const regeringPercentage = Math.round(regering.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const oppositionPercentage = Math.round(opposition.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const centerPercentage = Math.round(center.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const sumPercentage = Math.round((centerPercentage + regeringPercentage) * 10) / 10

    const dragover = event => {
      event.preventDefault()
      event.dataTransfer.dropEffect = "move"
    }

    const dropUpdate = (arg) => event => {
      event.preventDefault()
      updatePartyAffiliation(event.dataTransfer.getData('text'), arg)
    }

    const dropRegeringen = dropUpdate({
      selected: true,
      opposition: false
    })

    const dropOpposition = dropUpdate({
      selected: false,
      opposition: true
    })

    const dropCenter = dropUpdate({
      selected: false,
      opposition: false
    })

    return (
      <div className="App">
        <div className="App-header">
          <h2>Riksdagskollen</h2>
        </div>
        <Seating parties={allParties} seatCount={false} />

        <div className="LegendContainer">
          <div className="LegendGroup" ondragover={dragover} ondrop={dropRegeringen}>
            <h1>Regering {regeringPercentage}%</h1>
            <Labels key="regeringen" parties={regering} />
          </div>
          <div className="LegendGroup" ondragover={dragover} ondrop={dropCenter}>
            <h1>Övriga {centerPercentage}%</h1>
            <Labels key="center" parties={center} />
          </div>
          <div className="LegendGroup" ondragover={dragover} ondrop={dropOpposition}>
            <h1>Opposition {oppositionPercentage}%</h1>
            <Labels key="opposition" parties={opposition} />
          </div>
        </div>

        <small>Grafik: Riksdagskollen. Av: Iteam och Lennox PR.</small>
        <h2>Hypotetiskt valresultat</h2>
         <div className="sliders">
          <section>
            {this.props.parties.filter(x => x.affiliation === 'regering').reverse().map(party => (
              <Range party={party} />
            ))}
          </section>
          <section>
            {this.props.parties.filter(x => x.affiliation === 'center').reverse().map(party => (
              <Range party={party} />
            ))}
          </section>
          <section>
            {this.props.parties.filter(x => x.affiliation === 'opposition').reverse().map(party => (
              <Range party={party} />
            ))}
          </section>
        </div>
        <div className="App-footer">
          <h2>Om Riksdagskollen</h2>
          <p>Riksdagskollen är ett verktyg för att underlätta för medborgare, journalister och analytiker att visualisera och dra slutsatser kring de parlamentariska effekterna av olika hypotetiska valresultat.
          Du får gärna använda skärmdumpar från Riksdagskollen i egna poster och artiklar så länge du anger källan.</p>
          <p>Riksdagskollen är utvecklad av Iteam och Lennox PR.
          Vill du använda Riksdagskollen som en inbäddad funktion på din hemsida eller nyhetstjänst? Kontakta robert.svensson@lennoxpr.se</p>

          <h3>Så funkar det:</h3>
          <p>
          I visualiseringen fördelas mandaten över Riksdagens 349 platser utifrån ett hypotetiskt valresultat som du bestämmer. Om du flyttar ett reglage för ett parti så anpassas alla de andra partiernas andelar proportionerligt.
          Om ett parti hamnar under riksdagsspärren på 4 procent så tilldelas de inga mandat.
          Fördelningen av mandat är justerade enligt 2018 års regler för mandatfördelning.
          Har du förslag på hur vi kan förbättra den här tjänsten? Kontakta christian.landgren@iteam.se.</p>

          <a href="https://iteam.se"><img className="logo" src="https://iteam.se/content/images/iteam_white.png"/></a>
          <a href="http://lennoxpr.se"><img className="logo" src="http://lennoxpr.se/wp-content/uploads/2017/04/logo-lennox.png"/></a>
        </div>
      </div>
    )
  }
}

export default App
