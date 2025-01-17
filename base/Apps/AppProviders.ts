/*

 AppProviders.ts

*/

// Import Modules.
import SlideShow from '@/Modules/SlideShow'

export default class AppProviders {
  private selectors: {
    readonly slideContainer: HTMLElement | null
  }

  private readonly slideShow: SlideShow

  public constructor() {
    this.selectors = {
      slideContainer: document.querySelector('.fn-slide-container')
    }
    this.slideShow = new SlideShow(this.selectors.slideContainer!)
  }

  public init(): void {
    this.slideShow.core()
    this.slideShow.optionAddIndex()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
