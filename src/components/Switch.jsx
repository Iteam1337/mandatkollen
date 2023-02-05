/** @jsx pureact.createElement */
import pureact from 'pureact'

import "./Switch.css"

const Switch = ({ checked, onchange }) => (
  <div className="switch">
    <input
      id="cmn-toggle-1"
      className="cmn-toggle cmn-toggle-round"
      onchange={onchange}
      checked={checked}
      type="checkbox"
    />
    <label htmlFor="cmn-toggle-1">Off</label>
  </div>
)

export default Switch
