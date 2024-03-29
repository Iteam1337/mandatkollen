/** @jsx pureact.createElement */
import pureact from 'pureact'

import './Footer.css'

const Footer = () => (
  <div className="App-footer">
    <footer className="App-footer-inner">
      <h2>Om Mandatkollen</h2>
      <p>
        Mandatkollen är ett verktyg för att underlätta för medborgare,
        journalister och analytiker att visualisera och dra slutsatser kring de
        parlamentariska effekterna av olika hypotetiska valresultat. Du får
        gärna använda skärmdumpar från Mandatkollen i egna poster och artiklar
        så länge du anger källan.
      </p>
      <p>
        Mandatkollen är utvecklad av Iteam och Lennox PR. Vill du använda
        Mandatkollen som en inbäddad funktion på din hemsida eller nyhetstjänst?
        Kontakta robert.svensson@lennoxpr.se
      </p>

      <h3>Så funkar det:</h3>
      <p>
        I visualiseringen fördelas mandaten över Riksdagens 349 platser utifrån
        ett hypotetiskt valresultat som du bestämmer. Om du flyttar ett reglage
        för ett parti så anpassas alla de andra partiernas andelar
        proportionerligt. Om ett parti hamnar under riksdagsspärren på 4 procent
        så tilldelas de inga mandat. Fördelningen av mandat är justerade enligt
        2018 års regler för mandatfördelning. Har du förslag på hur vi kan
        förbättra den här tjänsten? Kontakta <a href="https://twitter.com/landgren">@landgren</a> på Twitter.
      </p>

      <h3>Underlag</h3>
      <p>
        Röstresultatet som visas initialt är det fastställda valresultatet från
        år 2022 års val. Källa: val.se - Övriga opinionsundersökningar hämtas
        med tillstånd från <a href="https://pollofpolls.se">pollofpolls.se</a>.
      </p>

      <h3>Underlag</h3>
      <p>
        Vi som har tagit fram Mandatkollen är:
      </p>

      <a href="https://iteam.se">
        <img alt="Iteam logo" className="logo iteam" src="/images/iteam_white.png" />
      </a>
      <a href="https://lennoxpr.se">
        <img alt="Lennox PR logo" className="logo lennoxpr" src="/images/lennoxpr.png" />
      </a>
    </footer>
  </div>
)

export default Footer
