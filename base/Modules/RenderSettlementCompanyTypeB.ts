/*
 RenderSettlementCompanyTypeB.ts
*/

// Import Modules.
import fetch from 'isomorphic-fetch'

export default class RenderSettlementCompanyTypeB {
  private readonly url: string
  private readonly endPoint: string
  private selectors: {
    readonly searchArea: HTMLElement | null
    readonly searchItemsWrapper: HTMLElement | null
    readonly freeWordBox: HTMLInputElement | null
    readonly searchButton: HTMLElement | null
    readonly loading: HTMLElement | null
    readonly listsWrapper: HTMLElement | null
    readonly lists: HTMLElement | null
  }

  private readonly paymentMethodDictionary: CommonDictionaryTypes<string, string | null>
  private readonly usageTerminalDictionary: CommonDictionaryTypes
  private readonly rateHandlingDictionary: CommonDictionaryTypes
  private readonly paymentTimingDictionary: CommonDictionaryTypes
  private readonly providerAreaDictionary: CommonDictionaryTypes
  private readonly periodPaymentRateDictionary: CommonDictionaryTypes<number, string>
  private paymentMethodIconDictionary: {
    readonly [key: string]: string
  }

  private readonly renderQuantity: number
  private store: {
    firstRender: boolean
    scrollRender: boolean
    scrollCount: number
    initializeData: TypeB[]
    paymentMethodCheckBoxData: TypeB[]
    usageTerminalCheckBoxData: TypeB[]
    periodPaymentSelectBoxData: TypeB[]
    rateHandlingSelectBoxData: TypeB[]
    paymentTimingSelectBoxData: TypeB[]
    provideAreaSelectBoxData: TypeB[]
    freeWordData: TypeB[]
    publicationData: TypeB[]
  }

