/*
 RenderBinSettlementCompanyTypeA.ts
*/

// Import Modules.
import fetch from 'isomorphic-fetch'
import 'es6-promise'

export default class RenderBinSettlementCompanyTypeA {
  private url: string
  private endPoint: string
  private selectors: {
    freeWordBox: HTMLInputElement | null
    searchButton: HTMLElement | null
    tableWrapper: HTMLElement | null
    loading: HTMLElement | null
    dataWrapper: HTMLElement | null
    searchTargetStoreButton: HTMLElement | null
  }

  private store: {
    initializeData: BinTypeA[]
    freeWordData: BinTypeA[]
  }

  public constructor() {
    this.url = window.location.origin
    this.endPoint = `${this.url}/assets/json/binTypeA.json`
    this.selectors = {
      freeWordBox: document.querySelector('.fn-free-word'),
      searchButton: document.querySelector('.fn-search-button'),
      tableWrapper: document.querySelector('.fn-table-wrapper'),
      loading: document.querySelector('.fn-loading-wrapper'),
      dataWrapper: document.querySelector('.fn-data-wrapper'),
      searchTargetStoreButton: document.querySelector('.components-search-target-store-button')
    }
    // Array to Store Each Data.
    this.store = {
      initializeData: [],
      freeWordData: []
    }
  }

