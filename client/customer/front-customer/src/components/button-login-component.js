class ButtonLogin extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.render()
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>
      .login-button button{
          position: fixed;
          top: 1rem;
          right: 3rem;
          height: 3rem;
          width: 5rem;
          padding: 10px;
          background: rgba(0, 123, 255, 0.6);
          color: hsl(0, 0.00%, 100.00%);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          cursor: pointer;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 20px rgba(0, 123, 255, 0.3);
          transition: all 0.3s ease;
          z-index: 1000;
          font-family: "SoehneBuch", sans-serif;
        }

        .login-button button:hover {
          transform: translateY(-2px);
          background: rgba(0, 140, 255, 0.7);
          box-shadow: 0 6px 25px rgba(0, 123, 255, 0.4);
        }
    </style>

    <div class="login-button">
        <a href="/login"><button>Login</button></a>
    </div>

    `
  }
}

customElements.define('button-login-component', ButtonLogin)
