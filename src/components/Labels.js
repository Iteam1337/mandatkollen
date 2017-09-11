import React from 'pureact'
import './Labels.css'
import {dragStart} from '../lib/draganddrop'

const Label = party => {

  return (
      <li draggable="true" ondragstart={dragStart(party.abbreviation)} className={party.abbreviation.toLowerCase()}>
          <div className="bar">
            <p>
              {party.abbreviation}
              <span className="handle">⁞</span>
            </p>
          </div>
        <span className="value">{party.seats}</span>
    </li>
  )
}

const Labels = ({parties}) => (
  <ul className="labels">
    {parties.map(Label)}
  </ul>
)
export default Labels