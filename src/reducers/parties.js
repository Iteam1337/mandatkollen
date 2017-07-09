const initialState = {
  KD: {value: 15},
  Moderaterna: {value: 15},
  Liberalerna: {value: 15},
  Centern: {value: 15},
  Socialdemokraterna: {value: 15},
  Vänstern: {value: 15},
  SD: {value: 15}
}

const countTotal = state => Object.keys(state).reduce((total, party) => total+state[party].value, 0)
const normalize = (state, ignore, diff) => Object.keys(state).map(party => {
  if (!state[party].changed){
    state[party].value = Math.round((state[party].value - (diff) * (state[party].value / 100)) * 10) / 10
  }
})

const parties = (state = initialState, action ) => {
  switch (action.type){
    case "UPDATE_PARTY_VALUE": {
      const newState = {...state, [action.party]: {value: action.value, changed: new Date()}}
      normalize(newState, action.party, countTotal(newState) - 100)
      return newState
    }
    default: return state
  }
}

export default parties