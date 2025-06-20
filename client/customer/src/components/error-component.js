class Error404 extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.loadData()
    await this.render()
  }

  async loadData () {
    this.data = {
      title: '404',
      subtitle: 'Page Not Found :(',
      description: 'Lo sentimos, la página que buscas no existe o ha sido movida.',
      buttonText: 'Volver a inicio',
      buttonUrl: '/'
    }
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>

      * {
        margin: 0;
        padding: 0;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      h1, h2 {
        font-family: "Nunito Sans", serif;
        font-optical-sizing: auto;
      }

      h1{
        font-size: 4rem;
        font-weight: 600;
        color: hsl(198, 25%, 57%);
      }

      h2 {
        font-size: 2rem;
        font-weight: 600;
        color: hsl(199, 19%, 32%);
      }

      p {
        font-size: 1.5rem;
        color: hsl(199, 19%, 32%);
      }

      .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
        gap: 2rem;
      }

      .text {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      button {
        background-color: hsl(198, 25%, 57%);
        border: 0.2rem solid hsl(199, 19%, 32%);
        border-radius: 0.5rem;
        cursor: pointer;
        color: white;
        padding: 1rem 2rem;
        font-size: 1.2rem;
        font-weight: 600;
        transition: 0.3s ease;
      }

      button:hover {
        background-color: hsl(198, 25%, 47%);
        border: 0.2rem solid hsl(198, 25%, 47%);
      }
      
      .newtons-cradle {
        --uib-size: 50px;
        --uib-speed: 1.2s;
        --uib-color: hsl(198, 25%, 47%);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--uib-size);
        height: var(--uib-size);
      }

      .newtons-cradle__dot {
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
        width: 25%;
        transform-origin: center top;
      }

      .newtons-cradle__dot::after {
        content: '';
        display: block;
        width: 100%;
        height: 25%;
        border-radius: 50%;
        background-color: var(--uib-color);
      }

      .newtons-cradle__dot:first-child {
        animation: swing var(--uib-speed) linear infinite;
      }

      .newtons-cradle__dot:last-child {
        animation: swing2 var(--uib-speed) linear infinite;
      }

      @keyframes swing {
        0% {
          transform: rotate(0deg);
          animation-timing-function: ease-out;
        }

        25% {
          transform: rotate(70deg);
          animation-timing-function: ease-in;
        }

        50% {
          transform: rotate(0deg);
          animation-timing-function: linear;
        }
      }

      @keyframes swing2 {
        0% {
          transform: rotate(0deg);
          animation-timing-function: linear;
        }

        50% {
          transform: rotate(0deg);
          animation-timing-function: ease-out;
        }

        75% {
          transform: rotate(-70deg);
          animation-timing-function: ease-in;
        }
      }

    </style>

   <div class="content">
      <div class="text">
        <div class="title">
          <h1>${this.data.title}</h1>
          <h2>${this.data.subtitle}</h2>
        </div>
        <div class="description">
          <p>${this.data.description}</p>
        </div>
      </div>

      <div class="newtons-cradle">
        <div class="newtons-cradle__dot"></div>
        <div class="newtons-cradle__dot"></div>
        <div class="newtons-cradle__dot"></div>
        <div class="newtons-cradle__dot"></div>
      </div>

      <div class="button">
        <button><a href=${this.data.buttonUrl}>${this.data.buttonText}</a></button>
      </div>
    </div>
    `
  }
}

customElements.define('error-component', Error404)
