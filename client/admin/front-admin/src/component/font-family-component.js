class FontLoader extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })

    const font = document.createElement('link')
    font.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'
    font.rel = 'stylesheet'
    document.head.appendChild(font)
  }
}

customElements.define('font-loader-compement', FontLoader)