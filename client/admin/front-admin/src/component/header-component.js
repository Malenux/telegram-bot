class Header extends HTMLElement {
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

      header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color:hsl(0, 0.00%, 10.20%);
        border-bottom: 0.2rem solid hsl(0, 0.00%, 22.00%);
      }
    </style>


    <header>
      <slot></slot>
    </header>
    
    `
  }
}

customElements.define('header-component', Header)
