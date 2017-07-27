import React from 'pureact'
import './Labels.css'

const Label = party => {
  function dragstart (event) {
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.setData('text/plain', party.abbreviation)
  }

  return (
      <li draggable="true" ondragstart={dragstart} className={party.abbreviation.toLowerCase()}>
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