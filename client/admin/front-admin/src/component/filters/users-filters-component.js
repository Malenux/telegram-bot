class Userfilter extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.endpoint = '/api/admin/users'
    this.unsubscribe = null
  }

  async connectedCallback () {
    // })

    await this.loadData()
    await this.render()
  }

  async loadData () {
    try {
      const response = await fetch(this.endpoint)

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

      h1, h2, h3, h4, h5, h6, p {
        margin: 0;
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
        margin: 0;
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
    </style>

    <section class="filter">
      <button class="button filter-button" data-filter="General">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>filter</title>
        <path d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" />
       </svg>
      </button>
    </section>
    `
  }
}

customElements.define('users-filters-component', Userfilter)
