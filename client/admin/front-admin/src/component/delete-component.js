import { store } from '../redux/store.js'
import { refreshTable } from '../redux/crud-slice.js'

class Delete extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = ''
    this.tableEndpoint = ''
    document.addEventListener('showDeleteModal', this.showDeleteModal.bind(this))
  }

  connectedCallback () {
    this.render()
  }

  showDeleteModal (event) {
    const { endpoint, elementId } = event.detail
    this.tableEndpoint = endpoint
    this.endpoint = `${endpoint}/${elementId}`
    this.shadow.querySelector('.delete-box').classList.add('active')
    this.shadow.querySelector('.overlay').classList.add('active')
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>
      * {
        box-sizing: border-box;
      }

      h2, p {
        text-align: center;
        color: #E0E0E0;
      }

      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: hsla(0, 0.00%, 0.00%, 0.50);
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
      .delete-box {
        width: 25rem;
        background-color: hsl(240, 22%, 29%);
        border: solid 0.2rem hsl(240, 27%, 65%);
        border-radius: 0.5rem;
        padding: 2rem;
        z-index: 1000;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }

      .delete-box.active{
        visibility: visible;
        opacity: 1;
      }

      button {
        background-color: hsl(240, 22%, 15%);
        border: none;
      }

      .delete-actions {
        justify-content: center;
        display: flex;
        gap: 1rem;
      }

      .button svg {
        width: 2rem;
        height: 2rem;
        fill: hsla(0, 0.00%, 87.80%, 0.20);
        cursor: pointer;
        transition: fill 0.3s ease;
      }

      .confirm svg:hover {
        fill:hsl(108, 95.20%, 75.70%);
      }

      .cancel svg:hover {
        fill:hsl(0, 95.20%, 75.70%);
      }

    </style>
    <div class="overlay">
      <div class="delete-box">
        <div class="delete-header">
          <h2>Eliminar elemento</h2>
        </div>
        <div class="delete-content">
          <div class="delete-description">
            <p>¿Está seguro de que desea eliminar este elemento? Esta acción no se puede deshacer.</p>
        </div>
          <div class="delete-actions">
            <button class="button confirm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>confirm</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
            </button>
            <button class="button cancel">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cancel</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
            </button>
          </div>
      </div>
    </div>
    `

    this.renderButtons()
  }

  renderButtons () {
    const aceptedButton = this.shadow.querySelector('.confirm')
    const deniedButton = this.shadow.querySelector('.cancel')

    aceptedButton.addEventListener('click', async () => {
      try {
        const response = await fetch(this.endpoint, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Error al eliminar el elemento')
        }

        document.dispatchEvent(new CustomEvent('notice', {
          detail: {
            message: 'Elemento eliminado correctamente',
            type: 'success'
          }
        }))

        store.dispatch(refreshTable(this.tableEndpoint))

        this.shadow.querySelector('.overlay').classList.remove('active')
      } catch (error) {
        document.dispatchEvent(new CustomEvent('notice', {
          detail: {
            message: 'No se han podido eleminar el dato',
            type: 'error'
          }
        }))

        this.shadow.querySelector('.overlay').classList.remove('active')
      }
    })

    deniedButton.addEventListener('click', event => {
      this.shadow.querySelector('.overlay').classList.remove('active')
    })
  }
}

customElements.define('delete-component', Delete)
