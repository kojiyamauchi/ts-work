/*

 Utilities.ts

*/

export default class Utilities {
  private readonly nodeList: NodeList

  public constructor(nodeList: NodeList) {
    this.nodeList = nodeList
  }

  public browserReload(): void {
    Array.from(this.nodeList, (selector): void => {
      selector.addEventListener('click', (): void => {
        location.reload()
      })
    })
  }
}
