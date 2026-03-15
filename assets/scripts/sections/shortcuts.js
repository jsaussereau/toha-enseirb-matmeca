import Filterizr from 'filterizr'

document.addEventListener('DOMContentLoaded', () => {
  // ================== shortcut cards =====================

  // setup shortcut filter buttons
  const shortcutCardHolder = document.getElementById('shortcut-card-holder')
  if (shortcutCardHolder != null && shortcutCardHolder.children.length !== 0) {
    // eslint-disable-next-line no-new
    new Filterizr('.filtr-shortcuts', {
      layout: 'sameWidth',
      controlsSelector: '.shortcut-filtr-control'
    })
  }
})
