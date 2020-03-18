/*

 AnchorLink.ts

*/

// Import Package Modules.
import jump from 'jump.js'

export default class AnchorLink {
  private readonly anchorButton: NodeListOf<HTMLElement> | null
  private readonly anchorSelector: HTMLElement | null

  public constructor(anchorButton: NodeListOf<HTMLElement> | null, anchorSelector: HTMLElement | null) {
    this.anchorButton = anchorButton
    this.anchorSelector = anchorSelector
  }

  public core(): void {
    if (this.anchorButton!.length > 0) {
      Array.from(this.anchorButton!, (selector): void => {
        selector.addEventListener('click', (event): void => {
          jump(this.anchorSelector!, { offset: -150 })
          event.preventDefault()
        })
      })
    }
  }

  /*
    When Apply Anchor Link on Swiper Component, It's Use Function Below.
    Swiper Function's Using 2500ms setTimeout() Function, for Sever-Side Reasons.
    For That, Since DOM Can't Be Acquired When Creating Constructor, It's Acquired in Arg.
  */
  public forSwiper(nodeList: NodeList): void {
    if (nodeList.length > 0) {
      Array.from(nodeList, (selector): void => {
        selector.addEventListener('click', (event): void => {
          jump(this.anchorSelector!, { offset: -150 })
          event.preventDefault()
        })
      })
    }
  }
}
