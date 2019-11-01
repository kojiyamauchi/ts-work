/*

 AppGlobal.ts

*/

// Import Modules.
import ViewPort from '@/base/Modules/ViewPort'
import GlobalNavigation from '@/base/Modules/GlobalNavigation'
import JumpTop from '@/base/Modules/JumpTop'

export default class AppGlobal {
  private viewPort: ViewPort
  private globalNavigation: GlobalNavigation
  private jumpTop: JumpTop

  private constructor() {
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
