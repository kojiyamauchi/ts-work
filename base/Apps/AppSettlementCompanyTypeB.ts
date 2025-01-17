/*

 AppSettlementCompanyTypeB.ts

*/

// Import Modules.
import RenderSettlementCompanyTypeB from '@/Modules/RenderSettlementCompanyTypeB'

export default class AppSettlementCompanyTypeB {
  private readonly renderSettlementCompanyTypeB: RenderSettlementCompanyTypeB

  public constructor() {
    this.renderSettlementCompanyTypeB = new RenderSettlementCompanyTypeB()
  }

  public init(): void {
    this.renderSettlementCompanyTypeB.core()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {
    this.renderSettlementCompanyTypeB.infiniteScrollRender()
  }
}
