import polls from '../lib/polls'
import moment from 'moment'
const finalResult = {
  KD: 6.32, 
  M: 19.84, 
  L: 5.49, 
  C: 8.61, 
  SD: 17.53, 
  S: 28.26, 
  MP: 4.41, 
  V: 8, 
  FI: 0.46, 
  Ö: 1.07
}

let initialState = Promise.all([polls.fetchPolls(), polls.fetchValnatt()]).then(([polls, valnatt]) => {
  return [ ...polls, {institute: 'Val2018', dates: moment('2018-09-09').locale('sv').calendar(), parties: finalResult} /*, {institute: 'Valnatt', dates: moment(valnatt.date).locale('sv').calendar(), parties: valnatt.parties}*/]
})

export default function (state = initialState, action) {
  switch (action.type) {
    default: return state
  }
}
