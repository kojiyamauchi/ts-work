/*

 ViewPort.ts

*/

export default class ViewPort {
  private readonly UA: string

  public constructor() {
    this.UA = navigator.userAgent
  }

  public onTablet(): void {
    if ((!this.UA.includes('iPhone') && !this.UA.includes('Android') && 'ontouchend' in document) || this.UA.includes('iPad') || this.UA.includes('Kindle')) {
      document.querySelector('meta[name="viewport"]')!.setAttribute('content', 'width=960')
    }
  }
}
