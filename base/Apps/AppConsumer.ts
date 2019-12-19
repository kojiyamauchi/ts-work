/*

 AppConsumer.ts

*/

// Import Modules.
import SlideShow from '@/base/Modules/SlideShow'
import ModalSwiper from '@/base/Modules/ModalSwiper'
import AnchorLink from '@/base/Modules/AnchorLink'

export default class AppConsumer {
  private selectors: {
    slideContainer: HTMLElement | null
    modalSwiperContainer: HTMLElement | null
    modalOpenButton: NodeListOf<HTMLElement>
    modalCloseButton: HTMLElement | null
    modalWrapper: HTMLElement | null
    modalComponent: HTMLElement | null
    toApp: NodeListOf<HTMLElement>
    anchorApp: HTMLElement | null
  }

  private slideShow: SlideShow
  private modalSwiper: ModalSwiper
  private anchorToApp: AnchorLink

  public constructor() {
    this.selectors = {
      slideContainer: document.querySelector('.fn-slide-container'),
      modalSwiperContainer: document.querySelector('.fn-modal-swiper-container'),
      modalOpenButton: document.querySelectorAll('.fn-modal-open'),
      modalCloseButton: document.querySelector('.fn-modal-close'),
      modalWrapper: document.querySelector('.fn-components-modal-swiper'),
      modalComponent: document.querySelector('.fn-modal-swiper'),
      toApp: document.querySelectorAll('.fn-to-app'),
      anchorApp: document.querySelector('.fn-anchor-app')
    }
    this.slideShow = new SlideShow(this.selectors.slideContainer!)
    this.modalSwiper = new ModalSwiper(
      this.selectors.modalSwiperContainer,
      this.selectors.modalOpenButton,
      this.selectors.modalCloseButton,
      this.selectors.modalWrapper,
      this.selectors.modalComponent
    )
    this.anchorToApp = new AnchorLink(this.selectors.toApp, this.selectors.anchorApp)
  }

  public init(): void {
    this.slideShow.core()
    this.modalSwiper.core()
    this.modalSwiper.set()
    this.modalSwiper.open()
    this.modalSwiper.close()
    this.anchorToApp.core()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
