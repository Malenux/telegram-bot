class PageComponent extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.basePath = this.getAttribute('base-path') || ''
  }

  connectedCallback () {
    this.render()
    window.onpopstate = () => this.handleRouteChange()
  }

  handleRouteChange () {
    this.render()
  }

  render () {
    const path = window.location.pathname
    this.getTemplate(path)
  }

  async getTemplate (path) {
    const routes = {
      '/admin/users': 'users.html',
      '/admin/events': 'events.html',
      '/admin/categories-events': 'event-categories.html',
      '/admin/promoters': 'promoters.html',
      '/admin/faqs': 'faqs.html',
      '/admin/feature-titles': 'feature-titles.html',
      '/admin/heros': 'heros.html',
      '/admin/customers': 'customers.html'
    }

    const filename = routes[path] || '404.html'

    await this.loadPage(filename)
  }

  async loadPage (filename) {
    const response = await fetch(`${this.basePath}/pages/${filename}`)
    const html = await response.text()

    document.startViewTransition(() => {
      this.shadowRoot.innerHTML = html
      document.documentElement.scrollTop = 0
    })
  }
}

customElements.define('page-component', PageComponent)
