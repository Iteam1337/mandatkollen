import store from '../store'
const updatePartyAffiliation = (abbreviation, affiliation) => store.dispatch({type: 'UPDATE_PARTY_AFFILIATION', abbreviation, affiliation })


const dragOver = event => {
  event.preventDefault()
  event.stopPropagation()
  event.dataTransfer.dropEffect = "move"
}

const dropUpdate = (affiliation) => event => {
  event.preventDefault()
  updatePartyAffiliation(event.dataTransfer.getData('Text'), affiliation)
}

const dragEnter = event => {
  event.preventDefault()
  event.stopPropagation()
}

export {
  dragOver,
  dropUpdate,
  dragEnter
}