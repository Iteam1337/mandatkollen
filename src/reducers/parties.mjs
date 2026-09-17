import { Parliament } from '../lib/parliament.mjs'
const EU = import.meta.env.VITE_EU === 'true'
const SEATS = EU ? 21 : 349
const parties = [
  {
    // Faktiskt valresultat 2026 (preliminär räkning, samtliga
    // valdistrikt). Röster från val.se så att mandatfördelningen
    // blir exakt – uppdateras vid nästa val.
    id: 1,
    name: 'Kristdemokraterna',
    percentage: 6.2,
    votes: 415870,
    seats: 22,
    affiliation: 'regering',
    eu: 'epp',
    colour: '#3163A6',
    abbreviation: 'KD',
  },
  {
    id: 2,
    name: 'Moderaterna',
    percentage: 19.8,
    votes: 1336810,
    seats: 70,
    affiliation: 'regering',
    eu: 'epp',
    colour: '#2F80ED',
    abbreviation: 'M',
  },
  {
    id: 3,
    name: 'Liberalerna',
    percentage: 5.3,
    votes: 359845,
    seats: 19,
    affiliation: 'regering',
    eu: 'renew',
    colour: '#56CCF2',
    abbreviation: 'L',
  },
  {
    id: 4,
    name: 'Centerpartiet',
    percentage: 7,
    votes: 474548,
    seats: 25,
    affiliation: 'opposition',
    eu: 'renew',
    colour: '#27AE60',
    abbreviation: 'C',
  },
  {
    id: 5,
    name: 'Sverigedemokraterna',
    percentage: 17.5,
    votes: 1176840,
    seats: 62,
    affiliation: 'stod',
    eu: 'ecr',
    colour: '#F2C94C',
    abbreviation: 'SD',
  },
  {
    id: 6,
    name: 'Socialdemokraterna',
    percentage: 28,
    votes: 1886465,
    seats: 99,
    affiliation: 'opposition',
    eu: 'social',
    colour: '#E04B49',
    abbreviation: 'S',
  },
  {
    id: 7,
    name: 'Miljöpartiet',
    percentage: 6.1,
    votes: 413097,
    seats: 22,
    affiliation: 'opposition',
    eu: 'greens',
    colour: '#219653',
    abbreviation: 'MP',
  },
  {
    id: 8,
    name: 'Vänsterpartiet',
    percentage: 8.4,
    votes: 565614,
    seats: 30,
    affiliation: 'opposition',
    eu: 'left',
    colour: '#B12827',
    abbreviation: 'V',
  },
  {
    id: 10,
    name: 'Övriga',
    affiliation: 'opposition',
    colour: '#4D4D4D',
    percentage: 1.6,
    votes: 106540,
    seats: 0,
    abbreviation: 'Ö',
  },
]

let parliament = new Parliament(parties, SEATS)
let initialState = parliament.seats

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_PARTY_AFFILIATION': {
      // Behåll ordningen – endast grupp/affiliation ändras vid dra och släpp
      return state.map((party) =>
        party.abbreviation === action.abbreviation
          ? {
              ...party,
              affiliation: action.affiliation,
              eu: action.affiliation,
            }
          : party
      )
    }
    case 'UPDATE_PARTY_PERCENTAGE': {
      const seatsRemoved = state.map((party) => delete party.seats && party)
      const updatedParties = seatsRemoved.map((party) =>
        party.abbreviation === action.abbreviation
          ? parliament.updateVotes(party, action.percentage)
          : party
      )
      parliament = new Parliament(updatedParties, SEATS)
      return parliament.seats
    }
    case 'CHOOSE_BASE_VOTES': {
      parliament = new Parliament(
        parliament.updatePolls(action.votes.parties),
        SEATS
      )
      return parliament.seats
    }
    default:
      return state
  }
}
