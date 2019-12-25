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
  private cssTransitionDuration: number

  public constructor(
    modalSwiperContainer: HTMLElement | null,
    openButton: NodeListOf<HTMLElement>,
    closeButton: HTMLElement | null,
    modalWrapper: HTMLElement | null,
    modalComponent: HTMLElement | null
  ) {
    this.modalSwiperContainer = modalSwiperContainer
    this.openButton = openButton
    this.closeButton = closeButton
    this.modalWrapper = modalWrapper
    this.modalComponent = modalComponent
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
        el: '.fn-modal-swiper-container-pagination',
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
      const mySwiper = this.modalSwiperContainer!.swiper
      Array.from(this.openButton, (selector): void => {
        selector.addEventListener('click', (event): void => {
          if (event.currentTarget instanceof HTMLElement) {
            mySwiper.slideTo(event.currentTarget.dataset.slideIndex, 0, false)
            this.modalWrapper!.classList.add('is-active')
            this.modalComponent!.classList.add('is-active')
            this.closeButton!.classList.add('is-active')
          }
        })
      })
    }
  }

  public close(): void {
    if (this.closeButton) {
      const mySwiper = this.modalSwiperContainer!.swiper
      this.closeButton.addEventListener('click', (): void => {
        this.modalWrapper!.classList.remove('is-active')
        this.modalComponent!.classList.remove('is-active')
        this.closeButton!.classList.remove('is-active')
        setTimeout((): void => mySwiper.slideTo(1, 0, false), this.cssTransitionDuration)
      })
    }
  }
}
