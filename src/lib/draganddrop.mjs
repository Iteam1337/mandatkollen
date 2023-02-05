import store from '../store.mjs'

const updatePartyAffiliation = (abbreviation, affiliation) =>
  store.dispatch({
    type: 'UPDATE_PARTY_AFFILIATION',
    abbreviation,
    affiliation,
  })
const groupEnter = (group) => store.dispatch({ type: 'GROUP_ENTER', group })
const groupLeave = (group) => store.dispatch({ type: 'GROUP_LEAVE', group })

// hack to prevent scrolling while dragging and dropping
window.addEventListener('touchmove', function (e) {}, { passive: false })

const dragOver = (event) => {
  event.preventDefault()
  event.stopPropagation()
  event.dataTransfer.dropEffect = 'move'
}

const dropUpdate = (affiliation) => (event) => {
  event.preventDefault()
  updatePartyAffiliation(event.dataTransfer.getData('Text'), affiliation)
  groupLeave(affiliation)
}

const dragEnter = (group) => (event) => {
  event.preventDefault()
  console.log('dropenter', group)
  groupEnter(group)
}

const dragLeave = (group) => (event) => {
  event.preventDefault()
  console.log('dropleave', group)
  groupLeave(group)
}

const dragStart = (abbreviation) => (event) => {
  event.dataTransfer.setData('Text', abbreviation)
  event.dataTransfer.effectAllowed = 'move'
}

export { dragOver, dropUpdate, dragEnter, dragLeave, dragStart }
