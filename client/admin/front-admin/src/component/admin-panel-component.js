class AdminPanelComponent extends HTMLElement {
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

      *{
        box-sizing: border-box;
      }

      h1{
        text-align: center;
        color: #2563eb;
        font-size: 6rem;
      }

      
    </style>

    <div>
      <h1>Admin Panel</h1>
    </div>
    
    `
  }
}

customElements.define('admin-panel-component', AdminPanelComponent)
