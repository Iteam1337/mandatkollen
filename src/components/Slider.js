import React from 'pureact'
import './Slider.css'

export default ({party, onchange}) => (
  <div>
    <input 
      className={party.abbreviation.toLowerCase()} 
      key={party.abbreviation} 
      type="range" 
      oninput={e => onchange(parseInt(e.target.value, 10) / 10)} value={party.percentage * 10} 
      step="1" 
      min="0" 
      max="350" />
    <div className="bar" style={{background: party.colour, opacity: 0.3, marginLeft: '10px', marginTop: `${ -140 * (party.percentage / 35)}px`, position: 'relative', height: `${140 * (party.percentage / 35)}px`, width: "20px"}}></div>
  </div>
)
    