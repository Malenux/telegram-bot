class TwoColumns extends HTMLElement {


  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    
  }


  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
    /*html*/`
    <style>
      * {
        box-sizing: border-box;
      }

      .two-columns {
        display: grid;
        grid-template-columns: 1.2fr 2fr;
        gap: 1.25rem;
        margin-top: 2rem;
        align-items: start;
      }

      .left-column,
      .right-column {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      @media (max-width: 768px) {
        .two-columns {
          grid-template-columns: 1fr;
        }
      }
      
    </style>

    <div class="two-columns">
      <div class="left-column">
        <slot name="small-column"></slot>
      </div>
      <div class="right-column">
        <slot name="big-column"></slot>
      </div>
    </div>

    `
  }
}


customElements.define('two-columns-component', TwoColumns);
