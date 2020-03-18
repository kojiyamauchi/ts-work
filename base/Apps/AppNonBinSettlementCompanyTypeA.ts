/*

 AppNonBinSettlementCompanyTypeA.ts

*/

// Import Modules.
import RenderNonBinSettlementCompanyTypeA from '@/base/Modules/RenderNonBinSettlementCompanyTypeA'

export default class AppNonBinSettlementCompanyTypeA {
  private readonly renderNonBinSettlementCompanyTypeA: RenderNonBinSettlementCompanyTypeA

  public constructor() {
    this.renderNonBinSettlementCompanyTypeA = new RenderNonBinSettlementCompanyTypeA()
  }

  public init(): void {
    this.renderNonBinSettlementCompanyTypeA.core()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {
    this.renderNonBinSettlementCompanyTypeA.infiniteScrollRender()
  }
}
