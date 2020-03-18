/*

 AppTop.ts

*/

// Import Modules.
import SlideShow from '@/base/Modules/SlideShow'
import AnchorLink from '@/base/Modules/AnchorLink'

export default class AppTop {
  private selectors: {
    readonly slideContainer: HTMLElement | null
    readonly toApp: NodeListOf<HTMLElement>
    readonly anchorApp: HTMLElement | null
  }

  private readonly slideShow: SlideShow
  private readonly anchorToApp: AnchorLink

  public constructor() {
    this.selectors = {
      slideContainer: document.querySelector('.fn-slide-container'),
      toApp: document.querySelectorAll('.fn-to-app'),
      anchorApp: document.querySelector('.fn-anchor-app')
    }
    this.slideShow = new SlideShow(this.selectors.slideContainer!)
    this.anchorToApp = new AnchorLink(this.selectors.toApp, this.selectors.anchorApp)
  }

  public init(): void {
    this.slideShow.core()
    this.slideShow.optionAddIndex()
    this.anchorToApp.core()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
