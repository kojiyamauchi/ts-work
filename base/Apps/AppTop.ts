/*

 AppTop.ts

*/

// Import Modules.
import SlideShow from '@/base/Modules/SlideShow'
import AnchorLink from '@/base/Modules/AnchorLink'

export default class AppConsumer {
  private selectors: {
    slideContainer: HTMLElement | null
    toApp: HTMLElement | null
    anchorApp: HTMLElement | null
  }

  private slideShow: SlideShow
  private anchorToApp: AnchorLink

  public constructor() {
    this.selectors = {
      slideContainer: document.querySelector('.fn-slide-container'),
      toApp: document.querySelector('.fn-to-app'),
      anchorApp: document.querySelector('.fn-anchor-app')
    }
    this.slideShow = new SlideShow(this.selectors.slideContainer!)
    this.anchorToApp = new AnchorLink(this.selectors.toApp, this.selectors.anchorApp)
  }

  public init(): void {
    this.slideShow.core()
    this.slideShow.optionsFirst()
    this.anchorToApp.core()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