  // @ts-ignore TS6133: 'debugData' is declared but its value is never read.
  private debugData(): void {
    console.log(this.store.initializeData)
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
      this.store.initializeData = await getData.json()
    } catch (error) {
      console.error('error: ', error)
    }
  }

  private initializeList(): void {
    this.selectors.loading!.classList.remove('is-inactive')
    this.selectors.tableWrapper!.classList.remove('is-active')
    this.selectors.dataWrapper!.classList.remove('is-active')
    this.selectors.searchTargetStoreButton!.classList.remove('is-active')
    Array.from(document.querySelectorAll('.fn-table-list'), (dataList): void => {
      this.selectors.dataWrapper!.removeChild(dataList)
    })
  }

  private onView(): void {
    this.selectors.tableWrapper!.classList.add('is-active')
    this.selectors.dataWrapper!.classList.add('is-active')
    this.selectors.searchTargetStoreButton!.classList.add('is-active')
    this.selectors.loading!.classList.add('is-inactive')
  }

  /*
  Render Data List Core.
  */
  private async render(addData: BinTypeA[]): Promise<void> {
    const renderDelay = 10
    if (addData.length > 0) {
      addData.map(
        async (info, index): Promise<void> => {
          const createTableListElement = document.createElement('tr')
          createTableListElement.classList.add('table-list', 'fn-table-list')
          // prettier-ignore
          createTableListElement.innerHTML = `
            <td class="table-data">${info.決済事業者名称}</td>
            <td class="table-data">${info.キャッシュレスサービス名称}</td>
            <td class="table-data">${info.キャッシュレスサービス区分}</td>
            <td class="table-data">${info.ブランドサービス.map((brandInfo: string, brandIndex: number): string => brandIndex + 1 < info.ブランドサービス.length ? `${brandInfo}・` : `${brandInfo}`).toString().replace(/,/g, '')}</td>
            <td class="table-data">
              <a href="${info.特設WebURL}" target="_blank" class="link">${info.特設WebURL !== '' ? '詳細を確認' : ''}</a>
            </td>
          `
          if (this.selectors.dataWrapper) {
            await this.sleep(renderDelay * index)
            this.selectors.dataWrapper.appendChild(createTableListElement)
          }
        }
      )

      await this.sleep(renderDelay * addData.length)
      this.onView()
    } else {
      const createTableListElement = document.createElement('tr')
      createTableListElement.classList.add('table-list', 'fn-table-list')
      createTableListElement.innerHTML = '<td colspan="5" class="table-data no-data">該当データが有りません。</td>'
      if (this.selectors.dataWrapper) this.selectors.dataWrapper.appendChild(createTableListElement)
      this.onView()
    }
  }

  /*
  Comma Separated Multiple Search in Free Word.
  */
  private searchFreeWord(): void {
    if (this.selectors.freeWordBox) {
      this.selectors.freeWordBox.value = ''
      this.store.freeWordData = this.store.initializeData
      this.selectors.freeWordBox.addEventListener('keyup', (event): void => {
        const currentSelector = event.currentTarget as HTMLInputElement
        // Initialize Array for Each Input.
        let eachWordSearchResultAry: BinTypeA[][] = []
        // Putting Comma Separated Words in Array.
        const eachWordAry = currentSelector.value
          .toLowerCase()
          .split(/[,、]/)
          .map((info: string): string => info.replace(/^\s+/g, '').replace(/\s+$/g, ''))
          .filter((info: string): boolean => info !== '')
        /*
        Branch. True → Full Data. / False → Check JSON Data.
        */
        // When Free Word Box is Empty, Put Full Data.
        if (eachWordAry.length === 0) {
          eachWordSearchResultAry = [this.store.initializeData]
        } else {
          /*
        JSON Data is Checked, for Words in Array. ( 'eachWordAry' Goes to See 'initializeData' )
        */
          for (let wordIndex = 0; wordIndex < eachWordAry.length; wordIndex++) {
            // Create Array in Array by Number of Words.
            eachWordSearchResultAry.push([])
            // Search.
            for (let dataIndex = 0; dataIndex < this.store.initializeData.length; dataIndex++) {
              /*
            ↓ Methods in Object Check Each Items. ↓
            */
              const checkItems = {
                // Search 決済事業者番号.
                providersNumber: this.store.initializeData[dataIndex].決済事業者番号.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 決済事業者名称.
                providersName: this.store.initializeData[dataIndex].決済事業者名称.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search キャッシュレスサービス名称.
                serviceName: this.store.initializeData[dataIndex].キャッシュレスサービス名称.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search キャッシュレスサービス区分.
                serviceDivision: this.store.initializeData[dataIndex].キャッシュレスサービス区分.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search ブランドサービス.
                brandService: this.store.initializeData[dataIndex].ブランドサービス
                  .map((brandInfo): boolean => brandInfo.toLowerCase().includes(eachWordAry[wordIndex]))
                  .includes(true),
                // Search 特設WebURL.
                specialURL: this.store.initializeData[dataIndex].特設WebURL.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 検索サービス.
                searchService: this.store.initializeData[dataIndex].検索サービス.toLowerCase().includes(eachWordAry[wordIndex])
              }
              /*
            ↑ Methods in Object Check Each Items End. ↑
            */
              // To Check.
              if (
                checkItems.providersNumber ||
                checkItems.providersName ||
                checkItems.serviceName ||
                checkItems.serviceDivision ||
                checkItems.brandService ||
                checkItems.specialURL ||
                checkItems.searchService
              ) {
                eachWordSearchResultAry[wordIndex].push(this.store.initializeData[dataIndex])
              }
            }
          }
        }
        // Leave Duplicate Data.
        this.store.freeWordData = [this.store.initializeData, ...eachWordSearchResultAry].reduce((accumulator, current): BinTypeA[] => {
          return [...accumulator, ...current].filter((info, index, array): boolean => {
            return array.indexOf(info) === index && index !== array.lastIndexOf(info)
          })
        }, this.store.initializeData)
      })
    }
  }

  /*
  Search Result Render.
  */
  private searchResultRender(): void {
    // Search Result Core.
    const searchResultCore = (): void => {
      this.initializeList()
      this.render(this.store.freeWordData)
    }
    if (this.selectors.searchButton) {
      // Require When Click Search Button.
      this.selectors.searchButton.addEventListener('click', searchResultCore)
      // Require When Press Only Enter Key.
      document.addEventListener('keypress', (event): void => {
        if (event.code === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) searchResultCore()
      })
    }
  }

  public async core(): Promise<void> {
    await this.resolvedPromise(this.getData())
    this.render(this.store.initializeData)
    this.searchFreeWord()
    this.searchResultRender()
  }
}