  public constructor() {
    this.url = window.location.origin
    this.endPoint = `${this.url}/assets/json/typeB.json`
    this.selectors = {
      searchArea: document.querySelector('.fn-search-area'),
      searchItemsWrapper: document.querySelector('.fn-search-items-wrapper'),
      freeWordBox: document.querySelector('.fn-free-word'),
      searchButton: document.querySelector('.fn-search-button'),
      loading: document.querySelector('.fn-icon-loading'),
      listsWrapper: document.querySelector('.fn-components-settlement-company-lists'),
      lists: document.querySelector('.fn-lists')
    }
    /*
    Dictionaries Below = {
      'Letter of Display on View' : [
        'Status in Operation',
        'Input Value & Selector Properties',
        'JSON Value',
        'JSON Value'
      ]
    }
    */
    this.paymentMethodDictionary = {
      クレジットカード: [true, 'credit-card', 'クレジットカード'],
      電子マネー: [true, 'electronic-money', '電子マネー'],
      QRコード: [true, 'qr-code', 'QRコード'],
      その他: [true, 'other-payment', 'その他'],
      デビットカード: [false, 'debit-card', null]
    }
    this.usageTerminalDictionary = {
      タブレット: [true, 'tablet', 'タブレット'],
      モバイル端末: [true, 'mobile', '持ち運び可能な端末（モバイル決済端末）'],
      据置型端末: [true, 'stationary-terminal', '店頭に設置する端末（据置型端末）'],
      端末不要: [true, 'no-terminal-required', '端末不要'],
      その他: [true, 'other', 'その他'],
      タブレット以外: [false, 'other-than-tablet', '持ち運び可能な端末（タブレット以外）'],
      blank: [false, 'blank', ' ']
    }
    this.rateHandlingDictionary = {
      継続: [true, 'continuation', '継続'],
      非継続: [true, 'discontinuation', '非継続'],
      一定期間継続: [true, 'fixed-period', '一定期間継続'],
      決済手段によって異なる: [true, 'depends-payment', '決済手段によって異なる']
    }
    this.paymentTimingDictionary = {
      月次一括: [true, 'monthly-summing-up', '月次一括'],
      複数回: [true, 'multiple', '複数回'],
      毎週: [true, 'every-week', '毎週'],
      都度入金: [true, 'every-time', '都度入金'],
      '選択型/条件型': [true, 'selection-type', '選択型/条件型'],
      その他: [true, 'other-timing', 'その他']
    }
    this.providerAreaDictionary = {
      全国: [true, 'zenkoku', '全国', ''],
      北海道: [true, 'hokkaido', '', '北海道'],
      東北: [true, 'tohoku', '東北', ''],
      青森県: [true, 'aomori', '東北', '青森県'],
      岩手県: [true, 'iwate', '東北', '岩手県'],
      秋田県: [true, 'akita', '東北', '秋田県'],
      宮城県: [true, 'miyazaki', '東北', '宮城県'],
      山形県: [true, 'yamagata', '東北', '山形県'],
      福島県: [true, 'fukushima', '東北', '福島県'],
      関東: [true, 'kanto', '関東', ''],
      茨城県: [true, 'ibaraki', '関東', '茨城県'],
      栃木県: [true, 'tochigi', '関東', '栃木県'],
      群馬県: [true, 'gunma', '関東', '群馬県'],
      埼玉県: [true, 'saitama', '関東', '埼玉県'],
      千葉県: [true, 'chiba', '関東', '千葉県'],
      東京都: [true, 'tokyo', '関東', '東京都'],
      神奈川県: [true, 'kanagawa', '関東', '神奈川県'],
      中部: [true, 'tyubu', '中部', ''],
      新潟県: [true, 'niigata', '中部', '新潟県'],
      富山県: [true, 'toyama', '中部', '富山県'],
      石川県: [true, 'ishikawa', '中部', '石川県'],
      福井県: [true, 'fukui', '中部', '福井県'],
      山梨県: [true, 'yamanashi', '中部', '山梨県'],
      長野県: [true, 'nagano', '中部', '長野県'],
      岐阜県: [true, 'gifu', '中部', '岐阜県'],
      静岡県: [true, 'shizuoka', '中部', '静岡県'],
      愛知県: [true, 'aichi', '中部', '愛知県'],
      近畿: [true, 'kinki', '近畿', ''],
      三重県: [true, 'mie', '近畿', '三重県'],
      滋賀県: [true, 'shiga', '近畿', '滋賀県'],
      奈良県: [true, 'nara', '近畿', '奈良県'],
      和歌山県: [true, 'wakayama', '近畿', '和歌山県'],
      京都府: [true, 'kyoto', '近畿', '京都府'],
      大阪府: [true, 'osaka', '近畿', '大阪府'],
      兵庫県: [true, 'hyogo', '近畿', '兵庫県'],
      中国: [true, 'tyugoku', '中国', ''],
      岡山県: [true, 'okayama', '中国', '岡山県'],
      広島県: [true, 'hiroshima', '中国', '広島県'],
      鳥取県: [true, 'tottori', '中国', '鳥取県'],
      島根県: [true, 'shimane', '中国', '島根県'],
      山口県: [true, 'yamaguchi', '中国', '山口県'],
      四国: [true, 'shikoku', '四国', ''],
      香川県: [true, 'kagawa', '四国', '香川県'],
      徳島県: [true, 'tokushima', '四国', '徳島県'],
      愛媛県: [true, 'ehime', '四国', '愛媛県'],
      高知県: [true, 'kochi', '四国', '高知県'],
      九州: [true, 'kyushu', '九州', ''],
      福岡県: [true, 'fukuoka', '九州', '福岡県'],
      佐賀県: [true, 'saga', '九州', '佐賀県'],
      長崎県: [true, 'nagasaki', '九州', '長崎県'],
      大分県: [true, 'oita', '九州', '大分県'],
      熊本県: [true, 'kumamoto', '九州', '熊本県'],
      宮崎県: [true, 'miyazaki', '九州', '宮崎県'],
      鹿児島県: [true, 'kagoshima', '九州', '鹿児島県'],
      沖縄県: [true, 'okinawa', '九州', '沖縄県']
    }
    /*
    Dictionary Below = {
      Letter of Display on View : [
        'Status in Operation',
        'Input Value',
        'Selector & Class'
      ]
    }
    */
    this.periodPaymentRateDictionary = {
      '0.00%': [true, 0, 'low'],
      '〜0.50%': [true, 0.5, 'second'],
      '〜1.00%': [true, 1, 'third'],
      '〜1.50%': [true, 1.5, 'fourth'],
      '〜2.00%': [true, 2, 'fifth'],
      '〜2.50%': [true, 2.5, 'sixth'],
      '〜3.00%': [true, 3, 'seventh'],
      '〜3.25%': [true, 3.25, 'high']
    }
    // Use to Render Icons on Providers List.
    this.paymentMethodIconDictionary = {
      クレジットカード: 'icon_card_cc',
      電子マネー: 'icon_card_ic',
      QRコード: 'icon_card_qr',
      その他: 'icon_card_et',
      デビットカード: 'icon_card_jd'
    }

    // Number of Renders One Time.
    this.renderQuantity = 20
    // State in This File.
    this.store = {
      firstRender: true,
      scrollRender: true,
      scrollCount: 0,
      initializeData: [],
      paymentMethodCheckBoxData: [],
      usageTerminalCheckBoxData: [],
      periodPaymentSelectBoxData: [],
      rateHandlingSelectBoxData: [],
      paymentTimingSelectBoxData: [],
      provideAreaSelectBoxData: [],
      freeWordData: [],
      publicationData: []
    }
  }

