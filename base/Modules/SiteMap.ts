/*

 SiteMap.ts

*/

// Import Modules.
import fetch from 'isomorphic-fetch'

export default class SiteMap {
  private readonly url: string
  private readonly endPoint: string

  private selectors: {
    readonly listInner: HTMLElement | null
    readonly loading: HTMLElement | null
  }

  private data: { [key: string]: string }[]

  public constructor() {
    this.url = window.location.origin
    this.endPoint = `${this.url}/assets/json/siteMap.json`
    this.selectors = {
      listInner: document.querySelector('.fn-site-map-inner'),
      loading: document.querySelector('.fn-icon-loading')
    }
    this.data = []
  }

  private resolvedPromise<T>(arg: T): Promise<T> {
    return new Promise((resolve): void => resolve(arg))
  }

  private sleep(ms: number): Promise<number> {
    return new Promise((resolve): number => {
      return setTimeout(resolve, ms)
    })
  }

  private async getData(): Promise<void> {
    try {
      const getData = await fetch(this.endPoint, { credentials: 'same-origin' })
      this.data = await getData.json()
    } catch (error) {
      console.error('error: ', error)
    }
  }

  private onView(): void {
    this.selectors.listInner!.classList.add('is-active')
    this.selectors.loading!.classList.add('is-inactive')
  }

  private async render(addData: { [key: string]: string }[]): Promise<void> {
    const renderDelay = 5
    if (addData.length > 0) {
      addData.map(
        async (info, index): Promise<void> => {
          const createListElement = document.createElement('li')
          createListElement.classList.add('list')
          createListElement.classList.add('fn-list')
          createListElement.classList.add(`is-${info.category}`)
          createListElement.innerHTML = `
            <a href="${info.endPoint}" target="_blank" class="letter is-${info.category}">
              <span class="tag">${info.category.toUpperCase()}</span><br>
              ${info.pageName}
            </a>
          `
          if (this.selectors.listInner) {
            await this.sleep(renderDelay * index)
            this.selectors.listInner.appendChild(createListElement)
          }
        }
      )
      await this.sleep(renderDelay * addData.length)
      this.onView()
    } else {
      const createListElement = document.createElement('li')
      createListElement.classList.add('list')
      createListElement.classList.add('fn-list')
      createListElement.classList.add('no-data')
      createListElement.textContent = '該当データが有りません。'
      if (this.selectors.listInner) this.selectors.listInner.appendChild(createListElement)
      this.onView()
    }
  }

  public async core(): Promise<void> {
    await this.resolvedPromise(this.getData())
    this.render(this.data)
  }
}
