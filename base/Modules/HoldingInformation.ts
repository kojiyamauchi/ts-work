/*
 HoldingInformation.ts
*/

// Import Modules.
import fetch from 'isomorphic-fetch'

export default class HoldingInformation {
  private readonly url: string
  private readonly endPoint: string
  private readonly queryString: string
  private readonly removeString: string
  private readonly today: Date
  private readonly year: string
  private readonly month: string
  private readonly day: string
  private readonly hours: string
  private readonly nowDate: string
  private area: string | null

  private selectors: {
    readonly pageHeading: HTMLElement | null
    readonly freeWordBox: HTMLInputElement | null
    readonly searchButton: HTMLElement | null
    readonly loading: HTMLElement | null
    readonly listWrapper: HTMLElement | null
  }

  private areaDictionary: {
    readonly [key: string]: string
  }

  private store: {
    initializeData: HoldingInformationMember[]
    areaData: HoldingInformationMember[]
    compData: HoldingInformationMember[]
    freeWordData: HoldingInformationMember[]
  }

  public constructor() {
    this.url = window.location.origin
    this.endPoint = `${this.url}/assets/json/holdingInformation.json`
    this.queryString = window.location.search
    this.removeString = '?area='
    this.area = null
    this.today = new Date()
    this.year = String(this.today.getFullYear())
    this.month = String(this.today.getMonth() + 1)
    this.day = String(this.today.getDate())
    this.hours = String(this.today.getHours())
    this.nowDate = `${this.year}/${this.month}/${this.day} ${this.hours}:00`

    this.selectors = {
      pageHeading: document.querySelector('.fn-personal-heading02'),
      freeWordBox: document.querySelector('.fn-freeword'),
      searchButton: document.querySelector('.fn-search-button'),
      loading: document.querySelector('.fn-icon-loading'),
      listWrapper: document.querySelector('.fn-list-wrapper')
    }

    this.areaDictionary = {
      北海道: 'hokkaido',
      青森県: 'aomori',
      岩手県: 'iwate',
      秋田県: 'akita',
      宮城県: 'miyagi',
      山形県: 'yamagata',
      福島県: 'fukushima',
      茨城県: 'ibaraki',
      栃木県: 'tochigi',
      群馬県: 'gunma',
      埼玉県: 'saitama',
      千葉県: 'chiba',
      東京都: 'tokyo',
      神奈川県: 'kanagawa',
      新潟県: 'niigata',
      富山県: 'toyama',
      石川県: 'ishikawa',
      福井県: 'fukui',
      山梨県: 'yamanashi',
      長野県: 'nagano',
      岐阜県: 'gifu',
      静岡県: 'shizuoka',
      愛知県: 'aichi',
      三重県: 'mie',
      滋賀県: 'shiga',
      奈良県: 'nara',
      和歌山県: 'wakayama',
      京都府: 'kyoto',
      大阪府: 'osaka',
      兵庫県: 'hyogo',
      岡山県: 'okayama',
      広島県: 'hiroshima',
      鳥取県: 'tottori',
      島根県: 'shimane',
      山口県: 'yamaguchi',
      香川県: 'kagawa',
      徳島県: 'tokushima',
      愛媛県: 'ehime',
      高知県: 'kochi',
      福岡県: 'fukuoka',
      佐賀県: 'saga',
      長崎県: 'nagasaki',
      大分県: 'oita',
      熊本県: 'kumamoto',
      宮崎県: 'miyazaki',
      鹿児島県: 'kagoshima',
      沖縄県: 'okinawa'
    }

    this.store = {
      initializeData: [],
      areaData: [],
      compData: [],
      freeWordData: []
    }
  }

  private resolvedPromise<T>(arg: T): Promise<T> {
    return new Promise((resolve): void => resolve(arg))
  }

  private sleep(ms: number): Promise<number> {
    return new Promise((resolve): number => {
      return setTimeout(resolve, ms)
    })
  }

  private getArea(): void {
    const getString = this.queryString.replace(this.removeString, '')
    const checkArea = Object.keys(this.areaDictionary).filter((info): boolean => this.areaDictionary[info] === getString)
    this.area = checkArea.length ? checkArea[0] : null
  }

  private async getData(): Promise<void> {
    try {
      const getData = await fetch(this.endPoint, { credentials: 'same-origin' })
      this.store.initializeData = await getData.json()
      this.store.initializeData.sort((a: HoldingInformationMember, b: HoldingInformationMember): number => {
        if (a.checkDate > b.checkDate) return 1
        if (a.checkDate < b.checkDate) return -1
        if (a.newspaperEvent < b.newspaperEvent) return 1
        if (a.newspaperEvent > b.newspaperEvent) return -1
        return 0
      })
    } catch (error) {
      console.error('error: ', error)
    }
  }

  private processingData(): void {
    if (this.area) {
      this.store.areaData = this.store.initializeData.filter((info): boolean => info.都道府県 === this.area)
    } else {
      this.store.areaData = this.store.initializeData
    }
    const futureEvent = this.store.areaData.filter((info): boolean => info.checkDate > this.nowDate)
    const pastEvent = this.store.areaData.filter((info): boolean => info.checkDate <= this.nowDate)
    this.store.compData = [...futureEvent, ...pastEvent]
  }

  private initializeList(): void {
    this.selectors.loading!.classList.remove('is-inactive')
    this.selectors.listWrapper!.classList.remove('is-active')
    Array.from(document.querySelectorAll('.fn-list'), (dataList): void => {
      this.selectors.listWrapper!.removeChild(dataList)
    })
  }

  private onView(): void {
    this.selectors.listWrapper!.classList.add('is-active')
    this.selectors.loading!.classList.add('is-inactive')
  }

