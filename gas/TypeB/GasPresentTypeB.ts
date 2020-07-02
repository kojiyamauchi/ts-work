global.createPresentDataBase = (): string => {
  const sheet = SpreadsheetApp.getActiveSheet()
  const startRow = 1
  const startColumn = 1
  const rowLength = sheet.getLastRow()
  const columnLength = sheet.getLastColumn()
  const data = sheet.getSheetValues(startRow + 6, startColumn, rowLength - 6, columnLength)

  const dataBase = data.map(
    (info): TypeB => {
      // prettier-ignore
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore TS2563: The containing function or module body is too large for control flow analysis.
      const obj: TypeB = {
        dataID: info[0],
        ロゴ画像: 'logo_dummy.png',
        // eslint-disable-next-line no-irregular-whitespace
        決済事業者1: info[4].replace(/　/g, ''),
        // eslint-disable-next-line no-irregular-whitespace
        決済事業者2: info[5].replace(/　/g, ''),
        // 利用料率: typeof info[8] === 'number' ? '〜'+ ((info[8] * 100).toFixed(2)) + '%' : info[8].replace(/ /g, '').replace(/~/g, '〜').replace(/～/g, '〜'),
        利用料率:
          typeof info[9] === 'number'
            ? (info[9] * 100).toFixed(2) + '%'
            : info[9]
              .replace(/ /g, '')
              .replace(/~/g, '〜')
              .replace(/～/g, '〜'),
        利用可能な決済手段: [
          info[10] !== '' ? 'クレジットカード' : '',
          info[11] !== '' ? '電子マネー' : '',
          info[12] !== '' ? 'QRコード' : '',
          info[13] !== '' ? 'その他' : ''
        ].filter((paymentMethodInfo): string => {
          return paymentMethodInfo
        }),
        期間終了後の手数料の取扱い: info[6],
        入金タイミング: typeof info[7] !== 'number' ? info[7] : '',
        利用決済端末: info[8],
        // 個票 x 10.
        個票: [
          // 個票1.
          info[17] !== '' || info[18] !== '' || info[19] !== '' || info[20] !== '' || info[22] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[17] !== '' ? info[17].split('、') : [],
                電子マネー: info[18] !== '' ? info[18].split('、') : [],
                QRコード: info[19] !== '' ? info[19].split('、') : [],
                その他: info[20] !== '' ? info[20].split('、') : []
              },
              サービスURL: info[21],
              決済手数料: {
                還元実施期間中:
                    typeof info[22] === 'number'
                      ? '〜' + (info[22] * 100).toFixed(2) + '%'
                      : info[22] !== '' && info[22].indexOf('~') === -1 && info[22].indexOf('～') === -1 && info[22].indexOf('〜') === -1
                        ? '〜' + info[22].replace(/ /g, '')
                        : info[22]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[23],
                還元実施期間前:
                    typeof info[24] === 'number' && info[24] < 1
                      ? (info[24] * 100).toFixed(2) + '%'
                      : typeof info[24] === 'number' && info[24] >= 1
                        ? info[24].toFixed(2) + '%'
                        : info[24]
              },
              発生する費用: {
                期間中: {
                  費目1: info[25],
                  費目2: info[26],
                  費目3: info[27],
                  費目4: '',
                  金額1: info[28],
                  金額2: info[29],
                  金額3: info[30],
                  金額4: '',
                  単位1: info[31],
                  単位2: info[32],
                  単位3: info[33],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[34],
                  費目2: info[35],
                  費目3: info[36],
                  費目4: '',
                  金額1: info[37],
                  金額2: info[38],
                  金額3: info[39],
                  金額4: '',
                  単位1: info[40],
                  単位2: info[41],
                  単位3: info[42],
                  単位4: ''
                }
              },
              入金タイミング: info[49],
              月次一括の場合の締日: info[50],
              月次一括の場合の支払日: info[51],
              複数回の場合の回数: info[52],
              入金サイクル: info[53],
              振込手数料: info[54],
              サービス提供エリア: [
                info[55] !== '' ? '全国' : '',
                info[56] !== '' ? '北海道' : '',
                info[57] !== '' ? '東北' : '',
                info[58] !== '' ? '青森県' : '',
                info[59] !== '' ? '岩手県' : '',
                info[60] !== '' ? '秋田県' : '',
                info[61] !== '' ? '宮城県' : '',
                info[62] !== '' ? '山形県' : '',
                info[63] !== '' ? '福島県' : '',
                info[64] !== '' ? '関東' : '',
                info[65] !== '' ? '茨城県' : '',
                info[66] !== '' ? '栃木県' : '',
                info[67] !== '' ? '群馬県' : '',
                info[68] !== '' ? '埼玉県' : '',
                info[69] !== '' ? '千葉県' : '',
                info[70] !== '' ? '東京都' : '',
                info[71] !== '' ? '神奈川県' : '',
                info[72] !== '' ? '中部' : '',
                info[73] !== '' ? '新潟県' : '',
                info[74] !== '' ? '富山県' : '',
                info[75] !== '' ? '石川県' : '',
                info[76] !== '' ? '福井県' : '',
                info[77] !== '' ? '山梨県' : '',
                info[78] !== '' ? '長野県' : '',
                info[79] !== '' ? '岐阜県' : '',
                info[80] !== '' ? '静岡県' : '',
                info[81] !== '' ? '愛知県' : '',
                info[82] !== '' ? '近畿' : '',
                info[83] !== '' ? '三重県' : '',
                info[84] !== '' ? '滋賀県' : '',
                info[85] !== '' ? '奈良県' : '',
                info[86] !== '' ? '和歌山県' : '',
                info[87] !== '' ? '京都府' : '',
                info[88] !== '' ? '大阪府' : '',
                info[89] !== '' ? '兵庫県' : '',
                info[90] !== '' ? '中国' : '',
                info[91] !== '' ? '岡山県' : '',
                info[92] !== '' ? '広島県' : '',
                info[93] !== '' ? '鳥取県' : '',
                info[94] !== '' ? '島根県' : '',
                info[95] !== '' ? '山口県' : '',
                info[96] !== '' ? '四国' : '',
                info[97] !== '' ? '香川県' : '',
                info[98] !== '' ? '徳島県' : '',
                info[99] !== '' ? '愛媛県' : '',
                info[100] !== '' ? '高知県' : '',
                info[101] !== '' ? '九州' : '',
                info[102] !== '' ? '福岡県' : '',
                info[103] !== '' ? '佐賀県' : '',
                info[104] !== '' ? '長崎県' : '',
                info[105] !== '' ? '大分県' : '',
                info[106] !== '' ? '熊本県' : '',
                info[107] !== '' ? '宮崎県' : '',
                info[108] !== '' ? '鹿児島県' : '',
                info[109] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[110] !== '',
                食料品: info[111] !== '',
                衣料品: info[112] !== '',
                貴金属服飾品: info[113] !== '',
                電化製品: info[114] !== '',
                家具調度品: info[115] !== '',
                書籍玩具音楽CD: info[116] !== '',
                EC通信販売: info[117] !== '',
                ガソリンスタンド: info[118] !== '',
                その他小売業: info[119] !== '',
                飲食業: info[120] !== '',
                宿泊業: info[121] !== '',
                公共料金: info[122] !== '',
                理容美容業: info[123] !== '',
                運輸業: info[124] !== '',
                その他サービス: info[125] !== '',
                その他自由記載サービス: info[126] !== ''
              },
              受付開始時間:
                  info[127] === ''
                    ? ''
                    : typeof info[127] === 'object'
                      ? Utilities.formatDate(info[127], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[127], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[127], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[127], 'JST', 'HH:mm')
                      : info[127].length >= 5 && info[127].indexOf('0') === 0
                        ? info[127].replace('0', '')
                        : info[127],
              受付終了時間:
                  info[128] === ''
                    ? ''
                    : typeof info[128] === 'object'
                      ? Utilities.formatDate(info[128], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[128], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[128], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[128], 'JST', 'HH:mm')
                      : info[128].length >= 5 && info[128].indexOf('0') === 0
                        ? info[128].replace('0', '')
                        : info[128],
              受付時間の補足: info[129],
              加盟店向けサービス問合せ電話番号: info[130],
              加盟店向けサービス問合せメールアドレス: info[131],
              加盟店向けサービス問合せ備考: info[133]
            }
            : null,
          // 個票2.
          info[134] !== '' || info[135] !== '' || info[136] !== '' || info[137] !== '' || info[139] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[134] !== '' ? info[134].split('、') : [],
                電子マネー: info[135] !== '' ? info[135].split('、') : [],
                QRコード: info[136] !== '' ? info[136].split('、') : [],
                その他: info[137] !== '' ? info[137].split('、') : []
              },
              サービスURL: info[138],
              決済手数料: {
                還元実施期間中:
                    typeof info[139] === 'number'
                      ? '〜' + (info[139] * 100).toFixed(2) + '%'
                      : info[139] !== '' && info[139].indexOf('~') === -1 && info[139].indexOf('～') === -1 && info[139].indexOf('〜') === -1
                        ? '〜' + info[139].replace(/ /g, '')
                        : info[139]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[140],
                還元実施期間前:
                    typeof info[141] === 'number' && info[141] < 1
                      ? (info[141] * 100).toFixed(2) + '%'
                      : typeof info[141] === 'number' && info[141] >= 1
                        ? info[141].toFixed(2) + '%'
                        : info[141]
              },
              発生する費用: {
                期間中: {
                  費目1: info[142],
                  費目2: info[143],
                  費目3: info[144],
                  費目4: '',
                  金額1: info[145],
                  金額2: info[146],
                  金額3: info[147],
                  金額4: '',
                  単位1: info[148],
                  単位2: info[149],
                  単位3: info[150],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[151],
                  費目2: info[152],
                  費目3: info[153],
                  費目4: '',
                  金額1: info[154],
                  金額2: info[155],
                  金額3: info[156],
                  金額4: '',
                  単位1: info[157],
                  単位2: info[158],
                  単位3: info[159],
                  単位4: ''
                }
              },
              入金タイミング: info[166],
              月次一括の場合の締日: info[167],
              月次一括の場合の支払日: info[168],
              複数回の場合の回数: info[169],
              入金サイクル: info[170],
              振込手数料: info[171],
              サービス提供エリア: [
                info[172] !== '' ? '全国' : '',
                info[173] !== '' ? '北海道' : '',
                info[174] !== '' ? '東北' : '',
                info[175] !== '' ? '青森県' : '',
                info[176] !== '' ? '岩手県' : '',
                info[177] !== '' ? '秋田県' : '',
                info[178] !== '' ? '宮城県' : '',
                info[179] !== '' ? '山形県' : '',
                info[180] !== '' ? '福島県' : '',
                info[181] !== '' ? '関東' : '',
                info[182] !== '' ? '茨城県' : '',
                info[183] !== '' ? '栃木県' : '',
                info[184] !== '' ? '群馬県' : '',
                info[185] !== '' ? '埼玉県' : '',
                info[186] !== '' ? '千葉県' : '',
                info[187] !== '' ? '東京都' : '',
                info[188] !== '' ? '神奈川県' : '',
                info[189] !== '' ? '中部' : '',
                info[190] !== '' ? '新潟県' : '',
                info[191] !== '' ? '富山県' : '',
                info[192] !== '' ? '石川県' : '',
                info[193] !== '' ? '福井県' : '',
                info[194] !== '' ? '山梨県' : '',
                info[195] !== '' ? '長野県' : '',
                info[196] !== '' ? '岐阜県' : '',
                info[197] !== '' ? '静岡県' : '',
                info[198] !== '' ? '愛知県' : '',
                info[199] !== '' ? '近畿' : '',
                info[200] !== '' ? '三重県' : '',
                info[201] !== '' ? '滋賀県' : '',
                info[202] !== '' ? '奈良県' : '',
                info[203] !== '' ? '和歌山県' : '',
                info[204] !== '' ? '京都府' : '',
                info[205] !== '' ? '大阪府' : '',
                info[206] !== '' ? '兵庫県' : '',
                info[207] !== '' ? '中国' : '',
                info[208] !== '' ? '岡山県' : '',
                info[209] !== '' ? '広島県' : '',
                info[210] !== '' ? '鳥取県' : '',
                info[211] !== '' ? '島根県' : '',
                info[212] !== '' ? '山口県' : '',
                info[213] !== '' ? '四国' : '',
                info[214] !== '' ? '香川県' : '',
                info[215] !== '' ? '徳島県' : '',
                info[216] !== '' ? '愛媛県' : '',
                info[217] !== '' ? '高知県' : '',
                info[218] !== '' ? '九州' : '',
                info[219] !== '' ? '福岡県' : '',
                info[220] !== '' ? '佐賀県' : '',
                info[221] !== '' ? '長崎県' : '',
                info[222] !== '' ? '大分県' : '',
                info[223] !== '' ? '熊本県' : '',
                info[224] !== '' ? '宮崎県' : '',
                info[225] !== '' ? '鹿児島県' : '',
                info[226] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[227] !== '',
                食料品: info[228] !== '',
                衣料品: info[229] !== '',
                貴金属服飾品: info[230] !== '',
                電化製品: info[231] !== '',
                家具調度品: info[232] !== '',
                書籍玩具音楽CD: info[233] !== '',
                EC通信販売: info[234] !== '',
                ガソリンスタンド: info[235] !== '',
                その他小売業: info[236] !== '',
                飲食業: info[237] !== '',
                宿泊業: info[238] !== '',
                公共料金: info[239] !== '',
                理容美容業: info[240] !== '',
                運輸業: info[241] !== '',
                その他サービス: info[242] !== '',
                その他自由記載サービス: info[243] !== ''
              },
              受付開始時間:
                  info[244] === ''
                    ? ''
                    : typeof info[244] === 'object'
                      ? Utilities.formatDate(info[244], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[244], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[244], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[244], 'JST', 'HH:mm')
                      : info[244].length >= 5 && info[244].indexOf('0') === 0
                        ? info[244].replace('0', '')
                        : info[244],
              受付終了時間:
                  info[245] === ''
                    ? ''
                    : typeof info[245] === 'object'
                      ? Utilities.formatDate(info[245], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[245], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[245], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[245], 'JST', 'HH:mm')
                      : info[245].length >= 5 && info[245].indexOf('0') === 0
                        ? info[245].replace('0', '')
                        : info[245],
              受付時間の補足: info[246],
              加盟店向けサービス問合せ電話番号: info[247],
              加盟店向けサービス問合せメールアドレス: info[248],
              加盟店向けサービス問合せ備考: info[250]
            }
            : null,
          // 個票3.
          info[251] !== '' || info[252] !== '' || info[253] !== '' || info[254] !== '' || info[256] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[251] !== '' ? info[251].split('、') : [],
                電子マネー: info[252] !== '' ? info[252].split('、') : [],
                QRコード: info[253] !== '' ? info[253].split('、') : [],
                その他: info[254] !== '' ? info[254].split('、') : []
              },
              サービスURL: info[255],
              決済手数料: {
                還元実施期間中:
                    typeof info[256] === 'number'
                      ? '〜' + (info[256] * 100).toFixed(2) + '%'
                      : info[256] !== '' && info[256].indexOf('~') === -1 && info[256].indexOf('～') === -1 && info[256].indexOf('〜') === -1
                        ? '〜' + info[256].replace(/ /g, '')
                        : info[256]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[257],
                還元実施期間前:
                    typeof info[258] === 'number' && info[258] < 1
                      ? (info[258] * 100).toFixed(2) + '%'
                      : typeof info[258] === 'number' && info[258] >= 1
                        ? info[258].toFixed(2) + '%'
                        : info[258]
              },
              発生する費用: {
                期間中: {
                  費目1: info[259],
                  費目2: info[260],
                  費目3: info[261],
                  費目4: '',
                  金額1: info[262],
                  金額2: info[263],
                  金額3: info[264],
                  金額4: '',
                  単位1: info[265],
                  単位2: info[266],
                  単位3: info[267],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[268],
                  費目2: info[269],
                  費目3: info[270],
                  費目4: '',
                  金額1: info[271],
                  金額2: info[272],
                  金額3: info[273],
                  金額4: '',
                  単位1: info[274],
                  単位2: info[275],
                  単位3: info[276],
                  単位4: ''
                }
              },
              入金タイミング: info[283],
              月次一括の場合の締日: info[284],
              月次一括の場合の支払日: info[285],
              複数回の場合の回数: info[286],
              入金サイクル: info[287],
              振込手数料: info[288],
              サービス提供エリア: [
                info[289] !== '' ? '全国' : '',
                info[290] !== '' ? '北海道' : '',
                info[291] !== '' ? '東北' : '',
                info[292] !== '' ? '青森県' : '',
                info[293] !== '' ? '岩手県' : '',
                info[294] !== '' ? '秋田県' : '',
                info[295] !== '' ? '宮城県' : '',
                info[296] !== '' ? '山形県' : '',
                info[297] !== '' ? '福島県' : '',
                info[298] !== '' ? '関東' : '',
                info[299] !== '' ? '茨城県' : '',
                info[300] !== '' ? '栃木県' : '',
                info[301] !== '' ? '群馬県' : '',
                info[302] !== '' ? '埼玉県' : '',
                info[303] !== '' ? '千葉県' : '',
                info[304] !== '' ? '東京都' : '',
                info[305] !== '' ? '神奈川県' : '',
                info[306] !== '' ? '中部' : '',
                info[307] !== '' ? '新潟県' : '',
                info[308] !== '' ? '富山県' : '',
                info[309] !== '' ? '石川県' : '',
                info[310] !== '' ? '福井県' : '',
                info[311] !== '' ? '山梨県' : '',
                info[312] !== '' ? '長野県' : '',
                info[313] !== '' ? '岐阜県' : '',
                info[314] !== '' ? '静岡県' : '',
                info[315] !== '' ? '愛知県' : '',
                info[316] !== '' ? '近畿' : '',
                info[317] !== '' ? '三重県' : '',
                info[318] !== '' ? '滋賀県' : '',
                info[319] !== '' ? '奈良県' : '',
                info[320] !== '' ? '和歌山県' : '',
                info[321] !== '' ? '京都府' : '',
                info[322] !== '' ? '大阪府' : '',
                info[323] !== '' ? '兵庫県' : '',
                info[324] !== '' ? '中国' : '',
                info[325] !== '' ? '岡山県' : '',
                info[326] !== '' ? '広島県' : '',
                info[327] !== '' ? '鳥取県' : '',
                info[328] !== '' ? '島根県' : '',
                info[329] !== '' ? '山口県' : '',
                info[330] !== '' ? '四国' : '',
                info[331] !== '' ? '香川県' : '',
                info[332] !== '' ? '徳島県' : '',
                info[333] !== '' ? '愛媛県' : '',
                info[334] !== '' ? '高知県' : '',
                info[335] !== '' ? '九州' : '',
                info[336] !== '' ? '福岡県' : '',
                info[337] !== '' ? '佐賀県' : '',
                info[338] !== '' ? '長崎県' : '',
                info[339] !== '' ? '大分県' : '',
                info[340] !== '' ? '熊本県' : '',
                info[341] !== '' ? '宮崎県' : '',
                info[342] !== '' ? '鹿児島県' : '',
                info[343] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[344] !== '',
                食料品: info[345] !== '',
                衣料品: info[346] !== '',
                貴金属服飾品: info[347] !== '',
                電化製品: info[348] !== '',
                家具調度品: info[349] !== '',
                書籍玩具音楽CD: info[350] !== '',
                EC通信販売: info[351] !== '',
                ガソリンスタンド: info[352] !== '',
                その他小売業: info[353] !== '',
                飲食業: info[354] !== '',
                宿泊業: info[355] !== '',
                公共料金: info[356] !== '',
                理容美容業: info[357] !== '',
                運輸業: info[358] !== '',
                その他サービス: info[359] !== '',
                その他自由記載サービス: info[360] !== ''
              },
              受付開始時間:
                  info[361] === ''
                    ? ''
                    : typeof info[361] === 'object'
                      ? Utilities.formatDate(info[361], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[361], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[361], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[361], 'JST', 'HH:mm')
                      : info[361].length >= 5 && info[361].indexOf('0') === 0
                        ? info[361].replace('0', '')
                        : info[361],
              受付終了時間:
                  info[361] === ''
                    ? ''
                    : typeof info[361] === 'object'
                      ? Utilities.formatDate(info[361], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[361], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[361], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[361], 'JST', 'HH:mm')
                      : info[361].length >= 5 && info[361].indexOf('0') === 0
                        ? info[361].replace('0', '')
                        : info[361],
              受付時間の補足: info[363],
              加盟店向けサービス問合せ電話番号: info[364],
              加盟店向けサービス問合せメールアドレス: info[365],
              加盟店向けサービス問合せ備考: info[367]
            }
            : null,
          // 個票4.
          info[368] !== '' || info[369] !== '' || info[370] !== '' || info[371] !== '' || info[373] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[368] !== '' ? info[368].split('、') : [],
                電子マネー: info[369] !== '' ? info[369].split('、') : [],
                QRコード: info[370] !== '' ? info[370].split('、') : [],
                その他: info[371] !== '' ? info[371].split('、') : []
              },
              サービスURL: info[372],
              決済手数料: {
                還元実施期間中:
                    typeof info[373] === 'number'
                      ? '〜' + (info[373] * 100).toFixed(2) + '%'
                      : info[373] !== '' && info[373].indexOf('~') === -1 && info[373].indexOf('～') === -1 && info[373].indexOf('〜') === -1
                        ? '〜' + info[373].replace(/ /g, '')
                        : info[373]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[374],
                還元実施期間前:
                    typeof info[375] === 'number' && info[375] < 1
                      ? (info[375] * 100).toFixed(2) + '%'
                      : typeof info[375] === 'number' && info[375] >= 1
                        ? info[375].toFixed(2) + '%'
                        : info[375]
              },
              発生する費用: {
                期間中: {
                  費目1: info[376],
                  費目2: info[377],
                  費目3: info[378],
                  費目4: '',
                  金額1: info[379],
                  金額2: info[380],
                  金額3: info[381],
                  金額4: '',
                  単位1: info[382],
                  単位2: info[383],
                  単位3: info[384],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[385],
                  費目2: info[386],
                  費目3: info[387],
                  費目4: '',
                  金額1: info[388],
                  金額2: info[389],
                  金額3: info[390],
                  金額4: '',
                  単位1: info[391],
                  単位2: info[392],
                  単位3: info[393],
                  単位4: ''
                }
              },
              入金タイミング: info[400],
              月次一括の場合の締日: info[401],
              月次一括の場合の支払日: info[402],
              複数回の場合の回数: info[403],
              入金サイクル: info[404],
              振込手数料: info[405],
              サービス提供エリア: [
                info[406] !== '' ? '全国' : '',
                info[407] !== '' ? '北海道' : '',
                info[408] !== '' ? '東北' : '',
                info[409] !== '' ? '青森県' : '',
                info[410] !== '' ? '岩手県' : '',
                info[411] !== '' ? '秋田県' : '',
                info[412] !== '' ? '宮城県' : '',
                info[413] !== '' ? '山形県' : '',
                info[414] !== '' ? '福島県' : '',
                info[415] !== '' ? '関東' : '',
                info[416] !== '' ? '茨城県' : '',
                info[417] !== '' ? '栃木県' : '',
                info[418] !== '' ? '群馬県' : '',
                info[419] !== '' ? '埼玉県' : '',
                info[420] !== '' ? '千葉県' : '',
                info[421] !== '' ? '東京都' : '',
                info[422] !== '' ? '神奈川県' : '',
                info[423] !== '' ? '中部' : '',
                info[424] !== '' ? '新潟県' : '',
                info[425] !== '' ? '富山県' : '',
                info[426] !== '' ? '石川県' : '',
                info[427] !== '' ? '福井県' : '',
                info[428] !== '' ? '山梨県' : '',
                info[429] !== '' ? '長野県' : '',
                info[430] !== '' ? '岐阜県' : '',
                info[431] !== '' ? '静岡県' : '',
                info[432] !== '' ? '愛知県' : '',
                info[433] !== '' ? '近畿' : '',
                info[434] !== '' ? '三重県' : '',
                info[435] !== '' ? '滋賀県' : '',
                info[436] !== '' ? '奈良県' : '',
                info[437] !== '' ? '和歌山県' : '',
                info[438] !== '' ? '京都府' : '',
                info[439] !== '' ? '大阪府' : '',
                info[440] !== '' ? '兵庫県' : '',
                info[441] !== '' ? '中国' : '',
                info[442] !== '' ? '岡山県' : '',
                info[443] !== '' ? '広島県' : '',
                info[444] !== '' ? '鳥取県' : '',
                info[445] !== '' ? '島根県' : '',
                info[446] !== '' ? '山口県' : '',
                info[447] !== '' ? '四国' : '',
                info[448] !== '' ? '香川県' : '',
                info[449] !== '' ? '徳島県' : '',
                info[450] !== '' ? '愛媛県' : '',
                info[451] !== '' ? '高知県' : '',
                info[452] !== '' ? '九州' : '',
                info[453] !== '' ? '福岡県' : '',
                info[454] !== '' ? '佐賀県' : '',
                info[455] !== '' ? '長崎県' : '',
                info[456] !== '' ? '大分県' : '',
                info[457] !== '' ? '熊本県' : '',
                info[458] !== '' ? '宮崎県' : '',
                info[459] !== '' ? '鹿児島県' : '',
                info[460] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[461] !== '',
                食料品: info[462] !== '',
                衣料品: info[463] !== '',
                貴金属服飾品: info[464] !== '',
                電化製品: info[465] !== '',
                家具調度品: info[466] !== '',
                書籍玩具音楽CD: info[467] !== '',
                EC通信販売: info[468] !== '',
                ガソリンスタンド: info[469] !== '',
                その他小売業: info[470] !== '',
                飲食業: info[471] !== '',
                宿泊業: info[472] !== '',
                公共料金: info[473] !== '',
                理容美容業: info[474] !== '',
                運輸業: info[475] !== '',
                その他サービス: info[476] !== '',
                その他自由記載サービス: info[477] !== ''
              },
              受付開始時間:
                  info[478] === ''
                    ? ''
                    : typeof info[478] === 'object'
                      ? Utilities.formatDate(info[478], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[478], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[478], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[478], 'JST', 'HH:mm')
                      : info[478].length >= 5 && info[478].indexOf('0') === 0
                        ? info[478].replace('0', '')
                        : info[478],
              受付終了時間:
                  info[479] === ''
                    ? ''
                    : typeof info[479] === 'object'
                      ? Utilities.formatDate(info[479], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[479], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[479], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[479], 'JST', 'HH:mm')
                      : info[479].length >= 5 && info[479].indexOf('0') === 0
                        ? info[479].replace('0', '')
                        : info[479],
              受付時間の補足: info[480],
              加盟店向けサービス問合せ電話番号: info[481],
              加盟店向けサービス問合せメールアドレス: info[482],
              加盟店向けサービス問合せ備考: info[484]
            }
            : null,
          // 個票5.
          info[485] !== '' || info[486] !== '' || info[487] !== '' || info[488] !== '' || info[490] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[485] !== '' ? info[485].split('、') : [],
                電子マネー: info[486] !== '' ? info[486].split('、') : [],
                QRコード: info[487] !== '' ? info[487].split('、') : [],
                その他: info[488] !== '' ? info[488].split('、') : []
              },
              サービスURL: info[489],
              決済手数料: {
                還元実施期間中:
                    typeof info[490] === 'number'
                      ? '〜' + (info[490] * 100).toFixed(2) + '%'
                      : info[490] !== '' && info[490].indexOf('~') === -1 && info[490].indexOf('～') === -1 && info[490].indexOf('〜') === -1
                        ? '〜' + info[490].replace(/ /g, '')
                        : info[490]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[491],
                還元実施期間前:
                    typeof info[492] === 'number' && info[492] < 1
                      ? (info[492] * 100).toFixed(2) + '%'
                      : typeof info[492] === 'number' && info[492] >= 1
                        ? info[492].toFixed(2) + '%'
                        : info[492]
              },
              発生する費用: {
                期間中: {
                  費目1: info[493],
                  費目2: info[494],
                  費目3: info[495],
                  費目4: '',
                  金額1: info[496],
                  金額2: info[497],
                  金額3: info[498],
                  金額4: '',
                  単位1: info[499],
                  単位2: info[500],
                  単位3: info[501],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[502],
                  費目2: info[503],
                  費目3: info[504],
                  費目4: '',
                  金額1: info[505],
                  金額2: info[506],
                  金額3: info[507],
                  金額4: '',
                  単位1: info[508],
                  単位2: info[509],
                  単位3: info[510],
                  単位4: ''
                }
              },
              入金タイミング: info[517],
              月次一括の場合の締日: info[518],
              月次一括の場合の支払日: info[519],
              複数回の場合の回数: info[520],
              入金サイクル: info[521],
              振込手数料: info[522],
              サービス提供エリア: [
                info[523] !== '' ? '全国' : '',
                info[524] !== '' ? '北海道' : '',
                info[525] !== '' ? '東北' : '',
                info[526] !== '' ? '青森県' : '',
                info[527] !== '' ? '岩手県' : '',
                info[528] !== '' ? '秋田県' : '',
                info[529] !== '' ? '宮城県' : '',
                info[530] !== '' ? '山形県' : '',
                info[531] !== '' ? '福島県' : '',
                info[531] !== '' ? '関東' : '',
                info[533] !== '' ? '茨城県' : '',
                info[534] !== '' ? '栃木県' : '',
                info[535] !== '' ? '群馬県' : '',
                info[536] !== '' ? '埼玉県' : '',
                info[537] !== '' ? '千葉県' : '',
                info[538] !== '' ? '東京都' : '',
                info[539] !== '' ? '神奈川県' : '',
                info[540] !== '' ? '中部' : '',
                info[541] !== '' ? '新潟県' : '',
                info[542] !== '' ? '富山県' : '',
                info[543] !== '' ? '石川県' : '',
                info[544] !== '' ? '福井県' : '',
                info[545] !== '' ? '山梨県' : '',
                info[546] !== '' ? '長野県' : '',
                info[547] !== '' ? '岐阜県' : '',
                info[548] !== '' ? '静岡県' : '',
                info[549] !== '' ? '愛知県' : '',
                info[550] !== '' ? '近畿' : '',
                info[551] !== '' ? '三重県' : '',
                info[552] !== '' ? '滋賀県' : '',
                info[553] !== '' ? '奈良県' : '',
                info[554] !== '' ? '和歌山県' : '',
                info[555] !== '' ? '京都府' : '',
                info[556] !== '' ? '大阪府' : '',
                info[557] !== '' ? '兵庫県' : '',
                info[558] !== '' ? '中国' : '',
                info[559] !== '' ? '岡山県' : '',
                info[560] !== '' ? '広島県' : '',
                info[561] !== '' ? '鳥取県' : '',
                info[562] !== '' ? '島根県' : '',
                info[563] !== '' ? '山口県' : '',
                info[564] !== '' ? '四国' : '',
                info[565] !== '' ? '香川県' : '',
                info[566] !== '' ? '徳島県' : '',
                info[567] !== '' ? '愛媛県' : '',
                info[568] !== '' ? '高知県' : '',
                info[569] !== '' ? '九州' : '',
                info[570] !== '' ? '福岡県' : '',
                info[571] !== '' ? '佐賀県' : '',
                info[572] !== '' ? '長崎県' : '',
                info[573] !== '' ? '大分県' : '',
                info[574] !== '' ? '熊本県' : '',
                info[575] !== '' ? '宮崎県' : '',
                info[576] !== '' ? '鹿児島県' : '',
                info[577] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[578] !== '',
                食料品: info[579] !== '',
                衣料品: info[580] !== '',
                貴金属服飾品: info[581] !== '',
                電化製品: info[582] !== '',
                家具調度品: info[583] !== '',
                書籍玩具音楽CD: info[584] !== '',
                EC通信販売: info[585] !== '',
                ガソリンスタンド: info[586] !== '',
                その他小売業: info[587] !== '',
                飲食業: info[588] !== '',
                宿泊業: info[589] !== '',
                公共料金: info[590] !== '',
                理容美容業: info[591] !== '',
                運輸業: info[592] !== '',
                その他サービス: info[593] !== '',
                その他自由記載サービス: info[594] !== ''
              },
              受付開始時間:
                  info[595] === ''
                    ? ''
                    : typeof info[595] === 'object'
                      ? Utilities.formatDate(info[595], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[595], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[595], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[595], 'JST', 'HH:mm')
                      : info[595].length >= 5 && info[590].indexOf('0') === 0
                        ? info[595].replace('0', '')
                        : info[595],
              受付終了時間:
                  info[596] === ''
                    ? ''
                    : typeof info[596] === 'object'
                      ? Utilities.formatDate(info[596], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[596], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[596], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[596], 'JST', 'HH:mm')
                      : info[596].length >= 5 && info[596].indexOf('0') === 0
                        ? info[596].replace('0', '')
                        : info[596],
              受付時間の補足: info[597],
              加盟店向けサービス問合せ電話番号: info[598],
              加盟店向けサービス問合せメールアドレス: info[599],
              加盟店向けサービス問合せ備考: info[601]
            }
            : null,
          // 個票6.
          info[602] !== '' || info[603] !== '' || info[604] !== '' || info[605] !== '' || info[607] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[602] !== '' ? info[602].split('、') : [],
                電子マネー: info[603] !== '' ? info[603].split('、') : [],
                QRコード: info[604] !== '' ? info[604].split('、') : [],
                その他: info[605] !== '' ? info[605].split('、') : []
              },
              サービスURL: info[606],
              決済手数料: {
                還元実施期間中:
                    typeof info[607] === 'number'
                      ? '〜' + (info[607] * 100).toFixed(2) + '%'
                      : info[607] !== '' && info[607].indexOf('~') === -1 && info[607].indexOf('～') === -1 && info[607].indexOf('〜') === -1
                        ? '〜' + info[607].replace(/ /g, '')
                        : info[607]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[608],
                還元実施期間前:
                    typeof info[609] === 'number' && info[609] < 1
                      ? (info[609] * 100).toFixed(2) + '%'
                      : typeof info[609] === 'number' && info[609] >= 1
                        ? info[609].toFixed(2) + '%'
                        : info[609]
              },
              発生する費用: {
                期間中: {
                  費目1: info[610],
                  費目2: info[611],
                  費目3: info[612],
                  費目4: '',
                  金額1: info[613],
                  金額2: info[614],
                  金額3: info[615],
                  金額4: '',
                  単位1: info[616],
                  単位2: info[617],
                  単位3: info[618],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[619],
                  費目2: info[620],
                  費目3: info[621],
                  費目4: '',
                  金額1: info[622],
                  金額2: info[623],
                  金額3: info[624],
                  金額4: '',
                  単位1: info[625],
                  単位2: info[626],
                  単位3: info[627],
                  単位4: ''
                }
              },
              入金タイミング: info[634],
              月次一括の場合の締日: info[635],
              月次一括の場合の支払日: info[636],
              複数回の場合の回数: info[637],
              入金サイクル: info[638],
              振込手数料: info[639],
              サービス提供エリア: [
                info[640] !== '' ? '全国' : '',
                info[641] !== '' ? '北海道' : '',
                info[642] !== '' ? '東北' : '',
                info[643] !== '' ? '青森県' : '',
                info[644] !== '' ? '岩手県' : '',
                info[645] !== '' ? '秋田県' : '',
                info[646] !== '' ? '宮城県' : '',
                info[647] !== '' ? '山形県' : '',
                info[648] !== '' ? '福島県' : '',
                info[649] !== '' ? '関東' : '',
                info[650] !== '' ? '茨城県' : '',
                info[651] !== '' ? '栃木県' : '',
                info[652] !== '' ? '群馬県' : '',
                info[653] !== '' ? '埼玉県' : '',
                info[654] !== '' ? '千葉県' : '',
                info[655] !== '' ? '東京都' : '',
                info[656] !== '' ? '神奈川県' : '',
                info[657] !== '' ? '中部' : '',
                info[658] !== '' ? '新潟県' : '',
                info[659] !== '' ? '富山県' : '',
                info[660] !== '' ? '石川県' : '',
                info[661] !== '' ? '福井県' : '',
                info[662] !== '' ? '山梨県' : '',
                info[663] !== '' ? '長野県' : '',
                info[664] !== '' ? '岐阜県' : '',
                info[665] !== '' ? '静岡県' : '',
                info[666] !== '' ? '愛知県' : '',
                info[667] !== '' ? '近畿' : '',
                info[668] !== '' ? '三重県' : '',
                info[669] !== '' ? '滋賀県' : '',
                info[670] !== '' ? '奈良県' : '',
                info[671] !== '' ? '和歌山県' : '',
                info[672] !== '' ? '京都府' : '',
                info[673] !== '' ? '大阪府' : '',
                info[674] !== '' ? '兵庫県' : '',
                info[675] !== '' ? '中国' : '',
                info[676] !== '' ? '岡山県' : '',
                info[677] !== '' ? '広島県' : '',
                info[678] !== '' ? '鳥取県' : '',
                info[679] !== '' ? '島根県' : '',
                info[680] !== '' ? '山口県' : '',
                info[681] !== '' ? '四国' : '',
                info[682] !== '' ? '香川県' : '',
                info[683] !== '' ? '徳島県' : '',
                info[684] !== '' ? '愛媛県' : '',
                info[685] !== '' ? '高知県' : '',
                info[686] !== '' ? '九州' : '',
                info[687] !== '' ? '福岡県' : '',
                info[688] !== '' ? '佐賀県' : '',
                info[689] !== '' ? '長崎県' : '',
                info[690] !== '' ? '大分県' : '',
                info[691] !== '' ? '熊本県' : '',
                info[692] !== '' ? '宮崎県' : '',
                info[693] !== '' ? '鹿児島県' : '',
                info[694] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[695] !== '',
                食料品: info[696] !== '',
                衣料品: info[697] !== '',
                貴金属服飾品: info[698] !== '',
                電化製品: info[699] !== '',
                家具調度品: info[700] !== '',
                書籍玩具音楽CD: info[701] !== '',
                EC通信販売: info[702] !== '',
                ガソリンスタンド: info[703] !== '',
                その他小売業: info[704] !== '',
                飲食業: info[705] !== '',
                宿泊業: info[706] !== '',
                公共料金: info[707] !== '',
                理容美容業: info[708] !== '',
                運輸業: info[709] !== '',
                その他サービス: info[710] !== '',
                その他自由記載サービス: info[711] !== ''
              },
              受付開始時間:
                  info[712] === ''
                    ? ''
                    : typeof info[712] === 'object'
                      ? Utilities.formatDate(info[712], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[712], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[712], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[712], 'JST', 'HH:mm')
                      : info[712].length >= 5 && info[712].indexOf('0') === 0
                        ? info[712].replace('0', '')
                        : info[712],
              受付終了時間:
                  info[713] === ''
                    ? ''
                    : typeof info[713] === 'object'
                      ? Utilities.formatDate(info[713], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[713], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[713], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[713], 'JST', 'HH:mm')
                      : info[713].length >= 5 && info[713].indexOf('0') === 0
                        ? info[713].replace('0', '')
                        : info[713],
              受付時間の補足: info[714],
              加盟店向けサービス問合せ電話番号: info[715],
              加盟店向けサービス問合せメールアドレス: info[716],
              加盟店向けサービス問合せ備考: info[718]
            }
            : null,
          // 個票7.
          info[719] !== '' || info[720] !== '' || info[721] !== '' || info[722] !== '' || info[724] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[719] !== '' ? info[719].split('、') : [],
                電子マネー: info[720] !== '' ? info[720].split('、') : [],
                QRコード: info[721] !== '' ? info[721].split('、') : [],
                その他: info[722] !== '' ? info[722].split('、') : []
              },
              サービスURL: info[723],
              決済手数料: {
                還元実施期間中:
                    typeof info[724] === 'number'
                      ? '〜' + (info[724] * 100).toFixed(2) + '%'
                      : info[724] !== '' && info[724].indexOf('~') === -1 && info[724].indexOf('～') === -1 && info[724].indexOf('〜') === -1
                        ? '〜' + info[724].replace(/ /g, '')
                        : info[724]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[725],
                還元実施期間前:
                    typeof info[726] === 'number' && info[726] < 1
                      ? (info[726] * 100).toFixed(2) + '%'
                      : typeof info[726] === 'number' && info[726] >= 1
                        ? info[726].toFixed(2) + '%'
                        : info[726]
              },
              発生する費用: {
                期間中: {
                  費目1: info[727],
                  費目2: info[728],
                  費目3: info[729],
                  費目4: '',
                  金額1: info[730],
                  金額2: info[731],
                  金額3: info[732],
                  金額4: '',
                  単位1: info[733],
                  単位2: info[734],
                  単位3: info[735],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[736],
                  費目2: info[737],
                  費目3: info[738],
                  費目4: '',
                  金額1: info[739],
                  金額2: info[740],
                  金額3: info[741],
                  金額4: '',
                  単位1: info[742],
                  単位2: info[743],
                  単位3: info[744],
                  単位4: ''
                }
              },
              入金タイミング: info[751],
              月次一括の場合の締日: info[752],
              月次一括の場合の支払日: info[753],
              複数回の場合の回数: info[754],
              入金サイクル: info[755],
              振込手数料: info[756],
              サービス提供エリア: [
                info[757] !== '' ? '全国' : '',
                info[758] !== '' ? '北海道' : '',
                info[759] !== '' ? '東北' : '',
                info[760] !== '' ? '青森県' : '',
                info[761] !== '' ? '岩手県' : '',
                info[762] !== '' ? '秋田県' : '',
                info[763] !== '' ? '宮城県' : '',
                info[764] !== '' ? '山形県' : '',
                info[765] !== '' ? '福島県' : '',
                info[766] !== '' ? '関東' : '',
                info[767] !== '' ? '茨城県' : '',
                info[768] !== '' ? '栃木県' : '',
                info[769] !== '' ? '群馬県' : '',
                info[770] !== '' ? '埼玉県' : '',
                info[771] !== '' ? '千葉県' : '',
                info[772] !== '' ? '東京都' : '',
                info[773] !== '' ? '神奈川県' : '',
                info[774] !== '' ? '中部' : '',
                info[775] !== '' ? '新潟県' : '',
                info[776] !== '' ? '富山県' : '',
                info[777] !== '' ? '石川県' : '',
                info[778] !== '' ? '福井県' : '',
                info[779] !== '' ? '山梨県' : '',
                info[780] !== '' ? '長野県' : '',
                info[781] !== '' ? '岐阜県' : '',
                info[782] !== '' ? '静岡県' : '',
                info[783] !== '' ? '愛知県' : '',
                info[784] !== '' ? '近畿' : '',
                info[785] !== '' ? '三重県' : '',
                info[786] !== '' ? '滋賀県' : '',
                info[787] !== '' ? '奈良県' : '',
                info[788] !== '' ? '和歌山県' : '',
                info[789] !== '' ? '京都府' : '',
                info[790] !== '' ? '大阪府' : '',
                info[791] !== '' ? '兵庫県' : '',
                info[792] !== '' ? '中国' : '',
                info[793] !== '' ? '岡山県' : '',
                info[794] !== '' ? '広島県' : '',
                info[795] !== '' ? '鳥取県' : '',
                info[796] !== '' ? '島根県' : '',
                info[797] !== '' ? '山口県' : '',
                info[798] !== '' ? '四国' : '',
                info[799] !== '' ? '香川県' : '',
                info[800] !== '' ? '徳島県' : '',
                info[801] !== '' ? '愛媛県' : '',
                info[802] !== '' ? '高知県' : '',
                info[803] !== '' ? '九州' : '',
                info[804] !== '' ? '福岡県' : '',
                info[805] !== '' ? '佐賀県' : '',
                info[806] !== '' ? '長崎県' : '',
                info[807] !== '' ? '大分県' : '',
                info[808] !== '' ? '熊本県' : '',
                info[809] !== '' ? '宮崎県' : '',
                info[810] !== '' ? '鹿児島県' : '',
                info[811] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[812] !== '',
                食料品: info[813] !== '',
                衣料品: info[814] !== '',
                貴金属服飾品: info[815] !== '',
                電化製品: info[816] !== '',
                家具調度品: info[817] !== '',
                書籍玩具音楽CD: info[818] !== '',
                EC通信販売: info[819] !== '',
                ガソリンスタンド: info[820] !== '',
                その他小売業: info[821] !== '',
                飲食業: info[822] !== '',
                宿泊業: info[823] !== '',
                公共料金: info[824] !== '',
                理容美容業: info[825] !== '',
                運輸業: info[826] !== '',
                その他サービス: info[827] !== '',
                その他自由記載サービス: info[828] !== ''
              },
              受付開始時間:
                  info[829] === ''
                    ? ''
                    : typeof info[829] === 'object'
                      ? Utilities.formatDate(info[829], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[829], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[829], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[829], 'JST', 'HH:mm')
                      : info[829].length >= 5 && info[829].indexOf('0') === 0
                        ? info[829].replace('0', '')
                        : info[829],
              受付終了時間:
                  info[830] === ''
                    ? ''
                    : typeof info[830] === 'object'
                      ? Utilities.formatDate(info[830], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[830], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[830], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[830], 'JST', 'HH:mm')
                      : info[830].length >= 5 && info[830].indexOf('0') === 0
                        ? info[830].replace('0', '')
                        : info[830],
              受付時間の補足: info[831],
              加盟店向けサービス問合せ電話番号: info[832],
              加盟店向けサービス問合せメールアドレス: info[833],
              加盟店向けサービス問合せ備考: info[835]
            }
            : null,
          // 個票8.
          info[836] !== '' || info[837] !== '' || info[838] !== '' || info[839] !== '' || info[841] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[836] !== '' ? info[836].split('、') : [],
                電子マネー: info[837] !== '' ? info[837].split('、') : [],
                QRコード: info[838] !== '' ? info[838].split('、') : [],
                その他: info[839] !== '' ? info[839].split('、') : []
              },
              サービスURL: info[840],
              決済手数料: {
                還元実施期間中:
                    typeof info[841] === 'number'
                      ? '〜' + (info[841] * 100).toFixed(2) + '%'
                      : info[841] !== '' && info[841].indexOf('~') === -1 && info[841].indexOf('～') === -1 && info[841].indexOf('〜') === -1
                        ? '〜' + info[841].replace(/ /g, '')
                        : info[841]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[842],
                還元実施期間前:
                    typeof info[843] === 'number' && info[843] < 1
                      ? (info[843] * 100).toFixed(2) + '%'
                      : typeof info[843] === 'number' && info[843] >= 1
                        ? info[843].toFixed(2) + '%'
                        : info[843]
              },
              発生する費用: {
                期間中: {
                  費目1: info[844],
                  費目2: info[845],
                  費目3: info[846],
                  費目4: '',
                  金額1: info[847],
                  金額2: info[848],
                  金額3: info[849],
                  金額4: '',
                  単位1: info[850],
                  単位2: info[851],
                  単位3: info[852],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[853],
                  費目2: info[854],
                  費目3: info[855],
                  費目4: '',
                  金額1: info[856],
                  金額2: info[857],
                  金額3: info[858],
                  金額4: '',
                  単位1: info[859],
                  単位2: info[860],
                  単位3: info[861],
                  単位4: ''
                }
              },
              入金タイミング: info[868],
              月次一括の場合の締日: info[869],
              月次一括の場合の支払日: info[870],
              複数回の場合の回数: info[871],
              入金サイクル: info[872],
              振込手数料: info[873],
              サービス提供エリア: [
                info[874] !== '' ? '全国' : '',
                info[875] !== '' ? '北海道' : '',
                info[876] !== '' ? '東北' : '',
                info[877] !== '' ? '青森県' : '',
                info[878] !== '' ? '岩手県' : '',
                info[879] !== '' ? '秋田県' : '',
                info[880] !== '' ? '宮城県' : '',
                info[881] !== '' ? '山形県' : '',
                info[882] !== '' ? '福島県' : '',
                info[883] !== '' ? '関東' : '',
                info[884] !== '' ? '茨城県' : '',
                info[885] !== '' ? '栃木県' : '',
                info[886] !== '' ? '群馬県' : '',
                info[887] !== '' ? '埼玉県' : '',
                info[888] !== '' ? '千葉県' : '',
                info[889] !== '' ? '東京都' : '',
                info[890] !== '' ? '神奈川県' : '',
                info[891] !== '' ? '中部' : '',
                info[892] !== '' ? '新潟県' : '',
                info[893] !== '' ? '富山県' : '',
                info[894] !== '' ? '石川県' : '',
                info[895] !== '' ? '福井県' : '',
                info[896] !== '' ? '山梨県' : '',
                info[897] !== '' ? '長野県' : '',
                info[898] !== '' ? '岐阜県' : '',
                info[899] !== '' ? '静岡県' : '',
                info[900] !== '' ? '愛知県' : '',
                info[901] !== '' ? '近畿' : '',
                info[902] !== '' ? '三重県' : '',
                info[903] !== '' ? '滋賀県' : '',
                info[904] !== '' ? '奈良県' : '',
                info[905] !== '' ? '和歌山県' : '',
                info[906] !== '' ? '京都府' : '',
                info[907] !== '' ? '大阪府' : '',
                info[908] !== '' ? '兵庫県' : '',
                info[909] !== '' ? '中国' : '',
                info[910] !== '' ? '岡山県' : '',
                info[911] !== '' ? '広島県' : '',
                info[912] !== '' ? '鳥取県' : '',
                info[913] !== '' ? '島根県' : '',
                info[914] !== '' ? '山口県' : '',
                info[915] !== '' ? '四国' : '',
                info[916] !== '' ? '香川県' : '',
                info[917] !== '' ? '徳島県' : '',
                info[918] !== '' ? '愛媛県' : '',
                info[919] !== '' ? '高知県' : '',
                info[920] !== '' ? '九州' : '',
                info[921] !== '' ? '福岡県' : '',
                info[922] !== '' ? '佐賀県' : '',
                info[923] !== '' ? '長崎県' : '',
                info[924] !== '' ? '大分県' : '',
                info[925] !== '' ? '熊本県' : '',
                info[926] !== '' ? '宮崎県' : '',
                info[927] !== '' ? '鹿児島県' : '',
                info[928] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[929] !== '',
                食料品: info[930] !== '',
                衣料品: info[931] !== '',
                貴金属服飾品: info[932] !== '',
                電化製品: info[933] !== '',
                家具調度品: info[934] !== '',
                書籍玩具音楽CD: info[935] !== '',
                EC通信販売: info[936] !== '',
                ガソリンスタンド: info[937] !== '',
                その他小売業: info[938] !== '',
                飲食業: info[939] !== '',
                宿泊業: info[940] !== '',
                公共料金: info[941] !== '',
                理容美容業: info[942] !== '',
                運輸業: info[943] !== '',
                その他サービス: info[944] !== '',
                その他自由記載サービス: info[945] !== ''
              },
              受付開始時間:
                  info[946] === ''
                    ? ''
                    : typeof info[946] === 'object'
                      ? Utilities.formatDate(info[946], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[946], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[946], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[946], 'JST', 'HH:mm')
                      : info[946].length >= 5 && info[946].indexOf('0') === 0
                        ? info[946].replace('0', '')
                        : info[946],
              受付終了時間:
                  info[947] === ''
                    ? ''
                    : typeof info[947] === 'object'
                      ? Utilities.formatDate(info[947], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[947], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[947], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[947], 'JST', 'HH:mm')
                      : info[947].length >= 5 && info[947].indexOf('0') === 0
                        ? info[947].replace('0', '')
                        : info[947],
              受付時間の補足: info[948],
              加盟店向けサービス問合せ電話番号: info[949],
              加盟店向けサービス問合せメールアドレス: info[950],
              加盟店向けサービス問合せ備考: info[952]
            }
            : null,
          // 個票9.
          info[953] !== '' || info[954] !== '' || info[955] !== '' || info[956] !== '' || info[958] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[953] !== '' ? info[953].split('、') : [],
                電子マネー: info[954] !== '' ? info[954].split('、') : [],
                QRコード: info[955] !== '' ? info[955].split('、') : [],
                その他: info[956] !== '' ? info[956].split('、') : []
              },
              サービスURL: info[957],
              決済手数料: {
                還元実施期間中:
                    typeof info[958] === 'number'
                      ? '〜' + (info[958] * 100).toFixed(2) + '%'
                      : info[958] !== '' && info[958].indexOf('~') === -1 && info[958].indexOf('～') === -1 && info[958].indexOf('〜') === -1
                        ? '〜' + info[958].replace(/ /g, '')
                        : info[958]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[959],
                還元実施期間前:
                    typeof info[960] === 'number' && info[960] < 1
                      ? (info[960] * 100).toFixed(2) + '%'
                      : typeof info[960] === 'number' && info[960] >= 1
                        ? info[960].toFixed(2) + '%'
                        : info[960]
              },
              発生する費用: {
                期間中: {
                  費目1: info[961],
                  費目2: info[962],
                  費目3: info[963],
                  費目4: '',
                  金額1: info[964],
                  金額2: info[965],
                  金額3: info[966],
                  金額4: '',
                  単位1: info[967],
                  単位2: info[968],
                  単位3: info[969],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[970],
                  費目2: info[971],
                  費目3: info[972],
                  費目4: '',
                  金額1: info[973],
                  金額2: info[974],
                  金額3: info[975],
                  金額4: '',
                  単位1: info[976],
                  単位2: info[977],
                  単位3: info[978],
                  単位4: ''
                }
              },
              入金タイミング: info[985],
              月次一括の場合の締日: info[986],
              月次一括の場合の支払日: info[987],
              複数回の場合の回数: info[988],
              入金サイクル: info[989],
              振込手数料: info[990],
              サービス提供エリア: [
                info[991] !== '' ? '全国' : '',
                info[992] !== '' ? '北海道' : '',
                info[993] !== '' ? '東北' : '',
                info[994] !== '' ? '青森県' : '',
                info[995] !== '' ? '岩手県' : '',
                info[996] !== '' ? '秋田県' : '',
                info[997] !== '' ? '宮城県' : '',
                info[998] !== '' ? '山形県' : '',
                info[999] !== '' ? '福島県' : '',
                info[1000] !== '' ? '関東' : '',
                info[1001] !== '' ? '茨城県' : '',
                info[1002] !== '' ? '栃木県' : '',
                info[1003] !== '' ? '群馬県' : '',
                info[1004] !== '' ? '埼玉県' : '',
                info[1005] !== '' ? '千葉県' : '',
                info[1006] !== '' ? '東京都' : '',
                info[1007] !== '' ? '神奈川県' : '',
                info[1008] !== '' ? '中部' : '',
                info[1009] !== '' ? '新潟県' : '',
                info[1010] !== '' ? '富山県' : '',
                info[1011] !== '' ? '石川県' : '',
                info[1012] !== '' ? '福井県' : '',
                info[1013] !== '' ? '山梨県' : '',
                info[1014] !== '' ? '長野県' : '',
                info[1015] !== '' ? '岐阜県' : '',
                info[1016] !== '' ? '静岡県' : '',
                info[1017] !== '' ? '愛知県' : '',
                info[1018] !== '' ? '近畿' : '',
                info[1019] !== '' ? '三重県' : '',
                info[1020] !== '' ? '滋賀県' : '',
                info[1021] !== '' ? '奈良県' : '',
                info[1022] !== '' ? '和歌山県' : '',
                info[1023] !== '' ? '京都府' : '',
                info[1024] !== '' ? '大阪府' : '',
                info[1025] !== '' ? '兵庫県' : '',
                info[1026] !== '' ? '中国' : '',
                info[1027] !== '' ? '岡山県' : '',
                info[1028] !== '' ? '広島県' : '',
                info[1029] !== '' ? '鳥取県' : '',
                info[1030] !== '' ? '島根県' : '',
                info[1031] !== '' ? '山口県' : '',
                info[1032] !== '' ? '四国' : '',
                info[1033] !== '' ? '香川県' : '',
                info[1034] !== '' ? '徳島県' : '',
                info[1035] !== '' ? '愛媛県' : '',
                info[1036] !== '' ? '高知県' : '',
                info[1037] !== '' ? '九州' : '',
                info[1038] !== '' ? '福岡県' : '',
                info[1039] !== '' ? '佐賀県' : '',
                info[1040] !== '' ? '長崎県' : '',
                info[1041] !== '' ? '大分県' : '',
                info[1042] !== '' ? '熊本県' : '',
                info[1043] !== '' ? '宮崎県' : '',
                info[1044] !== '' ? '鹿児島県' : '',
                info[1045] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[1046] !== '',
                食料品: info[1047] !== '',
                衣料品: info[1048] !== '',
                貴金属服飾品: info[1049] !== '',
                電化製品: info[1050] !== '',
                家具調度品: info[1051] !== '',
                書籍玩具音楽CD: info[1052] !== '',
                EC通信販売: info[1053] !== '',
                ガソリンスタンド: info[1054] !== '',
                その他小売業: info[1055] !== '',
                飲食業: info[1056] !== '',
                宿泊業: info[1057] !== '',
                公共料金: info[1058] !== '',
                理容美容業: info[1059] !== '',
                運輸業: info[1060] !== '',
                その他サービス: info[1061] !== '',
                その他自由記載サービス: info[1062] !== ''
              },
              受付開始時間:
                  info[1063] === ''
                    ? ''
                    : typeof info[1063] === 'object'
                      ? Utilities.formatDate(info[1063], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[1063], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[1063], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[1063], 'JST', 'HH:mm')
                      : info[1063].length >= 5 && info[1063].indexOf('0') === 0
                        ? info[1063].replace('0', '')
                        : info[1063],
              受付終了時間:
                  info[1064] === ''
                    ? ''
                    : typeof info[1064] === 'object'
                      ? Utilities.formatDate(info[1064], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[1064], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[1064], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[1064], 'JST', 'HH:mm')
                      : info[1064].length >= 5 && info[1064].indexOf('0') === 0
                        ? info[1064].replace('0', '')
                        : info[1064],
              受付時間の補足: info[1065],
              加盟店向けサービス問合せ電話番号: info[1066],
              加盟店向けサービス問合せメールアドレス: info[1067],
              加盟店向けサービス問合せ備考: info[1069]
            }
            : null,
          // 個票10.
          info[1070] !== '' || info[1071] !== '' || info[1072] !== '' || info[1073] !== '' || info[1075] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[1070] !== '' ? info[1070].split('、') : [],
                電子マネー: info[1071] !== '' ? info[1071].split('、') : [],
                QRコード: info[1072] !== '' ? info[1072].split('、') : [],
                その他: info[1073] !== '' ? info[1073].split('、') : []
              },
              サービスURL: info[1074],
              決済手数料: {
                還元実施期間中:
                    typeof info[1075] === 'number'
                      ? '〜' + (info[1075] * 100).toFixed(2) + '%'
                      : info[1075] !== '' && info[1075].indexOf('~') === -1 && info[1075].indexOf('～') === -1 && info[1075].indexOf('〜') === -1
                        ? '〜' + info[1075].replace(/ /g, '')
                        : info[1075]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[1076],
                還元実施期間前:
                    typeof info[1077] === 'number' && info[1077] < 1
                      ? (info[1077] * 100).toFixed(2) + '%'
                      : typeof info[1077] === 'number' && info[1077] >= 1
                        ? info[1077].toFixed(2) + '%'
                        : info[1077]
              },
              発生する費用: {
                期間中: {
                  費目1: info[1078],
                  費目2: info[1079],
                  費目3: info[1080],
                  費目4: '',
                  金額1: info[1081],
                  金額2: info[1082],
                  金額3: info[1083],
                  金額4: '',
                  単位1: info[1084],
                  単位2: info[1085],
                  単位3: info[1086],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[1087],
                  費目2: info[1088],
                  費目3: info[1089],
                  費目4: '',
                  金額1: info[1090],
                  金額2: info[1091],
                  金額3: info[1092],
                  金額4: '',
                  単位1: info[1093],
                  単位2: info[1094],
                  単位3: info[1095],
                  単位4: ''
                }
              },
              入金タイミング: info[1102],
              月次一括の場合の締日: info[1103],
              月次一括の場合の支払日: info[1104],
              複数回の場合の回数: info[1105],
              入金サイクル: info[1106],
              振込手数料: info[1107],
              サービス提供エリア: [
                info[1108] !== '' ? '全国' : '',
                info[1109] !== '' ? '北海道' : '',
                info[1110] !== '' ? '東北' : '',
                info[1111] !== '' ? '青森県' : '',
                info[1112] !== '' ? '岩手県' : '',
                info[1113] !== '' ? '秋田県' : '',
                info[1114] !== '' ? '宮城県' : '',
                info[1115] !== '' ? '山形県' : '',
                info[1116] !== '' ? '福島県' : '',
                info[1117] !== '' ? '関東' : '',
                info[1118] !== '' ? '茨城県' : '',
                info[1119] !== '' ? '栃木県' : '',
                info[1120] !== '' ? '群馬県' : '',
                info[1121] !== '' ? '埼玉県' : '',
                info[1122] !== '' ? '千葉県' : '',
                info[1123] !== '' ? '東京都' : '',
                info[1124] !== '' ? '神奈川県' : '',
                info[1125] !== '' ? '中部' : '',
                info[1126] !== '' ? '新潟県' : '',
                info[1127] !== '' ? '富山県' : '',
                info[1128] !== '' ? '石川県' : '',
                info[1129] !== '' ? '福井県' : '',
                info[1130] !== '' ? '山梨県' : '',
                info[1131] !== '' ? '長野県' : '',
                info[1132] !== '' ? '岐阜県' : '',
                info[1133] !== '' ? '静岡県' : '',
                info[1134] !== '' ? '愛知県' : '',
                info[1135] !== '' ? '近畿' : '',
                info[1136] !== '' ? '三重県' : '',
                info[1137] !== '' ? '滋賀県' : '',
                info[1138] !== '' ? '奈良県' : '',
                info[1139] !== '' ? '和歌山県' : '',
                info[1140] !== '' ? '京都府' : '',
                info[1141] !== '' ? '大阪府' : '',
                info[1142] !== '' ? '兵庫県' : '',
                info[1143] !== '' ? '中国' : '',
                info[1144] !== '' ? '岡山県' : '',
                info[1145] !== '' ? '広島県' : '',
                info[1146] !== '' ? '鳥取県' : '',
                info[1147] !== '' ? '島根県' : '',
                info[1148] !== '' ? '山口県' : '',
                info[1149] !== '' ? '四国' : '',
                info[1150] !== '' ? '香川県' : '',
                info[1151] !== '' ? '徳島県' : '',
                info[1152] !== '' ? '愛媛県' : '',
                info[1153] !== '' ? '高知県' : '',
                info[1154] !== '' ? '九州' : '',
                info[1155] !== '' ? '福岡県' : '',
                info[1156] !== '' ? '佐賀県' : '',
                info[1157] !== '' ? '長崎県' : '',
                info[1158] !== '' ? '大分県' : '',
                info[1159] !== '' ? '熊本県' : '',
                info[1160] !== '' ? '宮崎県' : '',
                info[1161] !== '' ? '鹿児島県' : '',
                info[1162] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[1163] !== '',
                食料品: info[1164] !== '',
                衣料品: info[1165] !== '',
                貴金属服飾品: info[1166] !== '',
                電化製品: info[1167] !== '',
                家具調度品: info[1168] !== '',
                書籍玩具音楽CD: info[1169] !== '',
                EC通信販売: info[1170] !== '',
                ガソリンスタンド: info[1171] !== '',
                その他小売業: info[1172] !== '',
                飲食業: info[1173] !== '',
                宿泊業: info[1174] !== '',
                公共料金: info[1175] !== '',
                理容美容業: info[1176] !== '',
                運輸業: info[1177] !== '',
                その他サービス: info[1178] !== '',
                その他自由記載サービス: info[1179] !== ''
              },
              受付開始時間:
                  info[1180] === ''
                    ? ''
                    : typeof info[1180] === 'object'
                      ? Utilities.formatDate(info[1180], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[1180], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[1180], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[1180], 'JST', 'HH:mm')
                      : info[1180].length >= 5 && info[1180].indexOf('0') === 0
                        ? info[1180].replace('0', '')
                        : info[1180],
              受付終了時間:
                  info[1181] === ''
                    ? ''
                    : typeof info[1181] === 'object'
                      ? Utilities.formatDate(info[1181], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[1181], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[1181], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[1181], 'JST', 'HH:mm')
                      : info[1181].length >= 5 && info[1181].indexOf('0') === 0
                        ? info[1181].replace('0', '')
                        : info[1181],
              受付時間の補足: info[1182],
              加盟店向けサービス問合せ電話番号: info[1183],
              加盟店向けサービス問合せメールアドレス: info[1184],
              加盟店向けサービス問合せ備考: info[1186]
            }
            : null
        ].filter((info): DetailTypeB | null => {
          return info
        }),
        // 決済端末 x 10.
        対応可能な決済端末: [
          // 決済端末1.
          info[1190] !== '' && info[1190] !== 0
            ? {
              種別: info[1190] !== '' && info[1190] !== 0 ? info[1190] : '',
              メーカー名: info[1191] !== '' && info[1191] !== 0 ? info[1191] : '',
              製品名: info[1192] !== '' && info[1192] !== 0 ? info[1192] : '',
              型番: info[1193] !== '' && info[1193] !== 0 ? info[1193] : '',
              画像ファイル名: info[1194] !== '' && info[1194] !== 0 ? info[1194] : '',
              製品URL: info[1195] !== '' && info[1195] !== 0 ? info[1195] : '',
              幅: info[1196] !== '' && info[1196] !== 0 ? info[1196] : '',
              高さ: info[1197] !== '' && info[1197] !== 0 ? info[1197] : '',
              奥行: info[1198] !== '' && info[1198] !== 0 ? info[1198] : '',
              重量: info[1199] !== '' && info[1199] !== 0 ? info[1199] : '',
              有線LAN: info[1200] !== '' && info[1200] !== 0,
              USB: info[1201] !== '' && info[1201] !== 0,
              WiFi: info[1202] !== '' && info[1202] !== 0,
              Bluetooth: info[1203] !== '' && info[1203] !== 0,
              モバイル通信: info[1204] !== '' && info[1204] !== 0,
              通信規格その他: info[1205] !== '' && info[1205] !== 0 ? info[1205] : '',
              電源式: info[1206] !== '' && info[1206] !== 0,
              電池式: info[1207] !== '' && info[1207] !== 0,
              電源その他: info[1208] !== '' && info[1208] !== 0 ? info[1208] : '',
              付属品1種類: info[1209] !== '' && info[1209] !== 0 ? info[1209] : '',
              付属品1型番: info[1210] !== '' && info[1210] !== 0 ? info[1210] : '',
              付属品2種類: info[1211] !== '' && info[1211] !== 0 ? info[1211] : '',
              付属品2型番: info[1212] !== '' && info[1212] !== 0 ? info[1212] : '',
              付属品3種類: info[1213] !== '' && info[1213] !== 0 ? info[1213] : '',
              付属品3型番: info[1214] !== '' && info[1214] !== 0 ? info[1214] : '',
              付属品4種類: info[1215] !== '' && info[1215] !== 0 ? info[1215] : '',
              付属品4型番: info[1216] !== '' && info[1216] !== 0 ? info[1216] : '',
              付属品5種類: info[1217] !== '' && info[1217] !== 0 ? info[1217] : '',
              付属品5型番: info[1218] !== '' && info[1218] !== 0 ? info[1218] : '',
              端末対応キャッシュレス区分クレジットカード: info[1223] !== '' && info[1223] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1224] !== '' && info[1224] !== 0,
              端末対応キャッシュレス区分QRコード: info[1225] !== '' && info[1225] !== 0,
              端末対応キャッシュレス区分その他: info[1226] !== '' && info[1226] !== 0,
              端末対応キャッシュレス区分JDebit: info[1227] !== '' && info[1227] !== 0
            }
            : null,
          // 決済端末2.
          info[1243] !== '' && info[1243] !== 0
            ? {
              種別: info[1243] !== '' && info[1243] !== 0 ? info[1243] : '',
              メーカー名: info[1244] !== '' && info[1244] !== 0 ? info[1244] : '',
              製品名: info[1245] !== '' && info[1245] !== 0 ? info[1245] : '',
              型番: info[1246] !== '' && info[1246] !== 0 ? info[1246] : '',
              画像ファイル名: info[1247] !== '' && info[1247] !== 0 ? info[1247] : '',
              製品URL: info[1248] !== '' && info[1248] !== 0 ? info[1248] : '',
              幅: info[1249] !== '' && info[1249] !== 0 ? info[1249] : '',
              高さ: info[1250] !== '' && info[1250] !== 0 ? info[1250] : '',
              奥行: info[1251] !== '' && info[1251] !== 0 ? info[1251] : '',
              重量: info[1252] !== '' && info[1252] !== 0 ? info[1252] : '',
              有線LAN: info[1253] !== '' && info[1253] !== 0,
              USB: info[1254] !== '' && info[1254] !== 0,
              WiFi: info[1255] !== '' && info[1255] !== 0,
              Bluetooth: info[1256] !== '' && info[1256] !== 0,
              モバイル通信: info[1257] !== '' && info[1257] !== 0,
              通信規格その他: info[1258] !== '' && info[1258] !== 0 ? info[1258] : '',
              電源式: info[1259] !== '' && info[1259] !== 0,
              電池式: info[1260] !== '' && info[1260] !== 0,
              電源その他: info[1261] !== '' && info[1261] !== 0 ? info[1261] : '',
              付属品1種類: info[1262] !== '' && info[1262] !== 0 ? info[1262] : '',
              付属品1型番: info[1263] !== '' && info[1263] !== 0 ? info[1263] : '',
              付属品2種類: info[1264] !== '' && info[1264] !== 0 ? info[1264] : '',
              付属品2型番: info[1265] !== '' && info[1265] !== 0 ? info[1265] : '',
              付属品3種類: info[1266] !== '' && info[1266] !== 0 ? info[1266] : '',
              付属品3型番: info[1267] !== '' && info[1267] !== 0 ? info[1267] : '',
              付属品4種類: info[1268] !== '' && info[1268] !== 0 ? info[1268] : '',
              付属品4型番: info[1269] !== '' && info[1269] !== 0 ? info[1269] : '',
              付属品5種類: info[1270] !== '' && info[1270] !== 0 ? info[1270] : '',
              付属品5型番: info[1271] !== '' && info[1271] !== 0 ? info[1271] : '',
              端末対応キャッシュレス区分クレジットカード: info[1276] !== '' && info[1276] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1277] !== '' && info[1277] !== 0,
              端末対応キャッシュレス区分QRコード: info[1278] !== '' && info[1278] !== 0,
              端末対応キャッシュレス区分その他: info[1279] !== '' && info[1279] !== 0,
              端末対応キャッシュレス区分JDebit: info[1280] !== '' && info[1280] !== 0
            }
            : null,
          // 決済端末3.
          info[1296] !== '' && info[1296] !== 0
            ? {
              種別: info[1296] !== '' && info[1296] !== 0 ? info[1296] : '',
              メーカー名: info[1297] !== '' && info[1297] !== 0 ? info[1297] : '',
              製品名: info[1298] !== '' && info[1298] !== 0 ? info[1298] : '',
              型番: info[1299] !== '' && info[1299] !== 0 ? info[1299] : '',
              画像ファイル名: info[1300] !== '' && info[1300] !== 0 ? info[1300] : '',
              製品URL: info[1301] !== '' && info[1301] !== 0 ? info[1301] : '',
              幅: info[1302] !== '' && info[1302] !== 0 ? info[1302] : '',
              高さ: info[1303] !== '' && info[1303] !== 0 ? info[1303] : '',
              奥行: info[1304] !== '' && info[1304] !== 0 ? info[1304] : '',
              重量: info[1305] !== '' && info[1305] !== 0 ? info[1305] : '',
              有線LAN: info[1306] !== '' && info[1306] !== 0,
              USB: info[1307] !== '' && info[1307] !== 0,
              WiFi: info[1308] !== '' && info[1308] !== 0,
              Bluetooth: info[1309] !== '' && info[1309] !== 0,
              モバイル通信: info[1310] !== '' && info[1310] !== 0,
              通信規格その他: info[1311] !== '' && info[1311] !== 0 ? info[1311] : '',
              電源式: info[1312] !== '' && info[1312] !== 0,
              電池式: info[1313] !== '' && info[1313] !== 0,
              電源その他: info[1314] !== '' && info[1314] !== 0 ? info[1314] : '',
              付属品1種類: info[1315] !== '' && info[1315] !== 0 ? info[1315] : '',
              付属品1型番: info[1316] !== '' && info[1316] !== 0 ? info[1316] : '',
              付属品2種類: info[1317] !== '' && info[1317] !== 0 ? info[1317] : '',
              付属品2型番: info[1318] !== '' && info[1318] !== 0 ? info[1318] : '',
              付属品3種類: info[1319] !== '' && info[1319] !== 0 ? info[1319] : '',
              付属品3型番: info[1320] !== '' && info[1320] !== 0 ? info[1320] : '',
              付属品4種類: info[1321] !== '' && info[1321] !== 0 ? info[1321] : '',
              付属品4型番: info[1322] !== '' && info[1322] !== 0 ? info[1322] : '',
              付属品5種類: info[1323] !== '' && info[1323] !== 0 ? info[1323] : '',
              付属品5型番: info[1324] !== '' && info[1324] !== 0 ? info[1324] : '',
              端末対応キャッシュレス区分クレジットカード: info[1329] !== '' && info[1329] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1330] !== '' && info[1330] !== 0,
              端末対応キャッシュレス区分QRコード: info[1331] !== '' && info[1331] !== 0,
              端末対応キャッシュレス区分その他: info[1332] !== '' && info[1332] !== 0,
              端末対応キャッシュレス区分JDebit: info[1333] !== '' && info[1333] !== 0
            }
            : null,
          // 決済端末4.
          info[1349] !== '' && info[1349] !== 0
            ? {
              種別: info[1349] !== '' && info[1349] !== 0 ? info[1349] : '',
              メーカー名: info[1350] !== '' && info[1350] !== 0 ? info[1350] : '',
              製品名: info[1351] !== '' && info[1351] !== 0 ? info[1351] : '',
              型番: info[1352] !== '' && info[1352] !== 0 ? info[1352] : '',
              画像ファイル名: info[1353] !== '' && info[1353] !== 0 ? info[1353] : '',
              製品URL: info[1354] !== '' && info[1354] !== 0 ? info[1354] : '',
              幅: info[1355] !== '' && info[1355] !== 0 ? info[1355] : '',
              高さ: info[1356] !== '' && info[1356] !== 0 ? info[1356] : '',
              奥行: info[1357] !== '' && info[1357] !== 0 ? info[1357] : '',
              重量: info[1358] !== '' && info[1358] !== 0 ? info[1358] : '',
              有線LAN: info[1359] !== '' && info[1359] !== 0,
              USB: info[1360] !== '' && info[1360] !== 0,
              WiFi: info[1361] !== '' && info[1361] !== 0,
              Bluetooth: info[1362] !== '' && info[1362] !== 0,
              モバイル通信: info[1363] !== '' && info[1363] !== 0,
              通信規格その他: info[1364] !== '' && info[1364] !== 0 ? info[1364] : '',
              電源式: info[1365] !== '' && info[1365] !== 0,
              電池式: info[1366] !== '' && info[1366] !== 0,
              電源その他: info[1367] !== '' && info[1367] !== 0 ? info[1367] : '',
              付属品1種類: info[1368] !== '' && info[1368] !== 0 ? info[1368] : '',
              付属品1型番: info[1369] !== '' && info[1369] !== 0 ? info[1369] : '',
              付属品2種類: info[1370] !== '' && info[1370] !== 0 ? info[1370] : '',
              付属品2型番: info[1371] !== '' && info[1371] !== 0 ? info[1371] : '',
              付属品3種類: info[1372] !== '' && info[1372] !== 0 ? info[1372] : '',
              付属品3型番: info[1373] !== '' && info[1373] !== 0 ? info[1373] : '',
              付属品4種類: info[1374] !== '' && info[1374] !== 0 ? info[1374] : '',
              付属品4型番: info[1375] !== '' && info[1375] !== 0 ? info[1375] : '',
              付属品5種類: info[1376] !== '' && info[1376] !== 0 ? info[1376] : '',
              付属品5型番: info[1377] !== '' && info[1377] !== 0 ? info[1377] : '',
              端末対応キャッシュレス区分クレジットカード: info[1382] !== '' && info[1382] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1383] !== '' && info[1383] !== 0,
              端末対応キャッシュレス区分QRコード: info[1384] !== '' && info[1384] !== 0,
              端末対応キャッシュレス区分その他: info[1385] !== '' && info[1385] !== 0,
              端末対応キャッシュレス区分JDebit: info[1386] !== '' && info[1386] !== 0
            }
            : null,
          // 決済端末5.
          info[1402] !== '' && info[1402] !== 0
            ? {
              種別: info[1402] !== '' && info[1402] !== 0 ? info[1402] : '',
              メーカー名: info[1403] !== '' && info[1403] !== 0 ? info[1403] : '',
              製品名: info[1404] !== '' && info[1404] !== 0 ? info[1404] : '',
              型番: info[1405] !== '' && info[1405] !== 0 ? info[1405] : '',
              画像ファイル名: info[1406] !== '' && info[1406] !== 0 ? info[1406] : '',
              製品URL: info[1407] !== '' && info[1407] !== 0 ? info[1407] : '',
              幅: info[1408] !== '' && info[1408] !== 0 ? info[1408] : '',
              高さ: info[1409] !== '' && info[1409] !== 0 ? info[1409] : '',
              奥行: info[1410] !== '' && info[1410] !== 0 ? info[1410] : '',
              重量: info[1411] !== '' && info[1411] !== 0 ? info[1411] : '',
              有線LAN: info[1412] !== '' && info[1412] !== 0,
              USB: info[1413] !== '' && info[1413] !== 0,
              WiFi: info[1414] !== '' && info[1414] !== 0,
              Bluetooth: info[1415] !== '' && info[1415] !== 0,
              モバイル通信: info[1416] !== '' && info[1416] !== 0,
              通信規格その他: info[1417] !== '' && info[1417] !== 0 ? info[1417] : '',
              電源式: info[1418] !== '' && info[1418] !== 0,
              電池式: info[1419] !== '' && info[1419] !== 0,
              電源その他: info[1420] !== '' && info[1420] !== 0 ? info[1420] : '',
              付属品1種類: info[1421] !== '' && info[1421] !== 0 ? info[1421] : '',
              付属品1型番: info[1422] !== '' && info[1422] !== 0 ? info[1422] : '',
              付属品2種類: info[1423] !== '' && info[1423] !== 0 ? info[1423] : '',
              付属品2型番: info[1424] !== '' && info[1424] !== 0 ? info[1424] : '',
              付属品3種類: info[1425] !== '' && info[1425] !== 0 ? info[1425] : '',
              付属品3型番: info[1426] !== '' && info[1426] !== 0 ? info[1426] : '',
              付属品4種類: info[1427] !== '' && info[1427] !== 0 ? info[1427] : '',
              付属品4型番: info[1428] !== '' && info[1428] !== 0 ? info[1428] : '',
              付属品5種類: info[1429] !== '' && info[1429] !== 0 ? info[1429] : '',
              付属品5型番: info[1430] !== '' && info[1430] !== 0 ? info[1430] : '',
              端末対応キャッシュレス区分クレジットカード: info[1435] !== '' && info[1435] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1436] !== '' && info[1436] !== 0,
              端末対応キャッシュレス区分QRコード: info[1437] !== '' && info[1437] !== 0,
              端末対応キャッシュレス区分その他: info[1438] !== '' && info[1438] !== 0,
              端末対応キャッシュレス区分JDebit: info[1439] !== '' && info[1439] !== 0
            }
            : null,
          // 決済端末6.
          info[1455] !== '' && info[1455] !== 0
            ? {
              種別: info[1455] !== '' && info[1455] !== 0 ? info[1455] : '',
              メーカー名: info[1456] !== '' && info[1456] !== 0 ? info[1456] : '',
              製品名: info[1457] !== '' && info[1457] !== 0 ? info[1457] : '',
              型番: info[1458] !== '' && info[1458] !== 0 ? info[1458] : '',
              画像ファイル名: info[1459] !== '' && info[1459] !== 0 ? info[1459] : '',
              製品URL: info[1460] !== '' && info[1460] !== 0 ? info[1460] : '',
              幅: info[1461] !== '' && info[1461] !== 0 ? info[1461] : '',
              高さ: info[1462] !== '' && info[1462] !== 0 ? info[1462] : '',
              奥行: info[1463] !== '' && info[1463] !== 0 ? info[1463] : '',
              重量: info[1464] !== '' && info[1464] !== 0 ? info[1464] : '',
              有線LAN: info[1465] !== '' && info[1465] !== 0,
              USB: info[1466] !== '' && info[1466] !== 0,
              WiFi: info[1467] !== '' && info[1467] !== 0,
              Bluetooth: info[1468] !== '' && info[1468] !== 0,
              モバイル通信: info[1469] !== '' && info[1469] !== 0,
              通信規格その他: info[1470] !== '' && info[1470] !== 0 ? info[1470] : '',
              電源式: info[1471] !== '' && info[1471] !== 0,
              電池式: info[1472] !== '' && info[1472] !== 0,
              電源その他: info[1473] !== '' && info[1473] !== 0 ? info[1473] : '',
              付属品1種類: info[1474] !== '' && info[1474] !== 0 ? info[1474] : '',
              付属品1型番: info[1475] !== '' && info[1475] !== 0 ? info[1475] : '',
              付属品2種類: info[1476] !== '' && info[1476] !== 0 ? info[1476] : '',
              付属品2型番: info[1477] !== '' && info[1477] !== 0 ? info[1477] : '',
              付属品3種類: info[1478] !== '' && info[1478] !== 0 ? info[1478] : '',
              付属品3型番: info[1479] !== '' && info[1479] !== 0 ? info[1479] : '',
              付属品4種類: info[1480] !== '' && info[1480] !== 0 ? info[1480] : '',
              付属品4型番: info[1481] !== '' && info[1481] !== 0 ? info[1481] : '',
              付属品5種類: info[1482] !== '' && info[1482] !== 0 ? info[1482] : '',
              付属品5型番: info[1483] !== '' && info[1483] !== 0 ? info[1483] : '',
              端末対応キャッシュレス区分クレジットカード: info[1488] !== '' && info[1488] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1489] !== '' && info[1489] !== 0,
              端末対応キャッシュレス区分QRコード: info[1490] !== '' && info[1490] !== 0,
              端末対応キャッシュレス区分その他: info[1491] !== '' && info[1491] !== 0,
              端末対応キャッシュレス区分JDebit: info[1492] !== '' && info[1492] !== 0
            }
            : null,
          // 決済端末7.
          info[1508] !== '' && info[1508] !== 0
            ? {
              種別: info[1508] !== '' && info[1508] !== 0 ? info[1508] : '',
              メーカー名: info[1509] !== '' && info[1509] !== 0 ? info[1509] : '',
              製品名: info[1510] !== '' && info[1510] !== 0 ? info[1510] : '',
              型番: info[1511] !== '' && info[1511] !== 0 ? info[1511] : '',
              画像ファイル名: info[1512] !== '' && info[1512] !== 0 ? info[1512] : '',
              製品URL: info[1513] !== '' && info[1513] !== 0 ? info[1513] : '',
              幅: info[1514] !== '' && info[1514] !== 0 ? info[1514] : '',
              高さ: info[1515] !== '' && info[1515] !== 0 ? info[1515] : '',
              奥行: info[1516] !== '' && info[1516] !== 0 ? info[1516] : '',
              重量: info[1517] !== '' && info[1517] !== 0 ? info[1517] : '',
              有線LAN: info[1518] !== '' && info[1518] !== 0,
              USB: info[1519] !== '' && info[1519] !== 0,
              WiFi: info[1520] !== '' && info[1520] !== 0,
              Bluetooth: info[1521] !== '' && info[1521] !== 0,
              モバイル通信: info[1522] !== '' && info[1522] !== 0,
              通信規格その他: info[1523] !== '' && info[1523] !== 0 ? info[1523] : '',
              電源式: info[1524] !== '' && info[1524] !== 0,
              電池式: info[1525] !== '' && info[1525] !== 0,
              電源その他: info[1526] !== '' && info[1526] !== 0 ? info[1526] : '',
              付属品1種類: info[1527] !== '' && info[1527] !== 0 ? info[1527] : '',
              付属品1型番: info[1528] !== '' && info[1528] !== 0 ? info[1528] : '',
              付属品2種類: info[1529] !== '' && info[1529] !== 0 ? info[1529] : '',
              付属品2型番: info[1530] !== '' && info[1530] !== 0 ? info[1530] : '',
              付属品3種類: info[1531] !== '' && info[1531] !== 0 ? info[1531] : '',
              付属品3型番: info[1532] !== '' && info[1532] !== 0 ? info[1532] : '',
              付属品4種類: info[1533] !== '' && info[1533] !== 0 ? info[1533] : '',
              付属品4型番: info[1534] !== '' && info[1534] !== 0 ? info[1534] : '',
              付属品5種類: info[1535] !== '' && info[1535] !== 0 ? info[1535] : '',
              付属品5型番: info[1536] !== '' && info[1536] !== 0 ? info[1536] : '',
              端末対応キャッシュレス区分クレジットカード: info[1541] !== '' && info[1541] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1542] !== '' && info[1542] !== 0,
              端末対応キャッシュレス区分QRコード: info[1543] !== '' && info[1543] !== 0,
              端末対応キャッシュレス区分その他: info[1544] !== '' && info[1544] !== 0,
              端末対応キャッシュレス区分JDebit: info[1545] !== '' && info[1545] !== 0
            }
            : null,
          // 決済端末8.
          info[1561] !== '' && info[1561] !== 0
            ? {
              種別: info[1561] !== '' && info[1561] !== 0 ? info[1561] : '',
              メーカー名: info[1562] !== '' && info[1562] !== 0 ? info[1562] : '',
              製品名: info[1563] !== '' && info[1563] !== 0 ? info[1563] : '',
              型番: info[1564] !== '' && info[1564] !== 0 ? info[1564] : '',
              画像ファイル名: info[1565] !== '' && info[1565] !== 0 ? info[1565] : '',
              製品URL: info[1566] !== '' && info[1566] !== 0 ? info[1566] : '',
              幅: info[1567] !== '' && info[1567] !== 0 ? info[1567] : '',
              高さ: info[1568] !== '' && info[1568] !== 0 ? info[1568] : '',
              奥行: info[1569] !== '' && info[1569] !== 0 ? info[1569] : '',
              重量: info[1570] !== '' && info[1570] !== 0 ? info[1570] : '',
              有線LAN: info[1571] !== '' && info[1571] !== 0,
              USB: info[1572] !== '' && info[1572] !== 0,
              WiFi: info[1573] !== '' && info[1573] !== 0,
              Bluetooth: info[1574] !== '' && info[1574] !== 0,
              モバイル通信: info[1575] !== '' && info[1575] !== 0,
              通信規格その他: info[1576] !== '' && info[1576] !== 0 ? info[1576] : '',
              電源式: info[1577] !== '' && info[1577] !== 0,
              電池式: info[1578] !== '' && info[1578] !== 0,
              電源その他: info[1579] !== '' && info[1579] !== 0 ? info[1579] : '',
              付属品1種類: info[1580] !== '' && info[1580] !== 0 ? info[1580] : '',
              付属品1型番: info[1581] !== '' && info[1581] !== 0 ? info[1581] : '',
              付属品2種類: info[1582] !== '' && info[1582] !== 0 ? info[1582] : '',
              付属品2型番: info[1583] !== '' && info[1583] !== 0 ? info[1583] : '',
              付属品3種類: info[1584] !== '' && info[1584] !== 0 ? info[1584] : '',
              付属品3型番: info[1585] !== '' && info[1585] !== 0 ? info[1585] : '',
              付属品4種類: info[1586] !== '' && info[1586] !== 0 ? info[1586] : '',
              付属品4型番: info[1587] !== '' && info[1587] !== 0 ? info[1587] : '',
              付属品5種類: info[1588] !== '' && info[1588] !== 0 ? info[1588] : '',
              付属品5型番: info[1589] !== '' && info[1589] !== 0 ? info[1589] : '',
              端末対応キャッシュレス区分クレジットカード: info[1594] !== '' && info[1594] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1595] !== '' && info[1595] !== 0,
              端末対応キャッシュレス区分QRコード: info[1596] !== '' && info[1596] !== 0,
              端末対応キャッシュレス区分その他: info[1597] !== '' && info[1597] !== 0,
              端末対応キャッシュレス区分JDebit: info[1598] !== '' && info[1598] !== 0
            }
            : null,
          // 決済端末9.
          info[1614] !== '' && info[1614] !== 0
            ? {
              種別: info[1614] !== '' && info[1614] !== 0 ? info[1614] : '',
              メーカー名: info[1615] !== '' && info[1615] !== 0 ? info[1615] : '',
              製品名: info[1616] !== '' && info[1616] !== 0 ? info[1616] : '',
              型番: info[1617] !== '' && info[1617] !== 0 ? info[1617] : '',
              画像ファイル名: info[1618] !== '' && info[1618] !== 0 ? info[1618] : '',
              製品URL: info[1619] !== '' && info[1619] !== 0 ? info[1619] : '',
              幅: info[1620] !== '' && info[1620] !== 0 ? info[1620] : '',
              高さ: info[1621] !== '' && info[1621] !== 0 ? info[1621] : '',
              奥行: info[1622] !== '' && info[1622] !== 0 ? info[1622] : '',
              重量: info[1623] !== '' && info[1623] !== 0 ? info[1623] : '',
              有線LAN: info[1624] !== '' && info[1624] !== 0,
              USB: info[1625] !== '' && info[1625] !== 0,
              WiFi: info[1626] !== '' && info[1626] !== 0,
              Bluetooth: info[1627] !== '' && info[1627] !== 0,
              モバイル通信: info[1628] !== '' && info[1628] !== 0,
              通信規格その他: info[1629] !== '' && info[1629] !== 0 ? info[1629] : '',
              電源式: info[1630] !== '' && info[1630] !== 0,
              電池式: info[1631] !== '' && info[1631] !== 0,
              電源その他: info[1632] !== '' && info[1632] !== 0 ? info[1632] : '',
              付属品1種類: info[1633] !== '' && info[1633] !== 0 ? info[1633] : '',
              付属品1型番: info[1634] !== '' && info[1634] !== 0 ? info[1634] : '',
              付属品2種類: info[1635] !== '' && info[1635] !== 0 ? info[1635] : '',
              付属品2型番: info[1636] !== '' && info[1636] !== 0 ? info[1636] : '',
              付属品3種類: info[1637] !== '' && info[1637] !== 0 ? info[1637] : '',
              付属品3型番: info[1638] !== '' && info[1638] !== 0 ? info[1638] : '',
              付属品4種類: info[1639] !== '' && info[1639] !== 0 ? info[1639] : '',
              付属品4型番: info[1640] !== '' && info[1640] !== 0 ? info[1640] : '',
              付属品5種類: info[1641] !== '' && info[1641] !== 0 ? info[1641] : '',
              付属品5型番: info[1642] !== '' && info[1642] !== 0 ? info[1642] : '',
              端末対応キャッシュレス区分クレジットカード: info[1647] !== '' && info[1647] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1648] !== '' && info[1648] !== 0,
              端末対応キャッシュレス区分QRコード: info[1649] !== '' && info[1649] !== 0,
              端末対応キャッシュレス区分その他: info[1650] !== '' && info[1650] !== 0,
              端末対応キャッシュレス区分JDebit: info[1651] !== '' && info[1651] !== 0
            }
            : null,
          // 決済端末10.
          info[1667] !== '' && info[1667] !== 0
            ? {
              種別: info[1667] !== '' && info[1667] !== 0 ? info[1667] : '',
              メーカー名: info[1668] !== '' && info[1668] !== 0 ? info[1668] : '',
              製品名: info[1669] !== '' && info[1669] !== 0 ? info[1669] : '',
              型番: info[1670] !== '' && info[1670] !== 0 ? info[1670] : '',
              画像ファイル名: info[1671] !== '' && info[1671] !== 0 ? info[1671] : '',
              製品URL: info[1672] !== '' && info[1672] !== 0 ? info[1672] : '',
              幅: info[1673] !== '' && info[1673] !== 0 ? info[1673] : '',
              高さ: info[1674] !== '' && info[1674] !== 0 ? info[1674] : '',
              奥行: info[1675] !== '' && info[1675] !== 0 ? info[1675] : '',
              重量: info[1676] !== '' && info[1676] !== 0 ? info[1676] : '',
              有線LAN: info[1677] !== '' && info[1677] !== 0,
              USB: info[1678] !== '' && info[1678] !== 0,
              WiFi: info[1679] !== '' && info[1679] !== 0,
              Bluetooth: info[1680] !== '' && info[1680] !== 0,
              モバイル通信: info[1681] !== '' && info[1681] !== 0,
              通信規格その他: info[1682] !== '' && info[1682] !== 0 ? info[1682] : '',
              電源式: info[1683] !== '' && info[1683] !== 0,
              電池式: info[1684] !== '' && info[1684] !== 0,
              電源その他: info[1685] !== '' && info[1685] !== 0 ? info[1685] : '',
              付属品1種類: info[1686] !== '' && info[1686] !== 0 ? info[1686] : '',
              付属品1型番: info[1687] !== '' && info[1687] !== 0 ? info[1687] : '',
              付属品2種類: info[1688] !== '' && info[1688] !== 0 ? info[1688] : '',
              付属品2型番: info[1689] !== '' && info[1689] !== 0 ? info[1689] : '',
              付属品3種類: info[1690] !== '' && info[1690] !== 0 ? info[1690] : '',
              付属品3型番: info[1691] !== '' && info[1691] !== 0 ? info[1691] : '',
              付属品4種類: info[1692] !== '' && info[1692] !== 0 ? info[1692] : '',
              付属品4型番: info[1693] !== '' && info[1693] !== 0 ? info[1693] : '',
              付属品5種類: info[1694] !== '' && info[1694] !== 0 ? info[1694] : '',
              付属品5型番: info[1695] !== '' && info[1695] !== 0 ? info[1695] : '',
              端末対応キャッシュレス区分クレジットカード: info[1700] !== '' && info[1700] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1701] !== '' && info[1701] !== 0,
              端末対応キャッシュレス区分QRコード: info[1702] !== '' && info[1702] !== 0,
              端末対応キャッシュレス区分その他: info[1703] !== '' && info[1703] !== 0,
              端末対応キャッシュレス区分JDebit: info[1704] !== '' && info[1704] !== 0
            }
            : null
        ].filter((info): TerminalTypeB | null => {
          return info
        })
      }
      return obj
    }
  )

  return JSON.stringify(dataBase, null, 2)
}

global.onPresentGenerate = (): void => {
  const data = global.createPresentDataBase()
  global.generateJson(data)
}
