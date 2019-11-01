/*

 AppFranchise.ts

*/

// Import Modules.
import AnchorLink from '@/base/Modules/AnchorLink'
import SlideShow from '@/base/Modules/SlideShow'

export default class AppFranchise {
  private selectors: {
    slideContainer: HTMLElement | null
    buttonToRegistrationStep: HTMLElement | null
    anchorRegistrationStep: HTMLElement | null
    buttonToContact: HTMLElement | null
    anchorContact: HTMLElement | null
  }

  private anchorToRegistrationStep: AnchorLink
  private anchorToContact: AnchorLink
  private slideShow: SlideShow

  private constructor() {
    this.selectors = {
      slideContainer: document.querySelector('.fn-slide-container'),
      buttonToRegistrationStep: document.querySelector('.fn-button-to-registration-step'),
      anchorRegistrationStep: document.querySelector('.fn-anchor-registration-step'),
      buttonToContact: document.querySelector('.fn-button-to-contact'),
      anchorContact: document.querySelector('.fn-anchor-contact')
    }
    this.anchorToRegistrationStep = new AnchorLink(this.selectors.buttonToRegistrationStep, this.selectors.anchorRegistrationStep)
    this.anchorToContact = new AnchorLink(this.selectors.buttonToContact, this.selectors.anchorContact)
    this.slideShow = new SlideShow(this.selectors.slideContainer!)
  }

  public init(): void {
    this.anchorToRegistrationStep.core()
    this.anchorToContact.core()
    this.slideShow.core()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
