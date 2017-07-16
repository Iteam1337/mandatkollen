import React, { Component } from 'pureact'
import './Slider.css'

const backgroundStyle = (value, color) =>
`-webkit-gradient(
linear, 
left top, 
right top, 
color-stop(0 ${color}), 
color-stop(${value} ${color})
)`

export default ({party, oninput}) =>
  <input style={{ background: party.colour}} className={party.abbrivation} key={party.id} type="range" oninput={oninput} value={party.percentage} step="1" min="0" max="60" />