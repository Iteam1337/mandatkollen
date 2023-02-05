import React from "pureact"
import Mixer from "./Mixer"
import { dragOver, dropUpdate, dragEnter } from "../lib/draganddrop"

const Sliders = ({ parties, editCoalitions }) => (
  <div className="App-sliders">
    <section
      ondragenter={dragEnter}
      ondragover={dragOver}
      ondrop={dropUpdate("coalition")}
    >
      {parties
        .filter((x) => x.affiliation === "coalition")
        .map((party) => (
          <Mixer party={party} editCoalitions={editCoalitions} />
        ))}
    </section>
    <section
      ondragenter={dragEnter}
      ondragover={dragOver}
      ondrop={dropUpdate("opposition")}
    >
      {parties
        .filter((x) => x.affiliation === "opposition")
        .map((party) => (
          <Mixer party={party} editCoalitions={editCoalitions} />
        ))}
    </section>
    <section
      ondragenter={dragEnter}
      ondragover={dragOver}
      ondrop={dropUpdate("abstaining")}
    >
      {parties
        .filter((x) => x.affiliation === "abstaining")
        .map((party) => (
          <Mixer party={party} editCoalitions={editCoalitions} />
        ))}
    </section>
  </div>
)

export default Sliders
