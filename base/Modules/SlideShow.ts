/*

 SlideShow.ts

*/

import Swiper from 'swiper/dist/js/swiper.min.js'

export default class SlideShow {
  private slideContainer: HTMLElement | null

  public constructor(slideContainer: HTMLElement) {
    this.slideContainer = slideContainer
  }

  public core(): void {
    setTimeout((): void => {
      // @ts-ignore TS6133: 'mySwiper' is declared but its value is never read.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mySwiper = new Swiper(this.slideContainer, {
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.fn-slide-container-pagination',
          type: 'bullets',
          clickable: true
        }
      })
    }, 2500)
  }

  public optionsFirst(): void {
    setTimeout((): void => {
      const mySwiper = this.slideContainer!.swiper
      mySwiper.on('slideChange', (): void => {
        if (mySwiper) {
          return mySwiper.realIndex === 2
            ? this.slideContainer!.classList.add('is-slide-index-second')
            : this.slideContainer!.classList.remove('is-slide-index-second')
        }
      })
    }, 2500)
  }
}
