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

export function init() {
  const _paq = (window._paq = window._paq || [])
  _paq.push(['trackPageView'])
  _paq.push(['requireCookieConsent'])
  _paq.push(['enableLinkTracking'])
  _paq.push(['setTrackerUrl', '//matomo.iteam.services/matomo.php'])
  _paq.push(['setSiteId', '3'])
}
