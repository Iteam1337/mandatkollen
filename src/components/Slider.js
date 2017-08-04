import React from 'pureact'
import './Slider.css'

export default ({party, onchange}) => (
  <div>
    <input 
      className={party.abbreviation.toLowerCase()} 
      key={party.abbreviation} 
      type="range" 
      oninput={e => onchange(parseInt(e.target.value, 10) )} value={party.percentage } 
      step="1" 
      min="0" 
      max="35" />
    <div className="bar" style={{
      background: party.colour, 
      marginTop: `${ -155 * (Math.min(35, party.percentage) / 35)}px`, 
      height: `${155 * (Math.min(35, party.percentage) / 35)}px`
    }}></div>
  </div>
)
    