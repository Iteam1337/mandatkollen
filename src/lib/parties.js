const countTotal = parties => parties.reduce((total, party) => total+party.votes, 0)

const calculatePercentages = (parties, totalVotes = countTotal(parties)) => (party) => ({
  ...party,
  percentage: Math.round(100 * (party.votes / countTotal(parties)) * 10) / 10,
  numberForComparison: party.votes,
  seats: 0,
})

const control = party => ({
  ...party,
  eligable: party.percentage >= 4
})

const pickSeat = (party, nr) => ({
  ...party,
  numberForComparison: party.votes / (party.seats ? party.seats * 2: 1.2), 
  seats: party.seats + 1
})

const calculateSeatPercentage = party => ({...party, seatPercentage: (party.seats || 0) / 349})

const sort = (a, b) => a.id - b.id

const selectAndAssignSeat = (parties, nr) => {
  return parties
    .sort((a, b) => a.numberForComparison > b.numberForComparison ? -1 : a === b ? Math.random() > 0.5 : 1)
    .filter(party => party.eligable)
    .map((party, i) => (i === 0 ? pickSeat(party, nr) : party))
    .concat(parties.filter(party => !party.eligable))
    .map(calculateSeatPercentage)
    .sort(sort)
}

const balanceRemainingVotes = (parties, maxVotes) => ((parties, totalVotes) => parties.map(party => ({
  ...party,
  votes: party.changed ? party.votes : party.votes - (totalVotes - maxVotes) * (party.votes / totalVotes),
})))(parties, countTotal(parties))

export {
  balanceRemainingVotes,
  calculatePercentages,
  selectAndAssignSeat,
  pickSeat,
  control,
  sort,
  countTotal
}
