/** @jsx pureact.createElement */
import parliamentSVG from 'parliament-svg'
import pureact from 'pureact'

const obj = (parties) =>
  parties.reduce(
    (result, party) => ({ ...result, [party.abbreviation]: party }),
    {}
  )

const Seating = ({ parties, seatCount = true }) => {
  return parliamentSVG(obj(parties), seatCount)
}

export default Seating
