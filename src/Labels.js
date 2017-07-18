import React from 'pureact'
import './Labels.css'

const Labels = ({parties}) => (
  <ul className="labels">
    {parties.map(party => <li className={party.abbrivation.toLowerCase()}>
      <div className="bar">
        <p>{party.abbrivation}</p>
      </div>
    <span className="value">{party.seats}</span>
    </li>)}
  </ul>
)

export default Labels