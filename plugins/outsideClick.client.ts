export default defineNuxtPlugin((nuxtApp) => {
  const handleOutsideClick = (el?, binding?, event?) => {
    event.stopPropagation()
    const handler = binding.value
    if (!el.contains(event.target)) {
      handler()
    }
  }

  nuxtApp.vueApp.directive('click-outside', {
    mounted(el, binding) {
      document.addEventListener('click', (e) =>
        handleOutsideClick(el, binding, e),
      )
      document.addEventListener('touchstart', (e) =>
        handleOutsideClick(el, binding, e),
      )
    },

    unmounted() {
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    },
  })
})
