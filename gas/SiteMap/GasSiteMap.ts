global.createDataBase = (): string => {
  const sheet = SpreadsheetApp.getActiveSheet()
  const startRow = 1
  const startColumn = 1
  const rowLength = sheet.getLastRow()
  const columnLength = sheet.getLastColumn()
  const data = sheet.getSheetValues(startRow + 1, startColumn, rowLength - 1, columnLength)

  const dataBase = data.map((info, index): { [key: string]: number | string } => {
    const obj: { [key: string]: number | string } = {
      ID: index + 1,
      category: info[0],
      endPoint: info[1],
      pageName: info[2]
    }
    return obj
  })

  return JSON.stringify(dataBase, null, 2)
}

global.generateJson = (data: string): void => {
  const contentType = 'application/json'
  const fileName = 'siteMap.json'
  const blob = Utilities.newBlob('', contentType, fileName)
  const file = blob.setDataFromString(data, 'UTF-8')
  const folder = DriveApp.getFolderById('***')
  if (folder.getFilesByName(fileName).hasNext()) folder.removeFile(folder.getFilesByName(fileName).next())
  folder.createFile(file)
}

global.onGenerate = (): void => {
  const data = global.createDataBase()
  global.generateJson(data)
}

global.onOpen = (): void => {
  SpreadsheetApp.getUi()
    .createMenu('Generate Data')
    .addItem('Generate JSON', 'onGenerate')
    .addToUi()
}
