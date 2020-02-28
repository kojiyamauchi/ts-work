/*

 ModalSwiper.ts

*/

import Swiper from 'swiper/dist/js/swiper.min.js'

export default class ModalSwiper {
  private modalSwiperContainer: HTMLElement | null
  private openButton: NodeListOf<HTMLElement>
  private closeButton: HTMLElement | null
  private modalWrapper: HTMLElement | null
  private modalComponent: HTMLElement | null
  private modalPaginationContainer: HTMLElement | null
  private layer: HTMLElement | null
  private cssTransitionDuration: number

  public constructor(
    modalSwiperContainer: HTMLElement | null,
    openButton: NodeListOf<HTMLElement>,
    closeButton: HTMLElement | null,
    modalWrapper: HTMLElement | null,
    modalComponent: HTMLElement | null,
    modalPaginationContainer: HTMLElement | null,
    layer: HTMLElement | null
  ) {
    this.modalSwiperContainer = modalSwiperContainer
    this.openButton = openButton
    this.closeButton = closeButton
    this.modalWrapper = modalWrapper
    this.modalComponent = modalComponent
    this.modalPaginationContainer = modalPaginationContainer
    this.layer = layer
    this.cssTransitionDuration = 250
  }

  public core(): void {
    // @ts-ignore TS6133: 'mySwiper' is declared but its value is never read.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mySwiper = new Swiper(this.modalSwiperContainer, {
      loop: true,
      navigation: {
        nextEl: '.fn-modal-swiper-container-button-next',
        prevEl: '.fn-modal-swiper-container-button-prev'
      },
      pagination: {
        el: this.modalPaginationContainer,
        type: 'fraction',
        clickable: true
      }
    })
  }

  public set(): void {
    if (this.modalWrapper) this.modalWrapper.classList.add('is-set')
  }

  public open(): void {
    if (this.openButton.length > 0) {
      Array.from(this.openButton, (selector): void => {
        selector.addEventListener('click', (event): void => {
          if (event.currentTarget instanceof HTMLElement) {
            this.modalSwiperContainer!.swiper.slideTo(event.currentTarget.dataset.slideIndex, 0, false)
            this.modalWrapper!.classList.add('is-active')
            this.modalComponent!.classList.add('is-active')
            this.closeButton!.classList.add('is-active')
          }
        })
      })
    }
  }

  public close(): void {
    const closeCore = (): void => {
      this.modalWrapper!.classList.remove('is-active')
      this.modalComponent!.classList.remove('is-active')
      this.closeButton!.classList.remove('is-active')
      setTimeout((): void => this.modalSwiperContainer!.swiper.slideTo(1, 0, false), this.cssTransitionDuration)
    }
    if (this.closeButton) this.closeButton.addEventListener('click', (): void => closeCore())
    if (this.layer) this.layer.addEventListener('click', (): void => closeCore())
    if (this.modalPaginationContainer) this.modalPaginationContainer.addEventListener('click', (): void => closeCore())
  }
}
