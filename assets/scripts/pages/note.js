import imagesLoaded from 'imagesloaded'

document.addEventListener('DOMContentLoaded', function () {
  function resizeGridItem (item) {
    const grid = document.getElementsByClassName('note-card-holder')[0]
    if (!grid) return
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'))
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'))
    if (Number.isNaN(rowHeight) || Number.isNaN(rowGap) || rowHeight <= 0) return
    const content = item.querySelector('.item')
    if (!content) return
    const rowSpan = Math.ceil((content.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap))
    item.style.gridRowEnd = 'span ' + rowSpan
  }

  function resizeAllGridItems () {
    const allItems = document.querySelectorAll('.note-card-holder > .note-card')
    for (let x = 0; x < allItems.length; x++) {
      resizeGridItem(allItems[x])
    }
  }

  function resizeInstance (instance) {
    const item = instance.elements[0]
    resizeGridItem(item)
  }

  window.addEventListener('resize', resizeAllGridItems)

  const allItems = document.querySelectorAll('.note-card-holder > .note-card')
  for (let x = 0; x < allItems.length; x++) {
    imagesLoaded(allItems[x], resizeInstance)
  }
})
