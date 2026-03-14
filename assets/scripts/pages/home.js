import TypeIt from 'typeit'

// =========== Typing Carousel ================
// get data from hidden ul and set as typing data
document.addEventListener('DOMContentLoaded', () => {
  const $ul = document.getElementById('typing-carousel-data')?.children
  if ($ul == null || $ul.length === 0) return

  const strings = Array.from($ul).map($el => $el.textContent)
  const typeSpeed = 80
  const deleteSpeed = 10
  const pauseAfterType = 400

  let typeItInstance = new TypeIt('#typed', {
    speed: typeSpeed,
    deleteSpeed,
    lifeLike: false,
    breakLines: false,
    cursorChar: "|",
    waitUntilVisible: true,
    html: false,
    loop: true
  })

  // Add all strings to the chain
  strings.forEach((string, index) => {
    typeItInstance = typeItInstance.type(string)
    typeItInstance = typeItInstance.pause(pauseAfterType)
    if (index < strings.length - 1) {
      typeItInstance = typeItInstance.delete(string.length)
    }
  })

  typeItInstance.go()
})
