/*

 AnchorLink.ts

*/

// Import Package Modules.
import jump from 'jump.js'

export default class AnchorLink {
  private anchorButton: HTMLElement | null
  private anchorSelector: HTMLElement | null

  public constructor(anchorButton: HTMLElement | null, anchorSelector: HTMLElement | null) {
    this.anchorButton = anchorButton
    this.anchorSelector = anchorSelector
  }

  public core(): void {
    if (this.anchorButton) {
      this.anchorButton.addEventListener('click', (event): void => {
        jump(this.anchorSelector!, { offset: -150 })
        event.preventDefault()
      })
    }
  }
}
