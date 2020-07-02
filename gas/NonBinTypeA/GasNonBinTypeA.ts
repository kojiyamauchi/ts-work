global.createDataBase = (): string => {
  const sheet = SpreadsheetApp.getActiveSheet()
  const startRow = 1
  const startColumn = 1
  const rowLength = sheet.getLastRow()
  const columnLength = sheet.getLastColumn()
  const data = sheet.getSheetValues(startRow + 1, startColumn, rowLength - 1, columnLength)

  const dataBase = data.map(
    (info): NonBinTypeA => {
      const obj: NonBinTypeA = {
        dataID: info[1],
        ロゴ画像名: 'logo_dummy_type_a.png',
        決済事業者番号: typeof info[2] === 'number' && info[2] === 0 ? '' : info[2],
        決済事業者名称: typeof info[3] === 'number' && info[3] === 0 ? '' : info[3],
        キャッシュレスサービス名称: typeof info[4] === 'number' && info[4] === 0 ? '' : info[4],
        キャッシュレスサービス区分: typeof info[5] === 'number' && info[5] === 0 ? '' : info[5],
        キャッシュレスサービス区分その他: typeof info[6] === 'number' && info[6] === 0 ? '' : info[6],
        ハウスカードの確認: false,
        ブランドサービス: typeof info[7] === 'number' && info[7] === 0 ? '' : info[7],
        特設WebURL: typeof info[8] === 'number' && info[8] === 0 ? '' : info[8],
        検索サービス: typeof info[9] === 'number' && info[9] === 0 ? '' : info[9],
        消費者向け問合せ窓口1名称: typeof info[10] === 'number' && info[10] === 0 ? '' : info[10],
        消費者向け問合せ窓口1受付時間: typeof info[11] === 'number' && info[11] === 0 ? '' : info[11],
        消費者向け問合せ窓口1電話番号: typeof info[12] === 'number' && info[12] === 0 ? '' : info[12],
        消費者向け問合せ窓口1受付時間の補足等: typeof info[13] === 'number' && info[13] === 0 ? '' : info[13],
        消費者向け問合せ窓口2名称: typeof info[14] === 'number' && info[14] === 0 ? '' : info[14],
        消費者向け問合せ窓口2受付時間: typeof info[15] === 'number' && info[15] === 0 ? '' : info[15],
        消費者向け問合せ窓口2電話番号: typeof info[16] === 'number' && info[16] === 0 ? '' : info[16],
        消費者向け問合せ窓口2受付時間の補足等: typeof info[17] === 'number' && info[17] === 0 ? '' : info[17],
        消費者向け問合せ窓口3名称: typeof info[18] === 'number' && info[18] === 0 ? '' : info[18],
        消費者向け問合せ窓口3受付時間: typeof info[19] === 'number' && info[19] === 0 ? '' : info[19],
        消費者向け問合せ窓口3電話番号: typeof info[20] === 'number' && info[20] === 0 ? '' : info[20],
        消費者向け問合せ窓口3受付時間の補足等: typeof info[21] === 'number' && info[21] === 0 ? '' : info[21],
        消費者向け問合せ窓口4名称: typeof info[22] === 'number' && info[22] === 0 ? '' : info[22],
        消費者向け問合せ窓口4受付時間: typeof info[23] === 'number' && info[23] === 0 ? '' : info[23],
        消費者向け問合せ窓口4電話番号: typeof info[24] === 'number' && info[24] === 0 ? '' : info[24],
        消費者向け問合せ窓口4受付時間の補足等: typeof info[25] === 'number' && info[25] === 0 ? '' : info[25],
        消費者向け問合せ窓口5名称: typeof info[26] === 'number' && info[26] === 0 ? '' : info[26],
        消費者向け問合せ窓口5受付時間: typeof info[27] === 'number' && info[27] === 0 ? '' : info[27],
        消費者向け問合せ窓口5電話番号: typeof info[28] === 'number' && info[28] === 0 ? '' : info[28],
        消費者向け問合せ窓口5受付時間の補足等: typeof info[29] === 'number' && info[29] === 0 ? '' : info[29]
      }
      return obj
    }
  )

  return JSON.stringify(dataBase, null, 2)
}

global.generateJson = (data: string): void => {
  const contentType = 'application/json'
  const fileName = 'nonBinTypeA.json'
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
