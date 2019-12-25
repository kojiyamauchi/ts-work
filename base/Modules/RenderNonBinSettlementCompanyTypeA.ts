/*
 RenderNonBinSettlementCompanyTypeA.ts
*/

// Import Modules.
import fetch from 'isomorphic-fetch'

export default class RenderNonBinSettlementCompanyTypeA {
  private url: string
  private endPoint: string
  private selectors: {
    searchArea: HTMLElement | null
    searchItemsWrapper: HTMLElement | null
    freeWordBox: HTMLInputElement | null
    searchButton: HTMLElement | null
    loading: HTMLElement | null
    lists: HTMLElement | null
    searchTargetStoreButton: HTMLElement | null
  }

  private paymentMethodDictionary: CommonDictionaryTypes
  private store: {
    firstRender: boolean
    initializeData: NonBinTypeA[]
    paymentMethodCheckBoxData: NonBinTypeA[]
    freeWordData: NonBinTypeA[]
  }

  public constructor() {
    this.url = window.location.origin
    this.endPoint = `${this.url}/assets/json/nonBinTypeA.json`
    this.selectors = {
      searchArea: document.querySelector('.fn-search-area'),
      searchItemsWrapper: document.querySelector('.fn-search-items-wrapper'),
      freeWordBox: document.querySelector('.fn-free-word'),
      searchButton: document.querySelector('.fn-search-button'),
      loading: document.querySelector('.fn-icon-loading'),
      lists: document.querySelector('.fn-lists'),
      searchTargetStoreButton: document.querySelector('.components-search-target-store-button')
    }
    /*
    Dictionaries Below = {
      'Letter of Display on View' : [
        'Status in Operation',
        'Input Value & Selector Properties',
        'JSON Value',
        'JSON Value' (Optional. When Searching Multiple Values on One Check Box.)
      ]
    }
    */
    this.paymentMethodDictionary = {
      '電子マネー / プリペイド': [true, 'electronic-money', '電子マネー', 'プリペイド'],
      '電子マネー / プリペイド①': [false, 'electronic-money', '電子マネー'],
      '電子マネー / プリペイド②': [false, 'prepaid-card', 'プリペイド'],
      QRコード: [true, 'qr-code', 'QRコード'],
      Jデビット: [true, 'j-debit', 'Jデビット'],
      その他: [true, 'other-payment', 'その他']
    }
    // Array to Store Each Data.
    this.store = {
      firstRender: true,
      initializeData: [],
      paymentMethodCheckBoxData: [],
      freeWordData: []
    }
  }

  // @ts-ignore TS6133: 'debugData' is declared but its value is never read.
  private debugData(): void {
    console.log(this.store.initializeData)
  }

  // @ts-ignore TS6133: 'debugValue' is declared but its value is never read.
  private debugValue(arg: keyof NonBinTypeA): void {
    const pickValueAry = this.store.initializeData.map((info): string | number | boolean => {
      return info[arg]
    })
    const removeDuplicate = pickValueAry
      .join(',')
      .split(',')
      .filter((info, index, array): boolean => array.indexOf(info) === index)
    console.log(removeDuplicate)
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
    this.selectors.lists!.classList.remove('is-active')
    this.selectors.searchTargetStoreButton!.classList.remove('is-active')
    Array.from(document.querySelectorAll('.fn-data-list'), (dataList): void => {
      this.selectors.lists!.removeChild(dataList)
    })
  }

  private onView(): void {
    if (this.store.firstRender) this.selectors.searchArea!.classList.add('is-active')
    this.selectors.lists!.classList.add('is-active')
    this.selectors.searchTargetStoreButton!.classList.add('is-active')
    this.selectors.loading!.classList.add('is-inactive')
    this.store.firstRender = false
  }

  private moreInformation(): void {
    Array.from(document.querySelectorAll('.data-information-button'), (selector): void => {
      selector.addEventListener('click', (event): void => {
        if (event.currentTarget instanceof HTMLElement) event.currentTarget.nextElementSibling!.classList.toggle('is-active')
      })
    })
  }

