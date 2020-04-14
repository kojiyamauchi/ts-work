/*

 JumpTop.ts

*/

// Import Package Modules.
import jump from 'jump.js'

export default class JumpTop {
  private readonly jumpTopComponent: HTMLElement | null
  private readonly jumpTopBtn: HTMLElement | null
  private readonly scrollTop: HTMLAnchorElement | null
  private windowHeight: number
  private currentScrollY: number

  public constructor() {
    this.windowHeight = window.innerHeight
    this.currentScrollY = window.pageYOffset
    this.jumpTopComponent = document.querySelector('.fn-component-jump-top')
    this.jumpTopBtn = document.querySelector('.fn-btn-jump-top')
    this.scrollTop = document.querySelector('.fn-scroll-top')
    this.checkScroll()
  }

  private checkScroll(): void {
    window.addEventListener('scroll', (): void => {
      this.windowHeight = window.innerHeight
      this.currentScrollY = window.pageYOffset
    })
  }

  public showBtn(): void {
    this.windowHeight < this.currentScrollY ? this.jumpTopComponent!.classList.add('is-active') : this.jumpTopComponent!.classList.remove('is-active')
  }

  public toTop(): void {
    this.jumpTopBtn!.addEventListener('click', (event): void => {
      jump(this.scrollTop!)
      event.preventDefault()
    })
  }
}
