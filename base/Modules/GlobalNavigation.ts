/*

 GlobalNavigation.ts

*/

export default class GlobalNavigation {
  private readonly subMenuHeight: number
  private readonly breakPoint: number
  private readonly componentHeader: HTMLElement | null
  private readonly menuBtn: HTMLElement | null
  private readonly menuLetter: HTMLElement | null
  private readonly GN: HTMLElement | null
  private readonly subMenuBtn: NodeListOf<HTMLElement>
  private readonly subMenu: NodeListOf<HTMLElement>
  private readonly navLayer: HTMLElement | null
  private documentHeight: number | null
  private isMobile: boolean

  public constructor() {
    this.documentHeight = null
    this.subMenuHeight = 57
    this.breakPoint = 768
    this.isMobile = window.innerWidth < this.breakPoint
    this.componentHeader = document.querySelector('.fn-components-header')
    this.menuBtn = document.querySelector('.fn-button-drawer')
    this.menuLetter = document.querySelector('.fn-button-letter')
    this.GN = document.querySelector('.fn-global-navigation')
    this.subMenuBtn = document.querySelectorAll('.fn-navi-heading')
    this.subMenu = document.querySelectorAll('.fn-navi-detail')
    this.navLayer = document.querySelector('.fn-nav-layer')
    this.checkMobile()
  }

  private checkMobile(): void {
    window.addEventListener('resize', (): void => {
      this.isMobile = window.innerWidth < this.breakPoint
    })
  }

  public initMenu(): void {
    if (!this.isMobile) {
      this.menuBtn!.classList.remove('is-active')
      this.GN!.classList.remove('is-active')
      this.navLayer!.classList.remove('is-active')
      this.menuLetter!.textContent = 'menu'
      Array.from(this.subMenuBtn, (selector): void => selector.classList.remove('is-active'))
      Array.from(this.subMenu, (selector): void => {
        selector.classList.remove('is-active')
        selector.removeAttribute('style')
      })
    }
  }

  public showMenu(): void {
    this.menuBtn!.addEventListener('click', (event: MouseEvent): void => {
      this.documentHeight = document.body.clientHeight
      if (this.isMobile && event.currentTarget instanceof HTMLElement) {
        event.currentTarget.classList.toggle('is-active')
        this.GN!.classList.toggle('is-active')
        this.navLayer!.classList.toggle('is-active')
        if (event.currentTarget.classList.contains('is-active')) {
          this.navLayer!.style.height = `${this.documentHeight}px`
          this.menuLetter!.textContent = 'close'
        } else {
          this.navLayer!.removeAttribute('style')
          this.menuLetter!.textContent = 'menu'
        }
      }
    })
  }

  public showSubMenu(): void {
    Array.from(this.subMenuBtn, (selector): void => {
      selector.addEventListener('click', (event: MouseEvent): void => {
        const element = event.currentTarget instanceof HTMLElement ? event.currentTarget : null
        const nextElement =
          event.currentTarget instanceof HTMLElement && event.currentTarget.nextElementSibling instanceof HTMLElement
            ? event.currentTarget.nextElementSibling
            : null
        if (this.isMobile && element && nextElement && !this.componentHeader!.classList.contains('pre-header')) {
          element.classList.toggle('is-active')
          nextElement.classList.toggle('is-active')
          nextElement.classList.contains('is-active')
            ? (nextElement.style.height = `${nextElement.children.length * this.subMenuHeight}px`)
            : nextElement.removeAttribute('style')
        }
      })
    })
  }
}
