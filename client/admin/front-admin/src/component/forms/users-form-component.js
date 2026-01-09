const isEqual = require('lodash-es/isEqual')
const store = require('../../redux/store.js')
const refreshTable = require('../../redux/crud-slice.js')

class UserForm extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = '/api/admin/users'
    this.unsubscribe = null
    this.formElementData = null
  }

  connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      if (currentState.crud.formElement.data && currentState.crud.formElement.endPoint === this.endpoint && !isEqual(this.formElementData, currentState.crud.formElement.data)) {
        this.formElementData = currentState.crud.formElement.data
        this.showElement(this.formElementData)
      }

      if (!currentState.crud.formElement.data && currentState.crud.formElement.endPoint === this.endpoint) {
        this.resetForm()
      }
    })

    this.render()
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>
      * {
        box-sizing: border-box;
      }

      h1, h2, h3, h4, h5, h6, p {
        margin: 0;
        color: hsl(0, 0%, 88%);
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

      svg {
        padding: 0;
        margin: 0;
        width: 1.8rem;
        height: 1.8rem;
        fill: hsl(0, 0.00%, 54.90%);
        transition: fill 0.3s ease;
      }

      svg:hover {
        fill: hsl(0, 0%, 88%);
      }

      button {
        cursor: pointer;
        outline: none;
        padding: 0;
        position: relative;
        margin: 0;
      }

      .tooltip {
        position: absolute;
        background-color:hsla(0, 0.00%, 22.00%, 0.8);
        color: hsl(0, 0.00%, 100%, 0.8);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.875rem;
        white-space: nowrap;
        transform: translate(-50%, -140%);
        margin-bottom: 0.25rem;
        opacity: 0;
        transition: opacity 0.2s ease;  
        z-index: 10;
      }

      button:hover .tooltip {
        opacity: 1;
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        border-radius: 0.5rem;
        color: hsl(0, 0%, 88%);
      }
      
      form {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
        gap: 1rem;
      }

      .form-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 0.2rem solid hsl(0, 0%, 15%);
      }

      .form-body {
        display: grid;
        grid-template-columns: 1fr;
        padding: 1rem 0;
        gap: 1rem;
      }

      .tabs {
        display: flex;
        gap: 0.5rem;
      }


      .tab {
        align-items: center;
        border-radius: 8px;
        display: flex;
        padding: 0.5rem 0;
        justify-content: space-between;
      }

      .tab button{
        background-color:hsl(0, 0.00%, 22.00%);
        padding: 0.2rem 0.5rem;
        color: hsl(0, 0%, 88%);
        border: 0.2rem solid hsla(0, 0.00%, 87.80%, 0.10);
        border-radius: 0.5rem;
        font-size: 1rem
      }

      .tab:hover button{
        border: 0.2rem solid hsl(0, 0.00%, 54.90%);
      }

      .tab.active button{
        border: 0.2rem solid hsl(0, 0.00%, 54.90%);
      }

      .tab-content{
        display: none;
      }

      .tab-content.active{
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
      }

      .buttons {
        display: flex;
        gap: 0.8rem;
      }

      .button-mod{
        background-color: transparent;
        border: none;
      }

      .form-element {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .form-title span {
        font-size: 1rem;
        color: hsl(0, 0.00%, 87.80%);
      }

      .form-element-input input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 0.25rem;
        border: 0.2rem solid hsl(0, 0%, 15%);
        background-color: hsl(0, 0%, 10%);
        color: hsl(0, 0%, 88%);
      }

      .form-element-input input:focus {
        outline: 0.2rem solid hsl(0, 0.00%, 54.90%);
      }

      .validation-errors{
        display: none;
        color: hsla(0, 95.20%, 75.70%, 0.80);
        padding: 1rem;
        margin-top: 1rem;
        border: 0.2rem solid hsl(0, 95.20%, 75.70%);;
        border-radius: 0.5rem;
        position: relative;
      }

      .validation-errors.active{
        display: block;
      }

      .validation-errors p{
        font-weight: 700;
        font-size: 1.2rem;
      }

      .validation-errors .close-validation-errors{
        cursor: pointer;
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
      }

      .close-validation-errors svg{
        fill:hsl(0, 95.20%, 75.70%);
      }

      .close-validation-errors svg:hover{
        fill:hsla(0, 95.20%, 75.70%, 0.5);
      }

    </style>



    <section class="form">
      <div class="form-header">
        <div class="tabs">
          <div class="tab active" data-tab="general">
            <button>General</button>
          </div>
          <div class="tab" data-tab="images">
            <button>Imagen</button>
          </div>
        </div>
        <div class="buttons">
          <button class="button-mod clean-button">
            <span class="tooltip">limpiar formulario</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>clean</title>
              <path
                d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z" />
            </svg>
          </button>
          <button class="button-mod save-button">
            <span class="tooltip">guardar</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="form-body">
        <div class="validation-errors">
          <ul></ul>
          <div class="close-validation-errors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"/></svg>
          </div>
        </div>  
        <form>
          <input type="hidden" name="id">
          <div class="tab-content active" data-tab="general">
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
          </div>
          <div class="tab-content" data-tab="images">
           <div class="form-element">
              <div class="form-title">
                <span>Avatar</span>
              </div>
              <div class="form-element-input">
                <input type="file" name="avatar">
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
    
    `

    this.renderButton()
  }

  renderButton () {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault()
      }
    })

    this.shadow.querySelector('.form').addEventListener('click', async event => {
      event.preventDefault()

      if (event.target.closest('.save-button')) {
        const form = this.shadow.querySelector('form')
        const formData = new FormData(form)
        const formDataJson = {}

        for (const [key, value] of formData.entries()) {
          formDataJson[key] = value !== '' ? value : null
        }

        const id = this.shadow.querySelector('[name="id"]').value
        const endpoint = id ? `${this.endpoint}/${id}` : this.endpoint
        const method = id ? 'PUT' : 'POST'
        delete formDataJson.id

        try {
          const response = await fetch(endpoint, {
            method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataJson)
          })

          if (!response.ok) {
            throw response
          }

          store.dispatch(refreshTable(this.endpoint))
          this.resetForm()

          document.dispatchEvent(new CustomEvent('notice', {
            detail: {
              message: 'Datos guardados correctamente',
              type: 'success'
            }
          }))
        } catch (error) {
          if (error.status === 422) {
            const data = await error.json()
            this.showValidationErrors(data.message)

            document.dispatchEvent(new CustomEvent('notice', {
              detail: {
                message: 'Hay errores de validación',
                type: 'error'
              }
            }))
          }

          if (error.status === 500) {
            document.dispatchEvent(new CustomEvent('notice', {
              detail: {
                message: 'No se han podido guardar los datos',
                type: 'error'
              }
            }))
          }
        }
      }

      if (event.target.closest('.clean-button')) {
        this.resetForm()
      }

      if (event.target.closest('.tab')) {
        const clickedTab = event.target.closest('.tab')

        this.shadow.querySelector('.tab.active').classList.remove('active')
        clickedTab.classList.add('active')

        this.shadow.querySelector('.tab-content.active').classList.remove('active')
        this.shadow.querySelector(`.tab-content[data-tab='${clickedTab.dataset.tab}']`).classList.add('active')
      }

      if (event.target.closest('.close-validation-errors')) {
        this.closeValidationErrors()
      }
    })
  }

  showElement (data) {
    Object.entries(data).forEach(([key, value]) => {
      if (this.shadow.querySelector(`[name="${key}"]`)) {
        this.shadow.querySelector(`[name="${key}"]`).value = value
      }
    })
  }

  showValidationErrors (errors) {
    const errorsMessage = this.shadow.querySelector('.validation-errors')
    const errorsList = this.shadow.querySelector('.validation-errors ul')
    errorsList.innerHTML = ''

    errors.forEach(error => {
      const errorMessage = document.createElement('li')
      errorMessage.textContent = error.message
      errorsList.appendChild(errorMessage)
    })

    errorsMessage.classList.add('active')
  }

  resetForm () {
    const form = this.shadow.querySelector('form')
    form.reset()
    this.shadow.querySelector('[name="id"]').value = ''
    this.formElementData = null
    this.errorsMessage = this.shadow.querySelector('.validation-errors').classList.remove('active')
  }
}

customElements.define('users-form-component', UserForm)
