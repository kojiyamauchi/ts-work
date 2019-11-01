/*

 GlobalNavigation.ts

*/

export default class GlobalNavigation {
  private documentHeight: number | null
  private subMenuHeight: number
  private breakPoint: number
  private isMobile: boolean
  private componentHeader: HTMLElement | null
  private menuBtn: HTMLElement | null
  private menuLetter: HTMLElement | null
  private GN: HTMLElement | null
  private subMenuBtn: NodeListOf<HTMLElement>
  private subMenu: NodeListOf<HTMLElement>
  private navLayer: HTMLElement | null

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

  public checkMobile(): void {
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
      const element = event.currentTarget as HTMLElement
      this.documentHeight = document.body.clientHeight
      if (this.isMobile) {
        element.classList.toggle('is-active')
        this.GN!.classList.toggle('is-active')
        this.navLayer!.classList.toggle('is-active')
        if (element.classList.contains('is-active')) {
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
        const element = event.currentTarget as HTMLElement
        const nextElement = element.nextElementSibling as HTMLElement
        if (this.isMobile && !!element.nextElementSibling && !this.componentHeader!.classList.contains('pre-header')) {
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
