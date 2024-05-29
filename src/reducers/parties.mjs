import { Parliament } from '../lib/parliament.mjs'
const EU = import.meta.env.VITE_EU === 'true'
const SEATS = EU ? 21 : 349
const parties = [
  {
    id: 1,
    name: 'Kristdemokraterna',
    percentage: 5.34,
    seats: 19,
    affiliation: 'regering',
    eu: 'epp',
    colour: '#3163A6',
    abbreviation: 'KD',
  },
  {
    id: 2,
    name: 'Moderaterna',
    percentage: 19.1,
    seats: 68,
    affiliation: 'regering',
    eu: 'ecr',
    colour: '#2F80ED',
    abbreviation: 'M',
  },
  {
    id: 3,
    name: 'Liberalerna',
    percentage: 4.61,
    seats: 16,
    affiliation: 'regering',
    eu: 'renew',
    colour: '#56CCF2',
    abbreviation: 'L',
  },
  {
    id: 4,
    name: 'Centerpartiet',
    percentage: 6.71,
    seats: 24,
    affiliation: 'opposition',
    eu: 'renew',
    colour: '#27AE60',
    abbreviation: 'C',
  },
  {
    id: 5,
    name: 'Sverigedemokraterna',
    percentage: 20.54,
    seats: 73,
    affiliation: 'stod',
    eu: 'ecr',
    colour: '#F2C94C',
    abbreviation: 'SD',
  },
  {
    id: 6,
    name: 'Socialdemokraterna',
    percentage: 30.33,
    seats: 107,
    affiliation: 'opposition',
    eu: 'social',
    colour: '#E04B49',
    abbreviation: 'S',
  },
  {
    id: 7,
    name: 'Miljöpartiet',
    percentage: 5.08,
    seats: 18,
    affiliation: 'opposition',
    eu: 'greens',
    colour: '#219653',
    abbreviation: 'MP',
  },
  {
    id: 8,
    name: 'Vänsterpartiet',
    percentage: 6.75,
    seats: 24,
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
    percentage: 1.54,
    seats: 0,
    abbreviation: 'Ö',
  },
]

let parliament = new Parliament(parties, SEATS)
let initialState = parliament.seats

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_PARTY_AFFILIATION': {
      const updatedParties = state
        .map((party) =>
          party.abbreviation === action.abbreviation
            ? {
                ...party,
                affiliation: action.affiliation,
                eu: action.affiliation,
              }
            : party
        )
        .sort(parliament.sort)
      return updatedParties
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
