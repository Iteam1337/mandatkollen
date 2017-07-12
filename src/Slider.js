import React, { Component } from 'pureact'
import './Slider.css'

const backgroundStyle = (value, color) =>
`-webkit-gradient(
linear, 
left top, 
right top, 
color-stop(${value} ${color}), 
color-stop(0.9 #b8b7b8)
)`

export default ({party, oninput}) =>
  <input className={party.abbrivation} key={party.id} type="range" oninput={oninput} value={party.percentage} step="1" min="0" max="60" />