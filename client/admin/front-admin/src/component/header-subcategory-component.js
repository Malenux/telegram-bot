class HeaderSubcategory extends HTMLElement {
  static get observedAttributes () {
    return ['background-color', 'color']
  }

  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render()
    }
  }

  render () {
    const backgroundColor = this.getAttribute('background-color') || 'hsl(229, 22%, 10%)'
    const color = this.getAttribute('color') || 'hsl(0, 0%, 100%)'

    this.shadow.innerHTML =
    /* html */`
      <style>

        header {
          background-color: ${backgroundColor}; 
          color: ${color};
          padding: 1.25rem;
          border-radius: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
      </style>
    
      <header>
        <slot></slot>
      </header>
    `
  }
}

customElements.define('header-subcategory-component', HeaderSubcategory)
