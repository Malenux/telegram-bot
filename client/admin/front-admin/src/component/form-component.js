class Form extends HTMLElement {
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
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Montserrat", sans-serif;
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
        color: #E0E0E0;
      }

      img {
        object-fit: cover;
        width: 100%;
      }

      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        border-radius: 0.5rem;
        background-color: #1E1E2F;
        padding: 0.8rem;
        color: #E0E0E0;
      }

      form {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
        gap:1rem;
      }

      .form-body {
        display: grid;
        grid-template-columns: 1fr;
        padding: 1rem 0;
        gap: 1rem;
      }

      .form-header {
        background-color: #2A2A40;
        padding: 0.75rem 1rem;
        border-radius: 8px;
      }

      .form-header-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .form-header-box-filter {
        background: #3A3A5A;
        padding: 5px 12px;
        color: #E0E0E0;
        height: 2rem;
        border-radius: 6px;
      }

      .form-header-box-filter button {
        color: #E0E0E0;
        font-size: 1rem;
      }

      .form-header-buttons {
        display: flex;
        gap: 0.8rem;
      }

      .clean-button svg,
      .save-button svg {
        width: 2rem;
        height: 2rem;
        fill: #E0E0E0;
        transition: fill 0.3s ease;
      }

      .clean-button svg:hover,
      .save-button svg:hover {
        fill: #BB86FC;
      }

      .form-element {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .form-title span {
        font-size: 14px;
        color: #BB86FC;
      }

      .form-element-input input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 0.25rem;
        border: 0.2rem solid #3A3A5A;
        background-color: #2A2A40;
        color: #E0E0E0;
      }

      .form-element-input input:focus {
        outline: 0.2rem solid #BB86FC;
        background-color: #2A2A40;
      }
    </style>


    <section class="form">
      <div class="form-header">
        <div class="form-header-box">
          <div class="form-header-box-filter">
            <button>General</button>
          </div>
          <div class="form-header-buttons">
            <button class="clean-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>eraser</title>
                <path
                  d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z" />
              </svg>
            </button>
            <button class="save-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>content-save</title>
                <path
                  d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="form-body">
        <form>
          <div class="form-element">
            <div class="form-title">
              <span>Nombre</span>
            </div>
            <div class="form-element-input">
              <input type="text" placeholder="" name="name">
            </div>
          </div>
          <div class="form-element">
            <div class="form-title">
              <span>Email</span>
            </div>
            <div class="form-element-input">
              <input type="email" placeholder="" name="email">
            </div>
          </div>
        </form>
      </div>
    </section>
    
    `

    this.renderSaveButton()
  }

  renderSaveButton () {
    this.shadow.querySelector('.save-button').addEventListener('click', async event => {
      event.preventDefault()

      const form = this.shadow.querySelector('form')
      const formData = new FormData(form)
      const formDataJson = {}

      for (const [key, value] of formData.entries()) {
        formDataJson[key] = value !== '' ? value : null
      }

      try {
        const method = 'POST'

        const response = await fetch('/api/admin/users', {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataJson)
        })

        if (!response.ok) {
          throw new Error(`Error al guardar los datos: ${response.statusText}`)
        }

        // const data = await response.json()

        document.dispatchEvent(new CustomEvent('notice', {
          detail: {
            message: 'Datos guardados correctamente',
            type: 'success'
          }
        }))
      } catch (error) {
        document.dispatchEvent(new CustomEvent('notice', {
          detail: {
            message: 'No se han podido guardar los datos',
            type: 'error'
          }
        }))
        console.error('Error al guardar los datos:', error)
      }
    })
  }
}

customElements.define('form-component', Form)
