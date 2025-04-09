class Form extends HTMLElement {


  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    
    this.data = []
  }


  async connectedCallback () {
    await this.loadData()
    await this.render()
  }


  async loadData (){
    this.data = [
      {
        title: 'Nombre',
        type: 'name',
        id: 'name',
        name: 'name',
        degree: 'required'
      },
      {
        title: 'Email',
        type: 'email',
        id: 'email',
        name: 'email',
        degree: 'required'
      }
    ]
  }


  render () {
    this.shadow.innerHTML =
    /*html*/`
    <style>
      
      .form-container {
        padding: 0.5rem;
      }

      .form-box {
        padding: 0.5rem;
      }

      .title-form {
        color: hsl(0, 0%, 90%);
      }

      .form-input input {
        width: 100%;
        padding: 0.5rem;
        font-size: 1rem;
        border: 0.15rem solid hsl(0, 0%, 50%);
        border-radius: 0.5rem;
        background-color: hsl(0, 0%, 20%);
        color: hsl(0, 0%, 90%);
        transition: border 0.3s ease;
      }

      .form-input input:focus {
        border-color: hsl(39, 100%, 60%);
        outline: none;
      }
    </style>

    <div class="form-container"></div>


    `
    this.data.forEach(form => {
      const formContainer = this.shadow.querySelector('.form-container')

      const boxForm = document.createElement('div')
      boxForm.classList.add('form-box')
      formContainer.appendChild(boxForm)

      const h3Container = document.createElement('div')
      boxForm.classList.add('form-title')
      boxForm.appendChild(h3Container)

      const h3 = document.createElement('h3')
      h3.textContent = form.title
      h3Container.appendChild(h3)

      const inputContainer = document.createElement('div')
      inputContainer.classList.add('form-input')
      boxForm.appendChild(inputContainer)

      const input = document.createElement('input')
      input.setAttribute('type', form.type)
      input.setAttribute('id', form.id)
      input.setAttribute('name', form.name)
      input.setAttribute(form.degree, form.degree)
      inputContainer.appendChild(input);


    })


  }
}


customElements.define('form-component', Form);
