export function trackAction(action) {
  const trackActions = [
    'UPDATE_PARTY_AFFILIATION',
    'UPDATE_PARTY_PERCENTAGE',
    'CHOOSE_BASE_VOTES',
    'EDIT_COALITIONS',
  ]
  if (!trackActions.includes(action.type)) return

  _paq.push([
    'trackEvent',
    'Action',
    action.type,
    action.value,
    JSON.stringify(action),
  ])
}
