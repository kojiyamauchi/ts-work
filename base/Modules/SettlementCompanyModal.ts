/*

 SettlementCompanyModal.ts

*/

export default class SettlementCompanyModal {
  private readonly settlementCompanyModal: HTMLElement | null
  private readonly settlementCompanyModalWrapper: HTMLElement | null
  private readonly settlementCompanyModalHeading: HTMLElement | null
  private readonly settlementCompanyModalScroll: HTMLElement | null
  private readonly modalOpenButton: NodeList
  private readonly modalCloseButton: HTMLElement | null

  public constructor() {
    this.settlementCompanyModal = document.querySelector('.fn-components-settlement-company-modal')
    this.settlementCompanyModalWrapper = document.querySelector('.fn-modal-wrapper')
    this.settlementCompanyModalHeading = document.querySelector('.fn-modal-heading')
    this.settlementCompanyModalScroll = document.querySelector('.fn-modal-scroll')
    this.modalOpenButton = document.querySelectorAll('.fn-components-settlement-company-modal-open')
    this.modalCloseButton = document.querySelector('.fn-components-settlement-company-modal-close')
  }

  public openModal(): void {
    Array.from(this.modalOpenButton, (selector): void => {
      selector.addEventListener('click', (event): void => {
        const wrapperHeight = this.settlementCompanyModalWrapper!.clientHeight
        const headerHeight = this.settlementCompanyModalHeading!.clientHeight
        this.settlementCompanyModalScroll!.style.height = `${wrapperHeight - headerHeight}px`
        this.settlementCompanyModal!.classList.add('is-active')
        document.body.style.overflow = 'hidden'
        event.preventDefault()
      })
    })
  }

  public closeModal(): void {
    if (this.modalCloseButton) {
      this.modalCloseButton.addEventListener('click', (): void => {
        this.settlementCompanyModal!.classList.remove('is-active')
        document.body.removeAttribute('style')
      })
    }
  }
}
