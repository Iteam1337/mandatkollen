import parliamentSVG from 'parliament-svg'

const obj = parties =>
  parties.reduce((result, party) => ({...result, [party.name]: party}), {})

const Seating = ({parties, seatCount = true}) =>
  parliamentSVG(obj(parties), seatCount)

export default Seating
