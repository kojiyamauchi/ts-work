/*

 AppFranchise.ts

*/

// Import Modules.
import AnchorLink from '@/Modules/AnchorLink'
import SlideShow from '@/Modules/SlideShow'

export default class AppFranchise {
  private selectors: {
    readonly slideContainer: HTMLElement | null
    readonly anchorSchedule: HTMLElement | null
    readonly buttonToStepsJoin: NodeListOf<HTMLElement>
    readonly anchorStepsJoin: HTMLElement | null
    readonly buttonToContact: NodeListOf<HTMLElement>
    readonly anchorContact: HTMLElement | null
  }

  private anchorToSchedule: AnchorLink
  private anchorToStepsJoin: AnchorLink
  private anchorToContact: AnchorLink
  private slideShow: SlideShow

  public constructor() {
    this.selectors = {
      slideContainer: document.querySelector('.fn-slide-container'),
      anchorSchedule: document.querySelector('.fn-anchor-schedule'),
      buttonToStepsJoin: document.querySelectorAll('.fn-button-to-steps-join'),
      anchorStepsJoin: document.querySelector('.fn-anchor-steps-join'),
      buttonToContact: document.querySelectorAll('.fn-button-to-contact'),
      anchorContact: document.querySelector('.fn-anchor-contact')
    }
    this.anchorToSchedule = new AnchorLink(null, this.selectors.anchorSchedule)
    this.anchorToStepsJoin = new AnchorLink(this.selectors.buttonToStepsJoin, this.selectors.anchorStepsJoin)
    this.anchorToContact = new AnchorLink(this.selectors.buttonToContact, this.selectors.anchorContact)
    this.slideShow = new SlideShow(this.selectors.slideContainer!)
  }

  public init(): void {
    /*
    Swiper Function's Using 2500ms setTimeout() Function, for Sever-Side Reasons.
    For That, Delay Activation of Function Below. (for Anchor Link to Swiper Component -> Schedule Component.)
    */
    setTimeout((): void => this.anchorToSchedule.forSwiper(document.querySelectorAll('.fn-button-to-schedule')), 2750)
    this.anchorToStepsJoin.core()
    this.anchorToContact.core()
    this.slideShow.core()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
