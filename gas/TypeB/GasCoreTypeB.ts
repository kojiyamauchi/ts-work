global.generateJson = (data: string): void => {
  const contentType = 'application/json'
  const fileName = 'typeB.json'
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

global.onOpen = (): void => {
  SpreadsheetApp.getUi()
    .createMenu('Generate Data')
    .addItem('Generate JSON / Present Database (Add Deposit Cycle) ', 'onPresentGenerate')
    .addItem('Generate JSON / Past Database', 'onPastGenerate')
    .addItem('Generate JSON / Shorten Column Database', 'onShortenColumnGenerate')
    .addItem('Delete Import Database', 'deleteImportDatabase')
    .addToUi()
}
