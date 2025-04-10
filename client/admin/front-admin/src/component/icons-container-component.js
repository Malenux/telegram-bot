class IconsContainer extends HTMLElement {
  static get observedAttributes () {
    return ['fill', 'hover', 'width']
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
    const fill = this.getAttribute('fill') || 'hsl(90, 13%, 87%)'
    const hover = this.getAttribute('hover') || 'hsl(39, 100%, 60%)'
    const width = this.getAttribute('width') || '1.5rem'

    this.shadow.innerHTML =
    /* html */`
    <style>
      .icons {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      ::slotted(button) {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        color: transparent;
        cursor: pointer;
      }

      ::slotted(svg),
      ::slotted(button svg) {
        width: ${width};
        fill: ${fill};
        transition: fill 0.3s ease;
        cursor: pointer;
      }

      ::slotted(svg:hover),
      ::slotted(button svg:hover) {
        fill: ${hover};
      }
    </style>

    <div class="icons">
      <slot></slot>
    </div>
    `
  }
}

customElements.define('icons-container-component', IconsContainer)
