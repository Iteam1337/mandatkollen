import polls from '../lib/polls.mjs'
import moment from 'moment'

const finalResult = {
  KD: 5.34,
  M: 19.1,
  L: 4.61,
  C: 6.71,
  SD: 20.54,
  S: 30.33,
  MP: 5.08,
  V: 6.75,
  FI: 0.46,
  Ö: 1.54,
}

let initialState = [
  {
    institute: 'Val 2022',
    dates: '2022-09-11',
    parties: finalResult,
  },
]

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOAD_POLLS':
      return Promise.all([polls.fetchPolls(), polls.fetchValnatt()]).then(
        ([polls, valnatt]) => [
          {
            ...valnatt,
            institute: 'Valnatt 2026',
            dates: moment(valnatt.date).format('YYYY-MM-DD HH:mm'),
          },
          ...polls,
          ...initialState,
        ]
      )

    default:
      return state
  }
}
