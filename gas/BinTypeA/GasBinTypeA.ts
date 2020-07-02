global.createDataBase = (): string => {
  const sheet = SpreadsheetApp.getActiveSheet()
  const startRow = 1
  const startColumn = 1
  const rowLength = sheet.getLastRow()
  const columnLength = sheet.getLastColumn()
  const data = sheet.getSheetValues(startRow + 1, startColumn, rowLength - 1, columnLength)

  const dataBase = data.map(
    (info): BinTypeA => {
      const obj: BinTypeA = {
        dataID: info[1],
        ロゴ画像名: 'logo_dummy_type_a.png',
        決済事業者番号: info[2],
        決済事業者名称: info[3],
        キャッシュレスサービス名称: info[4].replace(/、/g, '・'),
        キャッシュレスサービス区分: info[5],
        ブランドサービス: info[6] !== '' ? info[6].split('、') : [],
        特設WebURL: info[7],
        検索サービス: info[8]
      }
      return obj
    }
  )

  return JSON.stringify(dataBase, null, 2)
}

global.generateJson = (data: string): void => {
  const contentType = 'application/json'
  const fileName = 'binTypeA.json'
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
