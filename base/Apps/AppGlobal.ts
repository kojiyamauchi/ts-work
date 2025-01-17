/*

 AppGlobal.ts

*/

// Import Modules.
import ViewPort from '@/Modules/ViewPort'
import GlobalNavigation from '@/Modules/GlobalNavigation'
import JumpTop from '@/Modules/JumpTop'

export default class AppGlobal {
  private readonly viewPort: ViewPort
  private readonly globalNavigation: GlobalNavigation
  private readonly jumpTop: JumpTop

  public constructor() {
    this.viewPort = new ViewPort()
    this.globalNavigation = new GlobalNavigation()
    this.jumpTop = new JumpTop()
  }

  public init(): void {
    this.viewPort.onTablet()
    this.globalNavigation.initMenu()
    this.globalNavigation.showMenu()
    this.globalNavigation.showSubMenu()
    this.jumpTop.toTop()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {
    this.globalNavigation.initMenu()
  }

  public scroll(): void {
    this.jumpTop.showBtn()
  }
}
