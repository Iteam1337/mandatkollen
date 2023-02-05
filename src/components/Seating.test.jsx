/** @jsx pureact.createElement */
import Seating from './Seating'

const state = {
  parties: [
    { id: 1, votes: 10, seats: 20 },
    { id: 2, votes: 10, seats: 20 },
  ],
}

it('renders without crashing', () => {
  const result = <Seating parties={state.parties} />
})
