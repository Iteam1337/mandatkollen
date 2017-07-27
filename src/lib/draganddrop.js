import store from '../store'

const updatePartyAffiliation = (abbreviation, affiliation) => store.dispatch({type: 'UPDATE_PARTY_AFFILIATION', abbreviation, affiliation })
const groupEnter = group => store.dispatch({ type: 'GROUP_ENTER', group })
const groupLeave = group => store.dispatch({ type: 'GROUP_LEAVE', group })

const dragOver = event => {
  event.preventDefault()
  event.stopPropagation()
  event.dataTransfer.dropEffect = "move"
}

const dropUpdate = (affiliation) => event => {
  event.preventDefault()
  updatePartyAffiliation(event.dataTransfer.getData('Text'), affiliation)
  groupLeave(affiliation)
}

const dragEnter = group => event => {
  event.preventDefault()
  console.log('dropenter', group)
  groupEnter(group)
}

const dragLeave = group => event => {
  event.preventDefault()
  console.log('dropleave', group)
  groupLeave(group)
}

export {
  dragOver,
  dropUpdate,
  dragEnter,
  dragLeave
}