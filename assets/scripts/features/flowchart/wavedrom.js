import importedWaveSkin from 'wavedrom/skins/default.js'
import 'wavedrom/wavedrom.min.js'

function ensureWaveSkin() {
  if (typeof window === 'undefined') return
  if (window.WaveSkin) return

  const resolvedWaveSkin =
    importedWaveSkin &&
    typeof importedWaveSkin === 'object' &&
    Array.isArray(importedWaveSkin.default)
      ? importedWaveSkin
      : importedWaveSkin &&
          typeof importedWaveSkin === 'object' &&
          importedWaveSkin.default &&
          typeof importedWaveSkin.default === 'object'
        ? importedWaveSkin.default
        : null

  if (resolvedWaveSkin) {
    window.WaveSkin = resolvedWaveSkin
  }
}

function renderWaveDrom() {
  if (typeof window === 'undefined') return
  ensureWaveSkin()
  const runtime = window.WaveDrom
  if (!runtime || typeof runtime.ProcessAll !== 'function') return
  runtime.ProcessAll()
}

function applyThemeToWaveDrom() {
  if (typeof window === 'undefined') return
  const theme = document.documentElement.getAttribute('data-theme') || 'light'
  const computed = getComputedStyle(document.documentElement)
  const stroke = (computed.getPropertyValue('--wavedrom-stroke') || '').trim() || null
  const infoFill = (computed.getPropertyValue('--wavedrom-info-fill') || '').trim() || null
  const gapFill = (computed.getPropertyValue('--wavedrom-gap-fill') || '').trim() || null
  const clockArrowFill = (computed.getPropertyValue('--wavedrom-clock-arrow-fill') || '').trim() || null
  const box2Fill = (computed.getPropertyValue('--wavedrom-box2-fill') || '').trim() || null
  const box3Fill = (computed.getPropertyValue('--wavedrom-box3-fill') || '').trim() || null
  const box4Fill = (computed.getPropertyValue('--wavedrom-box4-fill') || '').trim() || null
  const box5Fill = (computed.getPropertyValue('--wavedrom-box5-fill') || '').trim() || null
  const box6Fill = (computed.getPropertyValue('--wavedrom-box6-fill') || '').trim() || null
  const box7Fill = (computed.getPropertyValue('--wavedrom-box7-fill') || '').trim() || null
  const box8Fill = (computed.getPropertyValue('--wavedrom-box8-fill') || '').trim() || null
  const box9Fill = (computed.getPropertyValue('--wavedrom-box9-fill') || '').trim() || null
  const gateFill = (computed.getPropertyValue('--wavedrom-gate-fill') || '').trim() || null
  const gateStroke = (computed.getPropertyValue('--wavedrom-gate-stroke') || '').trim() || null

  // set data-theme on all containers for easier debugging/scoping
  document.querySelectorAll('.wavedrom').forEach((el) => el.setAttribute('data-theme', theme))

  // update generated svg elements
  let paths = Array.from(document.querySelectorAll('.WaveDrom path.s1, .WaveDrom path.s2, .WaveDrom path.s3, .WaveDrom path.wire'))
  paths.forEach((p) => {
    if (stroke) p.style.setProperty('stroke', stroke, 'important')
    else p.style.removeProperty('stroke')
  })

  // Gaps
  let gaps = document.querySelectorAll('.WaveDrom path.s5')
  gaps.forEach((t) => {
    if (gapFill) t.style.setProperty('fill', gapFill, 'important')
    else t.style.removeProperty('fill')
  })

  // Clock Arrows
  let clockarrows = document.querySelectorAll('.WaveDrom path.s6')
  clockarrows.forEach((t) => {
    if (clockArrowFill) t.style.setProperty('fill', clockArrowFill, 'important')
    else t.style.removeProperty('fill')
  })

  // Text (signal names, time info, etc.)
  let infoTexts = document.querySelectorAll('.WaveDrom text.info')
  infoTexts.forEach((t) => {
    if (infoFill) t.style.setProperty('fill', infoFill, 'important')
    else t.style.removeProperty('fill')
  })

  // Gates
  let gates = document.querySelectorAll('.WaveDrom path.gate')
  gates.forEach((t) => {
    if (gateFill) t.style.setProperty('fill', gateFill, 'important')
    else t.style.removeProperty('fill')
    if (gateStroke) t.style.setProperty('stroke', gateStroke, 'important')
    else t.style.removeProperty('stroke')
  })

  // 2
  let box2 = document.querySelectorAll('.WaveDrom path.s7')
  box2.forEach((t) => {
    if (box2Fill) t.style.setProperty('fill', box2Fill, 'important')
    else t.style.removeProperty('fill')
  })

  // 3
  let box3 = document.querySelectorAll('.WaveDrom path.s8')
  box3.forEach((t) => {
    if (box3Fill) t.style.setProperty('fill', box3Fill, 'important')
    else t.style.removeProperty('fill')
  })

  // 4
  let box4 = document.querySelectorAll('.WaveDrom path.s9')
  box4.forEach((t) => {
    if (box4Fill) t.style.setProperty('fill', box4Fill, 'important')
    else t.style.removeProperty('fill')
  })

  // 5
  let box5 = document.querySelectorAll('.WaveDrom path.s10')
  box5.forEach((t) => {
    if (box5Fill) t.style.setProperty('fill', box5Fill, 'important')
    else t.style.removeProperty('fill')
  })

  // 6
  let box6 = document.querySelectorAll('.WaveDrom path.s11')
  box6.forEach((t) => {
    if (box6Fill) t.style.setProperty('fill', box6Fill, 'important')
    else t.style.removeProperty('fill')
  })

  // 7
  let box7 = document.querySelectorAll('.WaveDrom path.s12')
  box7.forEach((t) => {
    if (box7Fill) t.style.setProperty('fill', box7Fill, 'important')
    else t.style.removeProperty('fill')
  })

  // 8
  let box8 = document.querySelectorAll('.WaveDrom path.s13')
  box8.forEach((t) => {
    if (box8Fill) t.style.setProperty('fill', box8Fill, 'important')
    else t.style.removeProperty('fill')
  })

  // 9
  let box9 = document.querySelectorAll('.WaveDrom path.s14')
  box9.forEach((t) => {
    if (box9Fill) t.style.setProperty('fill', box9Fill, 'important')
    else t.style.removeProperty('fill')
  })
}

function renderAndApply() {
  renderWaveDrom()
  // small timeout to ensure DOM insertion by WaveDrom
  setTimeout(applyThemeToWaveDrom, 20)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderAndApply)
} else {
  renderAndApply()
}

// Watch for theme changes on html element and re-apply
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
      applyThemeToWaveDrom()
    }
  }
})

if (typeof document !== 'undefined' && document.documentElement) {
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
}

