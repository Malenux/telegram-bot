class Search extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  async connectedCallback () {
    await this.render()
    this.addEventListeners()
  }

  async fetchProducts (searchText) {
    const response = await fetch(`/api/customer/search?query=${encodeURIComponent(searchText)}`)
    if (!response.ok) throw new Error('Error en la búsqueda')
    return await response.json()
  }

  addEventListeners () {
    const searchInput = this.shadow.querySelector('.search input')
    const searchResultsContainer = this.shadow.querySelector('.search-results')
    const resultsList = this.shadow.querySelector('.search-results ul')
    const overlay = document.createElement('div')
    overlay.classList.add('search-overlay')
    document.body.appendChild(overlay)

    let typingDelay = null

    const openSearch = () => {
      document.body.style.overflow = 'hidden'
      overlay.classList.add('active')
    }

    const closeSearch = () => {
      document.body.style.overflow = ''
      overlay.classList.remove('active')
      searchResultsContainer.classList.add('fadeOut')
      searchResultsContainer.classList.remove('fadeIn')
      setTimeout(() => {
        searchResultsContainer.classList.remove('active')
        resultsList.innerHTML = ''
      }, 200)
    }

    searchInput.addEventListener('input', () => {
      clearTimeout(typingDelay)
      const searchText = searchInput.value.trim()

      if (searchText.length === 0) {
        closeSearch()
        return
      }

      typingDelay = setTimeout(async () => {
        try {
          const productResults = await this.fetchProducts(searchText)
          resultsList.innerHTML = ''

          if (productResults.length > 0) {
            productResults.forEach(product => {
              const item = document.createElement('li')
              item.innerHTML = `
                <a href="${product.url || '#'}" target="_blank" class="result-link">
                  ${product.name || product.nombre || 'Producto sin nombre'}
                </a>
              `
              resultsList.appendChild(item)
            })
            searchResultsContainer.classList.add('active', 'fadeIn')
            searchResultsContainer.classList.remove('fadeOut')
            openSearch()
          } else {
            closeSearch()
          }
        } catch (error) {
          console.error('❌ Error al buscar productos:', error)
        }
      }, 1000)
    })

    document.addEventListener('click', event => {
      const path = event.composedPath()
      if (!path.includes(this)) closeSearch()
    })

    overlay.addEventListener('click', () => closeSearch())
  }

  async render () {
    this.shadow.innerHTML = /* html */`
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .search {
          position: fixed;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          width: 50%;
          display: flex;
          flex-direction: column;
          border-radius: 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }

        .write-search {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.8rem 1rem;
        }

        .write-search svg {
          color: #222;
        }

        .write-search input {
          flex: 1;
          border: none;
          background: transparent;
          color: #111;
          font-size: 1rem;
          outline: none;
        }

        .write-search input::placeholder {
          color: rgba(0, 0, 0, 0.6);
        }

        .search-results {
          display: none;
          max-height: 12rem;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #00aaff transparent;
        }

        .search-results.active {
          display: block;
          animation: fadeIn 0.25s ease forwards;
        }

        .search-results ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          gap: 0.25rem;
        }

        .result-link {
          display: block;
          padding: 0.8rem 1.2rem;
          text-decoration: none;
          color: #111;
          background: rgba(255, 255, 255, 0.25);
          border-left: 4px solid transparent;
          transition: all 0.2s ease;
          border-radius: 1rem;
        }

        .result-link:hover {
          color: #00aaff;
          background: rgba(255, 255, 255, 0.4);
          border-left: 4px solid #00aaff;
          transform: translateX(5px);
        }

        .search-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease;
          z-index: 9998;
        }

        .search-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>

      <section class="search">
        <div class="write-search">
          <input type="text" name="search" placeholder="Escribe el producto que deseas buscar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0"/>
          </svg>
        </div>
        <div class="search-results">
          <ul></ul>
        </div>
      </section>
    `
  }
}

customElements.define('search-component', Search)
