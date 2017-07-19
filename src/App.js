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
const updateCoalitions = (value) => store.dispatch({type: 'EDIT_COALITIONS', value})

const Range = ({party, editCoalitions}) => (
  <div className={party.eligable ? 'valid' : 'below'}>
    { editCoalitions ? <h3>
      { party.selected || party.opposition ? null : <button onclick={e => updatePartySelection(party.name, true)}>⇠</button>}
      { party.opposition ? <button onclick={e => updatePartySelection(party.name, false)}>⇠</button> : null}
      {party.abbrivation}
      { !party.opposition && !party.selected ? <button onclick={e => updatePartyOpposition(party.name, true)}>⇢</button> : null}
      { party.selected  ? <button onclick={e => updatePartySelection(party.name, false)}>⇢</button> : null}
    </h3> : (
      <h3>
        {party.name}
      </h3>
    )}

    <Slider party={party} oninput={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} />
        <input type="text" value={party.percentage} onkeyup={e => updatePartyValue(party.name, parseInt(e.target.value, 10))} />%<br/>
  </div>
)


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
