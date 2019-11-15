/*

 AppProviders.ts

*/

// Import Modules.
import SlideShow from '@/base/Modules/SlideShow'

export default class AppConsumer {
  private selectors: {
    slideContainer: HTMLElement | null
  }

  private slideShow: SlideShow

  public constructor() {
    this.selectors = {
      slideContainer: document.querySelector('.fn-slide-container')
    }
    this.slideShow = new SlideShow(this.selectors.slideContainer!)
  }

  public init(): void {
    this.slideShow.core()
    this.slideShow.optionsFirst()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
