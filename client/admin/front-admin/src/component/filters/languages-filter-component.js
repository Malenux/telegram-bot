const store = require('../../redux/store.js')
const setFilterQuery = require('../../redux/crud-slice.js')

class LanguagesFilter extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = '/api/admin/languages'
    document.addEventListener('showFilterModal', this.showFilterModal.bind(this))
  }

  connectedCallback () {
    this.render()
  }

  showFilterModal (event) {
    if (event.detail.endpoint === this.endpoint) {
      this.shadow.querySelector('.overlay').classList.add('active')
    }
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
    <style>
      * {
        box-sizing: border-box;
      }

      input{
        width: 100%;
        padding: 0.5rem;
        border-radius: 0.25rem;
        border: 0.2rem solid hsl(0, 0%, 15%);
        background-color: hsl(0, 0%, 10%);
        color: hsl(0, 0%, 88%);
      }

      input:focus{
        outline: 0.2rem solid hsl(0, 0.00%, 54.90%);
      }

      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: hsla(0, 0%, 0%, 0.5);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }

      .overlay.active {
        visibility: visible;
        opacity: 1;
      }

      .filter-modal {
        width: 25rem;
        background-color: hsl(0, 0%, 10.2%);
        border: solid 0.2rem hsl(0, 0%, 22%);
        border-radius: 0.5rem;
        padding: 2rem;
        z-index: 1000;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
        transform: translateY(-20px);
      }

      .overlay.active .filter-modal {
        visibility: visible;
        opacity: 1;
        transform: translateY(0);
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .filter-field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .filter-field label {
        font-weight: 600;
        color: #E0E0E0;
        font-family: "Nunito Sans", sans-serif;
        font-size: 0.9rem;
      }

      .filter-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1.5rem;
      }

      .filter-buttons button {
        background-color: hsl(0, 0%, 22%);
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-family: "Nunito Sans", sans-serif;
        font-weight: 600;
        color: #E0E0E0;
        padding: 0.75rem 1.5rem;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      .apply-button:hover {
        color: hsl(108, 95.2%, 75.7%);
      }

      .reset-button:hover,
      .reset-button svg:hover {
        color: hsl(0, 95.2%, 75.7%);
        fill:hsl(0, 95.2%, 75.7%);
      }

      .reset-button svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: hsla(0, 0%, 87.8%, 0.5);
        cursor: pointer;
        transition: fill 0.3s ease;
      }

    </style>

    <div class="overlay">
      <div class="filter-modal">
        <div class="filter-buttons">
          <button class="reset-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
        <form>
          <div class="filter-field">
            <label for="nombre">Nombre:</label>
            <input type="text" id="name" name="name">
          </div>
          <div class="filter-field">
            <label for="nombre">Title:</label>
            <input type="text" id="title" name="title">
          </div>
          <div class="filter-field">
            <label for="nombre">Descripción:</label>
            <input type="text" id="description" name="description">
          </div>
          <div class="filter-field">
            <label for="nombre">Texto del botón:</label>
            <input type="text" id="button-text" name="button-text">
          </div>
          <div class="filter-field">
            <label for="nombre">Link del botón:</label>
            <input type="text" id="button-link" name="button-link">
          </div>
        </form>
        <div class="filter-buttons">
          <button class="apply-button">Aplicar filtros</button>
          <button class="reset-button">Restablecer</button>
        </div>
      </div>
    </div>
    `
    this.renderButtons()
  }

  renderButtons () {
    const applyButton = this.shadow.querySelector('.apply-button')
    const resetButton = this.shadow.querySelector('.reset-button')
    const overlay = this.shadow.querySelector('.overlay')

    applyButton.addEventListener('click', (e) => {
      e.preventDefault()

      const form = this.shadow.querySelector('form')
      const formData = new FormData(form)
      const formDataJson = {}

      for (const [key, value] of formData.entries()) {
        formDataJson[key] = value !== '' ? value : null
      }

      const query = Object.entries(formDataJson).map(([key, value]) => `${key}=${value}`).join('&')

      const filterQuery = {
        endPoint: this.endpoint,
        query
      }

      store.dispatch(setFilterQuery(filterQuery))

      overlay.classList.remove('active')
    })

    resetButton.addEventListener('click', (e) => {
      e.preventDefault()

      const form = this.shadow.querySelector('form')
      form.reset()

      const formData = new FormData(form)
      const formDataJson = {}

      for (const [key, value] of formData.entries()) {
        formDataJson[key] = value !== '' ? value : null
      }

      const query = Object.entries(formDataJson).map(([key, value]) => `${key}=${value}`).join('&')

      const filterQuery = {
        endPoint: this.endpoint,
        query
      }

      store.dispatch(setFilterQuery(filterQuery))

      overlay.classList.remove('active')
    })

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active')
      }
    })
  }
}

customElements.define('languages-filter-component', LanguagesFilter)
