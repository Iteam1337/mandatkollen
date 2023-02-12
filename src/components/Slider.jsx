/** @jsx pureact.createElement */
import pureact from 'pureact'

import "./Slider.css"

export default ({ party, onchange }) => (
  <input
    className={`slider-${party.abbreviation.toLowerCase()}`}
    key={party.abbreviation}
    type="range"
    oninput={(e) => onchange(parseFloat(e.target.value))}
    value={party.percentage}
    step="0.1"
    min="0"
    max="35"
  />
)
