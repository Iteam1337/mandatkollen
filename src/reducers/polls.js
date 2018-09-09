import polls from '../lib/polls'
import moment from 'moment'

let initialState = Promise.all([polls.fetchPolls(), polls.fetchValnatt()]).then(([polls, valnatt]) => {
  console.log('valnatt', valnatt)
  return [{institute: 'Valmyndigheten', dates: moment(valnatt.date).locale('sv').calendar(), parties: valnatt.parties}, ...polls]
})

export default function (state = initialState, action) {
  console.log(action, state)
  switch (action.type) {
    default: return state
  }
}
