/*

 AppSiteMap.ts

*/

// Import Modules.
import SiteMap from '@/base/Modules/SiteMap'

export default class AppSiteMap {
  private siteMap: SiteMap

  public constructor() {
    this.siteMap = new SiteMap()
  }

  public init(): void {
    this.siteMap.core()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
