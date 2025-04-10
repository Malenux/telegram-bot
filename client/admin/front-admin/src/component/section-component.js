class Section extends HTMLElement {
  static get observedAttributes () {
    return ['background-color']
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
    const backgroundColor = this.getAttribute('background-color') || '#1D2030'

    this.shadow.innerHTML =
    /* html */`
    <style>
      
      .section {
        background-color: ${backgroundColor}; 
        border-radius: 0.5rem;
        padding: 1.25rem;
      }

      @media (max-width: 768px) {
        .section {
          padding: 1rem;
        }
      }

    </style>
    <div class="section">
      <slot></slot>
    </div>

    `
  }
}

customElements.define('section-component', Section)
