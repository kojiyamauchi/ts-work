/*

 AppSettlementCompany.ts

*/

// Import Modules.
import SettlementCompanyModal from '@/base/Modules/SettlementCompanyModal'

export default class AppSettlementCompany {
  private settlementCompanyModal: SettlementCompanyModal

  private constructor() {
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
