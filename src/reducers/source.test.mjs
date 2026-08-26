import { describe, it, expect } from 'vitest'
import sourceReducer from './source.mjs'

describe('source reducer', () => {
  it('stores the selected poll source name', () => {
    const state = sourceReducer(undefined, {
      type: 'CHOOSE_BASE_VOTES',
      votes: { institute: 'TNS-Sifo', dates: '2/10 - 12/10' },
    })

    expect(state.name).toBe('TNS-Sifo')
    expect(state.manual).toBe(false)
  })

  it('marks manual percentage changes as a manual result', () => {
    const state = sourceReducer(
      { name: 'TNS-Sifo', manual: false },
      {
        type: 'UPDATE_PARTY_PERCENTAGE',
        abbreviation: 'M',
        percentage: 17.2,
      }
    )

    expect(state.name).toBe('Manuellt inställt resultat')
    expect(state.manual).toBe(true)
  })

  it('marks manual affiliation changes as a manual result', () => {
    const state = sourceReducer(
      { name: 'TNS-Sifo', manual: false },
      {
        type: 'UPDATE_PARTY_AFFILIATION',
        abbreviation: 'M',
        affiliation: 'opposition',
      }
    )

    expect(state.name).toBe('Manuellt inställt resultat')
    expect(state.manual).toBe(true)
  })
})
