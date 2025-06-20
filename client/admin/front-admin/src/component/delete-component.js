class Delete extends HTMLElement {
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

      h2, p {
        text-align: center;
        color: #E0E0E0;
      }

      .delete-box {
        position: fixed;
        justify-content: center;
        width: 25rem;
        background-color: hsl(240, 22%, 29%);
        border: solid 0.2rem hsl(240, 27%, 65%);
        border-radius: 0.5rem;
        padding: 2rem;
        z-index: 1000;
        top: 40%;
        left: 40%;
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

    <div class="delete-box active">
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
    `

    this.renderButtons()
  }

  renderButtons () {
    const confirmButton = this.shadow.querySelector('.confirm')
    const cancelButton = this.shadow.querySelector('.cancel')

    confirmButton.addEventListener('click', () => {
      this.shadow.querySelector('.delete-box').classList.remove('active')
    })

    cancelButton.addEventListener('click', () => {
      this.shadow.querySelector('.delete-box').classList.remove('active')
    })
  }
}

customElements.define('delete-component', Delete)
