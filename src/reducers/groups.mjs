const EU = import.meta.env.VITE_EU === 'true'
const initialState = EU
  ? {
      epp: { title: 'EPP', hover: false, count: 0 },
      social: { title: 'S&D', hover: false, count: 0 },
      renew: { title: 'Renew', hover: false, count: 0 },
      greens: { title: 'Greens/EFA', hover: false, count: 0 },
      ecr: { title: 'ECR', hover: false, count: 0 },
      left: { title: 'The Left', hover: false, count: 0 },
    }
  : {
      government: { title: 'Regering', hover: false, count: 0 },
      opposition: { title: 'Opposition', hover: false, count: 0 },
      support: { title: 'Stödpartier', hover: false, count: 0 },
    }

export default function (state = initialState, action) {
  const group = state[action.group]
  console.log('action', action, group, state)
  switch (action.type) {
    case 'GROUP_ENTER': {
      const count = group.count + 1
      const newState = {
        ...state,
        [action.group]: { ...group, hover: count > 0, count },
      }
      return newState
    }
    case 'GROUP_LEAVE': {
      const count = group.count - 1
      return {
        ...state,
        [action.group]: { ...group, hover: count > 0, count },
      }
    }
    default:
      return state
  }
}
