const countTotal = parties => parties.reduce((total, party) => total+party.votes, 0)

const calculatePercentages = (parties, totalVotes = countTotal(parties), startDivider = 1.2) => (party) => ({
  ...party,
  percentage: Math.round(100 * (party.votes / countTotal(parties)) * 10) / 10,
  numberForComparison: Math.round((party.votes / 1.2) * 100) / 100,
  seats: 0,
})

const control = party => ({
  ...party,
  eligable: party.percentage >= 4
})

const sort = (a, b) => a.id - b.id

/* 

  Så här bestäms vilka partier som ska få mandat
  ===

  Först räknar man fram ett jämförelsetal för alla som får vara med i mandatfördelningen. 
  Det första jämförelsetalet får man genom att dividera varje partis antal röster (röstetal) med 1,2. 
  Det parti som då har det högsta jämförelsetalet får det första mandatet.

  Därefter delas det partiets röstetal med 3 och nästa gång partiet får ett mandat delas röstetalet med 5, 
  gångerna därpå med 7, 9 osv. Processen fortsätter tills alla fasta mandat är fördelade. 
  Systemet kallas den jämkade uddatalsmetoden.
*/
const pickSeat = (party, nr) => {
  const result = ({
    ...party,
    numberForComparison: Math.round(party.votes / (1 + (party.seats + 1) * 2)), 
    seats: party.seats + 1
  })
  // console.log('Parti nr', result.id, nr, 'jämförelsetal', party.numberForComparison, 'nytt tal', result.numberForComparison, 'division', (1+(party.seats ? party.seats * 2: 0.2)))
  return result
}

const calculateSeatPercentage = (maxSeats) => party => ({...party, seatPercentage: (party.seats || 0) / maxSeats})

const selectAndAssignSeat = (parties, nr, maxSeats) => {
  //console.log('select', parties.sort((a, b) => a.numberForComparison > b.numberForComparison ? -1 : a === b ? Math.random() > 0.5 : 1).map(a=>a.numberForComparison))
  
  return parties
    .sort((a, b) => a.numberForComparison > b.numberForComparison ? -1 : a === b ? Math.random() > 0.5 : 1)
    .filter(party => party.eligable)
    .map((party, i) => (i === 0 ? pickSeat(party, nr) : party))
    .concat(parties.filter(party => !party.eligable))
    .map(calculateSeatPercentage(maxSeats))
    .sort(sort)
}

const balanceRemainingVotes = (parties, maxVotes) => ((parties, totalVotes) => parties.map(party => ({
  ...party,
  votes: party.changed ? party.votes : Math.round((party.votes - (totalVotes - maxVotes) * (party.votes / totalVotes)) * 1000) / 1000,
})))(parties, countTotal(parties))

const range = nr => [...Array(nr).keys()]

function Parliament (initialParties, maxVotes, maxSeats = 349, startDivider = 1.2) {
  // console.log('initial', initialParties)
  this.maxVotes = maxVotes || countTotal(initialParties)
  this.percentage = calculatePercentages(initialParties, this.maxVotes, startDivider)
  this.calculate = parties => {
    const balanced = range(10)
      .reduce((parties) => balanceRemainingVotes(parties, this.maxVotes), parties)
      .map(this.percentage)
      .map(control)

    this.seats = range(maxSeats)
      .reduce((parties, seat) => selectAndAssignSeat(parties, seat, maxSeats), balanced)

    return this.seats
  }
  this.sort = sort
  this.updateVotes = (party, votes) => ({
    ...party,
    votes: Math.round(votes / 100 * this.maxVotes),
    changed: new Date()
  })
  this.seats = this.calculate(initialParties)
  return this
}

export {
  Parliament
}
