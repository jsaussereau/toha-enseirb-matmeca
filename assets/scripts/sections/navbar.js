const getNavbarState = () => {
  const topNavbar = document.getElementById('top-navbar')
  const isHomePage = topNavbar?.classList.contains('homepage')
  const isTransparent = !!isHomePage && window.scrollY <= 40
  const theme = document.documentElement?.dataset?.theme

  return { isTransparent, theme }
}

const setNavbarLogo = () => {
  const logo = document.getElementById('logo')
  if (!logo) return

  const { isTransparent, theme } = getNavbarState()

  let sourceId = 'main-logo'
  if (theme === 'dark') {
    sourceId = 'dark-logo'
  } else if (isTransparent) {
    sourceId = 'inverted-logo'
  }

  const source =
    document.getElementById(sourceId) ||
    document.getElementById('main-logo') ||
    document.getElementById('inverted-logo') ||
    document.getElementById('dark-logo')

  const logoURL = source?.getAttribute('src')
  if (logoURL) {
    logo.setAttribute('src', logoURL)
  }
}

const updateNavBar = () => {
  const topNavbar = document.getElementById('top-navbar')
  const navbarToggler = document.getElementById('navbar-toggler')
  const themeIcon = document.getElementById('navbar-theme-icon-svg')

  if (window.scrollY > 40) {
    topNavbar?.classList.remove('transparent-navbar')
    topNavbar?.classList.add('shadow')

    navbarToggler?.classList.remove('navbar-dark')
    navbarToggler?.classList.add('navbar-light')

    // color theme selector a.k.a. dark mode
    themeIcon?.classList.remove('svg-inverted')

    setNavbarLogo()
  } else {
    topNavbar?.classList.remove('shadow')
    topNavbar?.classList.add('transparent-navbar')

    navbarToggler?.classList.remove('navbar-light')
    navbarToggler?.classList.add('navbar-dark')

    // color theme selector a.k.a. dark mode
    themeIcon?.classList.add('svg-inverted')

    setNavbarLogo()
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // change navbar style on scroll
  // ==================================================
  // When the user scrolls down 80px from the top of the document,
  // resize the navbar's padding and the logo's font size
  const topNavbar = document.getElementById('top-navbar')
  if (topNavbar?.classList.contains('homepage')) {
    document.addEventListener('scroll', updateNavBar)
    updateNavBar()
  } else {
    setNavbarLogo()
  }

  // update logo when the selected theme changes
  const htmlElement = document.documentElement
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        setNavbarLogo()
      }
    })
  })
  observer.observe(htmlElement, { attributes: true })

  // Creates a click handler to collapse the navigation when
  // anchors in the mobile nav pop up are clicked
  const navMain = document.getElementsByClassName('navbar-collapse')
  Array.from(navMain).forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && !e.target.classList.contains("dropdown-toggle")) {
        el.classList.add('collapse')
        el.classList.remove('show')
      }
    })
  })
})
