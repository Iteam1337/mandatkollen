import polls from '../lib/polls.mjs'
import moment from 'moment'
import { isValnatt } from '../lib/elections.mjs'

// Statisk reserv om /valnatt inte kan hämtas – uppdateras vid varje val
const finalResult = {
  M: 19.8,
  L: 5.3,
  KD: 6.2,
  C: 7,
  SD: 17.5,
  S: 28,
  MP: 6.1,
  V: 8.4,
  Ö: 1.6,
}

let initialState = [
  {
    institute: 'Val 2026',
    dates: '2026-09-13',
    parties: finalResult,
  },
]

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOAD_POLLS':
      return Promise.all([polls.fetchPolls(), polls.fetchValnatt()]).then(
        ([polls, valnatt]) => [
          // På valnatten visas live-resultatet som eget alternativ
          ...(valnatt && isValnatt()
            ? [
                {
                  ...valnatt,
                  institute: `Valnatt ${valnatt.year}`,
                  dates: moment(valnatt.date).format('YYYY-MM-DD HH:mm'),
                },
              ]
            : []),
          ...polls,
          // Mellan valen är /valnatt aktuellt valresultat (ersätter den
          // statiska reserven, slutligt när val.se-räkningen är klar)
          ...(valnatt && !isValnatt()
            ? [
                {
                  ...valnatt,
                  institute: `Val ${valnatt.year}`,
                  dates: valnatt.valdatum,
                },
              ]
            : initialState),
        ]
      )

    default:
      return state
  }
}
