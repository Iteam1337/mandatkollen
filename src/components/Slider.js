import React from 'pureact'
import './Slider.css'

export default ({party, oninput}) =>
  <input draggable="false" className={party.abbreviation.toLowerCase()} key={party.abbreviation} type="range" oninput={oninput} value={party.percentage * 10} step="1" min="0" max="350" />