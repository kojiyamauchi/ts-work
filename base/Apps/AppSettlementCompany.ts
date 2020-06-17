/*

 AppSettlementCompany.ts

*/

// Import Modules.
import SettlementCompanyModal from '@/Modules/SettlementCompanyModal'

export default class AppSettlementCompany {
  private readonly settlementCompanyModal: SettlementCompanyModal

  public constructor() {
    this.settlementCompanyModal = new SettlementCompanyModal()
  }

  public init(): void {
    this.settlementCompanyModal.openModal()
    this.settlementCompanyModal.closeModal()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
