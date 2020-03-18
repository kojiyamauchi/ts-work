/*

 AppSettlementCompanyTypeBDetail.ts

*/

// Import Modules.
import RenderSettlementCompanyTypeBDetail from '@/base/Modules/RenderSettlementCompanyTypeBDetail'

export default class AppSettlementCompanyTypeBDetail {
  private readonly renderSettlementCompanyTypeBDetail: RenderSettlementCompanyTypeBDetail

  public constructor() {
    this.renderSettlementCompanyTypeBDetail = new RenderSettlementCompanyTypeBDetail()
  }

  public init(): void {
    this.renderSettlementCompanyTypeBDetail.core()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {
    this.renderSettlementCompanyTypeBDetail.resizeInit()
  }

  public scroll(): void {}
}
