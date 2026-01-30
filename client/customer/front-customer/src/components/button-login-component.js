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
      .login-button button {
        position: fixed;
        top: 1.2rem;
        right: 3rem;

        height: 3.2rem;
        width: 6rem;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0;
        font-size: 0.95rem;
        font-weight: 600;
        letter-spacing: 0.03em;

        color: #ffffff;
        background: linear-gradient(
          135deg,
          rgba(0, 123, 255, 0.85),
          rgba(0, 180, 255, 0.75)
        );

        border: 1px solid rgba(255, 255, 255, 0.35);
        border-radius: 999px;

        cursor: pointer;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        box-shadow:
          0 8px 30px rgba(0, 123, 255, 0.35),
          inset 0 1px 0 rgba(255, 255, 255, 0.25);

        transition:
          transform 0.25s ease,
          box-shadow 0.25s ease,
          background 0.25s ease;

        z-index: 1000;
        font-family: "SoehneBuch", sans-serif;
      }

      .login-button button:hover {
        transform: translateY(-3px) scale(1.03);
        background: linear-gradient(
          135deg,
          rgba(0, 140, 255, 0.95),
          rgba(0, 200, 255, 0.85)
        );

        box-shadow:
          0 12px 40px rgba(0, 123, 255, 0.45),
          inset 0 1px 0 rgba(255, 255, 255, 0.35);
      }

      .login-button button:active {
        transform: translateY(-1px) scale(0.98);
        box-shadow:
          0 6px 20px rgba(0, 123, 255, 0.3),
          inset 0 2px 6px rgba(0, 0, 0, 0.2);
      }

      .login-button a {
        text-decoration: none;
      }
    </style>

    <div class="login-button">
        <a href="/login"><button>Login</button></a>
    </div>

    `
  }
}

customElements.define('button-login-component', ButtonLogin)
