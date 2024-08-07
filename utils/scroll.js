export function scrollTo(elementId) {
  const headerHeighs = 150
  const isDesktop = window.screen.width >= 1024
  const el = document.getElementById(elementId)

  if (!el) return

  let top = el.getBoundingClientRect().top + window.scrollY

  if (isDesktop) top -= headerHeighs

  window.scrollTo({ top, behavior: 'smooth' })
}
