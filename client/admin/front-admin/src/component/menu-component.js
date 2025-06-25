class Menu extends HTMLElement {
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

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
      }

      h1, h2, h3, h4, h5, h6, p {
        margin: 0;
      }

      img {
        object-fit: cover;
        width: 100%;
      }

      .header-menu {
        background-color: #1E1E2F;
        padding: 1rem;
      }

      svg {
        width: 2rem;
        height: 2rem;
        fill: #E0E0E0;
        cursor: pointer;
        transition: fill 0.3s ease;
      }

      svg:hover {
        fill: #BB86FC;
      }
    </style>

    
    <div class="header-menu">
      <div class="menu-logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>menu</title>
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
      </div>
    </div>
  
    `
  }
}

customElements.define('menu-component', Menu)
