/*

 AppHoldingInformation.ts

*/

// Import Modules.
import HoldingInformation from '@/Modules/HoldingInformation'

export default class AppHoldingInformation {
  private readonly holdingInformation: HoldingInformation

  public constructor() {
    this.holdingInformation = new HoldingInformation()
  }

  public init(): void {
    this.holdingInformation.core()
  }

  public domContentLoaded(): void {}

  public load(): void {}

  public resize(): void {}

  public scroll(): void {}
}
