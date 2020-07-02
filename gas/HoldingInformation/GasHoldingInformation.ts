global.createDataBase = (): string => {
  const sheet = SpreadsheetApp.getActiveSheet()
  const startRow = 1
  const startColumn = 1
  const rowLength = sheet.getLastRow()
  const columnLength = sheet.getLastColumn()
  const data = sheet.getSheetValues(startRow + 1, startColumn, rowLength - 1, columnLength)

  const dataBase = data.map(
    (info, index): HoldingInformationMember => {
      const obj: HoldingInformationMember = {
        ID: index + 1,
        newspaperEvent: info[6] === '',
        checkDate:
          info[1].substring(0, info[1].indexOf('年')) +
          '/' +
          info[1].substring(info[1].indexOf('年') + 1, info[1].indexOf('月')) +
          '/' +
          info[1].substring(info[1].indexOf('月') + 1, info[1].indexOf('日')) +
          ' ' +
          info[1].substring(info[1].indexOf('～') + 1, info[1].lastIndexOf('時')) +
          ':00',
        都道府県: info[0],
        開催日: info[1],
        会場名: info[2],
        会場住所: info[3],
        主催等: info[4],
        問い合わせ先: info[5],
        タグ: info[6]
      }
      return obj
    }
  )

  dataBase.sort((a: HoldingInformationMember, b: HoldingInformationMember): number => {
    if (a.checkDate > b.checkDate) return 1
    if (a.checkDate < b.checkDate) return -1
    if (a.newspaperEvent < b.newspaperEvent) return 1
    if (a.newspaperEvent > b.newspaperEvent) return -1
    return 0
  })

  return JSON.stringify(dataBase, null, 2)
}

global.generateJson = (data: string): void => {
  const contentType = 'application/json'
  const fileName = 'holdingInformation.json'
  const blob = Utilities.newBlob('', contentType, fileName)
  const file = blob.setDataFromString(data, 'UTF-8')
  const folder = DriveApp.getFolderById('***')
  if (folder.getFilesByName(fileName).hasNext()) folder.removeFile(folder.getFilesByName(fileName).next())
  folder.createFile(file)
}

global.deleteImportDatabase = (): void => {
  const rootFolder = DriveApp.getRootFolder()
  if (rootFolder.getFilesByType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').hasNext()) {
    rootFolder.removeFile(rootFolder.getFilesByType('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').next())
  } else {
    Browser.msgBox('Import Database File Does Not Exist.\\nPlease Close This Window.')
  }
}

global.onGenerate = (): void => {
  const data = global.createDataBase()
  global.generateJson(data)
  global.deleteImportDatabase()
}

global.onOpen = (): void => {
  SpreadsheetApp.getUi()
    .createMenu('Generate Data')
    .addItem('Generate JSON', 'onGenerate')
    .addToUi()
}
