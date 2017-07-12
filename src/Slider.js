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

export default ({value, color, step, min, max, oninput, key}) => 
  <input key={key} type="range" style={{backgroundColor: backgroundStyle(value / max, color)}} oninput={oninput} value={value} step={step} min={min} max={max} />