  // @ts-ignore TS6133: 'debugData' is declared but its value is never read.
  private debugData(): void {
    console.log(this.store.initializeData)
  }

  // @ts-ignore TS6133: 'debugValue' is declared but its value is never read.
  private debugValue(arg: keyof TypeB): void {
    const pickValueAry = this.store.initializeData.map((info): {} => {
      return info[arg]
    })
    const removeDuplicate = pickValueAry
      .join(',')
      .split(',')
      .filter((info, index, array): boolean => array.indexOf(info) === index)
    console.log(removeDuplicate)
  }

  // @ts-ignore TS6133: 'debugSortValue' is declared but its value is never read.
  private debugSortValue(arg: keyof TypeB): void {
    const pickValueAry = this.store.initializeData.map((info): {} => {
      return info[arg]
    })
    const sortByRemovingDuplicates = pickValueAry
      .filter((info, index, array): boolean => array.indexOf(info) === index)
      .sort((previous, current): number => {
        if (previous < current) return -1
        if (previous > current) return 1
        return 0
      })
    console.log(sortByRemovingDuplicates)
  }

  private resolvedPromise<T>(arg: T): Promise<T> {
    return new Promise((resolve): void => resolve(arg))
  }

  // @ts-ignore TS6133: 'sleep' is declared but its value is never read.
  private sleep(ms: number): Promise<number> {
    return new Promise((resolve): number => {
      return setTimeout(resolve, ms)
    })
  }

  private async getData(): Promise<void> {
    try {
      const getData = await fetch(this.endPoint, { credentials: 'same-origin' })
      this.store.publicationData = this.store.initializeData = await getData.json()
    } catch (error) {
      console.error('error: ', error)
    }
  }

  private loadXHR(addURL: string): number {
    const getXHR = new XMLHttpRequest()
    getXHR.open('HEAD', addURL, false)
    getXHR.send(null)
    return getXHR.status
  }

  private getImageUrl(path: string): string | undefined {
    if (this.loadXHR(path) === 200) return path
    return undefined
  }

  private initializeList(): void {
    this.selectors.loading!.classList.remove('is-inactive')
    this.selectors.lists!.classList.remove('is-active')
    Array.from(document.querySelectorAll('.fn-data-list'), (dataList): void => {
      this.selectors.lists!.removeChild(dataList)
    })
    this.store.scrollCount = 0
    this.store.scrollRender = true
  }

