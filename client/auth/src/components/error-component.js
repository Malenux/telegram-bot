class Error404 extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.loadData()
    this.render()
  }

  loadData () {
    this.data = {
      title: '404',
      subtitle: 'Página no encontrada',
      description: 'La página que intentas visitar no existe o fue movida.',
      buttonText: 'Volver a inicio',
      buttonUrl: '/',
      buttonTwoText: 'Volver a auth',
      buttonTwoUrl: '/auth/token?token=' + this.getAttribute('token')
    }
  }

  render () {
    this.shadow.innerHTML = /* html */ `
      <style>
        :host {
          --bg-main: #0b0f14;
          --bg-secondary: #121821;
          --text-primary: #e6eaf0;
          --text-secondary: #9aa4b2;
          --accent: #4da3ff;
          --accent-hover: #2f8cff;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: "Inter", "Nunito Sans", system-ui, sans-serif;
        }

        .content {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 2.5rem;
          text-align: center;
          background: radial-gradient(
            circle at top,
            var(--bg-secondary),
            var(--bg-main)
          );
          color: var(--text-primary);
        }

        .buttons {
          display: flex;
          gap: 1rem;
        }

        h1 {
          font-size: 5rem;
          font-weight: 700;
          letter-spacing: 0.1rem;
          color: var(--accent);
        }

        h2 {
          font-size: 2rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        p {
          max-width: 480px;
          font-size: 1.2rem;
          color: var(--text-secondary);
        }

        .text {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .button {
          border-radius: 0.75rem;
          padding: 0.9rem 2.2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease, border 0.2s ease;
        }

        /* PRIMARY */
        .button.primary {
          background: linear-gradient(135deg, var(--accent), #6bb7ff);
          border: none;
          color: #ffffff;
          box-shadow: 0 10px 30px rgba(77, 163, 255, 0.3);
        }

        .button.primary:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, var(--accent-hover), #5aa9ff);
          box-shadow: 0 14px 40px rgba(77, 163, 255, 0.45);
        }

        /* SECONDARY */
        .button.secondary {
          background: rgba(18, 24, 33, 0.6);
          border: 1px solid rgba(77, 163, 255, 0.35);
          color: var(--text-primary);
          box-shadow: inset 0 0 0 1px rgba(77, 163, 255, 0.05);
          backdrop-filter: blur(6px);
        }

        .button.secondary:hover {
          transform: translateY(-2px);
          background: rgba(77, 163, 255, 0.1);
          border-color: var(--accent);
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(77, 163, 255, 0.25), inset 0 0 0 1px rgba(77, 163, 255, 0.15);
        }


        .newtons-cradle {
          --uib-size: 56px;
          --uib-speed: 1.2s;
          --uib-color: var(--accent);
          display: flex;
          width: var(--uib-size);
          height: var(--uib-size);
          align-items: center;
          justify-content: center;
        }

        .newtons-cradle__dot {
          width: 25%;
          height: 100%;
          display: flex;
          align-items: center;
          transform-origin: center top;
        }

        .newtons-cradle__dot::after {
          content: '';
          width: 100%;
          height: 25%;
          border-radius: 50%;
          background-color: var(--uib-color);
          box-shadow: 0 0 12px rgba(77, 163, 255, 0.6);
        }

        .newtons-cradle__dot:first-child {
          animation: swing var(--uib-speed) ease-in-out infinite;
        }

        .newtons-cradle__dot:last-child {
          animation: swing2 var(--uib-speed) ease-in-out infinite;
        }

        @keyframes swing {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(65deg); }
          50% { transform: rotate(0deg); }
        }

        @keyframes swing2 {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-65deg); }
        }
      </style>

      <div class="content">
        <div class="text">
          <h1>${this.data.title}</h1>
          <h2>${this.data.subtitle}</h2>
          <p>${this.data.description}</p>
        </div>

        <div class="newtons-cradle">
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
        </div>

        <div class="buttons">
          <button class="button primary" onclick="location.href='${this.data.buttonUrl}'">
            ${this.data.buttonText}
          </button>

          <button class="button secondary" onclick="location.href='${this.data.buttonTwoUrl}'">
            ${this.data.buttonTwoText}
          </button>
        </div>
      </div>
    `
  }
}

customElements.define('error-component', Error404)
