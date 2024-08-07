<template>
  <div
    :id="elId"
    data-testid="share-tooltip-button"
    class="h-fit cursor-pointer justify-self-end rounded p-1 transition-colors"
    :class="{
      'bg-s-900 text-white': hoveringTooltip,
    }"
  >
    <Icon name="Share" :class="shareIconClass" />
  </div>
</template>

<script>
import tippy from 'tippy.js'
import Icon from '~/components/common/Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    twitterLink: {
      type: String,
      required: true,
    },
    linkedinLink: {
      type: String,
      required: true,
    },
    linkedinShareableTitle: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    shareIconClass: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      copyButtonId: 'copy-button',
      hoveringTooltip: false,
      elId: `share-tooltip-${(Math.random() + 1).toString(36).substring(7)}`,
    }
  },

  computed: {
    linkedinSharableLink() {
      return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        this.linkedinLink,
      )}&title=${encodeURI(this.linkedinShareableTitle)}`
    },
  },

  mounted() {
    const {
      elId,
      link,
      twitterLink,
      linkedinSharableLink,
      copyButtonId,
      setHoveringTooltip,
      setNotHoveringTooltip,
    } = this
    let copiedTooltip = null
    this.$nextTick(() => {
      tippy('#' + elId, {
        allowHTML: true,
        placement: 'left',
        interactive: true,
        appendTo: document.body,
        onShow(instance) {
          setHoveringTooltip()
          const twitterSvgLogo =
            '<svg data-testid="share-on-x" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#qfvil7ouca)"><path d="M11.903 8.464 19.348 0h-1.764l-6.465 7.35L5.955 0H0l7.808 11.114L0 19.99h1.764l6.828-7.761 5.452 7.76H20L11.902 8.465zm-2.417 2.747-.791-1.106L2.4 1.299h2.71l5.08 7.107.791 1.106 6.604 9.238h-2.71l-5.389-7.538z" fill="currentColor"/></g><defs><clipPath id="qfvil7ouca"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath></defs></svg>'
          const linkedinSvgLogo =
            '<svg data-testid="share-on-linkedin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.5 3.75h-15a.75.75 0 0 0-.75.75v15c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75v-15a.75.75 0 0 0-.75-.75zM11.25 10.5v6M8.25 10.5v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.25 13.125a2.625 2.625 0 0 1 5.25 0V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.25 8.625a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25z" fill="currentColor"/></svg>'
          const copySvgIcon =
            '<svg data-testid="copy-link" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'

          const divContent = document.createElement('div')
          const spanShare = document.createElement('span')
          const copyButton = document.createElement('button')

          copyButton.id = copyButtonId

          divContent.setAttribute('data-testid', 'share-tooltip-content')
          divContent.style.backgroundColor = 'rgba(39, 39, 39, 0.95)'
          divContent.style.display = 'flex'
          divContent.style.alignItems = 'center'
          divContent.style.gap = '12px'
          divContent.style.padding = '12px'
          divContent.style.borderRadius = '12px'
          spanShare.style.fontSize = '12px'

          copyButton.innerHTML = copySvgIcon
          spanShare.innerHTML = 'Share'

          divContent.innerHTML = `
            ${spanShare.outerHTML}
            <a href="${linkedinSharableLink}" target="_blank" rel="noopener noreferrer">
              ${linkedinSvgLogo}
            </a>
            <a href="${twitterLink}" target="_blank" rel="noopener noreferrer">
              ${twitterSvgLogo}
            </a>
            ${copyButton.outerHTML}
          `

          instance.setContent(divContent.outerHTML)
        },
        onShown() {
          const copyButton = document.getElementById(copyButtonId)
          copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(link)
          })

          tippy('#' + copyButtonId, {
            trigger: 'click',
            placement: 'top',
            allowHTML: true,
            onShow(instance) {
              copiedTooltip = instance
              const divContent = document.createElement('div')

              divContent.setAttribute('data-testid', 'copied-tooltip')
              divContent.style.backgroundColor = '#333'
              divContent.style.padding = '8px'
              divContent.style.borderRadius = '12px'
              divContent.style.marginBottom = '8px'

              divContent.textContent = 'Copied!'
              instance.setContent(divContent.outerHTML)

              setTimeout(() => {
                instance.hide()
              }, 1000)
            },
          })
        },
        onHide() {
          setNotHoveringTooltip()
          copiedTooltip?.hide()
        },
      })
    })
  },

  methods: {
    setHoveringTooltip() {
      this.hoveringTooltip = true
    },
    setNotHoveringTooltip() {
      this.hoveringTooltip = false
    },
  },
}
</script>