  private onView(): void {
    if (this.store.firstRender) {
      this.selectors.searchArea!.classList.add('is-active')
      this.selectors.listsWrapper!.classList.add('is-active')
    }
    this.selectors.lists!.classList.add('is-active')
    this.store.firstRender = false
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
      <dd class="checkbox-payment-method-notes">&#8251;クレジットカードは、国際ブランドに対応しているサービスのみが表示されます。</dd>
    `
    if (this.selectors.searchItemsWrapper) this.selectors.searchItemsWrapper.appendChild(createEachCheckBoxWrapperElement)
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
           ${info === 'クレジットカード' ? '<span class="mark-notes">&#8251</span>' : ''}
        `
        if (document.querySelector('.fn-checkbox-payment-method')) document.querySelector('.fn-checkbox-payment-method')!.appendChild(createEachCheckBoxElement)
      }
    })
  }

  /*
  Render CheckBox 利用決済端末.
  */
  private renderUsageTerminalCheckBox(): void {
    const createEachCheckBoxWrapperElement = document.createElement('dl')
    createEachCheckBoxWrapperElement.classList.add('each-checkbox-wrapper')
    createEachCheckBoxWrapperElement.innerHTML = `
      <dt class="each-checkbox-heading">利用決済端末</dt>
      <dd class="each-checkbox-data fn-checkbox-usage-terminal"></dd>
    `
    if (this.selectors.searchItemsWrapper) this.selectors.searchItemsWrapper.appendChild(createEachCheckBoxWrapperElement)
    Object.keys(this.usageTerminalDictionary).map((info): void => {
      if (this.usageTerminalDictionary[info][0]) {
        const createEachCheckBoxElement = document.createElement('span')
        createEachCheckBoxElement.classList.add('each-checkbox')
        createEachCheckBoxElement.innerHTML = `
          <input
           type="checkbox"
           id="${this.usageTerminalDictionary[info][1]}"
           class="checkbox-input checkbox-input-usage-terminal fn-checkbox-input fn-checkbox-input-usage-terminal"
           value="${this.usageTerminalDictionary[info][1]}">
          <label
           for="${this.usageTerminalDictionary[info][1]}"
           class="checkbox-label
           ${this.usageTerminalDictionary[info][1]}">
           ${info}
          </label>
        `
        if (document.querySelector('.fn-checkbox-usage-terminal')) document.querySelector('.fn-checkbox-usage-terminal')!.appendChild(createEachCheckBoxElement)
      }
    })
  }

  /*
  Render SelectBox 期間中手数料.
  */
  private renderPeriodPaymentRateSelectBox(): void {
    let option = `<option value="">選択して下さい</option>`
    const createEachSelectBoxWrapperElement = document.createElement('dl')
    createEachSelectBoxWrapperElement.classList.add('each-select-wrapper')
    createEachSelectBoxWrapperElement.innerHTML = `
      <dt class="each-select-heading">期間中手数料</dt>
      <dd class="each-select-data-wrapper">
        <select class="each-select-data fn-select-period-payment-rate"></select>
      </dd>
    `
    if (this.selectors.searchItemsWrapper) this.selectors.searchItemsWrapper.appendChild(createEachSelectBoxWrapperElement)
    Object.keys(this.periodPaymentRateDictionary).map((info): void => {
      if (this.periodPaymentRateDictionary[info][0]) {
        option += `
          <option
           value="${this.periodPaymentRateDictionary[info][1]}"
           class="${this.periodPaymentRateDictionary[info][2]}">
            ${info}
          </option>
        `
      }
    })
    if (document.querySelector('.fn-select-period-payment-rate')) document.querySelector('.fn-select-period-payment-rate')!.innerHTML = option
  }

  /*
  Render SelectBox 期間終了後の手数料の取扱い.
  */
  private renderRateHandlingSelectBox(): void {
    let option = `<option value="">選択して下さい</option>`
    const createEachSelectBoxWrapperElement = document.createElement('dl')
    createEachSelectBoxWrapperElement.classList.add('each-select-wrapper')
    createEachSelectBoxWrapperElement.innerHTML = `
      <dt class="each-select-heading">期間終了後の手数料の取扱い</dt>
      <dd class="each-select-data-wrapper">
        <select class="each-select-data fn-select-rate-handling"></select>
      </dd>
    `
    if (this.selectors.searchItemsWrapper) this.selectors.searchItemsWrapper.appendChild(createEachSelectBoxWrapperElement)
    Object.keys(this.rateHandlingDictionary).map((info): void => {
      if (this.rateHandlingDictionary[info][0]) {
        option += `
          <option
           value="${this.rateHandlingDictionary[info][1]}"
           class="${this.rateHandlingDictionary[info][1]}">
            ${info}
          </option>
        `
      }
    })
    if (document.querySelector('.fn-select-rate-handling')) document.querySelector('.fn-select-rate-handling')!.innerHTML = option
  }

  /*
  Render SelectBox 入金タイミング.
  */
  private renderPaymentTimingSelectBox(): void {
    let option = `<option value="">選択して下さい</option>`
    const createEachSelectBoxWrapperElement = document.createElement('dl')
    createEachSelectBoxWrapperElement.classList.add('each-select-wrapper')
    createEachSelectBoxWrapperElement.innerHTML = `
      <dt class="each-select-heading">入金タイミング</dt>
      <dd class="each-select-data-wrapper">
        <select class="each-select-data fn-select-payment-timing"></select>
      </dd>
    `
    if (this.selectors.searchItemsWrapper) this.selectors.searchItemsWrapper.appendChild(createEachSelectBoxWrapperElement)
    Object.keys(this.paymentTimingDictionary).map((info): void => {
      if (this.paymentTimingDictionary[info][0]) {
        option += `
          <option
           value="${this.paymentTimingDictionary[info][1]}"
           class="${this.paymentTimingDictionary[info][1]}">
             ${info}
          </option>
        `
      }
    })
    if (document.querySelector('.fn-select-payment-timing')) document.querySelector('.fn-select-payment-timing')!.innerHTML = option
  }

  /*
  Render SelectBox 提供エリア.
  */
  private renderProvideAreaSelectBox(): void {
    let option = `<option value="">選択して下さい</option>`
    const createEachSelectBoxWrapperElement = document.createElement('dl')
    createEachSelectBoxWrapperElement.classList.add('each-select-wrapper')
    createEachSelectBoxWrapperElement.innerHTML = `
      <dt class="each-select-heading">提供エリア</dt>
      <dd class="each-select-data-wrapper">
        <select class="each-select-data fn-select-provider-area"></select>
      </dd>
    `
    if (this.selectors.searchItemsWrapper) this.selectors.searchItemsWrapper.appendChild(createEachSelectBoxWrapperElement)
    Object.keys(this.providerAreaDictionary).map((info): void => {
      if (this.providerAreaDictionary[info][0]) {
        option += `
          <option
           value="${this.providerAreaDictionary[info][1]}"
           class="${this.providerAreaDictionary[info][1]}">
             ${info}
          </option>
        `
      }
    })
    if (document.querySelector('.fn-select-provider-area')) document.querySelector('.fn-select-provider-area')!.innerHTML = option
  }

  /*
  Render Data List Core.
  */
  private render(addData: TypeB[]): void {
    if (addData.length > 0) {
      addData.map((info, index): void => {
        if (this.store.scrollCount * this.renderQuantity <= index && index < (this.store.scrollCount + 1) * this.renderQuantity) {
          const imageCheck = this.getImageUrl(`${this.url}/assets/img/${info.dataID}.png`)
          const createDataListElement = document.createElement('a')
          createDataListElement.classList.add('data-list')
          createDataListElement.classList.add('fn-data-list')
          createDataListElement.setAttribute('href', `${this.url}/franchise/settlement-company-typeB-detail.html?dataID=${info.dataID}`)
          // prettier-ignore
          createDataListElement.innerHTML = `
            <dl class="data-list-heading">
              <dt class="data-list-heading-letter">
                ${info.決済事業者1}
                ${info.決済事業者2 !== '' ? info.決済事業者1.length >= 18 ? `/ ${info.決済事業者2}` : `<span class="data-list-sub-heading-letter">${info.決済事業者2}</span>` : ''}
              </dt>
              <dd class="data-list-heading-logo">
                ${info.dataID === null || imageCheck === undefined ? '<img src="/assets/img/logo_dummy.png" class="data-list-heading-logo-image" />' : `<img src="/assets/img/${info.dataID}.png" class="data-list-heading-logo-image" />` }
              </dd>
            </dl>
            <dl class="data-list-icon-wrapper">
              <dt class="data-list-icon-heading">
                <span class="heading-cube"></span>
                <span class="heading-letter">利用可能な決済手段</span>
              </dt>

              <dd class="data-list-icon-detail">
                <span class="data-list-icon-detail-inner">
                  ${info.利用可能な決済手段.length > 0 ? info.利用可能な決済手段.map((paymentMethodInfo): string => `<span class="icon-wrapper"><img src="/assets/img/${this.paymentMethodIconDictionary[paymentMethodInfo]}.png" class="icon-image"></span>`).toString().replace(/,/g, '') : ''}
                </span>
              </dd>
            </dl>
            <div class="data-list-letter-wrapper">
              <dl class="data-list-letter-inner">
                <dt class="data-list-letter-heading">
                  <span class="heading-cube"></span>
                  <span class="heading-letter">利用料率</span>
                </dt>
                <dd class="data-list-letter-detail">
                  ${info.利用料率}
                </dd>
              </dl>
              <dl class="data-list-letter-inner">
                <dt class="data-list-letter-heading">
                  <span class="heading-cube"></span>
                  <span class="heading-letter">利用決済端末</span>
                </dt>
                <dd class="data-list-letter-detail">
                  ${info.利用決済端末}
                </dd>
              </dl>
              <dl class="data-list-letter-inner">
                <dt class="data-list-letter-heading">
                  <span class="heading-cube"></span>
                  <span class="heading-letter">期間終了後の<br class="display-mobile">手数料の取扱い</span>
                </dt>
                <dd class="data-list-letter-detail">
                  ${info.期間終了後の手数料の取扱い}
                </dd>
              </dl>
              <dl class="data-list-letter-inner">
                <dt class="data-list-letter-heading">
                  <span class="heading-cube"></span>
                  <span class="heading-letter">入金<br class="display-mobile">タイミング</span>
                </dt>
                <dd class="data-list-letter-detail">
                  ${info.入金タイミング}
                </dd>
              </dl>
            </div>
          `
          if (this.selectors.lists) this.selectors.lists.appendChild(createDataListElement)
        }
      })
      addData.length > this.renderQuantity ? this.selectors.loading!.classList.add('is-scroll-loading') : this.selectors.loading!.classList.add('is-inactive')
    } else {
      const createDataListElement = document.createElement('div')
      createDataListElement.classList.add('data-list')
      createDataListElement.classList.add('fn-data-list')
      createDataListElement.classList.add('no-data')
      createDataListElement.textContent = '該当データが有りません。'
      if (this.selectors.lists) this.selectors.lists.appendChild(createDataListElement)
      this.selectors.loading!.classList.add('is-inactive')
    }
    if (!this.store.scrollCount) this.onView()
  }

  /*
  Search CheckBox 決済手段.
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
                  if (this.paymentMethodDictionary[keyInfo][2]) checkedList.push(this.paymentMethodDictionary[keyInfo][2]!)
                  if (this.paymentMethodDictionary[keyInfo][3]) checkedList.push(this.paymentMethodDictionary[keyInfo][3]!)
                }
              })
            })
          this.store.paymentMethodCheckBoxData = this.store.initializeData.filter((dataInfo): TypeB | undefined => {
            if (checkedList.length === 0) return dataInfo
            for (let i = 0; i < checkedList.length; i++) {
              if (dataInfo.利用可能な決済手段.includes(checkedList[i])) return dataInfo
            }
            return undefined
          })
        })
      })
    }
  }

  /*
  Search CheckBox 利用決済端末.
  */
  private searchUsageTerminalCheckBox(): void {
    if (this.selectors.searchItemsWrapper) {
      const checkBoxUsageTerminalSelectors = document.querySelectorAll('.fn-checkbox-input-usage-terminal')
      this.store.usageTerminalCheckBoxData = this.store.initializeData
      Array.from(checkBoxUsageTerminalSelectors, (selector): void => {
        selector.addEventListener('change', (): void => {
          const checkedList: string[] = []
          Array.from(checkBoxUsageTerminalSelectors)
            .filter((checkSelector): boolean => {
              const inputElement = checkSelector instanceof HTMLInputElement ? checkSelector : null
              return inputElement!.checked
            })
            .map((activeCheckBox): void => {
              Object.keys(this.usageTerminalDictionary).filter((keyInfo): void => {
                if (this.usageTerminalDictionary[keyInfo].includes(activeCheckBox.id)) {
                  checkedList.push(this.usageTerminalDictionary[keyInfo][2])
                  if (this.usageTerminalDictionary[keyInfo][3]) checkedList.push(this.usageTerminalDictionary[keyInfo][3]!)
                }
              })
            })
          this.store.usageTerminalCheckBoxData = this.store.initializeData.filter((dataInfo): TypeB | undefined => {
            if (checkedList.length === 0) return dataInfo
            for (let i = 0; i < checkedList.length; i++) {
              if (dataInfo.利用決済端末 === checkedList[i]) return dataInfo
            }
            return undefined
          })
        })
      })
    }
  }

  /*
  Search SelectBox 期間中手数料.
  */
  private searchPeriodPaymentRateSelectBox(): void {
    if (this.selectors.searchItemsWrapper) {
      const selectBoxPeriodPaymentSelector = document.querySelector('.fn-select-period-payment-rate')
      this.store.periodPaymentSelectBoxData = this.store.initializeData
      selectBoxPeriodPaymentSelector!.addEventListener('change', (event): void => {
        if (event.currentTarget instanceof HTMLSelectElement) {
          const getValue = event.currentTarget.value
          this.store.periodPaymentSelectBoxData = this.store.initializeData.filter((dataInfo): TypeB | undefined => {
            if (getValue === '') return dataInfo
            const processingNumber =
              dataInfo.利用料率.lastIndexOf('%') > -1
                ? dataInfo.利用料率.slice(dataInfo.利用料率.lastIndexOf('〜') + 1, dataInfo.利用料率.lastIndexOf('%'))
                : ''
            if (processingNumber !== '' && Number(getValue) >= Number(processingNumber)) return dataInfo
            return undefined
          })
        }
      })
    }
  }

  /*
  Search SelectBox 期間終了後の手数料の取扱い.
  */
  private searchRateHandlingSelectBox(): void {
    if (this.selectors.searchItemsWrapper) {
      const selectBoxRateHandlingSelector = document.querySelector('.fn-select-rate-handling')
      this.store.rateHandlingSelectBoxData = this.store.initializeData
      selectBoxRateHandlingSelector!.addEventListener('change', (event): void => {
        if (event.currentTarget instanceof HTMLSelectElement) {
          const inputElement = event.currentTarget
          const getValue = Object.keys(this.rateHandlingDictionary)
            .map((keyInfo): string | undefined => {
              if (this.rateHandlingDictionary[keyInfo].includes(inputElement.value)) return this.rateHandlingDictionary[keyInfo][2]
              return undefined
            })
            .filter((info): boolean => info !== undefined)
          this.store.rateHandlingSelectBoxData = this.store.initializeData.filter((dataInfo): TypeB | undefined => {
            if (getValue.length === 0) return dataInfo
            if (dataInfo.期間終了後の手数料の取扱い === getValue[0]) return dataInfo
            return undefined
          })
        }
      })
    }
  }

  /*
  Search SelectBox 入金タイミング.
  */
  private searchPaymentTimingSelectBox(): void {
    if (this.selectors.searchItemsWrapper) {
      const selectBoxPaymentTimingSelector = document.querySelector('.fn-select-payment-timing')
      this.store.paymentTimingSelectBoxData = this.store.initializeData
      selectBoxPaymentTimingSelector!.addEventListener('change', (event): void => {
        if (event.currentTarget instanceof HTMLSelectElement) {
          const inputElement = event.currentTarget
          const getValue = Object.keys(this.paymentTimingDictionary)
            .map((keyInfo): string | undefined => {
              if (this.paymentTimingDictionary[keyInfo].includes(inputElement.value)) return this.paymentTimingDictionary[keyInfo][2]
              return undefined
            })
            .filter((info): boolean => info !== undefined)
          this.store.paymentTimingSelectBoxData = this.store.initializeData.filter((dataInfo): TypeB | undefined => {
            if (getValue.length === 0) return dataInfo
            if (dataInfo.入金タイミング === getValue[0]) return dataInfo
            return undefined
          })
        }
      })
    }
  }

  /*
  Search SelectBox 提供エリア.
  */
  private searchProvideAreaSelectBox(): void {
    if (this.selectors.searchItemsWrapper) {
      const selectBoxProvideAreaSelector = document.querySelector('.fn-select-provider-area')
      this.store.provideAreaSelectBoxData = this.store.initializeData
      selectBoxProvideAreaSelector!.addEventListener('change', (event): void => {
        if (event.currentTarget instanceof HTMLSelectElement) {
          const inputElement = event.currentTarget
          const getRegionValue = Object.keys(this.providerAreaDictionary)
            .map((keyInfo): string | undefined => {
              if (inputElement.value === '') return
              if (this.providerAreaDictionary[keyInfo].includes(inputElement.value)) return this.providerAreaDictionary[keyInfo][2]
              return undefined
            })
            .filter((info): boolean => info !== undefined)
          const getAreaValue = Object.keys(this.providerAreaDictionary)
            .map((keyInfo): string | undefined => {
              if (inputElement.value === '') return
              if (this.providerAreaDictionary[keyInfo].includes(inputElement.value)) return this.providerAreaDictionary[keyInfo][3]
              return undefined
            })
            .filter((info): boolean => info !== undefined)
          this.store.provideAreaSelectBoxData = this.store.initializeData.filter((dataInfo): TypeB | undefined => {
            if (getRegionValue.length === 0 && getAreaValue.length === 0) return dataInfo
            if (
              dataInfo.個票.map((individualDataInfo): boolean => individualDataInfo.サービス提供エリア.includes(getRegionValue[0]!)).includes(true) ||
              dataInfo.個票.map((individualDataInfo): boolean => individualDataInfo.サービス提供エリア.includes(getAreaValue[0]!)).includes(true)
            ) {
              return dataInfo
            }
            return undefined
          })
        }
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
      this.selectors.freeWordBox.addEventListener('input', (event): void => {
        const currentSelector = event.currentTarget instanceof HTMLInputElement ? event.currentTarget : null
        // Initialize Array for Each Input.
        let eachWordSearchResultAry: TypeB[][] = []
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
                // Search 決済事業者1.
                provider: this.store.initializeData[dataIndex].決済事業者1.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 利用可能な決済手段.
                paymentMethod: this.store.initializeData[dataIndex].利用可能な決済手段
                  .map((paymentMethodInfo): boolean => paymentMethodInfo.toLowerCase().includes(eachWordAry[wordIndex]))
                  .includes(true),
                // Search 利用料率.
                periodPaymentRate: this.store.initializeData[dataIndex].利用料率.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 期間修了後の手数料の取扱い.
                rateHandling: this.store.initializeData[dataIndex].期間終了後の手数料の取扱い.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 入金タイミング.
                paymentTiming: this.store.initializeData[dataIndex].入金タイミング.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 利用決済端末.
                usageTerminal: this.store.initializeData[dataIndex].利用決済端末.toLowerCase().includes(eachWordAry[wordIndex]),
                // Search 個票.サービス提供エリア.
                providerArea: this.store.initializeData[dataIndex].個票
                  .map((individualDataInfo): boolean =>
                    individualDataInfo.サービス提供エリア
                      .map((providerAreaInfo): boolean => providerAreaInfo.toLowerCase().includes(eachWordAry[wordIndex]))
                      .includes(true)
                  )
                  .includes(true),
                // Search 個票 → 対応可能なブランド → クレジットカード.
                paymentBrandCreditCard: this.store.initializeData[dataIndex].個票
                  .map((individualDataInfo): boolean =>
                    individualDataInfo.対応可能なブランド.クレジットカード
                      .map((paymentBrandInfo): boolean => paymentBrandInfo.toLowerCase().includes(eachWordAry[wordIndex]))
                      .includes(true)
                  )
                  .includes(true),
                // Search 個票 → 対応可能なブランド → 電子マネー
                paymentBrandElectronicMoney: this.store.initializeData[dataIndex].個票
                  .map((individualDataInfo): boolean =>
                    individualDataInfo.対応可能なブランド.電子マネー
                      .map((paymentBrandInfo): boolean => paymentBrandInfo.toLowerCase().includes(eachWordAry[wordIndex]))
                      .includes(true)
                  )
                  .includes(true),
                // Search 個票 → 対応可能なブランド → QRコード.
                paymentBrandQrCode: this.store.initializeData[dataIndex].個票
                  .map((individualDataInfo): boolean =>
                    individualDataInfo.対応可能なブランド.QRコード.map((paymentBrandInfo): boolean =>
                      paymentBrandInfo.toLowerCase().includes(eachWordAry[wordIndex])
                    ).includes(true)
                  )
                  .includes(true),
                // Search 個票 → 対応可能なブランド → その他.
                paymentBrandOther: this.store.initializeData[dataIndex].個票
                  .map((individualDataInfo): boolean =>
                    individualDataInfo.対応可能なブランド.その他
                      .map((paymentBrandInfo): boolean => paymentBrandInfo.toLowerCase().includes(eachWordAry[wordIndex]))
                      .includes(true)
                  )
                  .includes(true),
                // Search 個票 → 加盟店向けサービス問合せ備考.
                individualRemarks: this.store.initializeData[dataIndex].個票
                  .map((individualDataInfo): boolean => individualDataInfo.加盟店向けサービス問合せ備考.toLowerCase().includes(eachWordAry[wordIndex]))
                  .includes(true),
                // Search 対応可能な決済端末 → 製品名.
                paymentTerminalName: this.store.initializeData[dataIndex].対応可能な決済端末
                  .map((individualDataInfo): boolean => individualDataInfo.製品名.toLowerCase().includes(eachWordAry[wordIndex]))
                  .includes(true)
              }
              /*
              ↑ Methods in Object Check Each Items End. ↑
              */
              // To Check.
              if (
                checkItems.provider ||
                checkItems.paymentMethod ||
                checkItems.periodPaymentRate ||
                checkItems.rateHandling ||
                checkItems.paymentTiming ||
                checkItems.providerArea ||
                checkItems.usageTerminal ||
                checkItems.paymentBrandCreditCard ||
                checkItems.paymentBrandElectronicMoney ||
                checkItems.paymentBrandQrCode ||
                checkItems.paymentBrandOther ||
                checkItems.individualRemarks ||
                checkItems.paymentTerminalName
              ) {
                eachWordSearchResultAry[wordIndex].push(this.store.initializeData[dataIndex])
              }
            }
          }
        }
        // Leave Duplicate Data.
        this.store.freeWordData = [this.store.initializeData, ...eachWordSearchResultAry].reduce((accumulator, current): TypeB[] => {
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
      const concatenateSearchData = [
        this.store.paymentMethodCheckBoxData,
        this.store.usageTerminalCheckBoxData,
        this.store.periodPaymentSelectBoxData,
        this.store.rateHandlingSelectBoxData,
        this.store.paymentTimingSelectBoxData,
        this.store.provideAreaSelectBoxData,
        this.store.freeWordData
      ]
      this.store.publicationData = concatenateSearchData.reduce((accumulator, current): TypeB[] => {
        return [...accumulator, ...current].filter((info, index, array): boolean => {
          return array.indexOf(info) === index && index !== array.lastIndexOf(info)
        })
      }, this.store.initializeData)
      this.initializeList()
      this.render(this.store.publicationData)
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

  /*
  Require Core.
  */
  public async core(): Promise<void> {
    await this.resolvedPromise(this.getData())
    this.renderPaymentMethodCheckBox()
    this.renderUsageTerminalCheckBox()
    this.renderPeriodPaymentRateSelectBox()
    this.renderRateHandlingSelectBox()
    this.renderPaymentTimingSelectBox()
    this.renderProvideAreaSelectBox()
    this.render(this.store.publicationData)
    this.searchPaymentMethodCheckBox()
    this.searchUsageTerminalCheckBox()
    this.searchPeriodPaymentRateSelectBox()
    this.searchRateHandlingSelectBox()
    this.searchPaymentTimingSelectBox()
    this.searchProvideAreaSelectBox()
    this.searchFreeWord()
    this.searchResultRender()
  }

  /*
  Infinite Scroll Render.
  */
  public infiniteScrollRender(): void {
    const wrapperHeight = !document.querySelector('meta[name="viewport"]')!.getAttribute('content')?.includes('width=960')
      ? this.selectors.lists!.clientHeight
      : this.selectors.lists!.clientHeight - 500
    if (!this.store.firstRender && window.pageYOffset > wrapperHeight && this.store.scrollRender) {
      this.store.scrollCount += 1
      this.store.scrollRender = this.store.scrollCount < this.store.publicationData.length / this.renderQuantity
      this.store.scrollRender ? this.render(this.store.publicationData) : this.selectors.loading!.classList.add('is-inactive')
    }
  }
}
