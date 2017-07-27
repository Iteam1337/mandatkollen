const initialState = {
  regering: { hover: false, count: 0 },
  center: { hover: false, count: 0 },
  opposition: { hover: false, count: 0 },
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'GROUP_ENTER': {
      const count = state[action.group].count + 1
      const newState =  {
        ...state,
        [action.group]: { hover: count > 0, count }
      }
      return newState
    }
    case 'GROUP_LEAVE': {
      const count = state[action.group].count - 1
      return {
        ...state,
        [action.group]: { hover: count > 0, count }
      }
    }
    default: return state
  }
}