  private async render(addData: HoldingInformationMember[]): Promise<void> {
    const renderDelay = 5
    this.selectors.pageHeading!.textContent = this.area ? this.area : '全国'
    if (addData.length > 0) {
      addData.map(
        async (info, index): Promise<void> => {
          const createDataListElement = document.createElement('div')
          createDataListElement.classList.add('list')
          createDataListElement.classList.add('fn-list')
          if (info.checkDate <= this.nowDate) createDataListElement.classList.add('is-inactive')
          // prettier-ignore
          createDataListElement.innerHTML = `
            <div class="data-wrapper"><span class="date">開催日：${info.開催日}</span>${!info.newspaperEvent ? `<span class="tag">${info.タグ}</span>` : ``}</div>
            <div class="data-wrapper">
              <dl class="data-inner">
                <dt class="data-heading">会場名</dt>
                <dd class="data-detail">${info.会場名}</dd>
              </dl>
              <dl class="data-inner">
                <dt class="data-heading">会場場所</dt>
                <dd class="data-detail">${info.会場住所}</dd>
              </dl>
            </div>
            <div class="data-wrapper">
              <dl class="data-inner">
                <dt class="data-heading">主催・共催・協賛・後援</dt>
                <dd class="data-detail">${info.主催等}</dd>
              </dl>
              <dl class="data-inner">
                <dt class="data-heading">問合せ先</dt>
                <dd class="data-detail">${!info.newspaperEvent ? `<a href="${info.問い合わせ先}" target="_blank" class="link">${info.問い合わせ先}</a>` : info.問い合わせ先}</dd>
              </dl>
            </div>
            ${info.checkDate <= this.nowDate ? `<div class="cover-layer"></div>` : ``}
          `
          if (this.selectors.listWrapper) {
            await this.sleep(renderDelay * index)
            this.selectors.listWrapper.appendChild(createDataListElement)
          }
        }
      )
      await this.sleep(renderDelay * addData.length)
      this.onView()
    } else {
      const createDataListElement = document.createElement('div')
      createDataListElement.classList.add('list')
      createDataListElement.classList.add('fn-list')
      createDataListElement.classList.add('no-data')
      createDataListElement.textContent = '該当データが有りません。'
      if (this.selectors.listWrapper) this.selectors.listWrapper.appendChild(createDataListElement)
      this.onView()
    }
  }

  private searchFreeWord(): void {
    if (this.selectors.freeWordBox) {
      this.selectors.freeWordBox.value = ''
      this.store.freeWordData = this.store.compData
      this.selectors.freeWordBox.addEventListener('input', (event): void => {
        const currentSelector = event.currentTarget instanceof HTMLInputElement ? event.currentTarget : null
        let eachWordSearchResultAry: HoldingInformationMember[][] = []
        const eachWordAry = currentSelector!.value
          .toLowerCase()
          .split(/[,、]/)
          .map((info: string): string => info.replace(/^\s+/g, '').replace(/\s+$/g, ''))
          .filter((info: string): boolean => info !== '')
        if (eachWordAry.length === 0) {
          eachWordSearchResultAry = [this.store.compData]
        } else {
          for (let wordIndex = 0; wordIndex < eachWordAry.length; wordIndex++) {
            eachWordSearchResultAry.push([])
            for (let dataIndex = 0; dataIndex < this.store.compData.length; dataIndex++) {
              const checkItems = {
                area: this.store.compData[dataIndex].都道府県.toLowerCase().includes(eachWordAry[wordIndex]),
                eventDate: this.store.compData[dataIndex].開催日.toLowerCase().includes(eachWordAry[wordIndex]),
                venueName: this.store.compData[dataIndex].会場名.toLowerCase().includes(eachWordAry[wordIndex]),
                venueAddress: this.store.compData[dataIndex].会場住所.toLowerCase().includes(eachWordAry[wordIndex]),
                organizerEtc: this.store.compData[dataIndex].主催等.toLowerCase().includes(eachWordAry[wordIndex]),
                contact: this.store.compData[dataIndex].問い合わせ先.toLowerCase().includes(eachWordAry[wordIndex]),
                tag: this.store.compData[dataIndex].タグ.toLowerCase().includes(eachWordAry[wordIndex])
              }
              if (
                checkItems.area ||
                checkItems.eventDate ||
                checkItems.venueName ||
                checkItems.venueAddress ||
                checkItems.organizerEtc ||
                checkItems.contact ||
                checkItems.tag
              ) {
                eachWordSearchResultAry[wordIndex].push(this.store.compData[dataIndex])
              }
            }
          }
        }
        this.store.freeWordData = [this.store.compData, ...eachWordSearchResultAry].reduce((accumulator, current): HoldingInformationMember[] => {
          return [...accumulator, ...current].filter((info, index, array): boolean => {
            return array.indexOf(info) === index && index !== array.lastIndexOf(info)
          })
        }, this.store.compData)
      })
    }
  }

  /*
  Search Result Render.
  */
  private searchResultRender(): void {
    const searchResultCore = (): void => {
      this.initializeList()
      this.render(this.store.freeWordData)
    }
    if (this.selectors.searchButton) {
      this.selectors.searchButton.addEventListener('click', searchResultCore)
      document.addEventListener('keypress', (event): void => {
        if (event.code === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) searchResultCore()
      })
    }
  }

  public async core(): Promise<void> {
    await this.resolvedPromise(this.getArea())
    await this.resolvedPromise(this.getData())
    await this.resolvedPromise(this.processingData())
    this.render(this.store.compData)
    this.searchFreeWord()
    this.searchResultRender()
  }
}
