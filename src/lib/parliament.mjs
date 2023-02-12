const countTotal = (parties, onlyUnchanged = false) =>
  parties
    .filter((party) => !onlyUnchanged || !party.changed)
    .reduce((total, party) => total + party.votes, 0)

const control = (party) => ({
  ...party,
  eligable: party.percentage >= 4,
})

const idSort = (a, b) => a.id - b.id

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
  const result = {
    ...party,
    numberForComparison:
      Math.round((party.votes / (1 + (party.seats + 1) * 2)) * 1000000) /
      1000000,
    seats: party.seats + 1,
  }
  // console.log('Parti nr', result.id, nr, 'jämförelsetal', party.numberForComparison, 'nytt tal', result.numberForComparison, 'division', (1+(party.seats ? party.seats * 2: 0.2)))
  return result
}

const calculateSeatPercentage = (maxSeats) => (party) => ({
  ...party,
  seatPercentage: (party.seats || 0) / maxSeats,
})

/* 
  Fördela ett säte åt gången, sortera partierna på jämförelsetalet och returnera en ny sammanställning med nytt jämförelsetal för det parti som fick det nuvarande sätet.
*/
const selectAndAssignSeat = (parties, nr, maxSeats) => {
  //console.log('select', parties.sort((a, b) => a.numberForComparison > b.numberForComparison ? -1 : a === b ? Math.random() > 0.5 : 1).map(a=>a.numberForComparison))

  return parties
    .sort((a, b) =>
      a.numberForComparison > b.numberForComparison
        ? -1
        : a === b
        ? Math.random() > 0.5
        : 1
    )
    .filter((party) => party.eligable)
    .map((party, i) => (i === 0 ? pickSeat(party, nr) : party))
    .concat(parties.filter((party) => !party.eligable))
    .map(calculateSeatPercentage(maxSeats))
    .sort(idSort)
}

const calculateVotes = (totalVotes) => (party) => {
  if (party.percentage === undefined || party.percentage === null)
    throw new Error('Percentage is required')
  const result = {
    ...party,
    votes: Math.round(totalVotes * (party.percentage / 100)),
  }
  return result
}

const balanceRemainingVotes = (
  parties,
  maxVotes,
  remainingVotes = maxVotes - countTotal(parties)
) =>
  parties.map((party) => ({
    ...party,
    votes: party.changed
      ? party.votes
      : Math.round(
          (party.votes +
            remainingVotes * (party.votes / countTotal(parties, true))) *
            1000
        ) / 1000,
  }))

const range = (nr) => [...Array(nr).keys()]

const calculatePercentages =
  (totalVotes, startDivider = 1.2) =>
  (party) => ({
    ...party,
    percentage:
      party.changed && party.percentage
        ? party.percentage
        : Math.round(100 * (party.votes / totalVotes) * 10) / 10,
    numberForComparison: Math.round((party.votes / startDivider) * 100) / 100,
    seats: 0,
  })

function Parliament(
  initialParties,
  maxVotes = countTotal(initialParties) || 1000000,
  maxSeats = 349,
  startDivider = 1.2
) {
  this.maxVotes = maxVotes
  this.calculate = (parties) => {
    const votes = parties.map(calculateVotes(maxVotes))
    const balanced = range(10)
      .reduce((parties) => balanceRemainingVotes(votes, this.maxVotes), parties)
      .map(this.percentage)
      .map(control)

    this.seats = range(maxSeats).reduce(
      (parties, seat) => selectAndAssignSeat(parties, seat, maxSeats),
      balanced
    )

    return this.seats
  }
  this.percentage = calculatePercentages(this.maxVotes, startDivider)
  this.sort = idSort
  this.updateVotes = (party, percentage, changed = new Date()) => ({
    ...party,
    percentage,
    votes: Math.round((percentage / 100) * this.maxVotes),
    changed,
  })
  this.seats = this.calculate(initialParties)
  this.updatePolls = (poll) => {
    this.seats = this.seats.map((party) =>
      this.updateVotes(party, parseFloat(poll[party.abbreviation] || '0'), null)
    )
    return this.seats
  }
  return this
}

export { Parliament }
