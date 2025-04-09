class BottomTable extends HTMLElement {


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
    this.data = {
      show: '3',
      total: '3'
    } 
  }


  render () {
    
    this.shadow.innerHTML =
    /*html*/`
    <style>
      .bottom-table {
        padding-top: 1.25rem;
      }

      .text-table {
        font-size: 1rem;
        color: hsl(0, 0%, 60%);
      }

    </style>
    
    <div class="bottom-table">
      <div class="text-table">
        <span> ${this.data.show} registros en total, mostrando ${this.data.total} por página </span>
      </div>
    </div>
    `
  }
}


customElements.define('bottom-table-component', BottomTable);