  /*
  Render CheckBox 決済手段.
  */
  private renderPaymentMethodCheckBox(): void {
    const createEachCheckBoxWrapperElement = document.createElement('dl')
    createEachCheckBoxWrapperElement.classList.add('each-checkbox-wrapper')
    createEachCheckBoxWrapperElement.innerHTML = `
      <dt class="each-checkbox-heading">決済手段</dt>
      <dd class="each-checkbox-data fn-checkbox-payment-method"></dd>
    `
    if (this.selectors.searchItemsWrapper) {
      this.selectors.searchItemsWrapper.appendChild(createEachCheckBoxWrapperElement)
    }

    Object.keys(this.paymentMethodDictionary).map((info): void => {
      if (this.paymentMethodDictionary[info][0]) {
        const createEachCheckBoxElement = document.createElement('span')
        createEachCheckBoxElement.classList.add('each-checkbox')
        createEachCheckBoxElement.innerHTML = `
          <input
           type="checkbox"
           id="${this.paymentMethodDictionary[info][1]}"
           class="checkbox-input checkbox-input-payment-method fn-checkbox-input fn-checkbox-input-payment-method"
           value="${this.paymentMethodDictionary[info][1]}">
          <label
           for="${this.paymentMethodDictionary[info][1]}"
           class="checkbox-label checkbox-label-payment-method">
             ${info}
          </label>
        `
        if (document.querySelector('.fn-checkbox-payment-method')) {
          document.querySelector('.fn-checkbox-payment-method')!.appendChild(createEachCheckBoxElement)
        }
      }
    })
  }

  /*
  Render Data List Core.
  */
  private async render(addData: NonBinTypeA[]): Promise<void> {
    const renderDelay = 10
    if (addData.length > 0) {
      addData.map(
        async (info, index): Promise<void> => {
          const createDataListElement = document.createElement('div')
          createDataListElement.classList.add('data-list')
          createDataListElement.classList.add('fn-data-list')
          // prettier-ignore
          createDataListElement.innerHTML = `
            <dl class="data-list-heading">
              <dt class="data-list-heading-letter">
                ${info.キャッシュレスサービス名称}
              </dt>
              <dd class="data-list-heading-logo">
                <img src="/assets/img/${info.ロゴ画像名}" class="data-list-heading-logo-image">
              </dd>
            </dl>

            <dl class="data-list-icon-wrapper">
              <dt class="data-list-icon-heading">
                <span class="heading-cube"></span>
                <span class="heading-letter">利用可能な決済手段</span>
              </dt>
              <dd class="data-list-icon-detail">
                <span class="data-list-icon-detail-inner">
                  ${info.キャッシュレスサービス区分}
                </span>
              </dd>
            </dl>

            <div class="data-list-letter-wrapper">
              <dl class="data-list-letter-inner">
                <dt class="data-list-letter-heading">
                  <span class="heading-cube"></span>
                  <span class="heading-letter">ブランドサービス</span>
                </dt>
                <dd class="data-list-letter-detail">
                <span class="letter-detail">${info.ブランドサービス}</span>
                </dd>
              </dl>
            </div>

            <dl class="data-list-button-wrapper">
              <dt class="data-list-button-heading">
                <span class="heading-cube"></span>
                <span class="heading-letter">その他ポイント還元の詳細</span>
              </dt>
              <dd class="data-list-button-detail">
              <a href="${info.特設WebURL}" target="_blank" class="button-detail ${info.特設WebURL === '' ? 'is-disabled' : ''}">ポイント還元の詳細を確認する</a>
              </dd>
            </dl>

            <dl class="data-list-details-wrapper">
              <dt class="data-list-details-heading">
                <span class="heading-cube"></span>
                <span class="heading-letter">詳細は下記の決済事業者窓口にお問合せください</span>
              </dt>
              <dd class="data-providers">${info.決済事業者名称}</dd>
              <dd class="data-information-wrapper">
                <dl class="data-information-inner">
                  <dt class="data-information-button ${info.消費者向け問合せ窓口1名称 === '' ? 'is-disabled' : ''}">お問い合わせ先</dt>
                  <dd class="data-information-detail">
                  ${info.消費者向け問合せ窓口1名称 !== '' ? `<dl class="data-information"><dt class="data-information-heading">${info.消費者向け問合せ窓口1名称}</dt><dd class="data-information-letter">TEL：${info.消費者向け問合せ窓口1電話番号}</dd><dd class="data-information-letter">受付時間：${info.消費者向け問合せ窓口1受付時間}</dd><dd class="data-information-letter">${info.消費者向け問合せ窓口1受付時間の補足等}</dd></dl>`: ''}
                  ${info.消費者向け問合せ窓口2名称 !== '' ? `<dl class="data-information"><dt class="data-information-heading">${info.消費者向け問合せ窓口2名称}</dt><dd class="data-information-letter">TEL：${info.消費者向け問合せ窓口2電話番号}</dd><dd class="data-information-letter">受付時間：${info.消費者向け問合せ窓口2受付時間}</dd><dd class="data-information-letter">${info.消費者向け問合せ窓口2受付時間の補足等}</dd></dl>`: ''}
                  ${info.消費者向け問合せ窓口3名称 !== '' ? `<dl class="data-information"><dt class="data-information-heading">${info.消費者向け問合せ窓口3名称}</dt><dd class="data-information-letter">TEL：${info.消費者向け問合せ窓口3電話番号}</dd><dd class="data-information-letter">受付時間：${info.消費者向け問合せ窓口3受付時間}</dd><dd class="data-information-letter">${info.消費者向け問合せ窓口3受付時間の補足等}</dd></dl>`: ''}
                  ${info.消費者向け問合せ窓口4名称 !== '' ? `<dl class="data-information"><dt class="data-information-heading">${info.消費者向け問合せ窓口4名称}</dt><dd class="data-information-letter">TEL：${info.消費者向け問合せ窓口4電話番号}</dd><dd class="data-information-letter">受付時間：${info.消費者向け問合せ窓口4受付時間}</dd><dd class="data-information-letter">${info.消費者向け問合せ窓口4受付時間の補足等}</dd></dl>`: ''}
                  ${info.消費者向け問合せ窓口5名称 !== '' ? `<dl class="data-information"><dt class="data-information-heading">${info.消費者向け問合せ窓口5名称}</dt><dd class="data-information-letter">TEL：${info.消費者向け問合せ窓口5電話番号}</dd><dd class="data-information-letter">受付時間：${info.消費者向け問合せ窓口5受付時間}</dd><dd class="data-information-letter">${info.消費者向け問合せ窓口5受付時間の補足等}</dd></dl>`: ''}
                  </dd>
                </dl>
              </dd>
            </dl>
          `
          if (this.selectors.lists) {
            await this.sleep(renderDelay * index)
            this.selectors.lists.appendChild(createDataListElement)
          }
        }
      )
      await this.sleep(renderDelay * addData.length)
      this.onView()
      this.moreInformation()
    } else {
      const createDataListElement = document.createElement('div')
      createDataListElement.classList.add('data-list')
      createDataListElement.classList.add('fn-data-list')
      createDataListElement.classList.add('no-data')
      createDataListElement.textContent = '該当データが有りません。'
      if (this.selectors.lists) this.selectors.lists.appendChild(createDataListElement)
      this.onView()
    }
  }

