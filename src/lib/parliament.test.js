import { Parliament } from './parliament'

const state = {
  parties: [
    { id: 1, percentage: 50},
    { id: 2, percentage: 50},
  ]
}

it('should be correctly calculated with percentages', () => {
  const parliament = new Parliament(state.parties)
  const result = parliament.seats.map(parliament.percentage)
  expect(result).toHaveLength(2)
  expect(result[0]).toHaveProperty('percentage')
  expect(result[1]).toHaveProperty('percentage')
  expect(result[0].percentage).toBe(50)
  expect(result[1].percentage).toBe(50)
})

it('should be correctly calculated votes when only percentages was given', () => {
  const onlyPercentages = [{id:1, percentage: 50}, {id:2, percentage: 50}]
  const parliament = new Parliament(onlyPercentages)
  const result = parliament.seats
  expect(result).toHaveLength(2)
  expect(result[0]).toHaveProperty('votes')
  expect(result[1]).toHaveProperty('votes')
  expect(result[0].votes).toBe(500000)
  expect(result[1].votes).toBe(500000)
})

it('should be keep seats unchanged when provided', () => {
  const bothPercentageAndSeats = [{id:1, percentage: 50, seats: 174}, {id:2, percentage: 50, seats: 175}]
  const parliament = new Parliament(bothPercentageAndSeats)
  const result = parliament.seats
  expect(result).toHaveLength(2)
  expect(result[0]).toHaveProperty('seats')
  expect(result[1]).toHaveProperty('seats')
  expect(result[0].seats).toBe(174)
  expect(result[1].seats).toBe(175)
})

it('should be correctly initialized', () => {
  const parliament = new Parliament(state.parties)
  const result = parliament.seats
  expect(result).toHaveLength(2)
  expect(result[0]).toHaveProperty('votes')
  expect(result[1]).toHaveProperty('votes')
  expect(result[0].votes).toBe(500000)
  expect(result[1].votes).toBe(500000)
})

it('should balance total percentage according to their relative values', () => {
  const oneAdded = {parties: [...state.parties, {id: 3, percentage: 50}]}
  const parliament = new Parliament(oneAdded.parties, 20000)
  const result = parliament.seats
  expect(result).toHaveLength(3)
  expect(result[0].percentage).toBe(33.3)
  expect(result[1].percentage).toBe(33.3)
  expect(result[2].percentage).toBe(33.3)
})

it('should not exceed 100 percent', () => {
  const parties = [
  {
    "id": 1,
    "name": "Kristdemokr.",
    "percentage": 3,
    "votes": 30273.438,
    "numberForComparison": 25227.87,
  },
  {
    "id": 2,
    "name": "Moderaterna",
    "percentage": 20.6,
    "votes": 205078.125,
    "numberForComparison": 1306.230096,
  },
  {
    "id": 3,
    "name": "Liberalerna",
    "percentage": 5.6,
    "votes": 55664.063,
    "numberForComparison": 1294.513093,
  },
  {
    "id": 4,
    "name": "Centerpartiet",
    "percentage": 18.6,
    "votes": 105000,
    "numberForComparison": 1296.296296,
    "changed": "2017-08-04T15:13:12.293Z"
  },
  {
    "id": 5,
    "name": "Sverigedemokr.",
    "percentage": 13.2,
    "affiliation": "opposition",
    "votes": 131835.938,
    "numberForComparison": 1305.306317,
  },
  {
    "id": 6,
    "name": "Socialdemokr.",
    "percentage": 30.7,
    "affiliation": "coalition",
    "votes": 306640.625,
    "numberForComparison": 1316.054185,
  },
  {
    "id": 7,
    "name": "Miljöpartiet",
    "percentage": 4.9,
    "affiliation": "coalition",
    "votes": 48828.125,
    "numberForComparison": 1319.679054,
  },
  {
    "id": 8,
    "name": "Vänsterpartiet",
    "percentage": 7,
    "affiliation": "abstaining",
    "votes": 69335.938,
    "numberForComparison": 1308.225245,
  },
  {
    "id": 9,
    "name": "FI",
    "percentage": 2.3,
    "affiliation": "abstaining",
    "votes": 23437.5,
    "numberForComparison": 19531.25,
  },
  {
    "id": 10,
    "name": "Övriga",
    "affiliation": "abstaining",
    "percentage": 2.2,
    "votes": 21484.375,
    "numberForComparison": 17903.65,
  }
]
  const parliament = new Parliament(parties)
  const sum = parliament.seats.reduce((sum, a) => sum + a.percentage, 0)
  expect(sum).toBe(100)
})

