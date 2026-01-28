class Login extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = {}
  }

  async connectedCallback () {
    console.log(window)
    await this.checkSignin()
    await this.render()
  }

  async checkSignin () {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/user/check-signin`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (result.ok) {
        const data = await result.json()
        window.location.href = data.redirection
      }
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    this.shadow.innerHTML = /* html */`
      <style>
        :host {
          --bg-main: #0b0f14;
          --bg-secondary: #121821;
          --text-primary: #e6eaf0;
          --text-secondary: #9aa4b2;
          --accent: #4da3ff;
          --accent-hover: #2f8cff;
          --error: #ff6b6b;
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
          background: radial-gradient(circle at top, var(--bg-secondary), var(--bg-main));
          color: var(--text-primary);
        }

        .text {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        h1 {
          font-size: 3rem;
          font-weight: 700;
          color: var(--accent);
        }

        h2 {
          font-size: 1.8rem;
          font-weight: 600;
        }

        form {
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: rgba(18, 24, 33, 0.6);
          padding: 2rem;
          border-radius: 1rem;
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          text-align: left;
        }

        label {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        input {
          background: #0f141c;
          border: 1px solid #1f2a37;
          border-radius: 0.6rem;
          padding: 0.75rem 0.9rem;
          color: var(--text-primary);
          font-size: 1rem;
          outline: none;
          transition: border 0.2s ease, box-shadow 0.2s ease;
        }

        input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(77, 163, 255, 0.25);
        }

        .bottom {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.5rem;
        }

        .forgot-password {
          font-size: 0.9rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .forgot-password:hover {
          color: var(--accent);
        }

        button {
          border: none;
          border-radius: 0.75rem;
          padding: 0.9rem 2.2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        button.primary {
          background: linear-gradient(135deg, var(--accent), #6bb7ff);
          color: #ffffff;
          box-shadow: 0 10px 30px rgba(77, 163, 255, 0.25);
        }

        button.primary:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, var(--accent-hover), #5aa9ff);
          box-shadow: 0 14px 40px rgba(77, 163, 255, 0.35);
        }

        button.secondary {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid #1f2a37;
          box-shadow: none;
        }

        button.secondary:hover {
          background: rgba(77, 163, 255, 0.1);
          color: var(--accent);
          border-color: var(--accent);
          transform: translateY(-1px);
        }

        .pig {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .pig svg {
          width: 64px;
          height: 64px;
          color: var(--accent);
          filter: drop-shadow(0 0 12px rgba(77, 163, 255, 0.45));
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
      </style>

      <div class="content">
        <div class="text">
          <h1>Bienvenido de nuevo</h1>
          <h2>Rellene llene el siguiente formulario para entrar:</h2>
        </div>

        <form>
          <div class="pig">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path fill="currentColor" d="M39.749 39.719c0-6.447-4.737-10.612-12.069-10.612s-12.071 4.165-12.071 10.612c0 6.856 5.571 6.856 8.9 6.856h6.341c3.328 0 8.899 0 8.899-6.856m-22.725 0c0-6.125 4.77-9.198 10.656-9.198c5.884 0 10.654 3.073 10.654 9.198c0 4.976-3.148 5.442-7.484 5.442h-6.341c-4.338 0-7.485-.467-7.485-5.442"/><ellipse cx="22.926" cy="38.416" fill="currentColor" rx="2.61" ry="4.743"/><ellipse cx="32.434" cy="38.416" fill="currentColor" rx="2.607" ry="4.743"/><path fill="currentColor" d="M45.875 22.618c.057-.015.123-.015.172-.04c2.108-1.114 1.478-8.521 1.478-8.521s-5.478-.624-7.843.508c2.47 2.157 4.673 4.884 6.193 8.053m-29.942-8.274c-2.268-1.191-7.734-.735-7.734-.735s-.877 7.548 1.28 8.716c.039.021.093.019.137.032c1.566-3.165 3.811-5.882 6.317-8.013"/><ellipse cx="15.257" cy="28.198" fill="currentColor" rx="2.343" ry="4.244"/><ellipse cx="40.102" cy="28.087" fill="currentColor" rx="2.344" ry="4.243"/><path fill="currentColor" d="M60.104 25.341a3.2 3.2 0 0 0-.982-.736a4.2 4.2 0 0 0-1.06-.336c.908-.929 1.91-1.779 2.938-2.6c-1.139.682-2.24 1.435-3.262 2.304c-.084.073-.164.153-.248.227c-1.817 0-3.762.59-5.219 3.203c-1.594-.846-3.076-1.158-3.076-1.158c3.746-2.636 3.238-12.332 2.982-15.324l-.131-1.537l-1.532-.176a54 54 0 0 0-5.558-.295c-3.648 0-6.326.416-8.121 1.269a24 24 0 0 0-2.679-1.362C33.09 3.588 27.434 2 27.434 2c.585 1.314.36 3.932.36 3.932c-1.623-2.519-4.897-1.758-4.897-1.758c1.504 1.078 1.398 2.581 1.398 2.581c-1.673-.693-3.953.737-3.953.737a6.5 6.5 0 0 1 1.853.923a23.5 23.5 0 0 0-3.814 1.854c-1.976-.971-5.045-1.445-9.313-1.445c-2.246 0-3.953.142-4.024.147L3.506 9.1l-.179 1.532c-.36 3.09-1.198 13.206 2.792 15.788a22.7 22.7 0 0 0-.661 5.425c0 6.578 2.135 10.722 5.377 13.319v.01c.346 2.308.939 4.115 1.665 5.319v5.016c0 .024.005.046.006.069V62c4.424 0 5.462-3.572 5.462 0c3.034 0 5.482-2.186 5.482-6.491v-1.632h7.294v1.632c0 4.306 2.447 6.491 5.481 6.491c0-3.572 1.038 0 5.463 0v-6.411c.001-.027.007-.053.007-.08v-.092c.908.305 2.199.602 3.336.602v-2.617h-.002c1.559-.199 2.965-.451 4.192-.771v.509c0 3.387 1.927 5.106 4.313 5.106c0-2.81.816 0 4.296 0v-5.077c0-.011.006-.019.006-.029v-7.45c.606-1.831.785-3.93.785-6.265c0-6.25-2.256-9.696-5.441-11.547c.637-1.322 2.008-2.265 2.959-2.275c-.375.467-.722.97-.947 1.571a2.7 2.7 0 0 0-.178 1.139c.029.408.217.851.548 1.148c.326.3.737.454 1.131.514c.397.058.792.03 1.165-.06a3.95 3.95 0 0 0 1.945-1.137c.254-.271.498-.584.67-.961a2.3 2.3 0 0 0 .197-1.285a2.3 2.3 0 0 0-.566-1.191M7.345 31.845c0-2.437.429-4.745 1.173-6.89c-.497.217-1.08.048-1.251-.046c-3.483-1.887-2.066-14.06-2.066-14.06s1.674-.141 3.867-.141c3.206 0 7.52.301 9.327 1.78c1.792-1.189 3.638-2.071 5.405-2.625c2.657 2.969 3.881 7.403 3.881 7.403c.637-4.257 2.861-6.258 4.551-7.187a22 22 0 0 1 4.584 2.308c1.612-1.279 5.111-1.591 8.142-1.591c2.883 0 5.342.282 5.342.282s1.018 11.947-2.385 13.743c-.175.092-.922.116-1.09.083a21 21 0 0 1 1.189 6.938c0 13.183-9.104 15.638-20.333 15.638c-11.231.002-20.336-2.453-20.336-15.635m49.389 7.581c0 2.485-.213 4.233-.689 5.671l-.088.289v7.731c-.109.198-.962.677-2.429.677c-1.468 0-2.319-.479-2.421-.655v-2.951s-5.582 1.767-11.299 1.767v3.555c0 .622-1.568 1.344-3.589 1.344s-3.589-.722-3.589-1.344v-3.517H21.565v3.517c0 .622-1.568 1.344-3.59 1.344s-3.589-.722-3.589-1.344v-5.54s-1.282-1.82-1.377-3.368c4.218 2.288 9.624 2.767 14.671 2.767c10.345 0 22.219-1.991 22.219-17.522c0-1.149-.261-3.413-.261-3.413c4.885 1.34 7.096 4.826 7.096 10.992m2.276-11.362c-.369.424-.857.76-1.395.912c-.527.156-1.164.16-1.473-.171c-.558-.599-.248-2.396.869-3.337c2.846-.238 2.684 1.81 1.999 2.596"/></svg> 
          </div>

          <div class="field">
            <label>Email</label>
            <input type="email" name="email" placeholder="Introduce tu email" required />
          </div>

          <div class="field">
            <label>Contraseña</label>
            <input type="password" name="password" placeholder="Introduce tu contraseña" required />
          </div>

          <div class="bottom">
            <a href="/cuenta"><button class="button secondary"> Iniciar sesión</button></a>
            <button class="button primary" type="submit">Acceder</button>
          </div>
          <span class="forgot-password">He olvidado la contraseña</span>
        </form>
      </div>
    `

    const form = this.shadow.querySelector('form')

    form.addEventListener('submit', async (event) => {
      event.preventDefault()
      const formData = new FormData(form)
      const formDataJson = Object.fromEntries(formData.entries())

      try {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/user/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataJson)
        })

        if (result.ok) {
          const data = await result.json()
          window.location.href = data.redirection
        } else {
          const error = await result.json()
          console.log(error.message)
        }
      } catch (error) {
        console.log(error)
      }
    })
  }
}

customElements.define('login-component', Login)