  /*
  Search CheckBox キャッシュレスサービス区分.
  */
  private searchPaymentMethodCheckBox(): void {
    if (this.selectors.searchItemsWrapper) {
      const checkBoxPaymentMethodSelectors = document.querySelectorAll('.fn-checkbox-input-payment-method')
      this.store.paymentMethodCheckBoxData = this.store.initializeData
      Array.from(checkBoxPaymentMethodSelectors, (selector): void => {
        selector.addEventListener('change', (): void => {
          const checkedList: string[] = []
          Array.from(checkBoxPaymentMethodSelectors)
            .filter((checkSelector): boolean => {
              const inputElement = checkSelector instanceof HTMLInputElement ? checkSelector : null
              return inputElement!.checked
            })
            .map((activeCheckBox): void => {
              Object.keys(this.paymentMethodDictionary).filter((keyInfo): void => {
                if (this.paymentMethodDictionary[keyInfo].includes(activeCheckBox.id)) {
                  checkedList.push(this.paymentMethodDictionary[keyInfo][2])
                  if (this.paymentMethodDictionary[keyInfo][3]) checkedList.push(this.paymentMethodDictionary[keyInfo][3]!)
                }
              })
            })
          this.store.paymentMethodCheckBoxData = this.store.initializeData.filter((dataInfo): NonBinTypeA | undefined => {
            if (checkedList.length === 0) {
              return dataInfo
            }
            for (let i = 0; i < checkedList.length; i++) {
              if (dataInfo.キャッシュレスサービス区分.includes(checkedList[i])) {
                return dataInfo
              }
            }
            return undefined
          })
        })
      })
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
        const currentSelector = event.currentTarget instanceof HTMLInputElement ? event.currentTarget : null
        // Initialize Array for Each Input.
        let eachWordSearchResultAry: NonBinTypeA[][] = []
        // Putting Comma Separated Words in Array.
        const eachWordAry = currentSelector!.value
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
                // Search キャッシュレスサービス区分その他.
                serviceOtherDivision: this.store.initializeData[dataIndex].キャッシュレスサービス区分その他.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search ブランドサービス.
                brandService: this.store.initializeData[dataIndex].ブランドサービス.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 特設WebURL.
                specialURL: this.store.initializeData[dataIndex].特設WebURL.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 検索サービス.
                searchService: this.store.initializeData[dataIndex].検索サービス.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口1名称.
                contactConsumerFirst: this.store.initializeData[dataIndex].消費者向け問合せ窓口1名称.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口1受付時間
                contactConsumerFirstTime: this.store.initializeData[dataIndex].消費者向け問合せ窓口1受付時間.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口1電話番号
                contactConsumerFirstNumber: this.store.initializeData[dataIndex].消費者向け問合せ窓口1電話番号.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口1受付時間の補足等
                contactConsumerFirstNotes: this.store.initializeData[dataIndex].消費者向け問合せ窓口1受付時間の補足等
                  .toLowerCase()
                  .includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口2名称.
                contactConsumerSecond: this.store.initializeData[dataIndex].消費者向け問合せ窓口2名称.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口2受付時間
                contactConsumerSecondTime: this.store.initializeData[dataIndex].消費者向け問合せ窓口2受付時間.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口2電話番号
                contactConsumerSecondNumber: this.store.initializeData[dataIndex].消費者向け問合せ窓口2電話番号.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口2受付時間の補足等
                contactConsumerSecondNotes: this.store.initializeData[dataIndex].消費者向け問合せ窓口2受付時間の補足等
                  .toLowerCase()
                  .includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口3名称.
                contactConsumerThird: this.store.initializeData[dataIndex].消費者向け問合せ窓口3名称.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口3受付時間
                contactConsumerThirdTime: this.store.initializeData[dataIndex].消費者向け問合せ窓口3受付時間.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口3電話番号
                contactConsumerThirdNumber: this.store.initializeData[dataIndex].消費者向け問合せ窓口3電話番号.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口3受付時間の補足等
                contactConsumerThirdNotes: this.store.initializeData[dataIndex].消費者向け問合せ窓口3受付時間の補足等
                  .toLowerCase()
                  .includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口4名称.
                contactConsumerFourth: this.store.initializeData[dataIndex].消費者向け問合せ窓口4名称.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口4受付時間
                contactConsumerFourthTime: this.store.initializeData[dataIndex].消費者向け問合せ窓口4受付時間.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口4電話番号
                contactConsumerFourthNumber: this.store.initializeData[dataIndex].消費者向け問合せ窓口4電話番号.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口4受付時間の補足等
                contactConsumerFourthNotes: this.store.initializeData[dataIndex].消費者向け問合せ窓口4受付時間の補足等
                  .toLowerCase()
                  .includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口5名称.
                contactConsumerFifth: this.store.initializeData[dataIndex].消費者向け問合せ窓口5名称.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口5受付時間
                contactConsumerFifthTime: this.store.initializeData[dataIndex].消費者向け問合せ窓口5受付時間.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口5電話番号
                contactConsumerFifthNumber: this.store.initializeData[dataIndex].消費者向け問合せ窓口5電話番号.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 消費者向け問合せ窓口5受付時間の補足等
                contactConsumerFifthNotes: this.store.initializeData[dataIndex].消費者向け問合せ窓口5受付時間の補足等
                  .toLowerCase()
                  .includes(eachWordAry[wordIndex])
                /* eslint-enable */
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
                checkItems.serviceOtherDivision ||
                checkItems.brandService ||
                checkItems.specialURL ||
                checkItems.searchService ||
                checkItems.contactConsumerFirst ||
                checkItems.contactConsumerFirstTime ||
                checkItems.contactConsumerFirstNumber ||
                checkItems.contactConsumerFirstNotes ||
                checkItems.contactConsumerSecond ||
                checkItems.contactConsumerSecondTime ||
                checkItems.contactConsumerSecondNumber ||
                checkItems.contactConsumerSecondNotes ||
                checkItems.contactConsumerThird ||
                checkItems.contactConsumerThirdTime ||
                checkItems.contactConsumerThirdNumber ||
                checkItems.contactConsumerThirdNotes ||
                checkItems.contactConsumerFourth ||
                checkItems.contactConsumerFourthTime ||
                checkItems.contactConsumerFourthNumber ||
                checkItems.contactConsumerFourthNotes ||
                checkItems.contactConsumerFifth ||
                checkItems.contactConsumerFifthTime ||
                checkItems.contactConsumerFifthNumber ||
                checkItems.contactConsumerFifthNotes
              ) {
                eachWordSearchResultAry[wordIndex].push(this.store.initializeData[dataIndex])
              }
            }
          }
        }
        // Leave Duplicate Data.
        this.store.freeWordData = [this.store.initializeData, ...eachWordSearchResultAry].reduce((accumulator, current): NonBinTypeA[] => {
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
      const concatenateSearchData = [this.store.paymentMethodCheckBoxData, this.store.freeWordData]
      const processingData = concatenateSearchData.reduce((accumulator, current): NonBinTypeA[] => {
        return [...accumulator, ...current].filter((info, index, array): boolean => {
          return array.indexOf(info) === index && index !== array.lastIndexOf(info)
        })
      }, this.store.initializeData)
      this.initializeList()
      this.render(processingData)
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
    this.renderPaymentMethodCheckBox()
    this.render(this.store.initializeData)
    this.searchPaymentMethodCheckBox()
    this.searchFreeWord()
    this.searchResultRender()
  }
}
