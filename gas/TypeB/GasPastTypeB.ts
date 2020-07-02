global.createPastDataBase = (): string => {
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
              振込手数料: info[53],
              サービス提供エリア: [
                info[54] !== '' ? '全国' : '',
                info[55] !== '' ? '北海道' : '',
                info[56] !== '' ? '東北' : '',
                info[57] !== '' ? '青森県' : '',
                info[58] !== '' ? '岩手県' : '',
                info[59] !== '' ? '秋田県' : '',
                info[60] !== '' ? '宮城県' : '',
                info[61] !== '' ? '山形県' : '',
                info[62] !== '' ? '福島県' : '',
                info[63] !== '' ? '関東' : '',
                info[64] !== '' ? '茨城県' : '',
                info[65] !== '' ? '栃木県' : '',
                info[66] !== '' ? '群馬県' : '',
                info[67] !== '' ? '埼玉県' : '',
                info[68] !== '' ? '千葉県' : '',
                info[69] !== '' ? '東京都' : '',
                info[70] !== '' ? '神奈川県' : '',
                info[71] !== '' ? '中部' : '',
                info[72] !== '' ? '新潟県' : '',
                info[73] !== '' ? '富山県' : '',
                info[74] !== '' ? '石川県' : '',
                info[75] !== '' ? '福井県' : '',
                info[76] !== '' ? '山梨県' : '',
                info[77] !== '' ? '長野県' : '',
                info[78] !== '' ? '岐阜県' : '',
                info[79] !== '' ? '静岡県' : '',
                info[80] !== '' ? '愛知県' : '',
                info[81] !== '' ? '近畿' : '',
                info[82] !== '' ? '三重県' : '',
                info[83] !== '' ? '滋賀県' : '',
                info[84] !== '' ? '奈良県' : '',
                info[85] !== '' ? '和歌山県' : '',
                info[86] !== '' ? '京都府' : '',
                info[87] !== '' ? '大阪府' : '',
                info[88] !== '' ? '兵庫県' : '',
                info[89] !== '' ? '中国' : '',
                info[90] !== '' ? '岡山県' : '',
                info[91] !== '' ? '広島県' : '',
                info[92] !== '' ? '鳥取県' : '',
                info[93] !== '' ? '島根県' : '',
                info[94] !== '' ? '山口県' : '',
                info[95] !== '' ? '四国' : '',
                info[96] !== '' ? '香川県' : '',
                info[97] !== '' ? '徳島県' : '',
                info[98] !== '' ? '愛媛県' : '',
                info[99] !== '' ? '高知県' : '',
                info[100] !== '' ? '九州' : '',
                info[101] !== '' ? '福岡県' : '',
                info[102] !== '' ? '佐賀県' : '',
                info[103] !== '' ? '長崎県' : '',
                info[104] !== '' ? '大分県' : '',
                info[105] !== '' ? '熊本県' : '',
                info[106] !== '' ? '宮崎県' : '',
                info[107] !== '' ? '鹿児島県' : '',
                info[108] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[109] !== '',
                食料品: info[110] !== '',
                衣料品: info[111] !== '',
                貴金属服飾品: info[112] !== '',
                電化製品: info[113] !== '',
                家具調度品: info[114] !== '',
                書籍玩具音楽CD: info[115] !== '',
                EC通信販売: info[116] !== '',
                ガソリンスタンド: info[117] !== '',
                その他小売業: info[118] !== '',
                飲食業: info[119] !== '',
                宿泊業: info[120] !== '',
                公共料金: info[121] !== '',
                理容美容業: info[122] !== '',
                運輸業: info[123] !== '',
                その他サービス: info[124] !== '',
                その他自由記載サービス: info[125] !== ''
              },
              受付開始時間:
                  info[126] === ''
                    ? ''
                    : typeof info[126] === 'object'
                      ? Utilities.formatDate(info[126], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[126], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[126], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[126], 'JST', 'HH:mm')
                      : info[126].length >= 5 && info[126].indexOf('0') === 0
                        ? info[126].replace('0', '')
                        : info[126],
              受付終了時間:
                  info[127] === ''
                    ? ''
                    : typeof info[127] === 'object'
                      ? Utilities.formatDate(info[127], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[127], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[127], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[127], 'JST', 'HH:mm')
                      : info[127].length >= 5 && info[127].indexOf('0') === 0
                        ? info[127].replace('0', '')
                        : info[127],
              受付時間の補足: info[128],
              加盟店向けサービス問合せ電話番号: info[129],
              加盟店向けサービス問合せメールアドレス: info[130],
              加盟店向けサービス問合せ備考: info[132]
            }
            : null,
          // 個票2.
          info[133] !== '' || info[134] !== '' || info[135] !== '' || info[136] !== '' || info[138] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[133] !== '' ? info[133].split('、') : [],
                電子マネー: info[134] !== '' ? info[134].split('、') : [],
                QRコード: info[135] !== '' ? info[135].split('、') : [],
                その他: info[136] !== '' ? info[136].split('、') : []
              },
              サービスURL: info[137],
              決済手数料: {
                還元実施期間中:
                    typeof info[138] === 'number'
                      ? '〜' + (info[138] * 100).toFixed(2) + '%'
                      : info[138] !== '' && info[138].indexOf('~') === -1 && info[138].indexOf('～') === -1 && info[138].indexOf('〜') === -1
                        ? '〜' + info[138].replace(/ /g, '')
                        : info[138]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[139],
                還元実施期間前:
                    typeof info[140] === 'number' && info[140] < 1
                      ? (info[140] * 100).toFixed(2) + '%'
                      : typeof info[140] === 'number' && info[140] >= 1
                        ? info[140].toFixed(2) + '%'
                        : info[140]
              },
              発生する費用: {
                期間中: {
                  費目1: info[141],
                  費目2: info[142],
                  費目3: info[143],
                  費目4: '',
                  金額1: info[144],
                  金額2: info[145],
                  金額3: info[146],
                  金額4: '',
                  単位1: info[147],
                  単位2: info[148],
                  単位3: info[149],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[150],
                  費目2: info[151],
                  費目3: info[152],
                  費目4: '',
                  金額1: info[153],
                  金額2: info[154],
                  金額3: info[155],
                  金額4: '',
                  単位1: info[156],
                  単位2: info[157],
                  単位3: info[158],
                  単位4: ''
                }
              },
              入金タイミング: info[165],
              月次一括の場合の締日: info[166],
              月次一括の場合の支払日: info[167],
              複数回の場合の回数: info[168],
              振込手数料: info[169],
              サービス提供エリア: [
                info[170] !== '' ? '全国' : '',
                info[171] !== '' ? '北海道' : '',
                info[172] !== '' ? '東北' : '',
                info[173] !== '' ? '青森県' : '',
                info[174] !== '' ? '岩手県' : '',
                info[175] !== '' ? '秋田県' : '',
                info[176] !== '' ? '宮城県' : '',
                info[177] !== '' ? '山形県' : '',
                info[178] !== '' ? '福島県' : '',
                info[179] !== '' ? '関東' : '',
                info[180] !== '' ? '茨城県' : '',
                info[181] !== '' ? '栃木県' : '',
                info[182] !== '' ? '群馬県' : '',
                info[183] !== '' ? '埼玉県' : '',
                info[184] !== '' ? '千葉県' : '',
                info[185] !== '' ? '東京都' : '',
                info[186] !== '' ? '神奈川県' : '',
                info[187] !== '' ? '中部' : '',
                info[188] !== '' ? '新潟県' : '',
                info[189] !== '' ? '富山県' : '',
                info[190] !== '' ? '石川県' : '',
                info[191] !== '' ? '福井県' : '',
                info[192] !== '' ? '山梨県' : '',
                info[193] !== '' ? '長野県' : '',
                info[194] !== '' ? '岐阜県' : '',
                info[195] !== '' ? '静岡県' : '',
                info[196] !== '' ? '愛知県' : '',
                info[197] !== '' ? '近畿' : '',
                info[198] !== '' ? '三重県' : '',
                info[199] !== '' ? '滋賀県' : '',
                info[200] !== '' ? '奈良県' : '',
                info[201] !== '' ? '和歌山県' : '',
                info[202] !== '' ? '京都府' : '',
                info[203] !== '' ? '大阪府' : '',
                info[204] !== '' ? '兵庫県' : '',
                info[205] !== '' ? '中国' : '',
                info[206] !== '' ? '岡山県' : '',
                info[207] !== '' ? '広島県' : '',
                info[208] !== '' ? '鳥取県' : '',
                info[209] !== '' ? '島根県' : '',
                info[210] !== '' ? '山口県' : '',
                info[211] !== '' ? '四国' : '',
                info[212] !== '' ? '香川県' : '',
                info[213] !== '' ? '徳島県' : '',
                info[214] !== '' ? '愛媛県' : '',
                info[215] !== '' ? '高知県' : '',
                info[216] !== '' ? '九州' : '',
                info[217] !== '' ? '福岡県' : '',
                info[218] !== '' ? '佐賀県' : '',
                info[219] !== '' ? '長崎県' : '',
                info[220] !== '' ? '大分県' : '',
                info[221] !== '' ? '熊本県' : '',
                info[222] !== '' ? '宮崎県' : '',
                info[223] !== '' ? '鹿児島県' : '',
                info[224] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[225] !== '',
                食料品: info[226] !== '',
                衣料品: info[227] !== '',
                貴金属服飾品: info[228] !== '',
                電化製品: info[229] !== '',
                家具調度品: info[230] !== '',
                書籍玩具音楽CD: info[231] !== '',
                EC通信販売: info[232] !== '',
                ガソリンスタンド: info[233] !== '',
                その他小売業: info[234] !== '',
                飲食業: info[235] !== '',
                宿泊業: info[236] !== '',
                公共料金: info[237] !== '',
                理容美容業: info[238] !== '',
                運輸業: info[239] !== '',
                その他サービス: info[240] !== '',
                その他自由記載サービス: info[241] !== ''
              },
              受付開始時間:
                  info[242] === ''
                    ? ''
                    : typeof info[242] === 'object'
                      ? Utilities.formatDate(info[242], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[242], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[242], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[242], 'JST', 'HH:mm')
                      : info[242].length >= 5 && info[242].indexOf('0') === 0
                        ? info[242].replace('0', '')
                        : info[242],
              受付終了時間:
                  info[243] === ''
                    ? ''
                    : typeof info[243] === 'object'
                      ? Utilities.formatDate(info[243], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[243], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[243], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[243], 'JST', 'HH:mm')
                      : info[243].length >= 5 && info[243].indexOf('0') === 0
                        ? info[243].replace('0', '')
                        : info[243],
              受付時間の補足: info[244],
              加盟店向けサービス問合せ電話番号: info[245],
              加盟店向けサービス問合せメールアドレス: info[246],
              加盟店向けサービス問合せ備考: info[248]
            }
            : null,
          // 個票3.
          info[249] !== '' || info[250] !== '' || info[251] !== '' || info[252] !== '' || info[254] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[249] !== '' ? info[249].split('、') : [],
                電子マネー: info[250] !== '' ? info[250].split('、') : [],
                QRコード: info[251] !== '' ? info[251].split('、') : [],
                その他: info[252] !== '' ? info[252].split('、') : []
              },
              サービスURL: info[253],
              決済手数料: {
                還元実施期間中:
                    typeof info[254] === 'number'
                      ? '〜' + (info[254] * 100).toFixed(2) + '%'
                      : info[254] !== '' && info[254].indexOf('~') === -1 && info[254].indexOf('～') === -1 && info[254].indexOf('〜') === -1
                        ? '〜' + info[254].replace(/ /g, '')
                        : info[254]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[255],
                還元実施期間前:
                    typeof info[256] === 'number' && info[256] < 1
                      ? (info[256] * 100).toFixed(2) + '%'
                      : typeof info[256] === 'number' && info[256] >= 1
                        ? info[256].toFixed(2) + '%'
                        : info[256]
              },
              発生する費用: {
                期間中: {
                  費目1: info[257],
                  費目2: info[258],
                  費目3: info[259],
                  費目4: '',
                  金額1: info[260],
                  金額2: info[261],
                  金額3: info[262],
                  金額4: '',
                  単位1: info[263],
                  単位2: info[264],
                  単位3: info[265],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[266],
                  費目2: info[267],
                  費目3: info[268],
                  費目4: '',
                  金額1: info[269],
                  金額2: info[270],
                  金額3: info[271],
                  金額4: '',
                  単位1: info[272],
                  単位2: info[273],
                  単位3: info[274],
                  単位4: ''
                }
              },
              入金タイミング: info[281],
              月次一括の場合の締日: info[282],
              月次一括の場合の支払日: info[283],
              複数回の場合の回数: info[284],
              振込手数料: info[285],
              サービス提供エリア: [
                info[286] !== '' ? '全国' : '',
                info[287] !== '' ? '北海道' : '',
                info[288] !== '' ? '東北' : '',
                info[289] !== '' ? '青森県' : '',
                info[290] !== '' ? '岩手県' : '',
                info[291] !== '' ? '秋田県' : '',
                info[292] !== '' ? '宮城県' : '',
                info[293] !== '' ? '山形県' : '',
                info[294] !== '' ? '福島県' : '',
                info[295] !== '' ? '関東' : '',
                info[296] !== '' ? '茨城県' : '',
                info[297] !== '' ? '栃木県' : '',
                info[298] !== '' ? '群馬県' : '',
                info[299] !== '' ? '埼玉県' : '',
                info[300] !== '' ? '千葉県' : '',
                info[301] !== '' ? '東京都' : '',
                info[302] !== '' ? '神奈川県' : '',
                info[303] !== '' ? '中部' : '',
                info[304] !== '' ? '新潟県' : '',
                info[305] !== '' ? '富山県' : '',
                info[306] !== '' ? '石川県' : '',
                info[307] !== '' ? '福井県' : '',
                info[308] !== '' ? '山梨県' : '',
                info[309] !== '' ? '長野県' : '',
                info[310] !== '' ? '岐阜県' : '',
                info[311] !== '' ? '静岡県' : '',
                info[312] !== '' ? '愛知県' : '',
                info[313] !== '' ? '近畿' : '',
                info[314] !== '' ? '三重県' : '',
                info[315] !== '' ? '滋賀県' : '',
                info[316] !== '' ? '奈良県' : '',
                info[317] !== '' ? '和歌山県' : '',
                info[318] !== '' ? '京都府' : '',
                info[319] !== '' ? '大阪府' : '',
                info[320] !== '' ? '兵庫県' : '',
                info[321] !== '' ? '中国' : '',
                info[322] !== '' ? '岡山県' : '',
                info[323] !== '' ? '広島県' : '',
                info[324] !== '' ? '鳥取県' : '',
                info[325] !== '' ? '島根県' : '',
                info[326] !== '' ? '山口県' : '',
                info[327] !== '' ? '四国' : '',
                info[328] !== '' ? '香川県' : '',
                info[329] !== '' ? '徳島県' : '',
                info[330] !== '' ? '愛媛県' : '',
                info[331] !== '' ? '高知県' : '',
                info[332] !== '' ? '九州' : '',
                info[333] !== '' ? '福岡県' : '',
                info[334] !== '' ? '佐賀県' : '',
                info[335] !== '' ? '長崎県' : '',
                info[336] !== '' ? '大分県' : '',
                info[337] !== '' ? '熊本県' : '',
                info[338] !== '' ? '宮崎県' : '',
                info[339] !== '' ? '鹿児島県' : '',
                info[340] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[341] !== '',
                食料品: info[342] !== '',
                衣料品: info[343] !== '',
                貴金属服飾品: info[344] !== '',
                電化製品: info[345] !== '',
                家具調度品: info[346] !== '',
                書籍玩具音楽CD: info[347] !== '',
                EC通信販売: info[348] !== '',
                ガソリンスタンド: info[349] !== '',
                その他小売業: info[350] !== '',
                飲食業: info[351] !== '',
                宿泊業: info[352] !== '',
                公共料金: info[353] !== '',
                理容美容業: info[354] !== '',
                運輸業: info[355] !== '',
                その他サービス: info[356] !== '',
                その他自由記載サービス: info[357] !== ''
              },
              受付開始時間:
                  info[358] === ''
                    ? ''
                    : typeof info[358] === 'object'
                      ? Utilities.formatDate(info[358], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[358], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[358], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[358], 'JST', 'HH:mm')
                      : info[358].length >= 5 && info[358].indexOf('0') === 0
                        ? info[358].replace('0', '')
                        : info[358],
              受付終了時間:
                  info[359] === ''
                    ? ''
                    : typeof info[359] === 'object'
                      ? Utilities.formatDate(info[359], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[359], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[359], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[359], 'JST', 'HH:mm')
                      : info[359].length >= 5 && info[359].indexOf('0') === 0
                        ? info[359].replace('0', '')
                        : info[359],
              受付時間の補足: info[360],
              加盟店向けサービス問合せ電話番号: info[361],
              加盟店向けサービス問合せメールアドレス: info[362],
              加盟店向けサービス問合せ備考: info[364]
            }
            : null,
          // 個票4.
          info[365] !== '' || info[366] !== '' || info[367] !== '' || info[368] !== '' || info[370] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[365] !== '' ? info[365].split('、') : [],
                電子マネー: info[366] !== '' ? info[366].split('、') : [],
                QRコード: info[367] !== '' ? info[367].split('、') : [],
                その他: info[368] !== '' ? info[368].split('、') : []
              },
              サービスURL: info[369],
              決済手数料: {
                還元実施期間中:
                    typeof info[370] === 'number'
                      ? '〜' + (info[370] * 100).toFixed(2) + '%'
                      : info[370] !== '' && info[370].indexOf('~') === -1 && info[370].indexOf('～') === -1 && info[370].indexOf('〜') === -1
                        ? '〜' + info[370].replace(/ /g, '')
                        : info[370]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[371],
                還元実施期間前:
                    typeof info[372] === 'number' && info[372] < 1
                      ? (info[372] * 100).toFixed(2) + '%'
                      : typeof info[372] === 'number' && info[372] >= 1
                        ? info[372].toFixed(2) + '%'
                        : info[372]
              },
              発生する費用: {
                期間中: {
                  費目1: info[373],
                  費目2: info[374],
                  費目3: info[375],
                  費目4: '',
                  金額1: info[376],
                  金額2: info[377],
                  金額3: info[378],
                  金額4: '',
                  単位1: info[379],
                  単位2: info[380],
                  単位3: info[381],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[382],
                  費目2: info[383],
                  費目3: info[384],
                  費目4: '',
                  金額1: info[385],
                  金額2: info[386],
                  金額3: info[387],
                  金額4: '',
                  単位1: info[388],
                  単位2: info[389],
                  単位3: info[390],
                  単位4: ''
                }
              },
              入金タイミング: info[397],
              月次一括の場合の締日: info[398],
              月次一括の場合の支払日: info[399],
              複数回の場合の回数: info[400],
              振込手数料: info[401],
              サービス提供エリア: [
                info[402] !== '' ? '全国' : '',
                info[403] !== '' ? '北海道' : '',
                info[404] !== '' ? '東北' : '',
                info[405] !== '' ? '青森県' : '',
                info[406] !== '' ? '岩手県' : '',
                info[407] !== '' ? '秋田県' : '',
                info[408] !== '' ? '宮城県' : '',
                info[409] !== '' ? '山形県' : '',
                info[410] !== '' ? '福島県' : '',
                info[411] !== '' ? '関東' : '',
                info[412] !== '' ? '茨城県' : '',
                info[413] !== '' ? '栃木県' : '',
                info[414] !== '' ? '群馬県' : '',
                info[415] !== '' ? '埼玉県' : '',
                info[416] !== '' ? '千葉県' : '',
                info[417] !== '' ? '東京都' : '',
                info[418] !== '' ? '神奈川県' : '',
                info[419] !== '' ? '中部' : '',
                info[420] !== '' ? '新潟県' : '',
                info[421] !== '' ? '富山県' : '',
                info[422] !== '' ? '石川県' : '',
                info[423] !== '' ? '福井県' : '',
                info[424] !== '' ? '山梨県' : '',
                info[425] !== '' ? '長野県' : '',
                info[426] !== '' ? '岐阜県' : '',
                info[427] !== '' ? '静岡県' : '',
                info[428] !== '' ? '愛知県' : '',
                info[429] !== '' ? '近畿' : '',
                info[430] !== '' ? '三重県' : '',
                info[431] !== '' ? '滋賀県' : '',
                info[432] !== '' ? '奈良県' : '',
                info[433] !== '' ? '和歌山県' : '',
                info[434] !== '' ? '京都府' : '',
                info[435] !== '' ? '大阪府' : '',
                info[436] !== '' ? '兵庫県' : '',
                info[437] !== '' ? '中国' : '',
                info[438] !== '' ? '岡山県' : '',
                info[439] !== '' ? '広島県' : '',
                info[440] !== '' ? '鳥取県' : '',
                info[441] !== '' ? '島根県' : '',
                info[442] !== '' ? '山口県' : '',
                info[443] !== '' ? '四国' : '',
                info[444] !== '' ? '香川県' : '',
                info[445] !== '' ? '徳島県' : '',
                info[446] !== '' ? '愛媛県' : '',
                info[447] !== '' ? '高知県' : '',
                info[448] !== '' ? '九州' : '',
                info[449] !== '' ? '福岡県' : '',
                info[450] !== '' ? '佐賀県' : '',
                info[451] !== '' ? '長崎県' : '',
                info[452] !== '' ? '大分県' : '',
                info[453] !== '' ? '熊本県' : '',
                info[454] !== '' ? '宮崎県' : '',
                info[455] !== '' ? '鹿児島県' : '',
                info[456] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[457] !== '',
                食料品: info[458] !== '',
                衣料品: info[459] !== '',
                貴金属服飾品: info[460] !== '',
                電化製品: info[461] !== '',
                家具調度品: info[462] !== '',
                書籍玩具音楽CD: info[463] !== '',
                EC通信販売: info[464] !== '',
                ガソリンスタンド: info[465] !== '',
                その他小売業: info[466] !== '',
                飲食業: info[467] !== '',
                宿泊業: info[468] !== '',
                公共料金: info[469] !== '',
                理容美容業: info[470] !== '',
                運輸業: info[471] !== '',
                その他サービス: info[472] !== '',
                その他自由記載サービス: info[473] !== ''
              },
              受付開始時間:
                  info[474] === ''
                    ? ''
                    : typeof info[474] === 'object'
                      ? Utilities.formatDate(info[474], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[474], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[474], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[474], 'JST', 'HH:mm')
                      : info[474].length >= 5 && info[474].indexOf('0') === 0
                        ? info[474].replace('0', '')
                        : info[474],
              受付終了時間:
                  info[475] === ''
                    ? ''
                    : typeof info[475] === 'object'
                      ? Utilities.formatDate(info[475], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[475], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[475], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[475], 'JST', 'HH:mm')
                      : info[475].length >= 5 && info[475].indexOf('0') === 0
                        ? info[475].replace('0', '')
                        : info[475],
              受付時間の補足: info[476],
              加盟店向けサービス問合せ電話番号: info[477],
              加盟店向けサービス問合せメールアドレス: info[478],
              加盟店向けサービス問合せ備考: info[480]
            }
            : null,
          // 個票5.
          info[481] !== '' || info[482] !== '' || info[483] !== '' || info[484] !== '' || info[486] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[481] !== '' ? info[481].split('、') : [],
                電子マネー: info[482] !== '' ? info[482].split('、') : [],
                QRコード: info[483] !== '' ? info[483].split('、') : [],
                その他: info[484] !== '' ? info[484].split('、') : []
              },
              サービスURL: info[485],
              決済手数料: {
                還元実施期間中:
                    typeof info[486] === 'number'
                      ? '〜' + (info[486] * 100).toFixed(2) + '%'
                      : info[486] !== '' && info[486].indexOf('~') === -1 && info[486].indexOf('～') === -1 && info[486].indexOf('〜') === -1
                        ? '〜' + info[486].replace(/ /g, '')
                        : info[486]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[487],
                還元実施期間前:
                    typeof info[488] === 'number' && info[488] < 1
                      ? (info[488] * 100).toFixed(2) + '%'
                      : typeof info[488] === 'number' && info[488] >= 1
                        ? info[488].toFixed(2) + '%'
                        : info[488]
              },
              発生する費用: {
                期間中: {
                  費目1: info[489],
                  費目2: info[490],
                  費目3: info[491],
                  費目4: '',
                  金額1: info[492],
                  金額2: info[493],
                  金額3: info[494],
                  金額4: '',
                  単位1: info[495],
                  単位2: info[496],
                  単位3: info[497],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[498],
                  費目2: info[499],
                  費目3: info[500],
                  費目4: '',
                  金額1: info[501],
                  金額2: info[502],
                  金額3: info[503],
                  金額4: '',
                  単位1: info[504],
                  単位2: info[505],
                  単位3: info[506],
                  単位4: ''
                }
              },
              入金タイミング: info[513],
              月次一括の場合の締日: info[514],
              月次一括の場合の支払日: info[515],
              複数回の場合の回数: info[516],
              振込手数料: info[517],
              サービス提供エリア: [
                info[518] !== '' ? '全国' : '',
                info[519] !== '' ? '北海道' : '',
                info[520] !== '' ? '東北' : '',
                info[521] !== '' ? '青森県' : '',
                info[522] !== '' ? '岩手県' : '',
                info[523] !== '' ? '秋田県' : '',
                info[524] !== '' ? '宮城県' : '',
                info[525] !== '' ? '山形県' : '',
                info[526] !== '' ? '福島県' : '',
                info[527] !== '' ? '関東' : '',
                info[528] !== '' ? '茨城県' : '',
                info[529] !== '' ? '栃木県' : '',
                info[530] !== '' ? '群馬県' : '',
                info[531] !== '' ? '埼玉県' : '',
                info[532] !== '' ? '千葉県' : '',
                info[533] !== '' ? '東京都' : '',
                info[534] !== '' ? '神奈川県' : '',
                info[535] !== '' ? '中部' : '',
                info[536] !== '' ? '新潟県' : '',
                info[537] !== '' ? '富山県' : '',
                info[538] !== '' ? '石川県' : '',
                info[539] !== '' ? '福井県' : '',
                info[540] !== '' ? '山梨県' : '',
                info[541] !== '' ? '長野県' : '',
                info[542] !== '' ? '岐阜県' : '',
                info[543] !== '' ? '静岡県' : '',
                info[544] !== '' ? '愛知県' : '',
                info[545] !== '' ? '近畿' : '',
                info[546] !== '' ? '三重県' : '',
                info[547] !== '' ? '滋賀県' : '',
                info[548] !== '' ? '奈良県' : '',
                info[549] !== '' ? '和歌山県' : '',
                info[550] !== '' ? '京都府' : '',
                info[551] !== '' ? '大阪府' : '',
                info[552] !== '' ? '兵庫県' : '',
                info[553] !== '' ? '中国' : '',
                info[554] !== '' ? '岡山県' : '',
                info[555] !== '' ? '広島県' : '',
                info[556] !== '' ? '鳥取県' : '',
                info[557] !== '' ? '島根県' : '',
                info[558] !== '' ? '山口県' : '',
                info[559] !== '' ? '四国' : '',
                info[560] !== '' ? '香川県' : '',
                info[561] !== '' ? '徳島県' : '',
                info[562] !== '' ? '愛媛県' : '',
                info[563] !== '' ? '高知県' : '',
                info[564] !== '' ? '九州' : '',
                info[565] !== '' ? '福岡県' : '',
                info[566] !== '' ? '佐賀県' : '',
                info[567] !== '' ? '長崎県' : '',
                info[568] !== '' ? '大分県' : '',
                info[569] !== '' ? '熊本県' : '',
                info[570] !== '' ? '宮崎県' : '',
                info[571] !== '' ? '鹿児島県' : '',
                info[572] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[573] !== '',
                食料品: info[574] !== '',
                衣料品: info[575] !== '',
                貴金属服飾品: info[576] !== '',
                電化製品: info[577] !== '',
                家具調度品: info[578] !== '',
                書籍玩具音楽CD: info[579] !== '',
                EC通信販売: info[580] !== '',
                ガソリンスタンド: info[581] !== '',
                その他小売業: info[582] !== '',
                飲食業: info[583] !== '',
                宿泊業: info[584] !== '',
                公共料金: info[585] !== '',
                理容美容業: info[586] !== '',
                運輸業: info[587] !== '',
                その他サービス: info[588] !== '',
                その他自由記載サービス: info[589] !== ''
              },
              受付開始時間:
                  info[590] === ''
                    ? ''
                    : typeof info[590] === 'object'
                      ? Utilities.formatDate(info[590], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[590], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[590], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[590], 'JST', 'HH:mm')
                      : info[590].length >= 5 && info[590].indexOf('0') === 0
                        ? info[590].replace('0', '')
                        : info[590],
              受付終了時間:
                  info[591] === ''
                    ? ''
                    : typeof info[591] === 'object'
                      ? Utilities.formatDate(info[591], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[591], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[591], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[591], 'JST', 'HH:mm')
                      : info[591].length >= 5 && info[591].indexOf('0') === 0
                        ? info[591].replace('0', '')
                        : info[591],
              受付時間の補足: info[592],
              加盟店向けサービス問合せ電話番号: info[593],
              加盟店向けサービス問合せメールアドレス: info[594],
              加盟店向けサービス問合せ備考: info[596]
            }
            : null,
          // 個票6.
          info[597] !== '' || info[598] !== '' || info[599] !== '' || info[600] !== '' || info[602] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[597] !== '' ? info[597].split('、') : [],
                電子マネー: info[598] !== '' ? info[598].split('、') : [],
                QRコード: info[599] !== '' ? info[599].split('、') : [],
                その他: info[600] !== '' ? info[600].split('、') : []
              },
              サービスURL: info[601],
              決済手数料: {
                還元実施期間中:
                    typeof info[602] === 'number'
                      ? '〜' + (info[602] * 100).toFixed(2) + '%'
                      : info[602] !== '' && info[601].indexOf('~') === -1 && info[602].indexOf('～') === -1 && info[602].indexOf('〜') === -1
                        ? '〜' + info[602].replace(/ /g, '')
                        : info[602]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[603],
                還元実施期間前:
                    typeof info[604] === 'number' && info[604] < 1
                      ? (info[604] * 100).toFixed(2) + '%'
                      : typeof info[604] === 'number' && info[604] >= 1
                        ? info[604].toFixed(2) + '%'
                        : info[604]
              },
              発生する費用: {
                期間中: {
                  費目1: info[605],
                  費目2: info[606],
                  費目3: info[607],
                  費目4: '',
                  金額1: info[608],
                  金額2: info[609],
                  金額3: info[610],
                  金額4: '',
                  単位1: info[611],
                  単位2: info[612],
                  単位3: info[613],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[614],
                  費目2: info[615],
                  費目3: info[616],
                  費目4: '',
                  金額1: info[617],
                  金額2: info[618],
                  金額3: info[619],
                  金額4: '',
                  単位1: info[620],
                  単位2: info[621],
                  単位3: info[622],
                  単位4: ''
                }
              },
              入金タイミング: info[629],
              月次一括の場合の締日: info[630],
              月次一括の場合の支払日: info[631],
              複数回の場合の回数: info[632],
              振込手数料: info[633],
              サービス提供エリア: [
                info[634] !== '' ? '全国' : '',
                info[635] !== '' ? '北海道' : '',
                info[636] !== '' ? '東北' : '',
                info[637] !== '' ? '青森県' : '',
                info[638] !== '' ? '岩手県' : '',
                info[639] !== '' ? '秋田県' : '',
                info[640] !== '' ? '宮城県' : '',
                info[641] !== '' ? '山形県' : '',
                info[642] !== '' ? '福島県' : '',
                info[643] !== '' ? '関東' : '',
                info[644] !== '' ? '茨城県' : '',
                info[645] !== '' ? '栃木県' : '',
                info[646] !== '' ? '群馬県' : '',
                info[647] !== '' ? '埼玉県' : '',
                info[648] !== '' ? '千葉県' : '',
                info[649] !== '' ? '東京都' : '',
                info[650] !== '' ? '神奈川県' : '',
                info[651] !== '' ? '中部' : '',
                info[652] !== '' ? '新潟県' : '',
                info[653] !== '' ? '富山県' : '',
                info[654] !== '' ? '石川県' : '',
                info[655] !== '' ? '福井県' : '',
                info[656] !== '' ? '山梨県' : '',
                info[657] !== '' ? '長野県' : '',
                info[658] !== '' ? '岐阜県' : '',
                info[659] !== '' ? '静岡県' : '',
                info[660] !== '' ? '愛知県' : '',
                info[661] !== '' ? '近畿' : '',
                info[662] !== '' ? '三重県' : '',
                info[663] !== '' ? '滋賀県' : '',
                info[664] !== '' ? '奈良県' : '',
                info[665] !== '' ? '和歌山県' : '',
                info[666] !== '' ? '京都府' : '',
                info[667] !== '' ? '大阪府' : '',
                info[668] !== '' ? '兵庫県' : '',
                info[669] !== '' ? '中国' : '',
                info[670] !== '' ? '岡山県' : '',
                info[671] !== '' ? '広島県' : '',
                info[672] !== '' ? '鳥取県' : '',
                info[673] !== '' ? '島根県' : '',
                info[674] !== '' ? '山口県' : '',
                info[675] !== '' ? '四国' : '',
                info[676] !== '' ? '香川県' : '',
                info[677] !== '' ? '徳島県' : '',
                info[678] !== '' ? '愛媛県' : '',
                info[679] !== '' ? '高知県' : '',
                info[680] !== '' ? '九州' : '',
                info[681] !== '' ? '福岡県' : '',
                info[682] !== '' ? '佐賀県' : '',
                info[683] !== '' ? '長崎県' : '',
                info[684] !== '' ? '大分県' : '',
                info[685] !== '' ? '熊本県' : '',
                info[686] !== '' ? '宮崎県' : '',
                info[687] !== '' ? '鹿児島県' : '',
                info[688] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[689] !== '',
                食料品: info[690] !== '',
                衣料品: info[691] !== '',
                貴金属服飾品: info[692] !== '',
                電化製品: info[693] !== '',
                家具調度品: info[694] !== '',
                書籍玩具音楽CD: info[695] !== '',
                EC通信販売: info[696] !== '',
                ガソリンスタンド: info[697] !== '',
                その他小売業: info[698] !== '',
                飲食業: info[699] !== '',
                宿泊業: info[700] !== '',
                公共料金: info[701] !== '',
                理容美容業: info[702] !== '',
                運輸業: info[703] !== '',
                その他サービス: info[704] !== '',
                その他自由記載サービス: info[705] !== ''
              },
              受付開始時間:
                  info[706] === ''
                    ? ''
                    : typeof info[706] === 'object'
                      ? Utilities.formatDate(info[706], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[706], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[706], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[706], 'JST', 'HH:mm')
                      : info[706].length >= 5 && info[706].indexOf('0') === 0
                        ? info[706].replace('0', '')
                        : info[706],
              受付終了時間:
                  info[707] === ''
                    ? ''
                    : typeof info[707] === 'object'
                      ? Utilities.formatDate(info[707], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[707], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[707], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[707], 'JST', 'HH:mm')
                      : info[707].length >= 5 && info[707].indexOf('0') === 0
                        ? info[707].replace('0', '')
                        : info[707],
              受付時間の補足: info[708],
              加盟店向けサービス問合せ電話番号: info[709],
              加盟店向けサービス問合せメールアドレス: info[710],
              加盟店向けサービス問合せ備考: info[712]
            }
            : null,
          // 個票7.
          info[713] !== '' || info[714] !== '' || info[715] !== '' || info[716] !== '' || info[718] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[713] !== '' ? info[713].split('、') : [],
                電子マネー: info[714] !== '' ? info[714].split('、') : [],
                QRコード: info[715] !== '' ? info[715].split('、') : [],
                その他: info[716] !== '' ? info[716].split('、') : []
              },
              サービスURL: info[717],
              決済手数料: {
                還元実施期間中:
                    typeof info[718] === 'number'
                      ? '〜' + (info[718] * 100).toFixed(2) + '%'
                      : info[718] !== '' && info[718].indexOf('~') === -1 && info[718].indexOf('～') === -1 && info[718].indexOf('〜') === -1
                        ? '〜' + info[718].replace(/ /g, '')
                        : info[718]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[719],
                還元実施期間前:
                    typeof info[720] === 'number' && info[720] < 1
                      ? (info[720] * 100).toFixed(2) + '%'
                      : typeof info[720] === 'number' && info[720] >= 1
                        ? info[720].toFixed(2) + '%'
                        : info[720]
              },
              発生する費用: {
                期間中: {
                  費目1: info[721],
                  費目2: info[722],
                  費目3: info[723],
                  費目4: '',
                  金額1: info[724],
                  金額2: info[725],
                  金額3: info[726],
                  金額4: '',
                  単位1: info[727],
                  単位2: info[728],
                  単位3: info[729],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[730],
                  費目2: info[731],
                  費目3: info[732],
                  費目4: '',
                  金額1: info[733],
                  金額2: info[734],
                  金額3: info[735],
                  金額4: '',
                  単位1: info[736],
                  単位2: info[737],
                  単位3: info[738],
                  単位4: ''
                }
              },
              入金タイミング: info[745],
              月次一括の場合の締日: info[746],
              月次一括の場合の支払日: info[747],
              複数回の場合の回数: info[748],
              振込手数料: info[749],
              サービス提供エリア: [
                info[750] !== '' ? '全国' : '',
                info[751] !== '' ? '北海道' : '',
                info[752] !== '' ? '東北' : '',
                info[753] !== '' ? '青森県' : '',
                info[754] !== '' ? '岩手県' : '',
                info[755] !== '' ? '秋田県' : '',
                info[756] !== '' ? '宮城県' : '',
                info[757] !== '' ? '山形県' : '',
                info[758] !== '' ? '福島県' : '',
                info[759] !== '' ? '関東' : '',
                info[760] !== '' ? '茨城県' : '',
                info[761] !== '' ? '栃木県' : '',
                info[762] !== '' ? '群馬県' : '',
                info[763] !== '' ? '埼玉県' : '',
                info[764] !== '' ? '千葉県' : '',
                info[765] !== '' ? '東京都' : '',
                info[766] !== '' ? '神奈川県' : '',
                info[767] !== '' ? '中部' : '',
                info[768] !== '' ? '新潟県' : '',
                info[769] !== '' ? '富山県' : '',
                info[770] !== '' ? '石川県' : '',
                info[771] !== '' ? '福井県' : '',
                info[772] !== '' ? '山梨県' : '',
                info[773] !== '' ? '長野県' : '',
                info[774] !== '' ? '岐阜県' : '',
                info[775] !== '' ? '静岡県' : '',
                info[776] !== '' ? '愛知県' : '',
                info[777] !== '' ? '近畿' : '',
                info[778] !== '' ? '三重県' : '',
                info[779] !== '' ? '滋賀県' : '',
                info[780] !== '' ? '奈良県' : '',
                info[781] !== '' ? '和歌山県' : '',
                info[782] !== '' ? '京都府' : '',
                info[783] !== '' ? '大阪府' : '',
                info[784] !== '' ? '兵庫県' : '',
                info[785] !== '' ? '中国' : '',
                info[786] !== '' ? '岡山県' : '',
                info[787] !== '' ? '広島県' : '',
                info[788] !== '' ? '鳥取県' : '',
                info[789] !== '' ? '島根県' : '',
                info[790] !== '' ? '山口県' : '',
                info[791] !== '' ? '四国' : '',
                info[792] !== '' ? '香川県' : '',
                info[793] !== '' ? '徳島県' : '',
                info[794] !== '' ? '愛媛県' : '',
                info[795] !== '' ? '高知県' : '',
                info[796] !== '' ? '九州' : '',
                info[797] !== '' ? '福岡県' : '',
                info[798] !== '' ? '佐賀県' : '',
                info[799] !== '' ? '長崎県' : '',
                info[800] !== '' ? '大分県' : '',
                info[801] !== '' ? '熊本県' : '',
                info[802] !== '' ? '宮崎県' : '',
                info[803] !== '' ? '鹿児島県' : '',
                info[804] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[805] !== '',
                食料品: info[806] !== '',
                衣料品: info[807] !== '',
                貴金属服飾品: info[808] !== '',
                電化製品: info[809] !== '',
                家具調度品: info[810] !== '',
                書籍玩具音楽CD: info[811] !== '',
                EC通信販売: info[812] !== '',
                ガソリンスタンド: info[813] !== '',
                その他小売業: info[814] !== '',
                飲食業: info[815] !== '',
                宿泊業: info[816] !== '',
                公共料金: info[817] !== '',
                理容美容業: info[818] !== '',
                運輸業: info[819] !== '',
                その他サービス: info[820] !== '',
                その他自由記載サービス: info[821] !== ''
              },
              受付開始時間:
                  info[822] === ''
                    ? ''
                    : typeof info[822] === 'object'
                      ? Utilities.formatDate(info[822], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[822], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[822], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[822], 'JST', 'HH:mm')
                      : info[822].length >= 5 && info[822].indexOf('0') === 0
                        ? info[822].replace('0', '')
                        : info[822],
              受付終了時間:
                  info[823] === ''
                    ? ''
                    : typeof info[823] === 'object'
                      ? Utilities.formatDate(info[823], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[823], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[823], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[823], 'JST', 'HH:mm')
                      : info[823].length >= 5 && info[823].indexOf('0') === 0
                        ? info[823].replace('0', '')
                        : info[823],
              受付時間の補足: info[824],
              加盟店向けサービス問合せ電話番号: info[825],
              加盟店向けサービス問合せメールアドレス: info[826],
              加盟店向けサービス問合せ備考: info[828]
            }
            : null,
          // 個票8.
          info[829] !== '' || info[830] !== '' || info[831] !== '' || info[832] !== '' || info[834] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[829] !== '' ? info[829].split('、') : [],
                電子マネー: info[830] !== '' ? info[830].split('、') : [],
                QRコード: info[831] !== '' ? info[831].split('、') : [],
                その他: info[832] !== '' ? info[832].split('、') : []
              },
              サービスURL: info[833],
              決済手数料: {
                還元実施期間中:
                    typeof info[834] === 'number'
                      ? '〜' + (info[834] * 100).toFixed(2) + '%'
                      : info[834] !== '' && info[834].indexOf('~') === -1 && info[834].indexOf('～') === -1 && info[834].indexOf('〜') === -1
                        ? '〜' + info[834].replace(/ /g, '')
                        : info[834]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[835],
                還元実施期間前:
                    typeof info[836] === 'number' && info[836] < 1
                      ? (info[836] * 100).toFixed(2) + '%'
                      : typeof info[836] === 'number' && info[836] >= 1
                        ? info[836].toFixed(2) + '%'
                        : info[836]
              },
              発生する費用: {
                期間中: {
                  費目1: info[837],
                  費目2: info[838],
                  費目3: info[839],
                  費目4: '',
                  金額1: info[840],
                  金額2: info[841],
                  金額3: info[842],
                  金額4: '',
                  単位1: info[843],
                  単位2: info[844],
                  単位3: info[845],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[846],
                  費目2: info[847],
                  費目3: info[848],
                  費目4: '',
                  金額1: info[849],
                  金額2: info[850],
                  金額3: info[851],
                  金額4: '',
                  単位1: info[852],
                  単位2: info[853],
                  単位3: info[854],
                  単位4: ''
                }
              },
              入金タイミング: info[861],
              月次一括の場合の締日: info[862],
              月次一括の場合の支払日: info[863],
              複数回の場合の回数: info[864],
              振込手数料: info[865],
              サービス提供エリア: [
                info[866] !== '' ? '全国' : '',
                info[867] !== '' ? '北海道' : '',
                info[868] !== '' ? '東北' : '',
                info[869] !== '' ? '青森県' : '',
                info[870] !== '' ? '岩手県' : '',
                info[871] !== '' ? '秋田県' : '',
                info[872] !== '' ? '宮城県' : '',
                info[873] !== '' ? '山形県' : '',
                info[874] !== '' ? '福島県' : '',
                info[875] !== '' ? '関東' : '',
                info[876] !== '' ? '茨城県' : '',
                info[877] !== '' ? '栃木県' : '',
                info[878] !== '' ? '群馬県' : '',
                info[879] !== '' ? '埼玉県' : '',
                info[880] !== '' ? '千葉県' : '',
                info[881] !== '' ? '東京都' : '',
                info[882] !== '' ? '神奈川県' : '',
                info[883] !== '' ? '中部' : '',
                info[884] !== '' ? '新潟県' : '',
                info[885] !== '' ? '富山県' : '',
                info[886] !== '' ? '石川県' : '',
                info[887] !== '' ? '福井県' : '',
                info[888] !== '' ? '山梨県' : '',
                info[889] !== '' ? '長野県' : '',
                info[890] !== '' ? '岐阜県' : '',
                info[891] !== '' ? '静岡県' : '',
                info[892] !== '' ? '愛知県' : '',
                info[893] !== '' ? '近畿' : '',
                info[894] !== '' ? '三重県' : '',
                info[895] !== '' ? '滋賀県' : '',
                info[896] !== '' ? '奈良県' : '',
                info[897] !== '' ? '和歌山県' : '',
                info[898] !== '' ? '京都府' : '',
                info[899] !== '' ? '大阪府' : '',
                info[900] !== '' ? '兵庫県' : '',
                info[901] !== '' ? '中国' : '',
                info[902] !== '' ? '岡山県' : '',
                info[903] !== '' ? '広島県' : '',
                info[904] !== '' ? '鳥取県' : '',
                info[905] !== '' ? '島根県' : '',
                info[906] !== '' ? '山口県' : '',
                info[907] !== '' ? '四国' : '',
                info[908] !== '' ? '香川県' : '',
                info[909] !== '' ? '徳島県' : '',
                info[910] !== '' ? '愛媛県' : '',
                info[911] !== '' ? '高知県' : '',
                info[912] !== '' ? '九州' : '',
                info[913] !== '' ? '福岡県' : '',
                info[914] !== '' ? '佐賀県' : '',
                info[915] !== '' ? '長崎県' : '',
                info[916] !== '' ? '大分県' : '',
                info[917] !== '' ? '熊本県' : '',
                info[918] !== '' ? '宮崎県' : '',
                info[919] !== '' ? '鹿児島県' : '',
                info[920] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[921] !== '',
                食料品: info[922] !== '',
                衣料品: info[923] !== '',
                貴金属服飾品: info[924] !== '',
                電化製品: info[925] !== '',
                家具調度品: info[926] !== '',
                書籍玩具音楽CD: info[927] !== '',
                EC通信販売: info[928] !== '',
                ガソリンスタンド: info[929] !== '',
                その他小売業: info[930] !== '',
                飲食業: info[931] !== '',
                宿泊業: info[932] !== '',
                公共料金: info[933] !== '',
                理容美容業: info[934] !== '',
                運輸業: info[935] !== '',
                その他サービス: info[936] !== '',
                その他自由記載サービス: info[937] !== ''
              },
              受付開始時間:
                  info[938] === ''
                    ? ''
                    : typeof info[938] === 'object'
                      ? Utilities.formatDate(info[938], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[938], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[938], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[938], 'JST', 'HH:mm')
                      : info[938].length >= 5 && info[938].indexOf('0') === 0
                        ? info[938].replace('0', '')
                        : info[938],
              受付終了時間:
                  info[939] === ''
                    ? ''
                    : typeof info[939] === 'object'
                      ? Utilities.formatDate(info[939], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[939], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[939], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[939], 'JST', 'HH:mm')
                      : info[939].length >= 5 && info[938].indexOf('0') === 0
                        ? info[939].replace('0', '')
                        : info[939],
              受付時間の補足: info[940],
              加盟店向けサービス問合せ電話番号: info[941],
              加盟店向けサービス問合せメールアドレス: info[942],
              加盟店向けサービス問合せ備考: info[944]
            }
            : null,
          // 個票9.
          info[945] !== '' || info[946] !== '' || info[947] !== '' || info[948] !== '' || info[950] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[945] !== '' ? info[945].split('、') : [],
                電子マネー: info[946] !== '' ? info[946].split('、') : [],
                QRコード: info[947] !== '' ? info[947].split('、') : [],
                その他: info[948] !== '' ? info[948].split('、') : []
              },
              サービスURL: info[949],
              決済手数料: {
                還元実施期間中:
                    typeof info[950] === 'number'
                      ? '〜' + (info[950] * 100).toFixed(2) + '%'
                      : info[950] !== '' && info[950].indexOf('~') === -1 && info[950].indexOf('～') === -1 && info[950].indexOf('〜') === -1
                        ? '〜' + info[950].replace(/ /g, '')
                        : info[950]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[951],
                還元実施期間前:
                    typeof info[952] === 'number' && info[952] < 1
                      ? (info[952] * 100).toFixed(2) + '%'
                      : typeof info[952] === 'number' && info[952] >= 1
                        ? info[952].toFixed(2) + '%'
                        : info[952]
              },
              発生する費用: {
                期間中: {
                  費目1: info[953],
                  費目2: info[954],
                  費目3: info[955],
                  費目4: '',
                  金額1: info[956],
                  金額2: info[957],
                  金額3: info[958],
                  金額4: '',
                  単位1: info[959],
                  単位2: info[960],
                  単位3: info[961],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[962],
                  費目2: info[963],
                  費目3: info[964],
                  費目4: '',
                  金額1: info[965],
                  金額2: info[966],
                  金額3: info[967],
                  金額4: '',
                  単位1: info[968],
                  単位2: info[969],
                  単位3: info[970],
                  単位4: ''
                }
              },
              入金タイミング: info[977],
              月次一括の場合の締日: info[978],
              月次一括の場合の支払日: info[979],
              複数回の場合の回数: info[980],
              振込手数料: info[981],
              サービス提供エリア: [
                info[982] !== '' ? '全国' : '',
                info[983] !== '' ? '北海道' : '',
                info[984] !== '' ? '東北' : '',
                info[985] !== '' ? '青森県' : '',
                info[986] !== '' ? '岩手県' : '',
                info[987] !== '' ? '秋田県' : '',
                info[988] !== '' ? '宮城県' : '',
                info[989] !== '' ? '山形県' : '',
                info[990] !== '' ? '福島県' : '',
                info[991] !== '' ? '関東' : '',
                info[992] !== '' ? '茨城県' : '',
                info[993] !== '' ? '栃木県' : '',
                info[994] !== '' ? '群馬県' : '',
                info[995] !== '' ? '埼玉県' : '',
                info[996] !== '' ? '千葉県' : '',
                info[997] !== '' ? '東京都' : '',
                info[998] !== '' ? '神奈川県' : '',
                info[999] !== '' ? '中部' : '',
                info[1000] !== '' ? '新潟県' : '',
                info[1001] !== '' ? '富山県' : '',
                info[1002] !== '' ? '石川県' : '',
                info[1003] !== '' ? '福井県' : '',
                info[1004] !== '' ? '山梨県' : '',
                info[1005] !== '' ? '長野県' : '',
                info[1006] !== '' ? '岐阜県' : '',
                info[1007] !== '' ? '静岡県' : '',
                info[1008] !== '' ? '愛知県' : '',
                info[1009] !== '' ? '近畿' : '',
                info[1010] !== '' ? '三重県' : '',
                info[1011] !== '' ? '滋賀県' : '',
                info[1012] !== '' ? '奈良県' : '',
                info[1013] !== '' ? '和歌山県' : '',
                info[1014] !== '' ? '京都府' : '',
                info[1015] !== '' ? '大阪府' : '',
                info[1016] !== '' ? '兵庫県' : '',
                info[1017] !== '' ? '中国' : '',
                info[1018] !== '' ? '岡山県' : '',
                info[1019] !== '' ? '広島県' : '',
                info[1020] !== '' ? '鳥取県' : '',
                info[1021] !== '' ? '島根県' : '',
                info[1022] !== '' ? '山口県' : '',
                info[1023] !== '' ? '四国' : '',
                info[1024] !== '' ? '香川県' : '',
                info[1025] !== '' ? '徳島県' : '',
                info[1026] !== '' ? '愛媛県' : '',
                info[1027] !== '' ? '高知県' : '',
                info[1028] !== '' ? '九州' : '',
                info[1029] !== '' ? '福岡県' : '',
                info[1030] !== '' ? '佐賀県' : '',
                info[1031] !== '' ? '長崎県' : '',
                info[1032] !== '' ? '大分県' : '',
                info[1033] !== '' ? '熊本県' : '',
                info[1034] !== '' ? '宮崎県' : '',
                info[1035] !== '' ? '鹿児島県' : '',
                info[1036] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[1037] !== '',
                食料品: info[1038] !== '',
                衣料品: info[1039] !== '',
                貴金属服飾品: info[1040] !== '',
                電化製品: info[1041] !== '',
                家具調度品: info[1042] !== '',
                書籍玩具音楽CD: info[1043] !== '',
                EC通信販売: info[1044] !== '',
                ガソリンスタンド: info[1045] !== '',
                その他小売業: info[1046] !== '',
                飲食業: info[1047] !== '',
                宿泊業: info[1048] !== '',
                公共料金: info[1049] !== '',
                理容美容業: info[1050] !== '',
                運輸業: info[1051] !== '',
                その他サービス: info[1052] !== '',
                その他自由記載サービス: info[1053] !== ''
              },
              受付開始時間:
                  info[1054] === ''
                    ? ''
                    : typeof info[1054] === 'object'
                      ? Utilities.formatDate(info[1054], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[1054], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[1054], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[1054], 'JST', 'HH:mm')
                      : info[1054].length >= 5 && info[1054].indexOf('0') === 0
                        ? info[1054].replace('0', '')
                        : info[1054],
              受付終了時間:
                  info[1055] === ''
                    ? ''
                    : typeof info[1055] === 'object'
                      ? Utilities.formatDate(info[1055], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[1055], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[1055], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[1055], 'JST', 'HH:mm')
                      : info[1055].length >= 5 && info[1055].indexOf('0') === 0
                        ? info[1055].replace('0', '')
                        : info[1055],
              受付時間の補足: info[1056],
              加盟店向けサービス問合せ電話番号: info[1057],
              加盟店向けサービス問合せメールアドレス: info[1058],
              加盟店向けサービス問合せ備考: info[1060]
            }
            : null,
          // 個票10.
          info[1061] !== '' || info[1062] !== '' || info[1063] !== '' || info[1064] !== '' || info[1066] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[1061] !== '' ? info[1061].split('、') : [],
                電子マネー: info[1062] !== '' ? info[1062].split('、') : [],
                QRコード: info[1063] !== '' ? info[1063].split('、') : [],
                その他: info[1064] !== '' ? info[1064].split('、') : []
              },
              サービスURL: info[1065],
              決済手数料: {
                還元実施期間中:
                    typeof info[1066] === 'number'
                      ? '〜' + (info[1066] * 100).toFixed(2) + '%'
                      : info[1066] !== '' && info[1066].indexOf('~') === -1 && info[1066].indexOf('～') === -1 && info[1066].indexOf('〜') === -1
                        ? '〜' + info[1066].replace(/ /g, '')
                        : info[1066]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[1067],
                還元実施期間前:
                    typeof info[1068] === 'number' && info[1068] < 1
                      ? (info[1068] * 100).toFixed(2) + '%'
                      : typeof info[1068] === 'number' && info[1068] >= 1
                        ? info[1068].toFixed(2) + '%'
                        : info[1068]
              },
              発生する費用: {
                期間中: {
                  費目1: info[1069],
                  費目2: info[1070],
                  費目3: info[1071],
                  費目4: '',
                  金額1: info[1072],
                  金額2: info[1073],
                  金額3: info[1074],
                  金額4: '',
                  単位1: info[1075],
                  単位2: info[1076],
                  単位3: info[1077],
                  単位4: ''
                },
                期間終了後: {
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
                }
              },
              入金タイミング: info[1093],
              月次一括の場合の締日: info[1094],
              月次一括の場合の支払日: info[1095],
              複数回の場合の回数: info[1096],
              振込手数料: info[1097],
              サービス提供エリア: [
                info[1098] !== '' ? '全国' : '',
                info[1099] !== '' ? '北海道' : '',
                info[1100] !== '' ? '東北' : '',
                info[1101] !== '' ? '青森県' : '',
                info[1102] !== '' ? '岩手県' : '',
                info[1103] !== '' ? '秋田県' : '',
                info[1104] !== '' ? '宮城県' : '',
                info[1105] !== '' ? '山形県' : '',
                info[1106] !== '' ? '福島県' : '',
                info[1107] !== '' ? '関東' : '',
                info[1108] !== '' ? '茨城県' : '',
                info[1109] !== '' ? '栃木県' : '',
                info[1110] !== '' ? '群馬県' : '',
                info[1111] !== '' ? '埼玉県' : '',
                info[1112] !== '' ? '千葉県' : '',
                info[1113] !== '' ? '東京都' : '',
                info[1114] !== '' ? '神奈川県' : '',
                info[1115] !== '' ? '中部' : '',
                info[1116] !== '' ? '新潟県' : '',
                info[1117] !== '' ? '富山県' : '',
                info[1118] !== '' ? '石川県' : '',
                info[1119] !== '' ? '福井県' : '',
                info[1120] !== '' ? '山梨県' : '',
                info[1121] !== '' ? '長野県' : '',
                info[1122] !== '' ? '岐阜県' : '',
                info[1123] !== '' ? '静岡県' : '',
                info[1124] !== '' ? '愛知県' : '',
                info[1125] !== '' ? '近畿' : '',
                info[1126] !== '' ? '三重県' : '',
                info[1127] !== '' ? '滋賀県' : '',
                info[1128] !== '' ? '奈良県' : '',
                info[1129] !== '' ? '和歌山県' : '',
                info[1130] !== '' ? '京都府' : '',
                info[1131] !== '' ? '大阪府' : '',
                info[1132] !== '' ? '兵庫県' : '',
                info[1133] !== '' ? '中国' : '',
                info[1134] !== '' ? '岡山県' : '',
                info[1135] !== '' ? '広島県' : '',
                info[1136] !== '' ? '鳥取県' : '',
                info[1137] !== '' ? '島根県' : '',
                info[1138] !== '' ? '山口県' : '',
                info[1139] !== '' ? '四国' : '',
                info[1140] !== '' ? '香川県' : '',
                info[1141] !== '' ? '徳島県' : '',
                info[1142] !== '' ? '愛媛県' : '',
                info[1143] !== '' ? '高知県' : '',
                info[1144] !== '' ? '九州' : '',
                info[1145] !== '' ? '福岡県' : '',
                info[1146] !== '' ? '佐賀県' : '',
                info[1147] !== '' ? '長崎県' : '',
                info[1148] !== '' ? '大分県' : '',
                info[1149] !== '' ? '熊本県' : '',
                info[1150] !== '' ? '宮崎県' : '',
                info[1151] !== '' ? '鹿児島県' : '',
                info[1152] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[1153] !== '',
                食料品: info[1154] !== '',
                衣料品: info[1155] !== '',
                貴金属服飾品: info[1156] !== '',
                電化製品: info[1157] !== '',
                家具調度品: info[1158] !== '',
                書籍玩具音楽CD: info[1159] !== '',
                EC通信販売: info[1160] !== '',
                ガソリンスタンド: info[1161] !== '',
                その他小売業: info[1162] !== '',
                飲食業: info[1163] !== '',
                宿泊業: info[1164] !== '',
                公共料金: info[1165] !== '',
                理容美容業: info[1166] !== '',
                運輸業: info[1167] !== '',
                その他サービス: info[1168] !== '',
                その他自由記載サービス: info[1169] !== ''
              },
              受付開始時間:
                  info[1170] === ''
                    ? ''
                    : typeof info[1170] === 'object'
                      ? Utilities.formatDate(info[1170], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[1170], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[1170], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[1170], 'JST', 'HH:mm')
                      : info[1170].length >= 5 && info[1170].indexOf('0') === 0
                        ? info[1170].replace('0', '')
                        : info[1170],
              受付終了時間:
                  info[1171] === ''
                    ? ''
                    : typeof info[1171] === 'object'
                      ? Utilities.formatDate(info[1171], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[1171], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[1171], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[1171], 'JST', 'HH:mm')
                      : info[1171].length >= 5 && info[1171].indexOf('0') === 0
                        ? info[1171].replace('0', '')
                        : info[1171],
              受付時間の補足: info[1172],
              加盟店向けサービス問合せ電話番号: info[1173],
              加盟店向けサービス問合せメールアドレス: info[1174],
              加盟店向けサービス問合せ備考: info[1176]
            }
            : null
        ].filter((info): DetailTypeB | null => {
          return info
        }),
        // 決済端末 x 10.
        対応可能な決済端末: [
          // 決済端末1.
          info[1180] !== '' && info[1180] !== 0
            ? {
              種別: info[1180] !== '' && info[1180] !== 0 ? info[1180] : '',
              メーカー名: info[1181] !== '' && info[1181] !== 0 ? info[1181] : '',
              製品名: info[1182] !== '' && info[1182] !== 0 ? info[1182] : '',
              型番: info[1183] !== '' && info[1183] !== 0 ? info[1183] : '',
              画像ファイル名: info[1184] !== '' && info[1184] !== 0 ? info[1184] : '',
              製品URL: info[1185] !== '' && info[1185] !== 0 ? info[1185] : '',
              幅: info[1186] !== '' && info[1186] !== 0 ? info[1186] : '',
              高さ: info[1187] !== '' && info[1187] !== 0 ? info[1187] : '',
              奥行: info[1188] !== '' && info[1188] !== 0 ? info[1188] : '',
              重量: info[1189] !== '' && info[1189] !== 0 ? info[1189] : '',
              有線LAN: info[1190] !== '' && info[1190] !== 0,
              USB: info[1191] !== '' && info[1191] !== 0,
              WiFi: info[1192] !== '' && info[1192] !== 0,
              Bluetooth: info[1193] !== '' && info[1193] !== 0,
              モバイル通信: info[1194] !== '' && info[1194] !== 0,
              通信規格その他: info[1195] !== '' && info[1195] !== 0 ? info[1195] : '',
              電源式: info[1196] !== '' && info[1196] !== 0,
              電池式: info[1197] !== '' && info[1197] !== 0,
              電源その他: info[1198] !== '' && info[1198] !== 0 ? info[1198] : '',
              付属品1種類: info[1199] !== '' && info[1199] !== 0 ? info[1199] : '',
              付属品1型番: info[1200] !== '' && info[1200] !== 0 ? info[1200] : '',
              付属品2種類: info[1201] !== '' && info[1201] !== 0 ? info[1201] : '',
              付属品2型番: info[1202] !== '' && info[1202] !== 0 ? info[1202] : '',
              付属品3種類: info[1203] !== '' && info[1203] !== 0 ? info[1203] : '',
              付属品3型番: info[1204] !== '' && info[1204] !== 0 ? info[1204] : '',
              付属品4種類: info[1205] !== '' && info[1205] !== 0 ? info[1205] : '',
              付属品4型番: info[1206] !== '' && info[1206] !== 0 ? info[1206] : '',
              付属品5種類: info[1207] !== '' && info[1207] !== 0 ? info[1207] : '',
              付属品5型番: info[1208] !== '' && info[1208] !== 0 ? info[1208] : '',
              端末対応キャッシュレス区分クレジットカード: info[1213] !== '' && info[1213] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1214] !== '' && info[1214] !== 0,
              端末対応キャッシュレス区分QRコード: info[1215] !== '' && info[1215] !== 0,
              端末対応キャッシュレス区分その他: info[1216] !== '' && info[1216] !== 0,
              端末対応キャッシュレス区分JDebit: info[1217] !== '' && info[1217] !== 0
            }
            : null,
          // 決済端末2.
          info[1233] !== '' && info[1233] !== 0
            ? {
              種別: info[1233] !== '' && info[1233] !== 0 ? info[1233] : '',
              メーカー名: info[1234] !== '' && info[1234] !== 0 ? info[1234] : '',
              製品名: info[1235] !== '' && info[1235] !== 0 ? info[1235] : '',
              型番: info[1236] !== '' && info[1236] !== 0 ? info[1236] : '',
              画像ファイル名: info[1237] !== '' && info[1237] !== 0 ? info[1237] : '',
              製品URL: info[1238] !== '' && info[1238] !== 0 ? info[1238] : '',
              幅: info[1239] !== '' && info[1239] !== 0 ? info[1239] : '',
              高さ: info[1240] !== '' && info[1240] !== 0 ? info[1240] : '',
              奥行: info[1241] !== '' && info[1241] !== 0 ? info[1241] : '',
              重量: info[1242] !== '' && info[1242] !== 0 ? info[1242] : '',
              有線LAN: info[1243] !== '' && info[1243] !== 0,
              USB: info[1244] !== '' && info[1244] !== 0,
              WiFi: info[1245] !== '' && info[1245] !== 0,
              Bluetooth: info[1246] !== '' && info[1246] !== 0,
              モバイル通信: info[1247] !== '' && info[1247] !== 0,
              通信規格その他: info[1248] !== '' && info[1248] !== 0 ? info[1248] : '',
              電源式: info[1249] !== '' && info[1249] !== 0,
              電池式: info[1250] !== '' && info[1250] !== 0,
              電源その他: info[1251] !== '' && info[1251] !== 0 ? info[1251] : '',
              付属品1種類: info[1252] !== '' && info[1252] !== 0 ? info[1252] : '',
              付属品1型番: info[1253] !== '' && info[1253] !== 0 ? info[1253] : '',
              付属品2種類: info[1254] !== '' && info[1254] !== 0 ? info[1254] : '',
              付属品2型番: info[1255] !== '' && info[1255] !== 0 ? info[1255] : '',
              付属品3種類: info[1256] !== '' && info[1256] !== 0 ? info[1256] : '',
              付属品3型番: info[1257] !== '' && info[1257] !== 0 ? info[1257] : '',
              付属品4種類: info[1258] !== '' && info[1258] !== 0 ? info[1258] : '',
              付属品4型番: info[1259] !== '' && info[1259] !== 0 ? info[1259] : '',
              付属品5種類: info[1260] !== '' && info[1260] !== 0 ? info[1260] : '',
              付属品5型番: info[1261] !== '' && info[1261] !== 0 ? info[1261] : '',
              端末対応キャッシュレス区分クレジットカード: info[1266] !== '' && info[1266] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1267] !== '' && info[1267] !== 0,
              端末対応キャッシュレス区分QRコード: info[1268] !== '' && info[1268] !== 0,
              端末対応キャッシュレス区分その他: info[1269] !== '' && info[1269] !== 0,
              端末対応キャッシュレス区分JDebit: info[1270] !== '' && info[1270] !== 0
            }
            : null,
          // 決済端末3.
          info[1286] !== '' && info[1286] !== 0
            ? {
              種別: info[1286] !== '' && info[1286] !== 0 ? info[1286] : '',
              メーカー名: info[1287] !== '' && info[1287] !== 0 ? info[1287] : '',
              製品名: info[1288] !== '' && info[1288] !== 0 ? info[1288] : '',
              型番: info[1289] !== '' && info[1289] !== 0 ? info[1289] : '',
              画像ファイル名: info[1290] !== '' && info[1290] !== 0 ? info[1290] : '',
              製品URL: info[1291] !== '' && info[1291] !== 0 ? info[1291] : '',
              幅: info[1292] !== '' && info[1292] !== 0 ? info[1292] : '',
              高さ: info[1293] !== '' && info[1293] !== 0 ? info[1293] : '',
              奥行: info[1294] !== '' && info[1294] !== 0 ? info[1294] : '',
              重量: info[1295] !== '' && info[1295] !== 0 ? info[1295] : '',
              有線LAN: info[1296] !== '' && info[1296] !== 0,
              USB: info[1297] !== '' && info[1297] !== 0,
              WiFi: info[1298] !== '' && info[1298] !== 0,
              Bluetooth: info[1299] !== '' && info[1299] !== 0,
              モバイル通信: info[1300] !== '' && info[1300] !== 0,
              通信規格その他: info[1301] !== '' && info[1301] !== 0 ? info[1301] : '',
              電源式: info[1302] !== '' && info[1302] !== 0,
              電池式: info[1303] !== '' && info[1303] !== 0,
              電源その他: info[1304] !== '' && info[1304] !== 0 ? info[1304] : '',
              付属品1種類: info[1305] !== '' && info[1305] !== 0 ? info[1305] : '',
              付属品1型番: info[1306] !== '' && info[1306] !== 0 ? info[1306] : '',
              付属品2種類: info[1307] !== '' && info[1307] !== 0 ? info[1307] : '',
              付属品2型番: info[1308] !== '' && info[1308] !== 0 ? info[1308] : '',
              付属品3種類: info[1309] !== '' && info[1309] !== 0 ? info[1309] : '',
              付属品3型番: info[1310] !== '' && info[1310] !== 0 ? info[1310] : '',
              付属品4種類: info[1311] !== '' && info[1311] !== 0 ? info[1311] : '',
              付属品4型番: info[1312] !== '' && info[1312] !== 0 ? info[1312] : '',
              付属品5種類: info[1313] !== '' && info[1313] !== 0 ? info[1313] : '',
              付属品5型番: info[1314] !== '' && info[1314] !== 0 ? info[1314] : '',
              端末対応キャッシュレス区分クレジットカード: info[1319] !== '' && info[1319] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1320] !== '' && info[1320] !== 0,
              端末対応キャッシュレス区分QRコード: info[1321] !== '' && info[1321] !== 0,
              端末対応キャッシュレス区分その他: info[1322] !== '' && info[1322] !== 0,
              端末対応キャッシュレス区分JDebit: info[1323] !== '' && info[1323] !== 0
            }
            : null,
          // 決済端末4.
          info[1339] !== '' && info[1339] !== 0
            ? {
              種別: info[1339] !== '' && info[1339] !== 0 ? info[1339] : '',
              メーカー名: info[1340] !== '' && info[1340] !== 0 ? info[1340] : '',
              製品名: info[1341] !== '' && info[1341] !== 0 ? info[1341] : '',
              型番: info[1342] !== '' && info[1342] !== 0 ? info[1342] : '',
              画像ファイル名: info[1343] !== '' && info[1343] !== 0 ? info[1343] : '',
              製品URL: info[1344] !== '' && info[1344] !== 0 ? info[1344] : '',
              幅: info[1345] !== '' && info[1345] !== 0 ? info[1345] : '',
              高さ: info[1346] !== '' && info[1346] !== 0 ? info[1346] : '',
              奥行: info[1347] !== '' && info[1347] !== 0 ? info[1347] : '',
              重量: info[1348] !== '' && info[1348] !== 0 ? info[1348] : '',
              有線LAN: info[1349] !== '' && info[1349] !== 0,
              USB: info[1350] !== '' && info[1350] !== 0,
              WiFi: info[1351] !== '' && info[1351] !== 0,
              Bluetooth: info[1352] !== '' && info[1352] !== 0,
              モバイル通信: info[1353] !== '' && info[1353] !== 0,
              通信規格その他: info[1354] !== '' && info[1354] !== 0 ? info[1354] : '',
              電源式: info[1355] !== '' && info[1355] !== 0,
              電池式: info[1356] !== '' && info[1356] !== 0,
              電源その他: info[1357] !== '' && info[1357] !== 0 ? info[1357] : '',
              付属品1種類: info[1358] !== '' && info[1358] !== 0 ? info[1358] : '',
              付属品1型番: info[1359] !== '' && info[1359] !== 0 ? info[1359] : '',
              付属品2種類: info[1360] !== '' && info[1360] !== 0 ? info[1360] : '',
              付属品2型番: info[1361] !== '' && info[1361] !== 0 ? info[1361] : '',
              付属品3種類: info[1362] !== '' && info[1362] !== 0 ? info[1362] : '',
              付属品3型番: info[1363] !== '' && info[1363] !== 0 ? info[1363] : '',
              付属品4種類: info[1364] !== '' && info[1364] !== 0 ? info[1364] : '',
              付属品4型番: info[1365] !== '' && info[1365] !== 0 ? info[1365] : '',
              付属品5種類: info[1366] !== '' && info[1366] !== 0 ? info[1366] : '',
              付属品5型番: info[1367] !== '' && info[1367] !== 0 ? info[1367] : '',
              端末対応キャッシュレス区分クレジットカード: info[1372] !== '' && info[1372] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1373] !== '' && info[1373] !== 0,
              端末対応キャッシュレス区分QRコード: info[1374] !== '' && info[1374] !== 0,
              端末対応キャッシュレス区分その他: info[1375] !== '' && info[1375] !== 0,
              端末対応キャッシュレス区分JDebit: info[1376] !== '' && info[1376] !== 0
            }
            : null,
          // 決済端末5.
          info[1392] !== '' && info[1392] !== 0
            ? {
              種別: info[1392] !== '' && info[1392] !== 0 ? info[1392] : '',
              メーカー名: info[1393] !== '' && info[1393] !== 0 ? info[1393] : '',
              製品名: info[1394] !== '' && info[1394] !== 0 ? info[1394] : '',
              型番: info[1395] !== '' && info[1395] !== 0 ? info[1395] : '',
              画像ファイル名: info[1396] !== '' && info[1396] !== 0 ? info[1396] : '',
              製品URL: info[1397] !== '' && info[1397] !== 0 ? info[1397] : '',
              幅: info[1398] !== '' && info[1398] !== 0 ? info[1398] : '',
              高さ: info[1399] !== '' && info[1399] !== 0 ? info[1399] : '',
              奥行: info[1400] !== '' && info[1400] !== 0 ? info[1400] : '',
              重量: info[1401] !== '' && info[1401] !== 0 ? info[1401] : '',
              有線LAN: info[1402] !== '' && info[1402] !== 0,
              USB: info[1403] !== '' && info[1403] !== 0,
              WiFi: info[1404] !== '' && info[1404] !== 0,
              Bluetooth: info[1405] !== '' && info[1405] !== 0,
              モバイル通信: info[1406] !== '' && info[1406] !== 0,
              通信規格その他: info[1407] !== '' && info[1407] !== 0 ? info[1407] : '',
              電源式: info[1408] !== '' && info[1408] !== 0,
              電池式: info[1409] !== '' && info[1409] !== 0,
              電源その他: info[1410] !== '' && info[1410] !== 0 ? info[1410] : '',
              付属品1種類: info[1411] !== '' && info[1411] !== 0 ? info[1411] : '',
              付属品1型番: info[1412] !== '' && info[1412] !== 0 ? info[1412] : '',
              付属品2種類: info[1413] !== '' && info[1413] !== 0 ? info[1413] : '',
              付属品2型番: info[1414] !== '' && info[1414] !== 0 ? info[1414] : '',
              付属品3種類: info[1415] !== '' && info[1415] !== 0 ? info[1415] : '',
              付属品3型番: info[1416] !== '' && info[1416] !== 0 ? info[1416] : '',
              付属品4種類: info[1417] !== '' && info[1417] !== 0 ? info[1417] : '',
              付属品4型番: info[1418] !== '' && info[1418] !== 0 ? info[1418] : '',
              付属品5種類: info[1419] !== '' && info[1419] !== 0 ? info[1419] : '',
              付属品5型番: info[1420] !== '' && info[1420] !== 0 ? info[1420] : '',
              端末対応キャッシュレス区分クレジットカード: info[1425] !== '' && info[1425] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1426] !== '' && info[1426] !== 0,
              端末対応キャッシュレス区分QRコード: info[1427] !== '' && info[1427] !== 0,
              端末対応キャッシュレス区分その他: info[1428] !== '' && info[1428] !== 0,
              端末対応キャッシュレス区分JDebit: info[1429] !== '' && info[1429] !== 0
            }
            : null,
          // 決済端末6.
          info[1445] !== '' && info[1445] !== 0
            ? {
              種別: info[1445] !== '' && info[1445] !== 0 ? info[1445] : '',
              メーカー名: info[1446] !== '' && info[1446] !== 0 ? info[1446] : '',
              製品名: info[1447] !== '' && info[1447] !== 0 ? info[1447] : '',
              型番: info[1448] !== '' && info[1448] !== 0 ? info[1448] : '',
              画像ファイル名: info[1449] !== '' && info[1449] !== 0 ? info[1449] : '',
              製品URL: info[1450] !== '' && info[1450] !== 0 ? info[1450] : '',
              幅: info[1451] !== '' && info[1451] !== 0 ? info[1451] : '',
              高さ: info[1452] !== '' && info[1452] !== 0 ? info[1452] : '',
              奥行: info[1453] !== '' && info[1453] !== 0 ? info[1453] : '',
              重量: info[1454] !== '' && info[1454] !== 0 ? info[1454] : '',
              有線LAN: info[1455] !== '' && info[1455] !== 0,
              USB: info[1456] !== '' && info[1456] !== 0,
              WiFi: info[1457] !== '' && info[1457] !== 0,
              Bluetooth: info[1458] !== '' && info[1458] !== 0,
              モバイル通信: info[1459] !== '' && info[1459] !== 0,
              通信規格その他: info[1460] !== '' && info[1460] !== 0 ? info[1460] : '',
              電源式: info[1461] !== '' && info[1461] !== 0,
              電池式: info[1462] !== '' && info[1462] !== 0,
              電源その他: info[1463] !== '' && info[1463] !== 0 ? info[1463] : '',
              付属品1種類: info[1464] !== '' && info[1464] !== 0 ? info[1464] : '',
              付属品1型番: info[1465] !== '' && info[1465] !== 0 ? info[1465] : '',
              付属品2種類: info[1466] !== '' && info[1466] !== 0 ? info[1466] : '',
              付属品2型番: info[1467] !== '' && info[1467] !== 0 ? info[1467] : '',
              付属品3種類: info[1468] !== '' && info[1468] !== 0 ? info[1468] : '',
              付属品3型番: info[1469] !== '' && info[1469] !== 0 ? info[1469] : '',
              付属品4種類: info[1470] !== '' && info[1470] !== 0 ? info[1470] : '',
              付属品4型番: info[1471] !== '' && info[1471] !== 0 ? info[1471] : '',
              付属品5種類: info[1472] !== '' && info[1472] !== 0 ? info[1472] : '',
              付属品5型番: info[1473] !== '' && info[1473] !== 0 ? info[1473] : '',
              端末対応キャッシュレス区分クレジットカード: info[1478] !== '' && info[1478] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1479] !== '' && info[1479] !== 0,
              端末対応キャッシュレス区分QRコード: info[1480] !== '' && info[1480] !== 0,
              端末対応キャッシュレス区分その他: info[1481] !== '' && info[1481] !== 0,
              端末対応キャッシュレス区分JDebit: info[1482] !== '' && info[1482] !== 0
            }
            : null,
          // 決済端末7.
          info[1498] !== '' && info[1498] !== 0
            ? {
              種別: info[1498] !== '' && info[1498] !== 0 ? info[1498] : '',
              メーカー名: info[1499] !== '' && info[1499] !== 0 ? info[1499] : '',
              製品名: info[1500] !== '' && info[1500] !== 0 ? info[1500] : '',
              型番: info[1501] !== '' && info[1501] !== 0 ? info[1501] : '',
              画像ファイル名: info[1502] !== '' && info[1502] !== 0 ? info[1502] : '',
              製品URL: info[1503] !== '' && info[1503] !== 0 ? info[1503] : '',
              幅: info[1504] !== '' && info[1504] !== 0 ? info[1504] : '',
              高さ: info[1505] !== '' && info[1505] !== 0 ? info[1505] : '',
              奥行: info[1506] !== '' && info[1506] !== 0 ? info[1506] : '',
              重量: info[1507] !== '' && info[1507] !== 0 ? info[1507] : '',
              有線LAN: info[1508] !== '' && info[1508] !== 0,
              USB: info[1509] !== '' && info[1509] !== 0,
              WiFi: info[1510] !== '' && info[1510] !== 0,
              Bluetooth: info[1511] !== '' && info[1511] !== 0,
              モバイル通信: info[1512] !== '' && info[1512] !== 0,
              通信規格その他: info[1513] !== '' && info[1513] !== 0 ? info[1513] : '',
              電源式: info[1514] !== '' && info[1514] !== 0,
              電池式: info[1515] !== '' && info[1515] !== 0,
              電源その他: info[1516] !== '' && info[1516] !== 0 ? info[1516] : '',
              付属品1種類: info[1517] !== '' && info[1517] !== 0 ? info[1517] : '',
              付属品1型番: info[1518] !== '' && info[1518] !== 0 ? info[1518] : '',
              付属品2種類: info[1519] !== '' && info[1519] !== 0 ? info[1519] : '',
              付属品2型番: info[1520] !== '' && info[1520] !== 0 ? info[1520] : '',
              付属品3種類: info[1521] !== '' && info[1521] !== 0 ? info[1521] : '',
              付属品3型番: info[1522] !== '' && info[1522] !== 0 ? info[1522] : '',
              付属品4種類: info[1523] !== '' && info[1523] !== 0 ? info[1523] : '',
              付属品4型番: info[1524] !== '' && info[1524] !== 0 ? info[1524] : '',
              付属品5種類: info[1525] !== '' && info[1525] !== 0 ? info[1525] : '',
              付属品5型番: info[1526] !== '' && info[1526] !== 0 ? info[1526] : '',
              端末対応キャッシュレス区分クレジットカード: info[1531] !== '' && info[1531] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1532] !== '' && info[1532] !== 0,
              端末対応キャッシュレス区分QRコード: info[1533] !== '' && info[1533] !== 0,
              端末対応キャッシュレス区分その他: info[1534] !== '' && info[1534] !== 0,
              端末対応キャッシュレス区分JDebit: info[1535] !== '' && info[1535] !== 0
            }
            : null,
          // 決済端末8.
          info[1551] !== '' && info[1551] !== 0
            ? {
              種別: info[1551] !== '' && info[1551] !== 0 ? info[1551] : '',
              メーカー名: info[1552] !== '' && info[1552] !== 0 ? info[1552] : '',
              製品名: info[1553] !== '' && info[1553] !== 0 ? info[1553] : '',
              型番: info[1554] !== '' && info[1554] !== 0 ? info[1554] : '',
              画像ファイル名: info[1555] !== '' && info[1555] !== 0 ? info[1555] : '',
              製品URL: info[1556] !== '' && info[1556] !== 0 ? info[1556] : '',
              幅: info[1557] !== '' && info[1557] !== 0 ? info[1557] : '',
              高さ: info[1558] !== '' && info[1558] !== 0 ? info[1558] : '',
              奥行: info[1559] !== '' && info[1559] !== 0 ? info[1559] : '',
              重量: info[1560] !== '' && info[1560] !== 0 ? info[1560] : '',
              有線LAN: info[1561] !== '' && info[1561] !== 0,
              USB: info[1562] !== '' && info[1562] !== 0,
              WiFi: info[1563] !== '' && info[1563] !== 0,
              Bluetooth: info[1564] !== '' && info[1564] !== 0,
              モバイル通信: info[1565] !== '' && info[1565] !== 0,
              通信規格その他: info[1566] !== '' && info[1566] !== 0 ? info[1566] : '',
              電源式: info[1567] !== '' && info[1567] !== 0,
              電池式: info[1568] !== '' && info[1568] !== 0,
              電源その他: info[1569] !== '' && info[1569] !== 0 ? info[1569] : '',
              付属品1種類: info[1570] !== '' && info[1570] !== 0 ? info[1570] : '',
              付属品1型番: info[1571] !== '' && info[1571] !== 0 ? info[1571] : '',
              付属品2種類: info[1572] !== '' && info[1572] !== 0 ? info[1572] : '',
              付属品2型番: info[1573] !== '' && info[1573] !== 0 ? info[1573] : '',
              付属品3種類: info[1574] !== '' && info[1574] !== 0 ? info[1574] : '',
              付属品3型番: info[1575] !== '' && info[1575] !== 0 ? info[1575] : '',
              付属品4種類: info[1576] !== '' && info[1576] !== 0 ? info[1576] : '',
              付属品4型番: info[1577] !== '' && info[1577] !== 0 ? info[1577] : '',
              付属品5種類: info[1578] !== '' && info[1578] !== 0 ? info[1578] : '',
              付属品5型番: info[1579] !== '' && info[1579] !== 0 ? info[1579] : '',
              端末対応キャッシュレス区分クレジットカード: info[1584] !== '' && info[1584] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1585] !== '' && info[1585] !== 0,
              端末対応キャッシュレス区分QRコード: info[1586] !== '' && info[1586] !== 0,
              端末対応キャッシュレス区分その他: info[1587] !== '' && info[1587] !== 0,
              端末対応キャッシュレス区分JDebit: info[1588] !== '' && info[1588] !== 0
            }
            : null,
          // 決済端末9.
          info[1604] !== '' && info[1604] !== 0
            ? {
              種別: info[1604] !== '' && info[1604] !== 0 ? info[1604] : '',
              メーカー名: info[1605] !== '' && info[1605] !== 0 ? info[1605] : '',
              製品名: info[1606] !== '' && info[1606] !== 0 ? info[1606] : '',
              型番: info[1607] !== '' && info[1607] !== 0 ? info[1607] : '',
              画像ファイル名: info[1608] !== '' && info[1608] !== 0 ? info[1608] : '',
              製品URL: info[1609] !== '' && info[1609] !== 0 ? info[1609] : '',
              幅: info[1610] !== '' && info[1610] !== 0 ? info[1610] : '',
              高さ: info[1611] !== '' && info[1611] !== 0 ? info[1611] : '',
              奥行: info[1612] !== '' && info[1612] !== 0 ? info[1612] : '',
              重量: info[1613] !== '' && info[1613] !== 0 ? info[1613] : '',
              有線LAN: info[1614] !== '' && info[1614] !== 0,
              USB: info[1615] !== '' && info[1615] !== 0,
              WiFi: info[1616] !== '' && info[1616] !== 0,
              Bluetooth: info[1617] !== '' && info[1617] !== 0,
              モバイル通信: info[1618] !== '' && info[1618] !== 0,
              通信規格その他: info[1619] !== '' && info[1619] !== 0 ? info[1619] : '',
              電源式: info[1620] !== '' && info[1620] !== 0,
              電池式: info[1621] !== '' && info[1621] !== 0,
              電源その他: info[1622] !== '' && info[1622] !== 0 ? info[1622] : '',
              付属品1種類: info[1623] !== '' && info[1623] !== 0 ? info[1623] : '',
              付属品1型番: info[1624] !== '' && info[1624] !== 0 ? info[1624] : '',
              付属品2種類: info[1625] !== '' && info[1625] !== 0 ? info[1625] : '',
              付属品2型番: info[1626] !== '' && info[1626] !== 0 ? info[1626] : '',
              付属品3種類: info[1627] !== '' && info[1627] !== 0 ? info[1627] : '',
              付属品3型番: info[1628] !== '' && info[1628] !== 0 ? info[1628] : '',
              付属品4種類: info[1629] !== '' && info[1629] !== 0 ? info[1629] : '',
              付属品4型番: info[1630] !== '' && info[1630] !== 0 ? info[1630] : '',
              付属品5種類: info[1631] !== '' && info[1631] !== 0 ? info[1631] : '',
              付属品5型番: info[1632] !== '' && info[1632] !== 0 ? info[1632] : '',
              端末対応キャッシュレス区分クレジットカード: info[1637] !== '' && info[1637] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1638] !== '' && info[1638] !== 0,
              端末対応キャッシュレス区分QRコード: info[1639] !== '' && info[1639] !== 0,
              端末対応キャッシュレス区分その他: info[1640] !== '' && info[1640] !== 0,
              端末対応キャッシュレス区分JDebit: info[1641] !== '' && info[1641] !== 0
            }
            : null,
          // 決済端末10.
          info[1657] !== '' && info[1657] !== 0
            ? {
              種別: info[1657] !== '' && info[1657] !== 0 ? info[1657] : '',
              メーカー名: info[1658] !== '' && info[1658] !== 0 ? info[1658] : '',
              製品名: info[1659] !== '' && info[1659] !== 0 ? info[1659] : '',
              型番: info[1660] !== '' && info[1660] !== 0 ? info[1660] : '',
              画像ファイル名: info[1661] !== '' && info[1661] !== 0 ? info[1661] : '',
              製品URL: info[1662] !== '' && info[1662] !== 0 ? info[1662] : '',
              幅: info[1663] !== '' && info[1663] !== 0 ? info[1663] : '',
              高さ: info[1664] !== '' && info[1664] !== 0 ? info[1664] : '',
              奥行: info[1665] !== '' && info[1665] !== 0 ? info[1665] : '',
              重量: info[1666] !== '' && info[1666] !== 0 ? info[1666] : '',
              有線LAN: info[1667] !== '' && info[1667] !== 0,
              USB: info[1668] !== '' && info[1668] !== 0,
              WiFi: info[1669] !== '' && info[1669] !== 0,
              Bluetooth: info[1670] !== '' && info[1670] !== 0,
              モバイル通信: info[1671] !== '' && info[1671] !== 0,
              通信規格その他: info[1672] !== '' && info[1672] !== 0 ? info[1672] : '',
              電源式: info[1673] !== '' && info[1673] !== 0,
              電池式: info[1674] !== '' && info[1674] !== 0,
              電源その他: info[1675] !== '' && info[1675] !== 0 ? info[1675] : '',
              付属品1種類: info[1676] !== '' && info[1676] !== 0 ? info[1676] : '',
              付属品1型番: info[1677] !== '' && info[1677] !== 0 ? info[1677] : '',
              付属品2種類: info[1678] !== '' && info[1678] !== 0 ? info[1678] : '',
              付属品2型番: info[1679] !== '' && info[1679] !== 0 ? info[1679] : '',
              付属品3種類: info[1680] !== '' && info[1680] !== 0 ? info[1680] : '',
              付属品3型番: info[1681] !== '' && info[1681] !== 0 ? info[1681] : '',
              付属品4種類: info[1682] !== '' && info[1682] !== 0 ? info[1682] : '',
              付属品4型番: info[1683] !== '' && info[1683] !== 0 ? info[1683] : '',
              付属品5種類: info[1684] !== '' && info[1684] !== 0 ? info[1684] : '',
              付属品5型番: info[1685] !== '' && info[1685] !== 0 ? info[1685] : '',
              端末対応キャッシュレス区分クレジットカード: info[1690] !== '' && info[1690] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1691] !== '' && info[1691] !== 0,
              端末対応キャッシュレス区分QRコード: info[1692] !== '' && info[1692] !== 0,
              端末対応キャッシュレス区分その他: info[1693] !== '' && info[1693] !== 0,
              端末対応キャッシュレス区分JDebit: info[1694] !== '' && info[1694] !== 0
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

global.onPastGenerate = (): void => {
  const data = global.createPastDataBase()
  global.generateJson(data)
}
