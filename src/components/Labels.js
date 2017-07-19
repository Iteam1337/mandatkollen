import React from 'pureact'
import './Labels.css'

const Labels = ({parties}) => (
  <ul className="labels">
    {parties.map(party => <li className={party.abbreviation.toLowerCase()}>
      <div className="bar">
        <p>{party.abbreviation}</p>
      </div>
    <span className="value">{party.seats}</span>
    </li>)}
  </ul> 
)

export default Labels