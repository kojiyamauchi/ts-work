/*

 AppFranchise.ts

*/

// Import Modules.
import AnchorLink from '@/base/Modules/AnchorLink'
import SlideShow from '@/base/Modules/SlideShow'

export default class AppFranchise {
  private selectors: {
    slideContainer: HTMLElement | null
    buttonToSchedule: NodeListOf<HTMLElement>
    anchorSchedule: HTMLElement | null
    buttonToStepsJoin: NodeListOf<HTMLElement>
    anchorStepsJoin: HTMLElement | null
    buttonToContact: NodeListOf<HTMLElement>
    anchorContact: HTMLElement | null
  }

  private anchorToSchedule: AnchorLink
  private anchorToStepsJoin: AnchorLink
  private anchorToContact: AnchorLink
  private slideShow: SlideShow

  public constructor() {
    this.selectors = {
      slideContainer: document.querySelector('.fn-slide-container'),
      buttonToSchedule: document.querySelectorAll('.fn-button-to-schedule'),
      anchorSchedule: document.querySelector('.fn-anchor-schedule'),
      buttonToStepsJoin: document.querySelectorAll('.fn-button-to-steps-join'),
      anchorStepsJoin: document.querySelector('.fn-anchor-steps-join'),
      buttonToContact: document.querySelectorAll('.fn-button-to-contact'),
      anchorContact: document.querySelector('.fn-anchor-contact')
    }
    this.anchorToSchedule = new AnchorLink(this.selectors.buttonToSchedule, this.selectors.anchorSchedule)
    this.anchorToStepsJoin = new AnchorLink(this.selectors.buttonToStepsJoin, this.selectors.anchorStepsJoin)
    this.anchorToContact = new AnchorLink(this.selectors.buttonToContact, this.selectors.anchorContact)
    this.slideShow = new SlideShow(this.selectors.slideContainer!)
  }

  public init(): void {
    this.anchorToSchedule.core()
    this.anchorToStepsJoin.core()
    this.anchorToContact.core()
    this.slideShow.core()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
