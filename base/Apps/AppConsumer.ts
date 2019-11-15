/*

 AppConsumer.ts

*/

// Import Modules.
import SlideShow from '@/base/Modules/SlideShow'
import AnchorLink from '@/base/Modules/AnchorLink'
import Utilities from '@/base/Modules/Utilities'

export default class AppConsumer {
  private selectors: {
    slideContainer: HTMLElement | null
    nodeList: NodeList
    toApp: HTMLElement | null
    anchorApp: HTMLElement | null
  }

  private slideShow: SlideShow
  private anchorToApp: AnchorLink
  private Utilities: Utilities

  public constructor() {
    this.selectors = {
      slideContainer: document.querySelector('.fn-slide-container'),
      nodeList: document.querySelectorAll('.fn-slide1'),
      toApp: document.querySelector('.fn-to-app'),
      anchorApp: document.querySelector('.fn-anchor-app')
    }
    this.slideShow = new SlideShow(this.selectors.slideContainer!)
    this.anchorToApp = new AnchorLink(this.selectors.toApp, this.selectors.anchorApp)
    this.Utilities = new Utilities(this.selectors.nodeList)
  }

  public init(): void {
    this.slideShow.core()
    this.anchorToApp.core()
    this.Utilities.browserReload()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
