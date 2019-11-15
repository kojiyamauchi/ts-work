/*

 AppFranchiseSessionDetail.ts

*/

// Import Modules.
import Modal from '@/base/Modules/Modal'

export default class AppFranchiseSessionDetail {
  private selectors: {
    openButtonModalFirst: HTMLElement | null
    openButtonModalSecond: HTMLElement | null
    modalWrapper: HTMLElement | null
    modalFirst: HTMLElement | null
    modalSecond: HTMLElement | null
    modalLayer: HTMLElement | null
    closeButtonModalFirst: HTMLElement | null
    closeButtonModalSecond: HTMLElement | null
  }

  private modalFirst: Modal
  private modalSecond: Modal

  public constructor() {
    this.selectors = {
      openButtonModalFirst: document.querySelector('.fn-button-modal-first'),
      openButtonModalSecond: document.querySelector('.fn-button-modal-second'),
      modalWrapper: document.querySelector('.fn-components-more-information-modal'),
      modalFirst: document.querySelector('.fn-modal-first'),
      modalSecond: document.querySelector('.fn-modal-second'),
      modalLayer: document.querySelector('.fn-more-information-modal-layer'),
      closeButtonModalFirst: document.querySelector('.fn-close-modal-first'),
      closeButtonModalSecond: document.querySelector('.fn-close-modal-second')
    }
    this.modalFirst = new Modal(
      this.selectors.openButtonModalFirst,
      this.selectors.modalWrapper,
      this.selectors.modalFirst,
      this.selectors.modalLayer,
      this.selectors.closeButtonModalFirst
    )
    this.modalSecond = new Modal(
      this.selectors.openButtonModalSecond,
      this.selectors.modalWrapper,
      this.selectors.modalSecond,
      this.selectors.modalLayer,
      this.selectors.closeButtonModalSecond
    )
  }

  public init(): void {
    this.modalFirst.openModal()
    this.modalFirst.closeModal()
    this.modalSecond.openModal()
    this.modalSecond.closeModal()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
