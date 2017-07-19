import React from 'pureact'
import './Switch.css'

const Switch = props => (
  <div>
    <div className="switch">
      <input id="cmn-toggle-1" className="cmn-toggle cmn-toggle-round" type="checkbox"/>
      <label for="cmn-toggle-1"></label>
    </div>

    <div className="switch">
      <input id="cmn-toggle-4" className="cmn-toggle cmn-toggle-round-flat" type="checkbox"/>
      <label for="cmn-toggle-4"></label>
    </div>

    <div className="switch">
      <input id="cmn-toggle-7" className="cmn-toggle cmn-toggle-yes-no" type="checkbox"/>
      <label for="cmn-toggle-7" data-on="Yes" data-off="No"></label>
    </div>
  </div>
)

export default Switch
