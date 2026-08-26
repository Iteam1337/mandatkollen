const initialState = {
  name: 'Val 2022',
  manual: false,
}

export default function sourceReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHOOSE_BASE_VOTES': {
      const name = action?.votes?.institute || action?.votes?.source || state.name
      return {
        name,
        manual: false,
      }
    }
    case 'UPDATE_PARTY_PERCENTAGE':
    case 'UPDATE_PARTY_AFFILIATION':
      return {
        name: 'Manuellt inställt resultat',
        manual: true,
      }
    default:
      return state
  }
}
