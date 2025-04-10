class TablesBoxes extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })

    this.data = []
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  async loadData () {
    this.data = [
      {
        title: {
          edit: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>',
          delete: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>'
        },
        list: {
          name: 'Carlos',
          email: 'carlossedagambin@gmail.com',
          dateCreated: '24-04-22',
          dateModification: '24-04-22',
        }
      },
      {
        title: {
          edit: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>',
          delete: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>'
        },
        list: {
          name: 'Carlos',
          email: 'carlossedagambin@gmail.com',
          dateCreated: '24-04-22',
          dateModification: '24-04-22',
        }
      },
      {
        title: {
          edit: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>',
          delete: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>'
        },
        list: {
          name: 'Carlos',
          email: 'carlossedagambin@gmail.com',
          dateCreated: '24-04-22',
          dateModification: '24-04-22',
        }
      }
    ]
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>
      
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;

      }
    
      svg {
        width: 2rem;
        fill: hsl(0, 0%, 100%);
        transition: fill 0.3s ease;
      }

      svg:hover {
        fill: hsl(39, 100%, 60%);
      }

      .table-boxes {
        gap: 1.2rem;
      }

      .box-table {
        background-color: hsl(230, 25%, 20%);
        border-radius: 0.5rem;
        margin: 1.2rem 0;
      }

      .title-box {
        background-color: hsl(230, 25%, 25%);
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
      }

      .body-box {
        padding: 1rem 1.5rem;
      }

      .list ul {
        list-style-type: none;
        padding: 0;
      }

      .list li {
        font-size: 1rem;
        padding: 0.2rem 0;
      }

    </style>
    
    <div class="table-boxes"></div>

    `

    this.data.forEach((item) => {
      const tableBoxes = this.shadow.querySelector('.table-boxes')

      const boxContainer = document.createElement('div')
      boxContainer.classList.add('box-table')
      tableBoxes.appendChild(boxContainer)

      const titleContainer = document.createElement('div')
      titleContainer.classList.add('title-box')

      const iconContainer = document.createElement('div')
      iconContainer.classList.add('icon-container')

      const editButton = document.createElement('button')
      editButton.innerHTML = item.title.edit

      const deleteButton = document.createElement('button')
      deleteButton.innerHTML = item.title.delete

      iconContainer.appendChild(editButton)
      iconContainer.appendChild(deleteButton)
      titleContainer.appendChild(iconContainer)
      boxContainer.appendChild(titleContainer)

      const bodyContainer = document.createElement('div')
      bodyContainer.classList.add('body-box')
      boxContainer.appendChild(bodyContainer)

      const listContainer = document.createElement('div')
      listContainer.classList.add('list')
      bodyContainer.appendChild(listContainer)

      const ul = document.createElement('ul')
      listContainer.appendChild(ul)

      const nameLi = document.createElement('li')
      nameLi.textContent = `Name: ${item.list.name}`
      ul.appendChild(nameLi)

      const emailLi = document.createElement('li')
      emailLi.textContent = `Email: ${item.list.email}`
      ul.appendChild(emailLi)

      const dateCreatedLi = document.createElement('li')
      dateCreatedLi.textContent = `Created: ${item.list.dateCreated}`
      ul.appendChild(dateCreatedLi)

      const dateModifiedLi = document.createElement('li')
      dateModifiedLi.textContent = `Modified: ${item.list.dateModification}`
      ul.appendChild(dateModifiedLi)
    })
  }
}

customElements.define('tables-boxes-component', TablesBoxes)
