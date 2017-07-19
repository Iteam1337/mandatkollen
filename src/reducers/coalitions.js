const initialState = {
  editCoalitions: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'EDIT_COALITIONS': {
      return {
        ...state,
        editCoalitions: action.value
      }
    }
    default: return state
  }
}
