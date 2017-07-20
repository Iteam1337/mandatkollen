import parliamentSVG from 'parliament-svg/dist'

const obj = parties =>
  parties.reduce((result, party) => ({...result, [party.abbreviation]: party}), {})

const Seating = ({parties, seatCount = true}) =>
  parliamentSVG(obj(parties), seatCount)

export default Seating
