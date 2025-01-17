/*

 SlideShow.ts

*/

import Swiper from 'swiper/dist/js/swiper.min.js'

export default class SlideShow {
  private readonly playingSwiper: boolean
  private readonly slideContainer: HTMLElement | null
  private readonly indexArr: string[]

  public constructor(slideContainer: HTMLElement) {
    this.playingSwiper = true
    this.slideContainer = slideContainer
    this.indexArr = ['zero', 'first', 'second', 'third', 'fourth', 'fifth']
  }

  public core(): void {
    setTimeout((): void => {
      // @ts-ignore TS6133: 'mySwiper' is declared but its value is never read.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const mySwiper = new Swiper(this.slideContainer, {
        autoplay: this.playingSwiper ? { delay: 5000, disableOnInteraction: false } : false,
        loop: true,
        pagination: { el: '.fn-slide-container-pagination', type: 'bullets', clickable: true }
      })
    }, 2500)
  }

  public optionAddIndex(): void {
    this.slideContainer!.classList.add(`is-slide-index-${this.indexArr[0]}`)
    setTimeout((): void => {
      const mySwiper = this.slideContainer!.swiper
      mySwiper.on('slideChange', (): void => {
        Array.from(document.querySelectorAll('.swiper-pagination-bullet'), (_info, index): void => {
          this.slideContainer!.classList.remove(`is-slide-index-${this.indexArr[index]}`)
        })
        this.slideContainer!.classList.add(`is-slide-index-${this.indexArr[mySwiper.realIndex]}`)
      })
    }, 2500)
  }
}
