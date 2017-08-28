import React from 'pureact'
import './Slider.css'

export default ({ party, onchange }) =>
  <input
    className={`slider-${party.abbreviation.toLowerCase()}`}
    key={party.abbreviation}
    type="range"
    oninput={e => onchange(parseInt(e.target.value, 10))}
    value={party.percentage}
    step="1"
    min="0"
    max="35"
  />