it('should calculate votes according to percentage', () => {
  const oneAdded = {parties: [...state.parties, {id: 3, percentage: 50}]}
  const parliament = new Parliament(oneAdded.parties, 30000)
  const result = parliament.seats
  expect(result).toHaveLength(3)
  expect(result[0].votes).toBe(10000)
  expect(result[1].votes).toBe(10000)
  expect(result[2].votes).toBe(10000)
})

it('should adjust to maximum votes', () => {
  const parliament = new Parliament(state.parties, 200000)
  const result = parliament.seats
  const sumVotes = parliament.seats.reduce((sum, a) => sum + a.votes, 0)
  expect(sumVotes).toBe(200000)
  expect(Math.round(result[0].votes)).toBe(100000)
  expect(Math.round(result[1].votes)).toBe(100000)
})

it('should adjust to maximum votes even with one added', () => {
  const oneAdded = [...state.parties, {id: 3, percentage: 25}]
  const parliament = new Parliament(oneAdded, 200000)
  const result = parliament.seats
  const sumVotes = parliament.seats.reduce((sum, a) => sum + a.votes, 0)
  expect(sumVotes).toBe(200000)
  expect(Math.round(result[0].votes)).toBe(80000)
  expect(Math.round(result[1].votes)).toBe(80000)
  expect(Math.round(result[2].votes)).toBe(40000)
})

it('should update based on percentage but not not touch changed parties', () => {
  const oneAdded = [...state.parties, {id: 3, percentage: 4, changed: new Date()}]
  const parliament = new Parliament(oneAdded, 20)
  const result = parliament.seats
  expect(result).toHaveLength(3)
  expect(Math.round(result[0].percentage)).toBe(48)
  expect(Math.round(result[1].percentage)).toBe(48)
  expect(Math.round(result[2].percentage)).toBe(4)
})

it('should mix seats from each party evenly when they have equally amount of votes', () => {
  const parliament = new Parliament(state.parties)
  const result = parliament.seats
  expect(result).toHaveLength(2)
  expect(result[0]).toHaveProperty('seats')
  expect(result[1]).toHaveProperty('seats')
  expect(result[0].seats).toBe(174)
  expect(result[1].seats).toBe(175)
})

/* Examples from https://sv.wikipedia.org/wiki/Jämkade_uddatalsmetoden */
it('it should correctly implement "jämkade uddatalsmetoden" according to the examples', () => {
  const parties = [
    {id: 1, percentage: 24657 / 73906},
    {id: 2, percentage: 18312 / 73906},
    {id: 3, percentage: 11976 / 73906},
    {id: 4, percentage: 10824 / 73906},
    {id: 5, percentage: 8137 / 73906}
  ]
  const parliament = new Parliament(parties, undefined, 5)
  const result = parliament.seats
  expect(result).toHaveLength(5)
  expect(result[0].seats).toBe(2)
  expect(result[1].seats).toBe(1)
  expect(result[2].seats).toBe(1)
  expect(result[3].seats).toBe(1)
  expect(result[4].seats).toBe(0)
})

/* Examples from https://sv.wikipedia.org/wiki/Jämkade_uddatalsmetoden */
xit('should mix seats according to a real example', () => {

  // it's not working because we need to adjust for valdistrikt to make it accurate
  const parties = [
    { id: 1, name: "Kristdemokraterna", votes: 284806, realSeats: 16},
    { id: 2, name: "Moderaterna", votes: 1453517, realSeats: 84 },
    { id: 3, name: "Liberalerna", votes: 337773, realSeats: 19 },
    { id: 4, name: "Centerpartiet", votes: 380937, realSeats: 22 },
    { id: 5, name: "Socialdemokraterna", votes: 1932711, realSeats: 113 },
    { id: 6, name: "Miljöpartiet", votes: 429275, realSeats: 25 },
    { id: 7, name: "Vänsterpartiet", votes: 356331, realSeats: 21 },
    { id: 8, name: "Sverigedemokraterna", votes: 801178, realSeats: 49 },
    { id: 9, name: "FI", votes: 194719, realSeats: 0 },
    { id: 10, name: "Ö", votes: 60326, realSeats: 0 }
  ]
  const parliament = new Parliament(parties, undefined, 349, 1.4)
  parliament.seats.forEach(function(s) {
    expect(s.seats).toBe(s.realSeats)
  });

})