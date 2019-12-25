/*

 Modal.ts

*/

export default class Modal {
  private openButtonModal: HTMLElement | null
  private modalWrapper: HTMLElement | null
  private modalComponent: HTMLElement | null
  private modalLayer: HTMLElement | null
  private closeButtonModal: HTMLElement | null

  public constructor(
    openButtonModal: HTMLElement | null,
    modalWrapper: HTMLElement | null,
    modalComponent: HTMLElement | null,
    modalLayer: HTMLElement | null,
    closeButtonModal: HTMLElement | null
  ) {
    this.openButtonModal = openButtonModal
    this.modalWrapper = modalWrapper
    this.modalComponent = modalComponent
    this.modalLayer = modalLayer
    this.closeButtonModal = closeButtonModal
  }

  public openModal(): void {
    if (this.openButtonModal) {
      this.openButtonModal.addEventListener('click', (event): void => {
        this.modalWrapper!.classList.add('is-active')
        this.modalComponent!.classList.add('is-active')
        this.modalLayer!.classList.add('is-active')
        event.preventDefault()
      })
    }
  }

  public closeModal(): void {
    if (this.closeButtonModal) {
      this.closeButtonModal.addEventListener('click', (): void => {
        this.modalComponent!.classList.remove('is-active')
        this.modalLayer!.classList.remove('is-active')
        this.modalWrapper!.classList.remove('is-active')
      })
    }
    if (this.modalLayer) {
      this.modalLayer.addEventListener('click', (event): void => {
        if (event.currentTarget instanceof HTMLElement) {
          this.modalComponent!.classList.remove('is-active')
          event.currentTarget.classList.remove('is-active')
          this.modalWrapper!.classList.remove('is-active')
        }
      })
    }
  }
}
