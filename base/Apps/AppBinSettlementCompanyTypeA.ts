/*

 AppBinSettlementCompanyTypeA.ts

*/

// Import Modules.
import RenderBinSettlementCompanyTypeA from '@/base/Modules/RenderBinSettlementCompanyTypeA'

export default class AppBinSettlementCompanyTypeA {
  private renderBinSettlementCompanyTypeA: RenderBinSettlementCompanyTypeA

  private constructor() {
    this.renderBinSettlementCompanyTypeA = new RenderBinSettlementCompanyTypeA()
  }

  public init(): void {
    this.renderBinSettlementCompanyTypeA.core()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
