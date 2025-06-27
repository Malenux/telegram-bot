class Title extends HTMLElement {
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

      h1, h2, h3, h4, h5, h6, p {
        margin: 0;
        padding: 0;
        font-size: 1.5rem;
        color:hsl(0, 0.00%, 87.80%);
      }
    </style>


    <div class="header-title">
      <h2>Pedidos</h2>
    </div>
    
    `
  }
}

customElements.define('title-component', Title)
