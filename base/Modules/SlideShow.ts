/*

 SlideShow.ts

*/

import Swiper from 'swiper/dist/js/swiper.min.js'

export default class SlideShow {
  private slideContainer: HTMLElement | null
  private indexDictionary: { [key: number]: string }

  public constructor(slideContainer: HTMLElement) {
    this.slideContainer = slideContainer
    this.indexDictionary = {
      0: 'zero',
      1: 'first',
      2: 'second',
      3: 'third',
      4: 'fourth',
      5: 'fifth'
    }
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

  public optionAddIndex(): void {
    this.slideContainer!.classList.add(`is-slide-index-${this.indexDictionary[0]}`)
    setTimeout((): void => {
      const mySwiper = this.slideContainer!.swiper
      mySwiper.on('slideChange', (): void => {
        Array.from(document.querySelectorAll('.swiper-pagination-bullet'), (_info, index): void => {
          this.slideContainer!.classList.remove(`is-slide-index-${this.indexDictionary[index]}`)
        })
        this.slideContainer!.classList.add(`is-slide-index-${this.indexDictionary[mySwiper.realIndex]}`)
      })
    }, 2500)
  }
}
