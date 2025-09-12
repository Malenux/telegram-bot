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
    this.data = [{
      buttonText: 'Chatea con nuestro bot',
      botInitMessage: 'Buenas, bienvenido a nuestro chat. ¿En qué le podemos ayudar?',
      messageCustomer: 'Hola, necesito ayuda con mi pedido.'
    }]
  }

  render () {
    this.shadow.innerHTML =
    /* html */`
    <style> 
      :host {
        --primary: hsl(210, 85%, 55%);
        --primary-hover: hsl(210, 90%, 60%);
        --primary-dark: hsl(210, 70%, 45%);
        --gray-light: hsl(0, 0%, 95%);
        --gray-medium: hsl(210, 20%, 65%);
        --gray-dark: hsl(210, 20%, 20%);
        --radius: 1.2rem;
        --shadow: 0 8px 18px rgba(0,0,0,0.12);
      }

      * {
        box-sizing: border-box;
      }

      h1, h2, h3, h4, h5, h6, p, textarea  {
        margin: 0;
        padding: 0;
        font-family: "Segoe UI", Roboto, sans-serif;
      }

      /* --- Contenedor principal --- */
      .box-chat-bot {
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
        z-index: 1000000;
        width: 22rem;
        max-width: 90vw;
        font-size: 0.95rem;
      }

      /* --- Botón flotante --- */
      .chat-bot-button {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      .chat-bot-button button {
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        border: none;
        color: white;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 50rem;
        cursor: pointer;
        box-shadow: var(--shadow);
        transition: all 0.3s ease-in-out;
      }

      .open-button button {
        padding: 0.9rem 1.4rem;
      }

      .chat-bot-button button:hover {
        background: linear-gradient(135deg, var(--primary-hover), var(--primary-dark));
        transform: translateY(-3px) scale(1.05);
      }

      .close-button button{
        display: flex;
        align-items: center;
        padding: 0.5rem;
      }

      .close-button button svg {
        padding: 0;
        margin: 0;
        width: 1.5rem;
        height: 1.5rem;
        fill: var(--gray-light);
      }

      /* --- Caja activa del chat --- */

      .box-chat {
        opacity: 0;
        visibility: hidden;
        margin-top: 0;
        transition: all 0.4s ease;
        height: 0;
        pointer-events: none;
      }
      .active {
        opacity: 1;
        visibility: visible;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        max-height: 40vh;
        border: 1px solid rgba(200, 210, 230, 0.5);
        animation: fadeInUp 0.4s ease;
        height: 40vh;
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(25px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* --- Contenido del chat --- */
      .content-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow-y: auto;
        padding: 0.8rem;
        scrollbar-width: thin;
        background: linear-gradient(to bottom, #fff, var(--gray-light));
      }

      .content-box::-webkit-scrollbar {
        width: 6px;
      }
      .content-box::-webkit-scrollbar-thumb {
        background: var(--gray-medium);
        border-radius: 10px;
      }
      .content-box::-webkit-scrollbar-thumb:hover {
        background: var(--primary-dark);
      }

      /* --- Mensajes --- */

      .message-bot,
      .message-customer {
        display: flex;
        gap: 0.5rem;
        align-items: flex-end;
        opacity: 0;
        animation: fadeIn 0.35s ease forwards;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .message-bot { justify-content: flex-start; }
      .write-customer { display: flex; justify-content: flex-end; }

      .message-bot p {
        background: var(--primary);
        color: white;
        padding: 0.8rem 1rem;
        border-radius: 1rem 1rem 1rem 0.3rem;
        font-size: 0.92rem;
        box-shadow: var(--shadow);
        max-width: 85%;
        line-height: 1.4;
      }

      .message-customer p {
        background: var(--gray-light);
        color: var(--gray-dark);
        padding: 0.8rem 1rem;
        border-radius: 1rem 1rem 0.3rem 1rem;
        font-size: 0.92rem;
        box-shadow: 0 3px 6px rgba(0,0,0,0.08);
        max-width: 85%;
        line-height: 1.4;
      }

      /* --- Avatares --- */
      .avatar-bot svg,
      .avatar-customer svg {
        width: 28px;
        height: 28px;
        fill: var(--primary-dark);
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));
      }

      /* --- Input abajo --- */
      .write-box {
        flex-shrink: 0;
        display: flex;
        gap: 0.5rem;
        padding: 0.8rem;
        border-top: 1px solid rgba(200, 210, 230, 0.6);
        background: #fff;
        justify-content: space-between;
        align-items: center;
      }

      textarea {
        flex: 1;
        resize: none;
        padding: 0.6rem 0.8rem;
        font-size: 0.9rem;
        border: 1px solid hsl(210, 40%, 85%);
        border-radius: 0.8rem;
        outline: none;
        transition: all 0.25s ease;
        background: white;
      }

      textarea:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 0.18rem hsla(210, 80%, 60%, 0.25);
      }

      /* --- Botón enviar --- */
      .send-text button {
        background: var(--primary);
        border: none;
        padding: 0.6rem;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.25s ease-in-out;
        box-shadow: var(--shadow);
      }

      .send-text button svg { 
        fill: white; 
      }

      .send-text button:hover {
        background: var(--primary-hover);
        transform: scale(1.12);
      }

    </style>

    <section class="box-chat-bot">
      <div class="chat-bot-button"> 
        <div class="open-button"> 
          <button>${this.data[0].buttonText}</button>
        </div>
        <div class="close-button"> 
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.95 8.464a1 1 0 0 0-1.414-1.414L12 10.586L8.464 7.05A1 1 0 1 0 7.05 8.464L10.586 12L7.05 15.536a1 1 0 1 0 1.414 1.414L12 13.414l3.536 3.536a1 1 0 1 0 1.414-1.414L13.414 12z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="box-chat active">
        <div class="content-box"></div>
        <div class="write-box">
          <div class="write">
            <textarea placeholder="Escribe tu mensaje..." name="message-customer" rows="2" cols="30"></textarea>
          </div>
          <div class="send-text">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m6.998 10.247l.435.76c.277.485.415.727.415.993s-.138.508-.415.992l-.435.761c-1.238 2.167-1.857 3.25-1.375 3.788c.483.537 1.627.037 3.913-.963l6.276-2.746c1.795-.785 2.693-1.178 2.693-1.832s-.898-1.047-2.693-1.832L9.536 7.422c-2.286-1-3.43-1.5-3.913-.963s.137 1.62 1.375 3.788"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
    `

    this.data.forEach(chatBot => {
      const chatBotContainer = this.shadow.querySelector('.content-box')

      // Mensaje del bot
      const messageBot = document.createElement('div')
      messageBot.classList.add('message-bot')
      chatBotContainer.appendChild(messageBot)

      const avatarBot = document.createElement('div')
      avatarBot.classList.add('avatar-bot')
      avatarBot.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path d="M14 1.5a.75.75 0 0 1 .75.75V3h4.5A2.75 2.75 0 0 1 22 5.75v5.5A2.75 2.75 0 0 1 19.25 14H8.75A2.75 2.75 0 0 1 6 11.25v-5.5A2.75 2.75 0 0 1 8.75 3h4.5v-.75A.75.75 0 0 1 14 1.5M6.75 16A2.75 2.75 0 0 0 4 18.75v.75c0 1.977.961 3.642 2.717 4.78C8.444 25.397 10.917 26 14 26s5.556-.602 7.283-1.72C23.039 23.141 24 21.476 24 19.5v-.75A2.75 2.75 0 0 0 21.25 16zM11 10a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m7.5-1.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0"/>
        </svg>
      `
      messageBot.appendChild(avatarBot)

      const contentTextBot = document.createElement('div')
      contentTextBot.classList.add('write-bot')
      messageBot.appendChild(contentTextBot)

      const textBot = document.createElement('p')
      textBot.textContent = chatBot.botInitMessage
      contentTextBot.appendChild(textBot)

      // Mensaje del cliente
      const messageCustomer = document.createElement('div')
      messageCustomer.classList.add('message-customer')
      chatBotContainer.appendChild(messageCustomer)

      const contentTextCustomer = document.createElement('div')
      contentTextCustomer.classList.add('write-customer')
      messageCustomer.appendChild(contentTextCustomer)

      const textCustomer = document.createElement('p')
      textCustomer.textContent = chatBot.messageCustomer
      contentTextCustomer.appendChild(textCustomer)

      const avatarCustomer = document.createElement('div')
      avatarCustomer.classList.add('avatar-customer')
      avatarCustomer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-4.991 9A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18s3.583-.386 4.865-1.203C16.167 15.967 17 14.69 17 13a2 2 0 0 0-2-2z"/>
        </svg>
      `
      messageCustomer.appendChild(avatarCustomer)
    })
  }
}

customElements.define('chat-bot-component', ChatBot)
