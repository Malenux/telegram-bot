class ChatBot extends HTMLElement {
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
    this.data = {
      buttonText: 'Chatea con nuestro bot',
      botInitMessage: 'Buenas, bienvenido a nustro chat. ¿En que le podemos ayudar?'
    }
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style>

      *{
        box-sizing: border-box;
      }

      h1, h2, h3, h4, h5, h6, p{
        margin: 0;
        padding: 0;
      }

      :host {
        font-family: "Segoe UI", Roboto, sans-serif;
      }

      .box-chat-bot {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 1000000;
        width: 28%;
      }

      .chat-bot-button button {
        background: hsl(210, 80%, 60%);
        border: none;
        color: white;
        font-size: 1rem;
        font-weight: 600;
        padding: 0.8rem 1.2rem;
        border-radius: 2rem;
        cursor: pointer;
        box-shadow: 0 0.5rem 1.2rem rgba(0,0,0,0.15);
        transition: all 0.3s ease-in-out;
      }

      .chat-bot-button button:hover {
        background: hsl(210, 70%, 50%);
      }

      .box-chat {
        margin-top: 1rem;
        background: white;
        border-radius: 1rem;
        box-shadow: 0 0.7rem 1.4rem rgba(0,0,0,0.08);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .content-box {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .chat-bot p {
        background: hsl(210, 90%, 70%);
        color: white;
        padding: 0.8rem 1rem;
        border-radius: 1rem;
        font-size: 0.95rem;
        box-shadow: 0 0.3rem 0.8rem rgba(0,0,0,0.1);
      }

      .write-box {
        align-items: flex-end
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .wirte textarea {
        flex: 1;
        resize: none;
        padding: 0.6rem 0.8rem;
        font-size: 0.9rem;
        border: 1px solid hsl(210, 40%, 85%);
        border-radius: 0.8rem;
        outline: none;
        transition: all 0.2s ease;
      }

      .wirte textarea:focus {
        border-color: hsl(210, 80%, 60%);
        box-shadow: 0 0 0 0.15rem hsla(210, 80%, 60%, 0.2);
      }

      .send-text button {
        background: hsl(210, 80%, 60%);
        border: none;
        padding: 0.6rem;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease-in-out;
      }

      .send-text button svg {
        fill: white;
      }

      .send-text button:hover {
        background: hsl(210, 70%, 50%);
      }

    </style>

    <section class="box-chat-bot">
      <div class="chat-bot-button"> 
        <button>${this.data.buttonText}</button>
      </div>

      <div class="box-chat active">
        <div class="content-box">
          <div class="chat-bot">
            <p>
              ${this.data.botInitMessage}
            </p>
          </div>
          <div class="write-box">
            <div class="wirte">
              <textarea type="text" placeholder="" name="description" rows="2" cols="50"></textarea>
            </div>
            <div class="send-text">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m6.998 10.247l.435.76c.277.485.415.727.415.993s-.138.508-.415.992l-.435.761c-1.238 2.167-1.857 3.25-1.375 3.788c.483.537 1.627.037 3.913-.963l6.276-2.746c1.795-.785 2.693-1.178 2.693-1.832s-.898-1.047-2.693-1.832L9.536 7.422c-2.286-1-3.43-1.5-3.913-.963s.137 1.62 1.375 3.788"/></svg>
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    `

    this.data.forEach(faq => {

    })
  }
}

customElements.define('chat-bot-component', ChatBot)
