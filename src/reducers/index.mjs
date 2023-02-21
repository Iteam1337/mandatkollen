import coalitions from './coalitions'
import parties from './parties'
import polls from './polls'
import groups from './groups'
import { trackAction } from '../lib/matomo'

const reducer = async (state, action) => ({
  polls: await polls(state.polls, action),
  parties: await parties(state.parties, action),
  groups: groups(state.groups, action),
  coalitions: coalitions(state.coalitions, action),
  matomo: trackAction(action),
})

export default reducer
