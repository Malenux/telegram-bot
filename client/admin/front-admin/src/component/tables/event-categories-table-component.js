const store = require('../../redux/store.js')
const showFormElement = require('../../redux/crud-slice.js')

class EventCategoryTable extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = '/api/admin/event-categories'
    this.filterQuery = null
    this.unsubscribe = null
  }

  async connectedCallback () {
    this.unsubscribe = store.subscribe(() => {
      const currentState = store.getState()

      if (currentState.crud.filterQuery.query && currentState.crud.filterQuery.endPoint === this.endpoint) {
        this.filterQuery = currentState.crud.filterQuery.query
        const endpoint = `${this.endpoint}?${currentState.crud.filterQuery.query}`
        this.loadData(endpoint).then(() => this.render())
      }

      if (!currentState.crud.filterQuery.query && currentState.crud.tableEndpoint === this.endpoint) {
        this.loadData().then(() => this.render())
      }
    })

    await this.loadData()
    await this.render()
  }

  async loadData (endpoint = this.endpoint) {
    try {
      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`)
      }

      this.data = await response.json()
    } catch (error) {
      console.error('Error loading data:', error)
      this.data = []
    }
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>
      * {
        box-sizing: border-box;
      }

      span{
        margin: 0;
        padding: 0;
      }

      ul {
        display: flex;
        gap: 0.5rem;
        flex-direction: column;
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      li {
        font-family: "Montserrat", sans-serif;
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
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 0;
        position: relative;
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
        z-index: 100;
      }

      button:hover .tooltip {
        opacity: 1;
      }

      .table {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 0.8rem;
        width: 100%;
        border-radius: 0.25rem;
        border: 0.2rem solid hsl(0, 0%, 22%);
        color: hsl(0, 0%, 88%);
      }

      .filter {
        display: flex;
        justify-content: flex-start;
        background-color:hsl(0, 0.00%, 10.20%);
        padding: 1rem;
        border-bottom: 0.2rem solid hsl(0, 0.00%, 22.00%)
      }

      .filter-button {
        margin-left: 5px;
      }

      .table-body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1rem auto;
        max-height: 64vh;
        min-height: 64vh;
        overflow-y: auto;
        padding-right: 1rem;
        scrollbar-width: thin;
        scrollbar-color: hsl(0, 0%, 40%) hsl(0, 0%, 15%);
        width: 90%;
      }

      .table-body::-webkit-scrollbar {
        width: 0.3rem;
      }

      .table-body::-webkit-scrollbar-track {
        background: hsl(0, 0%, 15%);
      }

      .table-body::-webkit-scrollbar-thumb {
        background: hsl(0, 0%, 40%);
        border-radius: 4px;
      }

      .table-body::-webkit-scrollbar-thumb:hover {
        background: hsl(0, 0%, 60%);
      }

      .table-body-element-box {
        background: hsl(0, 0%, 10%);
        color: hsl(0, 0%, 88%);
        overflow: hidden;
      }

      .element-box-data {
        padding: 1rem;
        background-color:hsl(0, 0.00%, 10.20%);
        border: 0.3rem solid hsl(0, 0.00%, 10.20%);
        border-radius: 0 0.25rem 0.25rem 0.25rem;
      }

      .element-box-data li {
        margin-top: 0.2rem;
      }

      .element-box-upper-row {
        align-items: center;
        background-color:hsl(0, 0.00%, 22.00%);
        border: 0.3rem solid hsl(0, 0.00%, 22.00%);
        border-radius: 0.25rem 0.25rem 0 0;
        display: flex;
        width: max-content;
        padding: 0.5rem 1rem;
        gap: 1rem;
      }

      .table-footer {
        align-items: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        margin-bottom: 0;
        background-color: hsl(0, 0%, 15%);
      }

      .table-footer-box {
        align-items: center;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }

      .navegation-buttons {
        align-items: center;
        display: flex;
        gap: 0.2rem;
      }

      .table-page-info {
        color: hsl(0, 0%, 100%);
        font-family: "Montserrat", sans-serif;
      }

      .pagination-button.disabled{
        cursor: not-allowed;
      }

      .pagination-button.disabled svg{
        fill: hsla(0, 0.00%, 54.90%, 0.3);
      }

    </style>


    <section class="table">
      <div class="table-header">
        <div class="filter">
          <button class="button filter-button" data-filter="General">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>filter</title>
            <path d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" />
          </svg>
          </button>
        </div>
      </div>
      <div class="table-body"></div>
      <div class="table-footer">
        <div class="table-footer-box">
          <div class="table-page-info">Mostrando 10 por página</div>
            <div class="table-page-logo">
            <div class="navegation-buttons">
            <button class="pagination-button ${this.data.meta.currentPage === 1 ? 'disabled' : ''}" data-page="1">
              <span class="tooltip">primera página</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z" /></svg>
            </button>
            <button class="pagination-button ${this.data.meta.currentPage === 1 ? 'disabled' : ''}" data-page="${this.data.meta.currentPage > 1 ? this.data.meta.currentPage - 1 : 1}">
              <span class="tooltip">anterior página</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>
            </button>
            <span class="page-info">${this.data.meta.currentPage} / ${this.data.meta.pages}</span>
            <button class="pagination-button ${this.data.meta.currentPage === this.data.meta.pages ? 'disabled' : ''}"  data-page="${this.data.meta.currentPage < this.data.meta.pages ? this.data.meta.currentPage + 1 : this.data.meta.currentPage}">
              <span class="tooltip">siguiente página</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
            </button>
            <button class="pagination-button ${this.data.meta.currentPage === this.data.meta.pages ? 'disabled' : ''}" data-page="${this.data.meta.pages}">
              <span class="tooltip">última página</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" /></svg>
            </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    `

    if (this.data.rows.length === 0) {
      const tableBody = this.shadow.querySelector('.table-body')
      const message = document.createElement('span')
      message.textContent = 'No hay ningún registro'
      tableBody.appendChild(message)
    }

    this.data.rows.forEach(element => {
      const tableBody = this.shadow.querySelector('.table-body')
      const elementBox = document.createElement('div')
      elementBox.classList.add('.table-body-element-box')
      tableBody.appendChild(elementBox)

      const upperRow = document.createElement('div')
      upperRow.classList.add('element-box-upper-row')
      elementBox.appendChild(upperRow)

      const editButton = document.createElement('button')
      editButton.classList.add('edit-button')
      editButton.dataset.id = element.id
      upperRow.appendChild(editButton)
      editButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
      </svg>`

      const tooltipEdit = document.createElement('span')
      tooltipEdit.classList.add('tooltip')
      tooltipEdit.textContent = 'Editar'
      editButton.appendChild(tooltipEdit)

      const deleteButton = document.createElement('button')
      deleteButton.classList.add('delete-button')
      deleteButton.dataset.id = element.id
      upperRow.appendChild(deleteButton)
      deleteButton.innerHTML =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
      </svg>`

      const tooltipDelete = document.createElement('span')
      tooltipDelete.classList.add('tooltip')
      tooltipDelete.textContent = 'Eliminar'
      deleteButton.appendChild(tooltipDelete)

      const data = document.createElement('div')
      data.classList.add('element-box-data')
      elementBox.appendChild(data)

      const ul = document.createElement('ul')
      data.appendChild(ul)

      const name = document.createElement('li')
      ul.appendChild(name)
      name.textContent = `Nombre: ${element.name}`

      const createdAt = document.createElement('li')
      ul.appendChild(createdAt)
      createdAt.textContent = `Creado: ${element.createdAt}`

      const uptatedAt = document.createElement('li')
      ul.appendChild(uptatedAt)
      uptatedAt.textContent = `Actualizado: ${element.updatedAt}`
    })

    this.renderButtons()
  }

  renderButtons () {
    this.shadow.querySelector('.table').addEventListener('click', async event => {
      if (event.target.closest('.edit-button')) {
        const element = event.target.closest('.edit-button')
        const id = element.dataset.id
        const endpoint = `${this.endpoint}/${id}`

        try {
          const response = await fetch(endpoint)

          if (response.status === 500 || response.status === 404) {
            throw response
          }

          const data = await response.json()

          const formElement = {
            endPoint: this.endpoint,
            data
          }

          store.dispatch(showFormElement(formElement))
        } catch (error) {
          document.dispatchEvent(new CustomEvent('notice', {
            detail: {
              message: 'No se han podido recuperar el dato',
              type: 'error'
            }
          }))
        }
      }

      if (event.target.closest('.delete-button')) {
        const element = event.target.closest('.delete-button')
        const id = element.dataset.id

        document.dispatchEvent(new CustomEvent('showDeleteModal', {
          detail: {
            endpoint: this.endpoint,
            elementId: id,
          }
        }))
      }

      if (event.target.closest('.pagination-button') && !event.target.closest('.pagination-button').classList.contains('disabled')) {
        const page = event.target.closest('.pagination-button').dataset.page
        let endpoint = `${this.endpoint}?page=${page}`

        if (this.filterQuery) {
          endpoint = `${endpoint}&${this.filterQuery}`
        }

        this.loadData(endpoint).then(() => this.render())
      }

      if (event.target.closest('.filter-button')) {
        document.dispatchEvent(new CustomEvent('showFilterModal', {
          detail: {
            endpoint: this.endpoint
          }
        }))
      }
    })
  }
}

customElements.define('event-categories-table-component', EventCategoryTable)
