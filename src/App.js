import React, { Component } from 'pureact'
import logo from './logo.svg'
import './App.css'
import store from './store'
import Seating from './Seating'
import Slider from './Slider'
import Labels from './Labels'
import Switch from './Switch'

const updatePartyValue = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_VALUE', partyName, value})
const updatePartySelection = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_SELECTION', partyName, value})
const updatePartyOpposition = (partyName, value) => store.dispatch({type: 'UPDATE_PARTY_OPPOSITION', partyName, value})

const Range = ({party}) => (
  <div className={ party.eligable ? 'valid' : 'below'}>
    <h3>{party.name}
      <input type="text" value={party.percentage} onchange={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} />%
    </h3>
    { party.selected ? null : <button onclick={e => updatePartySelection(party.name, true)}>◀️</button>}
    <Slider value={party.percentage} color={party.colour} oninput={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} step="1" max="60" min="0" />
    { party.opposition ? null : <button onclick={e => updatePartyOpposition(party.name, true)}>▶️</button>}
  </div>
)


class App extends Component {
  render () {
    const regering = this.props.parties.filter(a => a.selected && a.eligable).sort((a, b) => b.id - a.id)
    const opposition = this.props.parties.filter(a => a.opposition && a.eligable).sort((a, b) => b.id - a.id)
    const center = this.props.parties.filter(a => a.eligable && !a.opposition && !a.selected).sort((a, b) => b.id - a.seatPercentage)
    const regeringPercentage = Math.round(regering.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const oppositionPercentage = Math.round(opposition.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    const centerPercentage = Math.round(center.reduce((t, party) => t + party.seatPercentage, 0) * 1000) / 10
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Riksdagskollen</h2>
        </div>
        <Seating parties={this.props.parties.reverse()} seatCount={false} />
        <small>Visualisering: Iteam. Idé: Lennox PR. Grunddata: Inizio juni 2017. </small>

         {regering.length ? <p className="App-summary">
          <section>
            <h1>Vänstern {regeringPercentage}%</h1>
            <Labels key="regering" parties={regering} />
          </section>
          <section>
            <h1>Högern {oppositionPercentage}%</h1>
            <Labels key="opposition" parties={opposition} />
          </section>
          <section>
            <h1>Vågmästare {centerPercentage}%</h1>
            <Labels key="center" parties={center} />
          </section>
        </p> : null}
        
        <h2>Simulera resultat</h2>
        <p>Här kan du laborera och plocka ihop ditt eget alternativ.</p>
        <section>
          {this.props.parties.reverse().map(party => (
            <Range party={party} />
          ))}
        </section>
        <div className="App-footer">
          <h2>Om Riksdagskollen</h2>
          <p>Riksdagskollen är ett verktyg för att underlätta för medborgare, journalister och analytiker att visualisera och dra slutsatser kring de parlamentariska effekterna av olika hypotetiska valresultat. 
          Du får gärna använda skärmdumpar från Riksdagskollen i egna poster och artiklar så länge du anger källan.</p>
          <p>Riksdagskollen är utvecklad av Iteam efter en idé från Lennox PR.
          Vill du använda Riksdagskollen som en inbäddad funktion på din hemsida eller nyhetstjänst? Kontakta pr@iteam.se.</p>

          <h3>Så funkar det:</h3>
          <p>
          I visualiseringen fördelas mandaten över Riksdagens 349 platser utifrån ett hypotetiskt valresultat som du bestämmer. Om du flyttar ett reglage för ett parti så anpassas alla de andra partiernas andelar proportionerligt. Om ett parti hamnar under riksdagsspärren på 4 procent så tilldelas de inga mandat. Fördelningen av mandat är justerade enligt 2018 års regler för mandatfördelning.
          Har du förslag på hur vi kan förbättra den här tjänsten? Kontakta christian.landgren@iteam.se.</p>

        </div>
      </div>
    )
  }
}

export default App
