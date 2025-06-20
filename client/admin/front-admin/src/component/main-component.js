class Main extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>
      * {
        box-sizing: border-box;
      }

      main {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 2rem;
        padding: 1rem;
        width: 100%;
        color: #E0E0E0;
      }

      @media (max-width: 768px) {
        main {
          grid-template-columns: 1fr;
          padding: 0 1rem;
        }
      }
    </style>


    <main>
      <slot></slot>
    </main>
    
    `
  }
}

customElements.define('main-component', Main)
