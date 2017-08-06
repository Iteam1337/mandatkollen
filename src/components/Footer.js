import React from 'pureact'
import './Footer.css'

const Footer = (props) => (
   <div className="App-footer">
      <h2>Om Mandatkollen</h2>
      <p>Mandatkollen är ett verktyg för att underlätta för medborgare, journalister och analytiker att visualisera och dra slutsatser kring de parlamentariska effekterna av olika hypotetiska valresultat. 
      Du får gärna använda skärmdumpar från Mandatkollen i egna poster och artiklar så länge du anger källan.</p>
      <p>Mandatkollen är utvecklad av Iteam och Lennox PR.
      Vill du använda Mandatkollen som en inbäddad funktion på din hemsida eller nyhetstjänst? Kontakta robert.svensson@lennoxpr.se</p>

      <h3>Så funkar det:</h3>
      <p>
      I visualiseringen fördelas mandaten över Riksdagens 349 platser utifrån ett hypotetiskt valresultat som du bestämmer. Om du flyttar ett reglage för ett parti så anpassas alla de andra partiernas andelar proportionerligt. 
      Om ett parti hamnar under riksdagsspärren på 4 procent så tilldelas de inga mandat.
      Fördelningen av mandat är justerade enligt 2018 års regler för mandatfördelning.
      Har du förslag på hur vi kan förbättra den här tjänsten? Kontakta christian.landgren@iteam.se.</p>

      <h3>Underlag</h3>
      <p>Röstresultatet som visas initialt kommer från SCB <a href="http://www.scb.se/hitta-statistik/statistik-efter-amne/demokrati/partisympatier/partisympatiundersokningen-psu/pong/statistiknyhet/partisympatier-maj-2017/">valundersökning som genomfördes i maj 2017.</a></p>

      <a href="https://iteam.se"><img alt="Iteam logo" className="logo" src="https://iteam.se/content/images/iteam_white.png"/></a>
      <a href="http://lennoxpr.se"><img alt="Lennox PR logo" className="logo" src="http://lennoxpr.se/wp-content/uploads/2017/04/logo-lennox.png"/></a>
    </div>
)

export default Footer
