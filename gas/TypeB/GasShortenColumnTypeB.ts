global.createShortenColumnDataBase = (): string => {
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
        決済事業者1: info[3].replace(/　/g, ''),
        // eslint-disable-next-line no-irregular-whitespace
        決済事業者2: info[4].replace(/　/g, ''),
        // 利用料率: typeof info[8] === 'number' ? '〜'+ ((info[8] * 100).toFixed(2)) + '%' : info[8].replace(/ /g, '').replace(/~/g, '〜').replace(/～/g, '〜'),
        利用料率:
          typeof info[8] === 'number'
            ? (info[8] * 100).toFixed(2) + '%'
            : info[8]
              .replace(/ /g, '')
              .replace(/~/g, '〜')
              .replace(/～/g, '〜'),
        利用可能な決済手段: [
          info[9] !== '' ? 'クレジットカード' : '',
          info[10] !== '' ? '電子マネー' : '',
          info[11] !== '' ? 'QRコード' : '',
          info[12] !== '' ? 'その他' : ''
        ].filter((paymentMethodInfo): string => {
          return paymentMethodInfo
        }),
        期間終了後の手数料の取扱い: info[5],
        入金タイミング: typeof info[6] !== 'number' ? info[6] : '',
        利用決済端末: info[7],
        // 個票 x 10.
        個票: [
        // 個票1.
          info[16] !== '' || info[17] !== '' || info[18] !== '' || info[19] !== '' || info[21] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[16] !== '' ? info[16].split('、') : [],
                電子マネー: info[17] !== '' ? info[17].split('、') : [],
                QRコード: info[18] !== '' ? info[18].split('、') : [],
                その他: info[19] !== '' ? info[19].split('、') : []
              },
              サービスURL: info[20],
              決済手数料: {
                還元実施期間中:
                    typeof info[21] === 'number'
                      ? '〜' + (info[21] * 100).toFixed(2) + '%'
                      : info[21] !== '' && info[21].indexOf('~') === -1 && info[21].indexOf('～') === -1 && info[21].indexOf('〜') === -1
                        ? '〜' + info[21].replace(/ /g, '')
                        : info[21]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[22],
                還元実施期間前:
                    typeof info[23] === 'number' && info[23] < 1
                      ? (info[23] * 100).toFixed(2) + '%'
                      : typeof info[23] === 'number' && info[23] >= 1
                        ? info[23].toFixed(2) + '%'
                        : info[23]
              },
              発生する費用: {
                期間中: {
                  費目1: info[24],
                  費目2: info[25],
                  費目3: info[26],
                  費目4: '',
                  金額1: info[27],
                  金額2: info[28],
                  金額3: info[29],
                  金額4: '',
                  単位1: info[30],
                  単位2: info[31],
                  単位3: info[32],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[33],
                  費目2: info[34],
                  費目3: info[35],
                  費目4: '',
                  金額1: info[36],
                  金額2: info[37],
                  金額3: info[38],
                  金額4: '',
                  単位1: info[39],
                  単位2: info[40],
                  単位3: info[41],
                  単位4: ''
                }
              },
              入金タイミング: info[48],
              月次一括の場合の締日: info[49],
              月次一括の場合の支払日: info[50],
              複数回の場合の回数: info[51],
              振込手数料: info[52],
              サービス提供エリア: [
                info[53] !== '' ? '全国' : '',
                info[54] !== '' ? '北海道' : '',
                info[55] !== '' ? '東北' : '',
                info[56] !== '' ? '青森県' : '',
                info[57] !== '' ? '岩手県' : '',
                info[58] !== '' ? '秋田県' : '',
                info[59] !== '' ? '宮城県' : '',
                info[60] !== '' ? '山形県' : '',
                info[61] !== '' ? '福島県' : '',
                info[62] !== '' ? '関東' : '',
                info[63] !== '' ? '茨城県' : '',
                info[64] !== '' ? '栃木県' : '',
                info[65] !== '' ? '群馬県' : '',
                info[66] !== '' ? '埼玉県' : '',
                info[67] !== '' ? '千葉県' : '',
                info[68] !== '' ? '東京都' : '',
                info[69] !== '' ? '神奈川県' : '',
                info[70] !== '' ? '中部' : '',
                info[71] !== '' ? '新潟県' : '',
                info[72] !== '' ? '富山県' : '',
                info[73] !== '' ? '石川県' : '',
                info[74] !== '' ? '福井県' : '',
                info[75] !== '' ? '山梨県' : '',
                info[76] !== '' ? '長野県' : '',
                info[77] !== '' ? '岐阜県' : '',
                info[78] !== '' ? '静岡県' : '',
                info[79] !== '' ? '愛知県' : '',
                info[80] !== '' ? '近畿' : '',
                info[81] !== '' ? '三重県' : '',
                info[82] !== '' ? '滋賀県' : '',
                info[83] !== '' ? '奈良県' : '',
                info[84] !== '' ? '和歌山県' : '',
                info[85] !== '' ? '京都府' : '',
                info[86] !== '' ? '大阪府' : '',
                info[87] !== '' ? '兵庫県' : '',
                info[88] !== '' ? '中国' : '',
                info[89] !== '' ? '岡山県' : '',
                info[90] !== '' ? '広島県' : '',
                info[91] !== '' ? '鳥取県' : '',
                info[92] !== '' ? '島根県' : '',
                info[93] !== '' ? '山口県' : '',
                info[94] !== '' ? '四国' : '',
                info[95] !== '' ? '香川県' : '',
                info[96] !== '' ? '徳島県' : '',
                info[97] !== '' ? '愛媛県' : '',
                info[98] !== '' ? '高知県' : '',
                info[99] !== '' ? '九州' : '',
                info[100] !== '' ? '福岡県' : '',
                info[101] !== '' ? '佐賀県' : '',
                info[102] !== '' ? '長崎県' : '',
                info[103] !== '' ? '大分県' : '',
                info[104] !== '' ? '熊本県' : '',
                info[105] !== '' ? '宮崎県' : '',
                info[106] !== '' ? '鹿児島県' : '',
                info[107] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[108] !== '',
                食料品: info[109] !== '',
                衣料品: info[110] !== '',
                貴金属服飾品: info[111] !== '',
                電化製品: info[112] !== '',
                家具調度品: info[113] !== '',
                書籍玩具音楽CD: info[114] !== '',
                EC通信販売: info[115] !== '',
                ガソリンスタンド: info[116] !== '',
                その他小売業: info[117] !== '',
                飲食業: info[118] !== '',
                宿泊業: info[119] !== '',
                公共料金: info[120] !== '',
                理容美容業: info[121] !== '',
                運輸業: info[122] !== '',
                その他サービス: info[123] !== '',
                その他自由記載サービス: info[124] !== ''
              },
              受付開始時間:
                  info[125] === ''
                    ? ''
                    : typeof info[125] === 'object'
                      ? Utilities.formatDate(info[125], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[125], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[125], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[125], 'JST', 'HH:mm')
                      : info[125].length >= 5 && info[125].indexOf('0') === 0
                        ? info[125].replace('0', '')
                        : info[125],
              受付終了時間:
                  info[126] === ''
                    ? ''
                    : typeof info[126] === 'object'
                      ? Utilities.formatDate(info[126], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[126], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[126], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[126], 'JST', 'HH:mm')
                      : info[126].length >= 5 && info[126].indexOf('0') === 0
                        ? info[126].replace('0', '')
                        : info[126],
              受付時間の補足: info[127],
              加盟店向けサービス問合せ電話番号: info[128],
              加盟店向けサービス問合せメールアドレス: info[129],
              加盟店向けサービス問合せ備考: info[131]
            }
            : null,
          // 個票2.
          info[132] !== '' || info[133] !== '' || info[134] !== '' || info[135] !== '' || info[137] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[132] !== '' ? info[132].split('、') : [],
                電子マネー: info[133] !== '' ? info[133].split('、') : [],
                QRコード: info[134] !== '' ? info[134].split('、') : [],
                その他: info[135] !== '' ? info[135].split('、') : []
              },
              サービスURL: info[136],
              決済手数料: {
                還元実施期間中:
                    typeof info[137] === 'number'
                      ? '〜' + (info[137] * 100).toFixed(2) + '%'
                      : info[137] !== '' && info[137].indexOf('~') === -1 && info[137].indexOf('～') === -1 && info[137].indexOf('〜') === -1
                        ? '〜' + info[137].replace(/ /g, '')
                        : info[137]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[138],
                還元実施期間前:
                    typeof info[139] === 'number' && info[139] < 1
                      ? (info[139] * 100).toFixed(2) + '%'
                      : typeof info[139] === 'number' && info[139] >= 1
                        ? info[139].toFixed(2) + '%'
                        : info[139]
              },
              発生する費用: {
                期間中: {
                  費目1: info[140],
                  費目2: info[141],
                  費目3: info[142],
                  費目4: '',
                  金額1: info[143],
                  金額2: info[144],
                  金額3: info[145],
                  金額4: '',
                  単位1: info[146],
                  単位2: info[147],
                  単位3: info[148],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[149],
                  費目2: info[150],
                  費目3: info[151],
                  費目4: '',
                  金額1: info[152],
                  金額2: info[153],
                  金額3: info[154],
                  金額4: '',
                  単位1: info[155],
                  単位2: info[156],
                  単位3: info[157],
                  単位4: ''
                }
              },
              入金タイミング: info[164],
              月次一括の場合の締日: info[165],
              月次一括の場合の支払日: info[166],
              複数回の場合の回数: info[167],
              振込手数料: info[168],
              サービス提供エリア: [
                info[169] !== '' ? '全国' : '',
                info[170] !== '' ? '北海道' : '',
                info[171] !== '' ? '東北' : '',
                info[172] !== '' ? '青森県' : '',
                info[173] !== '' ? '岩手県' : '',
                info[174] !== '' ? '秋田県' : '',
                info[175] !== '' ? '宮城県' : '',
                info[176] !== '' ? '山形県' : '',
                info[177] !== '' ? '福島県' : '',
                info[178] !== '' ? '関東' : '',
                info[179] !== '' ? '茨城県' : '',
                info[180] !== '' ? '栃木県' : '',
                info[181] !== '' ? '群馬県' : '',
                info[182] !== '' ? '埼玉県' : '',
                info[183] !== '' ? '千葉県' : '',
                info[184] !== '' ? '東京都' : '',
                info[185] !== '' ? '神奈川県' : '',
                info[186] !== '' ? '中部' : '',
                info[187] !== '' ? '新潟県' : '',
                info[188] !== '' ? '富山県' : '',
                info[189] !== '' ? '石川県' : '',
                info[190] !== '' ? '福井県' : '',
                info[191] !== '' ? '山梨県' : '',
                info[192] !== '' ? '長野県' : '',
                info[193] !== '' ? '岐阜県' : '',
                info[194] !== '' ? '静岡県' : '',
                info[195] !== '' ? '愛知県' : '',
                info[196] !== '' ? '近畿' : '',
                info[197] !== '' ? '三重県' : '',
                info[198] !== '' ? '滋賀県' : '',
                info[199] !== '' ? '奈良県' : '',
                info[200] !== '' ? '和歌山県' : '',
                info[201] !== '' ? '京都府' : '',
                info[202] !== '' ? '大阪府' : '',
                info[203] !== '' ? '兵庫県' : '',
                info[204] !== '' ? '中国' : '',
                info[205] !== '' ? '岡山県' : '',
                info[206] !== '' ? '広島県' : '',
                info[207] !== '' ? '鳥取県' : '',
                info[208] !== '' ? '島根県' : '',
                info[209] !== '' ? '山口県' : '',
                info[210] !== '' ? '四国' : '',
                info[211] !== '' ? '香川県' : '',
                info[212] !== '' ? '徳島県' : '',
                info[213] !== '' ? '愛媛県' : '',
                info[214] !== '' ? '高知県' : '',
                info[215] !== '' ? '九州' : '',
                info[216] !== '' ? '福岡県' : '',
                info[217] !== '' ? '佐賀県' : '',
                info[218] !== '' ? '長崎県' : '',
                info[219] !== '' ? '大分県' : '',
                info[220] !== '' ? '熊本県' : '',
                info[221] !== '' ? '宮崎県' : '',
                info[222] !== '' ? '鹿児島県' : '',
                info[223] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[224] !== '',
                食料品: info[225] !== '',
                衣料品: info[226] !== '',
                貴金属服飾品: info[227] !== '',
                電化製品: info[228] !== '',
                家具調度品: info[229] !== '',
                書籍玩具音楽CD: info[230] !== '',
                EC通信販売: info[231] !== '',
                ガソリンスタンド: info[232] !== '',
                その他小売業: info[233] !== '',
                飲食業: info[234] !== '',
                宿泊業: info[235] !== '',
                公共料金: info[236] !== '',
                理容美容業: info[237] !== '',
                運輸業: info[238] !== '',
                その他サービス: info[239] !== '',
                その他自由記載サービス: info[240] !== ''
              },
              受付開始時間:
                  info[241] === ''
                    ? ''
                    : typeof info[241] === 'object'
                      ? Utilities.formatDate(info[241], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[241], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[241], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[241], 'JST', 'HH:mm')
                      : info[241].length >= 5 && info[241].indexOf('0') === 0
                        ? info[241].replace('0', '')
                        : info[241],
              受付終了時間:
                  info[242] === ''
                    ? ''
                    : typeof info[242] === 'object'
                      ? Utilities.formatDate(info[242], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[242], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[242], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[242], 'JST', 'HH:mm')
                      : info[242].length >= 5 && info[242].indexOf('0') === 0
                        ? info[242].replace('0', '')
                        : info[242],
              受付時間の補足: info[243],
              加盟店向けサービス問合せ電話番号: info[244],
              加盟店向けサービス問合せメールアドレス: info[245],
              加盟店向けサービス問合せ備考: info[247]
            }
            : null,
          // 個票3.
          info[248] !== '' || info[249] !== '' || info[250] !== '' || info[251] !== '' || info[253] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[248] !== '' ? info[248].split('、') : [],
                電子マネー: info[249] !== '' ? info[249].split('、') : [],
                QRコード: info[250] !== '' ? info[250].split('、') : [],
                その他: info[251] !== '' ? info[251].split('、') : []
              },
              サービスURL: info[252],
              決済手数料: {
                還元実施期間中:
                    typeof info[253] === 'number'
                      ? '〜' + (info[253] * 100).toFixed(2) + '%'
                      : info[253] !== '' && info[253].indexOf('~') === -1 && info[253].indexOf('～') === -1 && info[253].indexOf('〜') === -1
                        ? '〜' + info[253].replace(/ /g, '')
                        : info[253]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[254],
                還元実施期間前:
                    typeof info[255] === 'number' && info[255] < 1
                      ? (info[255] * 100).toFixed(2) + '%'
                      : typeof info[255] === 'number' && info[255] >= 1
                        ? info[255].toFixed(2) + '%'
                        : info[255]
              },
              発生する費用: {
                期間中: {
                  費目1: info[256],
                  費目2: info[257],
                  費目3: info[258],
                  費目4: '',
                  金額1: info[259],
                  金額2: info[260],
                  金額3: info[261],
                  金額4: '',
                  単位1: info[262],
                  単位2: info[263],
                  単位3: info[264],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[265],
                  費目2: info[266],
                  費目3: info[267],
                  費目4: '',
                  金額1: info[268],
                  金額2: info[269],
                  金額3: info[270],
                  金額4: '',
                  単位1: info[271],
                  単位2: info[272],
                  単位3: info[273],
                  単位4: ''
                }
              },
              入金タイミング: info[280],
              月次一括の場合の締日: info[281],
              月次一括の場合の支払日: info[282],
              複数回の場合の回数: info[283],
              振込手数料: info[284],
              サービス提供エリア: [
                info[285] !== '' ? '全国' : '',
                info[286] !== '' ? '北海道' : '',
                info[287] !== '' ? '東北' : '',
                info[288] !== '' ? '青森県' : '',
                info[289] !== '' ? '岩手県' : '',
                info[290] !== '' ? '秋田県' : '',
                info[291] !== '' ? '宮城県' : '',
                info[292] !== '' ? '山形県' : '',
                info[293] !== '' ? '福島県' : '',
                info[294] !== '' ? '関東' : '',
                info[295] !== '' ? '茨城県' : '',
                info[296] !== '' ? '栃木県' : '',
                info[297] !== '' ? '群馬県' : '',
                info[298] !== '' ? '埼玉県' : '',
                info[299] !== '' ? '千葉県' : '',
                info[300] !== '' ? '東京都' : '',
                info[301] !== '' ? '神奈川県' : '',
                info[302] !== '' ? '中部' : '',
                info[303] !== '' ? '新潟県' : '',
                info[304] !== '' ? '富山県' : '',
                info[305] !== '' ? '石川県' : '',
                info[306] !== '' ? '福井県' : '',
                info[307] !== '' ? '山梨県' : '',
                info[308] !== '' ? '長野県' : '',
                info[309] !== '' ? '岐阜県' : '',
                info[310] !== '' ? '静岡県' : '',
                info[311] !== '' ? '愛知県' : '',
                info[312] !== '' ? '近畿' : '',
                info[313] !== '' ? '三重県' : '',
                info[314] !== '' ? '滋賀県' : '',
                info[315] !== '' ? '奈良県' : '',
                info[316] !== '' ? '和歌山県' : '',
                info[317] !== '' ? '京都府' : '',
                info[318] !== '' ? '大阪府' : '',
                info[319] !== '' ? '兵庫県' : '',
                info[320] !== '' ? '中国' : '',
                info[321] !== '' ? '岡山県' : '',
                info[322] !== '' ? '広島県' : '',
                info[323] !== '' ? '鳥取県' : '',
                info[324] !== '' ? '島根県' : '',
                info[325] !== '' ? '山口県' : '',
                info[326] !== '' ? '四国' : '',
                info[327] !== '' ? '香川県' : '',
                info[328] !== '' ? '徳島県' : '',
                info[329] !== '' ? '愛媛県' : '',
                info[330] !== '' ? '高知県' : '',
                info[331] !== '' ? '九州' : '',
                info[332] !== '' ? '福岡県' : '',
                info[333] !== '' ? '佐賀県' : '',
                info[334] !== '' ? '長崎県' : '',
                info[335] !== '' ? '大分県' : '',
                info[336] !== '' ? '熊本県' : '',
                info[337] !== '' ? '宮崎県' : '',
                info[338] !== '' ? '鹿児島県' : '',
                info[339] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[340] !== '',
                食料品: info[341] !== '',
                衣料品: info[342] !== '',
                貴金属服飾品: info[343] !== '',
                電化製品: info[344] !== '',
                家具調度品: info[345] !== '',
                書籍玩具音楽CD: info[346] !== '',
                EC通信販売: info[347] !== '',
                ガソリンスタンド: info[348] !== '',
                その他小売業: info[349] !== '',
                飲食業: info[350] !== '',
                宿泊業: info[351] !== '',
                公共料金: info[352] !== '',
                理容美容業: info[353] !== '',
                運輸業: info[354] !== '',
                その他サービス: info[355] !== '',
                その他自由記載サービス: info[356] !== ''
              },
              受付開始時間:
                  info[357] === ''
                    ? ''
                    : typeof info[357] === 'object'
                      ? Utilities.formatDate(info[357], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[357], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[357], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[357], 'JST', 'HH:mm')
                      : info[357].length >= 5 && info[357].indexOf('0') === 0
                        ? info[357].replace('0', '')
                        : info[357],
              受付終了時間:
                  info[358] === ''
                    ? ''
                    : typeof info[358] === 'object'
                      ? Utilities.formatDate(info[358], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[358], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[358], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[358], 'JST', 'HH:mm')
                      : info[358].length >= 5 && info[358].indexOf('0') === 0
                        ? info[358].replace('0', '')
                        : info[358],
              受付時間の補足: info[359],
              加盟店向けサービス問合せ電話番号: info[360],
              加盟店向けサービス問合せメールアドレス: info[361],
              加盟店向けサービス問合せ備考: info[363]
            }
            : null,
          // 個票4.
          info[364] !== '' || info[365] !== '' || info[366] !== '' || info[367] !== '' || info[369] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[364] !== '' ? info[364].split('、') : [],
                電子マネー: info[365] !== '' ? info[365].split('、') : [],
                QRコード: info[366] !== '' ? info[366].split('、') : [],
                その他: info[367] !== '' ? info[367].split('、') : []
              },
              サービスURL: info[368],
              決済手数料: {
                還元実施期間中:
                    typeof info[369] === 'number'
                      ? '〜' + (info[369] * 100).toFixed(2) + '%'
                      : info[369] !== '' && info[369].indexOf('~') === -1 && info[369].indexOf('～') === -1 && info[369].indexOf('〜') === -1
                        ? '〜' + info[369].replace(/ /g, '')
                        : info[369]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[370],
                還元実施期間前:
                    typeof info[371] === 'number' && info[371] < 1
                      ? (info[371] * 100).toFixed(2) + '%'
                      : typeof info[371] === 'number' && info[371] >= 1
                        ? info[371].toFixed(2) + '%'
                        : info[371]
              },
              発生する費用: {
                期間中: {
                  費目1: info[372],
                  費目2: info[373],
                  費目3: info[374],
                  費目4: '',
                  金額1: info[375],
                  金額2: info[376],
                  金額3: info[377],
                  金額4: '',
                  単位1: info[378],
                  単位2: info[379],
                  単位3: info[380],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[381],
                  費目2: info[382],
                  費目3: info[383],
                  費目4: '',
                  金額1: info[384],
                  金額2: info[385],
                  金額3: info[386],
                  金額4: '',
                  単位1: info[387],
                  単位2: info[388],
                  単位3: info[389],
                  単位4: ''
                }
              },
              入金タイミング: info[396],
              月次一括の場合の締日: info[397],
              月次一括の場合の支払日: info[398],
              複数回の場合の回数: info[399],
              振込手数料: info[400],
              サービス提供エリア: [
                info[401] !== '' ? '全国' : '',
                info[402] !== '' ? '北海道' : '',
                info[403] !== '' ? '東北' : '',
                info[404] !== '' ? '青森県' : '',
                info[405] !== '' ? '岩手県' : '',
                info[406] !== '' ? '秋田県' : '',
                info[407] !== '' ? '宮城県' : '',
                info[408] !== '' ? '山形県' : '',
                info[409] !== '' ? '福島県' : '',
                info[410] !== '' ? '関東' : '',
                info[411] !== '' ? '茨城県' : '',
                info[412] !== '' ? '栃木県' : '',
                info[413] !== '' ? '群馬県' : '',
                info[414] !== '' ? '埼玉県' : '',
                info[415] !== '' ? '千葉県' : '',
                info[416] !== '' ? '東京都' : '',
                info[417] !== '' ? '神奈川県' : '',
                info[418] !== '' ? '中部' : '',
                info[419] !== '' ? '新潟県' : '',
                info[420] !== '' ? '富山県' : '',
                info[421] !== '' ? '石川県' : '',
                info[422] !== '' ? '福井県' : '',
                info[423] !== '' ? '山梨県' : '',
                info[424] !== '' ? '長野県' : '',
                info[425] !== '' ? '岐阜県' : '',
                info[426] !== '' ? '静岡県' : '',
                info[427] !== '' ? '愛知県' : '',
                info[428] !== '' ? '近畿' : '',
                info[429] !== '' ? '三重県' : '',
                info[430] !== '' ? '滋賀県' : '',
                info[431] !== '' ? '奈良県' : '',
                info[432] !== '' ? '和歌山県' : '',
                info[433] !== '' ? '京都府' : '',
                info[434] !== '' ? '大阪府' : '',
                info[435] !== '' ? '兵庫県' : '',
                info[436] !== '' ? '中国' : '',
                info[437] !== '' ? '岡山県' : '',
                info[438] !== '' ? '広島県' : '',
                info[439] !== '' ? '鳥取県' : '',
                info[440] !== '' ? '島根県' : '',
                info[441] !== '' ? '山口県' : '',
                info[442] !== '' ? '四国' : '',
                info[443] !== '' ? '香川県' : '',
                info[444] !== '' ? '徳島県' : '',
                info[445] !== '' ? '愛媛県' : '',
                info[446] !== '' ? '高知県' : '',
                info[447] !== '' ? '九州' : '',
                info[448] !== '' ? '福岡県' : '',
                info[449] !== '' ? '佐賀県' : '',
                info[450] !== '' ? '長崎県' : '',
                info[451] !== '' ? '大分県' : '',
                info[452] !== '' ? '熊本県' : '',
                info[453] !== '' ? '宮崎県' : '',
                info[454] !== '' ? '鹿児島県' : '',
                info[455] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[456] !== '',
                食料品: info[457] !== '',
                衣料品: info[458] !== '',
                貴金属服飾品: info[459] !== '',
                電化製品: info[460] !== '',
                家具調度品: info[461] !== '',
                書籍玩具音楽CD: info[462] !== '',
                EC通信販売: info[463] !== '',
                ガソリンスタンド: info[464] !== '',
                その他小売業: info[465] !== '',
                飲食業: info[466] !== '',
                宿泊業: info[467] !== '',
                公共料金: info[468] !== '',
                理容美容業: info[469] !== '',
                運輸業: info[470] !== '',
                その他サービス: info[471] !== '',
                その他自由記載サービス: info[472] !== ''
              },
              受付開始時間:
                  info[473] === ''
                    ? ''
                    : typeof info[473] === 'object'
                      ? Utilities.formatDate(info[473], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[473], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[473], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[473], 'JST', 'HH:mm')
                      : info[473].length >= 5 && info[473].indexOf('0') === 0
                        ? info[473].replace('0', '')
                        : info[473],
              受付終了時間:
                  info[474] === ''
                    ? ''
                    : typeof info[474] === 'object'
                      ? Utilities.formatDate(info[474], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[474], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[474], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[474], 'JST', 'HH:mm')
                      : info[474].length >= 5 && info[474].indexOf('0') === 0
                        ? info[474].replace('0', '')
                        : info[474],
              受付時間の補足: info[475],
              加盟店向けサービス問合せ電話番号: info[476],
              加盟店向けサービス問合せメールアドレス: info[477],
              加盟店向けサービス問合せ備考: info[479]
            }
            : null,
          // 個票5.
          info[480] !== '' || info[481] !== '' || info[482] !== '' || info[483] !== '' || info[485] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[480] !== '' ? info[480].split('、') : [],
                電子マネー: info[481] !== '' ? info[481].split('、') : [],
                QRコード: info[482] !== '' ? info[482].split('、') : [],
                その他: info[483] !== '' ? info[483].split('、') : []
              },
              サービスURL: info[484],
              決済手数料: {
                還元実施期間中:
                    typeof info[485] === 'number'
                      ? '〜' + (info[485] * 100).toFixed(2) + '%'
                      : info[485] !== '' && info[485].indexOf('~') === -1 && info[485].indexOf('～') === -1 && info[485].indexOf('〜') === -1
                        ? '〜' + info[485].replace(/ /g, '')
                        : info[485]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[486],
                還元実施期間前:
                    typeof info[487] === 'number' && info[487] < 1
                      ? (info[487] * 100).toFixed(2) + '%'
                      : typeof info[487] === 'number' && info[487] >= 1
                        ? info[487].toFixed(2) + '%'
                        : info[487]
              },
              発生する費用: {
                期間中: {
                  費目1: info[488],
                  費目2: info[489],
                  費目3: info[490],
                  費目4: '',
                  金額1: info[491],
                  金額2: info[492],
                  金額3: info[493],
                  金額4: '',
                  単位1: info[494],
                  単位2: info[495],
                  単位3: info[496],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[497],
                  費目2: info[498],
                  費目3: info[499],
                  費目4: '',
                  金額1: info[500],
                  金額2: info[501],
                  金額3: info[502],
                  金額4: '',
                  単位1: info[503],
                  単位2: info[504],
                  単位3: info[505],
                  単位4: ''
                }
              },
              入金タイミング: info[512],
              月次一括の場合の締日: info[513],
              月次一括の場合の支払日: info[514],
              複数回の場合の回数: info[515],
              振込手数料: info[516],
              サービス提供エリア: [
                info[517] !== '' ? '全国' : '',
                info[518] !== '' ? '北海道' : '',
                info[519] !== '' ? '東北' : '',
                info[520] !== '' ? '青森県' : '',
                info[521] !== '' ? '岩手県' : '',
                info[522] !== '' ? '秋田県' : '',
                info[523] !== '' ? '宮城県' : '',
                info[524] !== '' ? '山形県' : '',
                info[525] !== '' ? '福島県' : '',
                info[526] !== '' ? '関東' : '',
                info[527] !== '' ? '茨城県' : '',
                info[528] !== '' ? '栃木県' : '',
                info[529] !== '' ? '群馬県' : '',
                info[530] !== '' ? '埼玉県' : '',
                info[531] !== '' ? '千葉県' : '',
                info[532] !== '' ? '東京都' : '',
                info[533] !== '' ? '神奈川県' : '',
                info[534] !== '' ? '中部' : '',
                info[535] !== '' ? '新潟県' : '',
                info[536] !== '' ? '富山県' : '',
                info[537] !== '' ? '石川県' : '',
                info[538] !== '' ? '福井県' : '',
                info[539] !== '' ? '山梨県' : '',
                info[540] !== '' ? '長野県' : '',
                info[541] !== '' ? '岐阜県' : '',
                info[542] !== '' ? '静岡県' : '',
                info[543] !== '' ? '愛知県' : '',
                info[544] !== '' ? '近畿' : '',
                info[545] !== '' ? '三重県' : '',
                info[546] !== '' ? '滋賀県' : '',
                info[547] !== '' ? '奈良県' : '',
                info[548] !== '' ? '和歌山県' : '',
                info[549] !== '' ? '京都府' : '',
                info[550] !== '' ? '大阪府' : '',
                info[551] !== '' ? '兵庫県' : '',
                info[552] !== '' ? '中国' : '',
                info[553] !== '' ? '岡山県' : '',
                info[554] !== '' ? '広島県' : '',
                info[555] !== '' ? '鳥取県' : '',
                info[556] !== '' ? '島根県' : '',
                info[557] !== '' ? '山口県' : '',
                info[558] !== '' ? '四国' : '',
                info[559] !== '' ? '香川県' : '',
                info[560] !== '' ? '徳島県' : '',
                info[561] !== '' ? '愛媛県' : '',
                info[562] !== '' ? '高知県' : '',
                info[563] !== '' ? '九州' : '',
                info[564] !== '' ? '福岡県' : '',
                info[565] !== '' ? '佐賀県' : '',
                info[566] !== '' ? '長崎県' : '',
                info[567] !== '' ? '大分県' : '',
                info[568] !== '' ? '熊本県' : '',
                info[569] !== '' ? '宮崎県' : '',
                info[570] !== '' ? '鹿児島県' : '',
                info[571] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[572] !== '',
                食料品: info[573] !== '',
                衣料品: info[574] !== '',
                貴金属服飾品: info[575] !== '',
                電化製品: info[576] !== '',
                家具調度品: info[577] !== '',
                書籍玩具音楽CD: info[578] !== '',
                EC通信販売: info[579] !== '',
                ガソリンスタンド: info[580] !== '',
                その他小売業: info[581] !== '',
                飲食業: info[582] !== '',
                宿泊業: info[583] !== '',
                公共料金: info[584] !== '',
                理容美容業: info[585] !== '',
                運輸業: info[586] !== '',
                その他サービス: info[587] !== '',
                その他自由記載サービス: info[588] !== ''
              },
              受付開始時間:
                  info[589] === ''
                    ? ''
                    : typeof info[589] === 'object'
                      ? Utilities.formatDate(info[589], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[589], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[589], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[589], 'JST', 'HH:mm')
                      : info[589].length >= 5 && info[589].indexOf('0') === 0
                        ? info[589].replace('0', '')
                        : info[589],
              受付終了時間:
                  info[590] === ''
                    ? ''
                    : typeof info[590] === 'object'
                      ? Utilities.formatDate(info[590], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[590], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[590], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[590], 'JST', 'HH:mm')
                      : info[590].length >= 5 && info[590].indexOf('0') === 0
                        ? info[590].replace('0', '')
                        : info[590],
              受付時間の補足: info[591],
              加盟店向けサービス問合せ電話番号: info[592],
              加盟店向けサービス問合せメールアドレス: info[593],
              加盟店向けサービス問合せ備考: info[595]
            }
            : null,
          // 個票6.
          info[596] !== '' || info[597] !== '' || info[598] !== '' || info[599] !== '' || info[601] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[596] !== '' ? info[596].split('、') : [],
                電子マネー: info[597] !== '' ? info[597].split('、') : [],
                QRコード: info[598] !== '' ? info[598].split('、') : [],
                その他: info[599] !== '' ? info[599].split('、') : []
              },
              サービスURL: info[600],
              決済手数料: {
                還元実施期間中:
                    typeof info[601] === 'number'
                      ? '〜' + (info[601] * 100).toFixed(2) + '%'
                      : info[601] !== '' && info[601].indexOf('~') === -1 && info[601].indexOf('～') === -1 && info[601].indexOf('〜') === -1
                        ? '〜' + info[601].replace(/ /g, '')
                        : info[601]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[602],
                還元実施期間前:
                    typeof info[603] === 'number' && info[603] < 1
                      ? (info[603] * 100).toFixed(2) + '%'
                      : typeof info[603] === 'number' && info[603] >= 1
                        ? info[603].toFixed(2) + '%'
                        : info[603]
              },
              発生する費用: {
                期間中: {
                  費目1: info[604],
                  費目2: info[605],
                  費目3: info[606],
                  費目4: '',
                  金額1: info[607],
                  金額2: info[608],
                  金額3: info[609],
                  金額4: '',
                  単位1: info[610],
                  単位2: info[611],
                  単位3: info[612],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[613],
                  費目2: info[614],
                  費目3: info[615],
                  費目4: '',
                  金額1: info[616],
                  金額2: info[617],
                  金額3: info[618],
                  金額4: '',
                  単位1: info[619],
                  単位2: info[620],
                  単位3: info[621],
                  単位4: ''
                }
              },
              入金タイミング: info[628],
              月次一括の場合の締日: info[629],
              月次一括の場合の支払日: info[630],
              複数回の場合の回数: info[631],
              振込手数料: info[632],
              サービス提供エリア: [
                info[633] !== '' ? '全国' : '',
                info[634] !== '' ? '北海道' : '',
                info[635] !== '' ? '東北' : '',
                info[636] !== '' ? '青森県' : '',
                info[637] !== '' ? '岩手県' : '',
                info[638] !== '' ? '秋田県' : '',
                info[639] !== '' ? '宮城県' : '',
                info[640] !== '' ? '山形県' : '',
                info[641] !== '' ? '福島県' : '',
                info[642] !== '' ? '関東' : '',
                info[643] !== '' ? '茨城県' : '',
                info[644] !== '' ? '栃木県' : '',
                info[645] !== '' ? '群馬県' : '',
                info[646] !== '' ? '埼玉県' : '',
                info[647] !== '' ? '千葉県' : '',
                info[648] !== '' ? '東京都' : '',
                info[649] !== '' ? '神奈川県' : '',
                info[650] !== '' ? '中部' : '',
                info[651] !== '' ? '新潟県' : '',
                info[652] !== '' ? '富山県' : '',
                info[653] !== '' ? '石川県' : '',
                info[654] !== '' ? '福井県' : '',
                info[655] !== '' ? '山梨県' : '',
                info[656] !== '' ? '長野県' : '',
                info[657] !== '' ? '岐阜県' : '',
                info[658] !== '' ? '静岡県' : '',
                info[659] !== '' ? '愛知県' : '',
                info[660] !== '' ? '近畿' : '',
                info[661] !== '' ? '三重県' : '',
                info[662] !== '' ? '滋賀県' : '',
                info[663] !== '' ? '奈良県' : '',
                info[664] !== '' ? '和歌山県' : '',
                info[665] !== '' ? '京都府' : '',
                info[666] !== '' ? '大阪府' : '',
                info[667] !== '' ? '兵庫県' : '',
                info[668] !== '' ? '中国' : '',
                info[669] !== '' ? '岡山県' : '',
                info[670] !== '' ? '広島県' : '',
                info[671] !== '' ? '鳥取県' : '',
                info[672] !== '' ? '島根県' : '',
                info[673] !== '' ? '山口県' : '',
                info[674] !== '' ? '四国' : '',
                info[675] !== '' ? '香川県' : '',
                info[676] !== '' ? '徳島県' : '',
                info[677] !== '' ? '愛媛県' : '',
                info[678] !== '' ? '高知県' : '',
                info[679] !== '' ? '九州' : '',
                info[680] !== '' ? '福岡県' : '',
                info[681] !== '' ? '佐賀県' : '',
                info[682] !== '' ? '長崎県' : '',
                info[683] !== '' ? '大分県' : '',
                info[684] !== '' ? '熊本県' : '',
                info[685] !== '' ? '宮崎県' : '',
                info[686] !== '' ? '鹿児島県' : '',
                info[687] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[688] !== '',
                食料品: info[689] !== '',
                衣料品: info[690] !== '',
                貴金属服飾品: info[691] !== '',
                電化製品: info[692] !== '',
                家具調度品: info[693] !== '',
                書籍玩具音楽CD: info[694] !== '',
                EC通信販売: info[695] !== '',
                ガソリンスタンド: info[696] !== '',
                その他小売業: info[697] !== '',
                飲食業: info[698] !== '',
                宿泊業: info[699] !== '',
                公共料金: info[700] !== '',
                理容美容業: info[701] !== '',
                運輸業: info[702] !== '',
                その他サービス: info[703] !== '',
                その他自由記載サービス: info[704] !== ''
              },
              受付開始時間:
                  info[705] === ''
                    ? ''
                    : typeof info[705] === 'object'
                      ? Utilities.formatDate(info[705], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[705], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[705], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[705], 'JST', 'HH:mm')
                      : info[705].length >= 5 && info[705].indexOf('0') === 0
                        ? info[705].replace('0', '')
                        : info[705],
              受付終了時間:
                  info[706] === ''
                    ? ''
                    : typeof info[706] === 'object'
                      ? Utilities.formatDate(info[706], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[706], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[706], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[706], 'JST', 'HH:mm')
                      : info[706].length >= 5 && info[706].indexOf('0') === 0
                        ? info[706].replace('0', '')
                        : info[706],
              受付時間の補足: info[707],
              加盟店向けサービス問合せ電話番号: info[708],
              加盟店向けサービス問合せメールアドレス: info[709],
              加盟店向けサービス問合せ備考: info[711]
            }
            : null,
          // 個票7.
          info[712] !== '' || info[713] !== '' || info[713] !== '' || info[714] !== '' || info[716] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[712] !== '' ? info[712].split('、') : [],
                電子マネー: info[713] !== '' ? info[713].split('、') : [],
                QRコード: info[714] !== '' ? info[714].split('、') : [],
                その他: info[715] !== '' ? info[715].split('、') : []
              },
              サービスURL: info[716],
              決済手数料: {
                還元実施期間中:
                    typeof info[717] === 'number'
                      ? '〜' + (info[717] * 100).toFixed(2) + '%'
                      : info[717] !== '' && info[717].indexOf('~') === -1 && info[717].indexOf('～') === -1 && info[717].indexOf('〜') === -1
                        ? '〜' + info[717].replace(/ /g, '')
                        : info[717]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[718],
                還元実施期間前:
                    typeof info[719] === 'number' && info[719] < 1
                      ? (info[719] * 100).toFixed(2) + '%'
                      : typeof info[719] === 'number' && info[719] >= 1
                        ? info[719].toFixed(2) + '%'
                        : info[719]
              },
              発生する費用: {
                期間中: {
                  費目1: info[720],
                  費目2: info[721],
                  費目3: info[722],
                  費目4: '',
                  金額1: info[723],
                  金額2: info[724],
                  金額3: info[725],
                  金額4: '',
                  単位1: info[726],
                  単位2: info[727],
                  単位3: info[728],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[729],
                  費目2: info[730],
                  費目3: info[731],
                  費目4: '',
                  金額1: info[732],
                  金額2: info[733],
                  金額3: info[734],
                  金額4: '',
                  単位1: info[735],
                  単位2: info[736],
                  単位3: info[737],
                  単位4: ''
                }
              },
              入金タイミング: info[744],
              月次一括の場合の締日: info[745],
              月次一括の場合の支払日: info[746],
              複数回の場合の回数: info[747],
              振込手数料: info[748],
              サービス提供エリア: [
                info[749] !== '' ? '全国' : '',
                info[750] !== '' ? '北海道' : '',
                info[751] !== '' ? '東北' : '',
                info[752] !== '' ? '青森県' : '',
                info[753] !== '' ? '岩手県' : '',
                info[754] !== '' ? '秋田県' : '',
                info[755] !== '' ? '宮城県' : '',
                info[756] !== '' ? '山形県' : '',
                info[757] !== '' ? '福島県' : '',
                info[758] !== '' ? '関東' : '',
                info[759] !== '' ? '茨城県' : '',
                info[760] !== '' ? '栃木県' : '',
                info[761] !== '' ? '群馬県' : '',
                info[762] !== '' ? '埼玉県' : '',
                info[763] !== '' ? '千葉県' : '',
                info[764] !== '' ? '東京都' : '',
                info[765] !== '' ? '神奈川県' : '',
                info[766] !== '' ? '中部' : '',
                info[767] !== '' ? '新潟県' : '',
                info[768] !== '' ? '富山県' : '',
                info[769] !== '' ? '石川県' : '',
                info[770] !== '' ? '福井県' : '',
                info[771] !== '' ? '山梨県' : '',
                info[772] !== '' ? '長野県' : '',
                info[773] !== '' ? '岐阜県' : '',
                info[774] !== '' ? '静岡県' : '',
                info[775] !== '' ? '愛知県' : '',
                info[776] !== '' ? '近畿' : '',
                info[777] !== '' ? '三重県' : '',
                info[778] !== '' ? '滋賀県' : '',
                info[779] !== '' ? '奈良県' : '',
                info[780] !== '' ? '和歌山県' : '',
                info[781] !== '' ? '京都府' : '',
                info[782] !== '' ? '大阪府' : '',
                info[783] !== '' ? '兵庫県' : '',
                info[784] !== '' ? '中国' : '',
                info[785] !== '' ? '岡山県' : '',
                info[786] !== '' ? '広島県' : '',
                info[787] !== '' ? '鳥取県' : '',
                info[788] !== '' ? '島根県' : '',
                info[789] !== '' ? '山口県' : '',
                info[790] !== '' ? '四国' : '',
                info[791] !== '' ? '香川県' : '',
                info[792] !== '' ? '徳島県' : '',
                info[793] !== '' ? '愛媛県' : '',
                info[794] !== '' ? '高知県' : '',
                info[795] !== '' ? '九州' : '',
                info[796] !== '' ? '福岡県' : '',
                info[797] !== '' ? '佐賀県' : '',
                info[798] !== '' ? '長崎県' : '',
                info[799] !== '' ? '大分県' : '',
                info[800] !== '' ? '熊本県' : '',
                info[801] !== '' ? '宮崎県' : '',
                info[802] !== '' ? '鹿児島県' : '',
                info[803] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[804] !== '',
                食料品: info[805] !== '',
                衣料品: info[806] !== '',
                貴金属服飾品: info[807] !== '',
                電化製品: info[808] !== '',
                家具調度品: info[809] !== '',
                書籍玩具音楽CD: info[810] !== '',
                EC通信販売: info[811] !== '',
                ガソリンスタンド: info[812] !== '',
                その他小売業: info[813] !== '',
                飲食業: info[814] !== '',
                宿泊業: info[815] !== '',
                公共料金: info[816] !== '',
                理容美容業: info[817] !== '',
                運輸業: info[818] !== '',
                その他サービス: info[819] !== '',
                その他自由記載サービス: info[820] !== ''
              },
              受付開始時間:
                  info[821] === ''
                    ? ''
                    : typeof info[821] === 'object'
                      ? Utilities.formatDate(info[821], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[821], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[821], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[821], 'JST', 'HH:mm')
                      : info[821].length >= 5 && info[821].indexOf('0') === 0
                        ? info[821].replace('0', '')
                        : info[821],
              受付終了時間:
                  info[822] === ''
                    ? ''
                    : typeof info[822] === 'object'
                      ? Utilities.formatDate(info[822], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[822], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[822], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[822], 'JST', 'HH:mm')
                      : info[822].length >= 5 && info[822].indexOf('0') === 0
                        ? info[822].replace('0', '')
                        : info[822],
              受付時間の補足: info[823],
              加盟店向けサービス問合せ電話番号: info[824],
              加盟店向けサービス問合せメールアドレス: info[825],
              加盟店向けサービス問合せ備考: info[827]
            }
            : null,
          // 個票8.
          info[828] !== '' || info[829] !== '' || info[830] !== '' || info[831] !== '' || info[833] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[828] !== '' ? info[828].split('、') : [],
                電子マネー: info[829] !== '' ? info[829].split('、') : [],
                QRコード: info[830] !== '' ? info[830].split('、') : [],
                その他: info[831] !== '' ? info[831].split('、') : []
              },
              サービスURL: info[832],
              決済手数料: {
                還元実施期間中:
                    typeof info[833] === 'number'
                      ? '〜' + (info[833] * 100).toFixed(2) + '%'
                      : info[833] !== '' && info[833].indexOf('~') === -1 && info[833].indexOf('～') === -1 && info[833].indexOf('〜') === -1
                        ? '〜' + info[833].replace(/ /g, '')
                        : info[833]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[834],
                還元実施期間前:
                    typeof info[835] === 'number' && info[835] < 1
                      ? (info[835] * 100).toFixed(2) + '%'
                      : typeof info[835] === 'number' && info[835] >= 1
                        ? info[835].toFixed(2) + '%'
                        : info[835]
              },
              発生する費用: {
                期間中: {
                  費目1: info[836],
                  費目2: info[837],
                  費目3: info[838],
                  費目4: '',
                  金額1: info[839],
                  金額2: info[840],
                  金額3: info[841],
                  金額4: '',
                  単位1: info[842],
                  単位2: info[843],
                  単位3: info[844],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[845],
                  費目2: info[846],
                  費目3: info[847],
                  費目4: '',
                  金額1: info[848],
                  金額2: info[849],
                  金額3: info[850],
                  金額4: '',
                  単位1: info[851],
                  単位2: info[852],
                  単位3: info[853],
                  単位4: ''
                }
              },
              入金タイミング: info[860],
              月次一括の場合の締日: info[861],
              月次一括の場合の支払日: info[862],
              複数回の場合の回数: info[863],
              振込手数料: info[864],
              サービス提供エリア: [
                info[865] !== '' ? '全国' : '',
                info[866] !== '' ? '北海道' : '',
                info[867] !== '' ? '東北' : '',
                info[868] !== '' ? '青森県' : '',
                info[869] !== '' ? '岩手県' : '',
                info[870] !== '' ? '秋田県' : '',
                info[871] !== '' ? '宮城県' : '',
                info[872] !== '' ? '山形県' : '',
                info[873] !== '' ? '福島県' : '',
                info[874] !== '' ? '関東' : '',
                info[875] !== '' ? '茨城県' : '',
                info[876] !== '' ? '栃木県' : '',
                info[877] !== '' ? '群馬県' : '',
                info[878] !== '' ? '埼玉県' : '',
                info[879] !== '' ? '千葉県' : '',
                info[880] !== '' ? '東京都' : '',
                info[881] !== '' ? '神奈川県' : '',
                info[882] !== '' ? '中部' : '',
                info[883] !== '' ? '新潟県' : '',
                info[884] !== '' ? '富山県' : '',
                info[885] !== '' ? '石川県' : '',
                info[886] !== '' ? '福井県' : '',
                info[887] !== '' ? '山梨県' : '',
                info[888] !== '' ? '長野県' : '',
                info[889] !== '' ? '岐阜県' : '',
                info[890] !== '' ? '静岡県' : '',
                info[891] !== '' ? '愛知県' : '',
                info[892] !== '' ? '近畿' : '',
                info[893] !== '' ? '三重県' : '',
                info[894] !== '' ? '滋賀県' : '',
                info[895] !== '' ? '奈良県' : '',
                info[896] !== '' ? '和歌山県' : '',
                info[897] !== '' ? '京都府' : '',
                info[898] !== '' ? '大阪府' : '',
                info[899] !== '' ? '兵庫県' : '',
                info[900] !== '' ? '中国' : '',
                info[901] !== '' ? '岡山県' : '',
                info[902] !== '' ? '広島県' : '',
                info[903] !== '' ? '鳥取県' : '',
                info[904] !== '' ? '島根県' : '',
                info[905] !== '' ? '山口県' : '',
                info[906] !== '' ? '四国' : '',
                info[907] !== '' ? '香川県' : '',
                info[908] !== '' ? '徳島県' : '',
                info[909] !== '' ? '愛媛県' : '',
                info[910] !== '' ? '高知県' : '',
                info[911] !== '' ? '九州' : '',
                info[912] !== '' ? '福岡県' : '',
                info[913] !== '' ? '佐賀県' : '',
                info[914] !== '' ? '長崎県' : '',
                info[915] !== '' ? '大分県' : '',
                info[916] !== '' ? '熊本県' : '',
                info[917] !== '' ? '宮崎県' : '',
                info[918] !== '' ? '鹿児島県' : '',
                info[919] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[920] !== '',
                食料品: info[921] !== '',
                衣料品: info[922] !== '',
                貴金属服飾品: info[923] !== '',
                電化製品: info[924] !== '',
                家具調度品: info[925] !== '',
                書籍玩具音楽CD: info[926] !== '',
                EC通信販売: info[927] !== '',
                ガソリンスタンド: info[928] !== '',
                その他小売業: info[929] !== '',
                飲食業: info[930] !== '',
                宿泊業: info[931] !== '',
                公共料金: info[932] !== '',
                理容美容業: info[933] !== '',
                運輸業: info[934] !== '',
                その他サービス: info[935] !== '',
                その他自由記載サービス: info[936] !== ''
              },
              受付開始時間:
                  info[937] === ''
                    ? ''
                    : typeof info[937] === 'object'
                      ? Utilities.formatDate(info[937], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[937], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[937], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[937], 'JST', 'HH:mm')
                      : info[937].length >= 5 && info[937].indexOf('0') === 0
                        ? info[937].replace('0', '')
                        : info[937],
              受付終了時間:
                  info[938] === ''
                    ? ''
                    : typeof info[938] === 'object'
                      ? Utilities.formatDate(info[938], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[938], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[938], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[938], 'JST', 'HH:mm')
                      : info[938].length >= 5 && info[938].indexOf('0') === 0
                        ? info[938].replace('0', '')
                        : info[938],
              受付時間の補足: info[939],
              加盟店向けサービス問合せ電話番号: info[940],
              加盟店向けサービス問合せメールアドレス: info[941],
              加盟店向けサービス問合せ備考: info[943]
            }
            : null,
          // 個票9.
          info[944] !== '' || info[945] !== '' || info[946] !== '' || info[947] !== '' || info[949] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[944] !== '' ? info[944].split('、') : [],
                電子マネー: info[945] !== '' ? info[945].split('、') : [],
                QRコード: info[946] !== '' ? info[946].split('、') : [],
                その他: info[947] !== '' ? info[947].split('、') : []
              },
              サービスURL: info[948],
              決済手数料: {
                還元実施期間中:
                    typeof info[949] === 'number'
                      ? '〜' + (info[949] * 100).toFixed(2) + '%'
                      : info[949] !== '' && info[949].indexOf('~') === -1 && info[949].indexOf('～') === -1 && info[949].indexOf('〜') === -1
                        ? '〜' + info[949].replace(/ /g, '')
                        : info[949]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[950],
                還元実施期間前:
                    typeof info[951] === 'number' && info[951] < 1
                      ? (info[951] * 100).toFixed(2) + '%'
                      : typeof info[951] === 'number' && info[951] >= 1
                        ? info[951].toFixed(2) + '%'
                        : info[951]
              },
              発生する費用: {
                期間中: {
                  費目1: info[952],
                  費目2: info[953],
                  費目3: info[954],
                  費目4: '',
                  金額1: info[955],
                  金額2: info[956],
                  金額3: info[957],
                  金額4: '',
                  単位1: info[958],
                  単位2: info[959],
                  単位3: info[960],
                  単位4: ''
                },
                期間終了後: {
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
                }
              },
              入金タイミング: info[976],
              月次一括の場合の締日: info[977],
              月次一括の場合の支払日: info[978],
              複数回の場合の回数: info[979],
              振込手数料: info[980],
              サービス提供エリア: [
                info[981] !== '' ? '全国' : '',
                info[982] !== '' ? '北海道' : '',
                info[983] !== '' ? '東北' : '',
                info[984] !== '' ? '青森県' : '',
                info[985] !== '' ? '岩手県' : '',
                info[986] !== '' ? '秋田県' : '',
                info[987] !== '' ? '宮城県' : '',
                info[988] !== '' ? '山形県' : '',
                info[989] !== '' ? '福島県' : '',
                info[990] !== '' ? '関東' : '',
                info[991] !== '' ? '茨城県' : '',
                info[992] !== '' ? '栃木県' : '',
                info[993] !== '' ? '群馬県' : '',
                info[994] !== '' ? '埼玉県' : '',
                info[995] !== '' ? '千葉県' : '',
                info[996] !== '' ? '東京都' : '',
                info[997] !== '' ? '神奈川県' : '',
                info[998] !== '' ? '中部' : '',
                info[999] !== '' ? '新潟県' : '',
                info[1000] !== '' ? '富山県' : '',
                info[1001] !== '' ? '石川県' : '',
                info[1002] !== '' ? '福井県' : '',
                info[1003] !== '' ? '山梨県' : '',
                info[1004] !== '' ? '長野県' : '',
                info[1005] !== '' ? '岐阜県' : '',
                info[1006] !== '' ? '静岡県' : '',
                info[1007] !== '' ? '愛知県' : '',
                info[1008] !== '' ? '近畿' : '',
                info[1009] !== '' ? '三重県' : '',
                info[1010] !== '' ? '滋賀県' : '',
                info[1011] !== '' ? '奈良県' : '',
                info[1012] !== '' ? '和歌山県' : '',
                info[1013] !== '' ? '京都府' : '',
                info[1014] !== '' ? '大阪府' : '',
                info[1015] !== '' ? '兵庫県' : '',
                info[1016] !== '' ? '中国' : '',
                info[1017] !== '' ? '岡山県' : '',
                info[1018] !== '' ? '広島県' : '',
                info[1019] !== '' ? '鳥取県' : '',
                info[1020] !== '' ? '島根県' : '',
                info[1021] !== '' ? '山口県' : '',
                info[1022] !== '' ? '四国' : '',
                info[1023] !== '' ? '香川県' : '',
                info[1024] !== '' ? '徳島県' : '',
                info[1025] !== '' ? '愛媛県' : '',
                info[1026] !== '' ? '高知県' : '',
                info[1027] !== '' ? '九州' : '',
                info[1028] !== '' ? '福岡県' : '',
                info[1029] !== '' ? '佐賀県' : '',
                info[1030] !== '' ? '長崎県' : '',
                info[1031] !== '' ? '大分県' : '',
                info[1032] !== '' ? '熊本県' : '',
                info[1033] !== '' ? '宮崎県' : '',
                info[1034] !== '' ? '鹿児島県' : '',
                info[1035] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[1036] !== '',
                食料品: info[1037] !== '',
                衣料品: info[1038] !== '',
                貴金属服飾品: info[1039] !== '',
                電化製品: info[1040] !== '',
                家具調度品: info[1041] !== '',
                書籍玩具音楽CD: info[1042] !== '',
                EC通信販売: info[1043] !== '',
                ガソリンスタンド: info[1044] !== '',
                その他小売業: info[1045] !== '',
                飲食業: info[1046] !== '',
                宿泊業: info[1047] !== '',
                公共料金: info[1048] !== '',
                理容美容業: info[1049] !== '',
                運輸業: info[1050] !== '',
                その他サービス: info[1051] !== '',
                その他自由記載サービス: info[1052] !== ''
              },
              受付開始時間:
                  info[1053] === ''
                    ? ''
                    : typeof info[1053] === 'object'
                      ? Utilities.formatDate(info[1053], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[1053], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[1053], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[1053], 'JST', 'HH:mm')
                      : info[1053].length >= 5 && info[1053].indexOf('0') === 0
                        ? info[1053].replace('0', '')
                        : info[1053],
              受付終了時間:
                  info[1054] === ''
                    ? ''
                    : typeof info[1054] === 'object'
                      ? Utilities.formatDate(info[1054], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[1054], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[1054], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[1054], 'JST', 'HH:mm')
                      : info[1054].length >= 5 && info[1054].indexOf('0') === 0
                        ? info[1054].replace('0', '')
                        : info[1054],
              受付時間の補足: info[1055],
              加盟店向けサービス問合せ電話番号: info[1056],
              加盟店向けサービス問合せメールアドレス: info[1057],
              加盟店向けサービス問合せ備考: info[1059]
            }
            : null,
          // 個票10.
          info[1060] !== '' || info[1061] !== '' || info[1062] !== '' || info[1063] !== '' || info[1065] !== ''
            ? {
              対応可能なブランド: {
                クレジットカード: info[1060] !== '' ? info[1060].split('、') : [],
                電子マネー: info[1061] !== '' ? info[1061].split('、') : [],
                QRコード: info[1062] !== '' ? info[1062].split('、') : [],
                その他: info[1063] !== '' ? info[1063].split('、') : []
              },
              サービスURL: info[1064],
              決済手数料: {
                還元実施期間中:
                    typeof info[1065] === 'number'
                      ? '〜' + (info[1065] * 100).toFixed(2) + '%'
                      : info[1065] !== '' && info[1065].indexOf('~') === -1 && info[1065].indexOf('～') === -1 && info[1065].indexOf('〜') === -1
                        ? '〜' + info[1065].replace(/ /g, '')
                        : info[1065]
                          .replace(/ /g, '')
                          .replace(/~/g, '〜')
                          .replace(/～/g, '〜'),
                期間終了後: info[1066],
                還元実施期間前:
                    typeof info[1067] === 'number' && info[1067] < 1
                      ? (info[1067] * 100).toFixed(2) + '%'
                      : typeof info[1067] === 'number' && info[1067] >= 1
                        ? info[1067].toFixed(2) + '%'
                        : info[1067]
              },
              発生する費用: {
                期間中: {
                  費目1: info[1068],
                  費目2: info[1069],
                  費目3: info[1070],
                  費目4: '',
                  金額1: info[1071],
                  金額2: info[1072],
                  金額3: info[1073],
                  金額4: '',
                  単位1: info[1074],
                  単位2: info[1075],
                  単位3: info[1076],
                  単位4: ''
                },
                期間終了後: {
                  費目1: info[1077],
                  費目2: info[1078],
                  費目3: info[1079],
                  費目4: '',
                  金額1: info[1080],
                  金額2: info[1081],
                  金額3: info[1082],
                  金額4: '',
                  単位1: info[1083],
                  単位2: info[1084],
                  単位3: info[1085],
                  単位4: ''
                }
              },
              入金タイミング: info[1092],
              月次一括の場合の締日: info[1093],
              月次一括の場合の支払日: info[1094],
              複数回の場合の回数: info[1095],
              振込手数料: info[1096],
              サービス提供エリア: [
                info[1097] !== '' ? '全国' : '',
                info[1098] !== '' ? '北海道' : '',
                info[1099] !== '' ? '東北' : '',
                info[1100] !== '' ? '青森県' : '',
                info[1101] !== '' ? '岩手県' : '',
                info[1102] !== '' ? '秋田県' : '',
                info[1103] !== '' ? '宮城県' : '',
                info[1104] !== '' ? '山形県' : '',
                info[1105] !== '' ? '福島県' : '',
                info[1106] !== '' ? '関東' : '',
                info[1107] !== '' ? '茨城県' : '',
                info[1108] !== '' ? '栃木県' : '',
                info[1109] !== '' ? '群馬県' : '',
                info[1110] !== '' ? '埼玉県' : '',
                info[1111] !== '' ? '千葉県' : '',
                info[1112] !== '' ? '東京都' : '',
                info[1113] !== '' ? '神奈川県' : '',
                info[1114] !== '' ? '中部' : '',
                info[1115] !== '' ? '新潟県' : '',
                info[1116] !== '' ? '富山県' : '',
                info[1117] !== '' ? '石川県' : '',
                info[1118] !== '' ? '福井県' : '',
                info[1119] !== '' ? '山梨県' : '',
                info[1120] !== '' ? '長野県' : '',
                info[1121] !== '' ? '岐阜県' : '',
                info[1122] !== '' ? '静岡県' : '',
                info[1123] !== '' ? '愛知県' : '',
                info[1124] !== '' ? '近畿' : '',
                info[1125] !== '' ? '三重県' : '',
                info[1126] !== '' ? '滋賀県' : '',
                info[1127] !== '' ? '奈良県' : '',
                info[1128] !== '' ? '和歌山県' : '',
                info[1129] !== '' ? '京都府' : '',
                info[1130] !== '' ? '大阪府' : '',
                info[1131] !== '' ? '兵庫県' : '',
                info[1132] !== '' ? '中国' : '',
                info[1133] !== '' ? '岡山県' : '',
                info[1134] !== '' ? '広島県' : '',
                info[1135] !== '' ? '鳥取県' : '',
                info[1136] !== '' ? '島根県' : '',
                info[1137] !== '' ? '山口県' : '',
                info[1138] !== '' ? '四国' : '',
                info[1139] !== '' ? '香川県' : '',
                info[1140] !== '' ? '徳島県' : '',
                info[1141] !== '' ? '愛媛県' : '',
                info[1142] !== '' ? '高知県' : '',
                info[1143] !== '' ? '九州' : '',
                info[1144] !== '' ? '福岡県' : '',
                info[1145] !== '' ? '佐賀県' : '',
                info[1146] !== '' ? '長崎県' : '',
                info[1147] !== '' ? '大分県' : '',
                info[1148] !== '' ? '熊本県' : '',
                info[1149] !== '' ? '宮崎県' : '',
                info[1150] !== '' ? '鹿児島県' : '',
                info[1151] !== '' ? '沖縄県' : ''
              ].filter((prefecturesInfo): string => {
                return prefecturesInfo
              }),
              営業対象業種: {
                総合: info[1152] !== '',
                食料品: info[1153] !== '',
                衣料品: info[1154] !== '',
                貴金属服飾品: info[1155] !== '',
                電化製品: info[1156] !== '',
                家具調度品: info[1157] !== '',
                書籍玩具音楽CD: info[1158] !== '',
                EC通信販売: info[1159] !== '',
                ガソリンスタンド: info[1160] !== '',
                その他小売業: info[1161] !== '',
                飲食業: info[1162] !== '',
                宿泊業: info[1163] !== '',
                公共料金: info[1164] !== '',
                理容美容業: info[1165] !== '',
                運輸業: info[1166] !== '',
                その他サービス: info[1167] !== '',
                その他自由記載サービス: info[1168] !== ''
              },
              受付開始時間:
                  info[1169] === ''
                    ? ''
                    : typeof info[1169] === 'object'
                      ? Utilities.formatDate(info[1169], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[1169], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[1169], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[1169], 'JST', 'HH:mm')
                      : info[1169].length >= 5 && info[1169].indexOf('0') === 0
                        ? info[1169].replace('0', '')
                        : info[1169],
              受付終了時間:
                  info[1170] === ''
                    ? ''
                    : typeof info[1170] === 'object'
                      ? Utilities.formatDate(info[1170], 'JST', 'HH:mm').length >= 5 && Utilities.formatDate(info[1170], 'JST', 'HH:mm').indexOf('0') === 0
                        ? Utilities.formatDate(info[1170], 'JST', 'HH:mm').replace('0', '')
                        : Utilities.formatDate(info[1170], 'JST', 'HH:mm')
                      : info[1170].length >= 5 && info[1170].indexOf('0') === 0
                        ? info[1170].replace('0', '')
                        : info[1170],
              受付時間の補足: info[1171],
              加盟店向けサービス問合せ電話番号: info[1172],
              加盟店向けサービス問合せメールアドレス: info[1173],
              加盟店向けサービス問合せ備考: info[1175]
            }
            : null
        ].filter((info): DetailTypeB | null => {
          return info
        }),
        // 決済端末 x 10.
        対応可能な決済端末: [
        // 決済端末1.
          info[1179] !== '' && info[1179] !== 0
            ? {
              種別: info[1179] !== '' && info[1179] !== 0 ? info[1179] : '',
              メーカー名: info[1180] !== '' && info[1180] !== 0 ? info[1180] : '',
              製品名: info[1181] !== '' && info[1181] !== 0 ? info[1181] : '',
              型番: info[1182] !== '' && info[1182] !== 0 ? info[1182] : '',
              画像ファイル名: info[1183] !== '' && info[1183] !== 0 ? info[1183] : '',
              製品URL: info[1184] !== '' && info[1184] !== 0 ? info[1184] : '',
              幅: info[1185] !== '' && info[1185] !== 0 ? info[1185] : '',
              高さ: info[1186] !== '' && info[1186] !== 0 ? info[1186] : '',
              奥行: info[1187] !== '' && info[1187] !== 0 ? info[1187] : '',
              重量: info[1188] !== '' && info[1188] !== 0 ? info[1188] : '',
              有線LAN: info[1189] !== '' && info[1189] !== 0,
              USB: info[1190] !== '' && info[1190] !== 0,
              WiFi: info[1191] !== '' && info[1191] !== 0,
              Bluetooth: info[1192] !== '' && info[1192] !== 0,
              モバイル通信: info[1193] !== '' && info[1193] !== 0,
              通信規格その他: info[1194] !== '' && info[1194] !== 0 ? info[1194] : '',
              電源式: info[1195] !== '' && info[1195] !== 0,
              電池式: info[1196] !== '' && info[1196] !== 0,
              電源その他: info[1197] !== '' && info[1197] !== 0 ? info[1197] : '',
              付属品1種類: info[1198] !== '' && info[1198] !== 0 ? info[1198] : '',
              付属品1型番: info[1199] !== '' && info[1199] !== 0 ? info[1199] : '',
              付属品2種類: info[1200] !== '' && info[1200] !== 0 ? info[1200] : '',
              付属品2型番: info[1201] !== '' && info[1201] !== 0 ? info[1201] : '',
              付属品3種類: info[1202] !== '' && info[1202] !== 0 ? info[1202] : '',
              付属品3型番: info[1203] !== '' && info[1203] !== 0 ? info[1203] : '',
              付属品4種類: info[1204] !== '' && info[1204] !== 0 ? info[1204] : '',
              付属品4型番: info[1205] !== '' && info[1205] !== 0 ? info[1205] : '',
              付属品5種類: info[1206] !== '' && info[1206] !== 0 ? info[1206] : '',
              付属品5型番: info[1207] !== '' && info[1207] !== 0 ? info[1207] : '',
              端末対応キャッシュレス区分クレジットカード: info[1212] !== '' && info[1212] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1213] !== '' && info[1213] !== 0,
              端末対応キャッシュレス区分QRコード: info[1214] !== '' && info[1214] !== 0,
              端末対応キャッシュレス区分その他: info[1215] !== '' && info[1215] !== 0,
              端末対応キャッシュレス区分JDebit: info[1216] !== '' && info[1216] !== 0
            }
            : null,
          // 決済端末2.
          info[1232] !== '' && info[1232] !== 0
            ? {
              種別: info[1232] !== '' && info[1232] !== 0 ? info[1232] : '',
              メーカー名: info[1233] !== '' && info[1233] !== 0 ? info[1233] : '',
              製品名: info[1234] !== '' && info[1234] !== 0 ? info[1234] : '',
              型番: info[1235] !== '' && info[1235] !== 0 ? info[1235] : '',
              画像ファイル名: info[1236] !== '' && info[1236] !== 0 ? info[1236] : '',
              製品URL: info[1237] !== '' && info[1237] !== 0 ? info[1237] : '',
              幅: info[1238] !== '' && info[1238] !== 0 ? info[1238] : '',
              高さ: info[1239] !== '' && info[1239] !== 0 ? info[1239] : '',
              奥行: info[1240] !== '' && info[1240] !== 0 ? info[1240] : '',
              重量: info[1241] !== '' && info[1241] !== 0 ? info[1241] : '',
              有線LAN: info[1242] !== '' && info[1242] !== 0,
              USB: info[1243] !== '' && info[1243] !== 0,
              WiFi: info[1244] !== '' && info[1244] !== 0,
              Bluetooth: info[1245] !== '' && info[1245] !== 0,
              モバイル通信: info[1246] !== '' && info[1246] !== 0,
              通信規格その他: info[1247] !== '' && info[1247] !== 0 ? info[1247] : '',
              電源式: info[1248] !== '' && info[1248] !== 0,
              電池式: info[1249] !== '' && info[1249] !== 0,
              電源その他: info[1250] !== '' && info[1250] !== 0 ? info[1250] : '',
              付属品1種類: info[1251] !== '' && info[1251] !== 0 ? info[1251] : '',
              付属品1型番: info[1252] !== '' && info[1252] !== 0 ? info[1252] : '',
              付属品2種類: info[1253] !== '' && info[1253] !== 0 ? info[1253] : '',
              付属品2型番: info[1254] !== '' && info[1254] !== 0 ? info[1254] : '',
              付属品3種類: info[1255] !== '' && info[1255] !== 0 ? info[1255] : '',
              付属品3型番: info[1256] !== '' && info[1256] !== 0 ? info[1256] : '',
              付属品4種類: info[1257] !== '' && info[1257] !== 0 ? info[1257] : '',
              付属品4型番: info[1258] !== '' && info[1258] !== 0 ? info[1258] : '',
              付属品5種類: info[1259] !== '' && info[1259] !== 0 ? info[1259] : '',
              付属品5型番: info[1260] !== '' && info[1260] !== 0 ? info[1260] : '',
              端末対応キャッシュレス区分クレジットカード: info[1265] !== '' && info[1265] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1266] !== '' && info[1266] !== 0,
              端末対応キャッシュレス区分QRコード: info[1267] !== '' && info[1267] !== 0,
              端末対応キャッシュレス区分その他: info[1268] !== '' && info[1268] !== 0,
              端末対応キャッシュレス区分JDebit: info[1269] !== '' && info[1269] !== 0
            }
            : null,
          // 決済端末3.
          info[1285] !== '' && info[1285] !== 0
            ? {
              種別: info[1285] !== '' && info[1285] !== 0 ? info[1285] : '',
              メーカー名: info[1286] !== '' && info[1286] !== 0 ? info[1286] : '',
              製品名: info[1287] !== '' && info[1287] !== 0 ? info[1287] : '',
              型番: info[1288] !== '' && info[1288] !== 0 ? info[1288] : '',
              画像ファイル名: info[1289] !== '' && info[1289] !== 0 ? info[1289] : '',
              製品URL: info[1290] !== '' && info[1290] !== 0 ? info[1290] : '',
              幅: info[1291] !== '' && info[1291] !== 0 ? info[1291] : '',
              高さ: info[1292] !== '' && info[1292] !== 0 ? info[1292] : '',
              奥行: info[1293] !== '' && info[1293] !== 0 ? info[1293] : '',
              重量: info[1294] !== '' && info[1294] !== 0 ? info[1294] : '',
              有線LAN: info[1295] !== '' && info[1295] !== 0,
              USB: info[1296] !== '' && info[1296] !== 0,
              WiFi: info[1297] !== '' && info[1297] !== 0,
              Bluetooth: info[1298] !== '' && info[1298] !== 0,
              モバイル通信: info[1299] !== '' && info[1299] !== 0,
              通信規格その他: info[1300] !== '' && info[1300] !== 0 ? info[1300] : '',
              電源式: info[1301] !== '' && info[1301] !== 0,
              電池式: info[1302] !== '' && info[1302] !== 0,
              電源その他: info[1303] !== '' && info[1303] !== 0 ? info[1303] : '',
              付属品1種類: info[1304] !== '' && info[1304] !== 0 ? info[1304] : '',
              付属品1型番: info[1305] !== '' && info[1305] !== 0 ? info[1305] : '',
              付属品2種類: info[1306] !== '' && info[1306] !== 0 ? info[1306] : '',
              付属品2型番: info[1307] !== '' && info[1307] !== 0 ? info[1307] : '',
              付属品3種類: info[1308] !== '' && info[1308] !== 0 ? info[1308] : '',
              付属品3型番: info[1309] !== '' && info[1309] !== 0 ? info[1309] : '',
              付属品4種類: info[1310] !== '' && info[1310] !== 0 ? info[1310] : '',
              付属品4型番: info[1311] !== '' && info[1311] !== 0 ? info[1311] : '',
              付属品5種類: info[1312] !== '' && info[1312] !== 0 ? info[1312] : '',
              付属品5型番: info[1313] !== '' && info[1313] !== 0 ? info[1313] : '',
              端末対応キャッシュレス区分クレジットカード: info[1318] !== '' && info[1318] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1319] !== '' && info[1319] !== 0,
              端末対応キャッシュレス区分QRコード: info[1320] !== '' && info[1320] !== 0,
              端末対応キャッシュレス区分その他: info[1321] !== '' && info[1321] !== 0,
              端末対応キャッシュレス区分JDebit: info[1322] !== '' && info[1322] !== 0
            }
            : null,
          // 決済端末4.
          info[1338] !== '' && info[1338] !== 0
            ? {
              種別: info[1338] !== '' && info[1338] !== 0 ? info[1338] : '',
              メーカー名: info[1339] !== '' && info[1339] !== 0 ? info[1339] : '',
              製品名: info[1340] !== '' && info[1340] !== 0 ? info[1340] : '',
              型番: info[1341] !== '' && info[1341] !== 0 ? info[1341] : '',
              画像ファイル名: info[1342] !== '' && info[1342] !== 0 ? info[1342] : '',
              製品URL: info[1343] !== '' && info[1343] !== 0 ? info[1343] : '',
              幅: info[1344] !== '' && info[1344] !== 0 ? info[1344] : '',
              高さ: info[1345] !== '' && info[1345] !== 0 ? info[1345] : '',
              奥行: info[1346] !== '' && info[1346] !== 0 ? info[1346] : '',
              重量: info[1347] !== '' && info[1347] !== 0 ? info[1347] : '',
              有線LAN: info[1348] !== '' && info[1348] !== 0,
              USB: info[1349] !== '' && info[1349] !== 0,
              WiFi: info[1350] !== '' && info[1350] !== 0,
              Bluetooth: info[1351] !== '' && info[1351] !== 0,
              モバイル通信: info[1352] !== '' && info[1352] !== 0,
              通信規格その他: info[1353] !== '' && info[1353] !== 0 ? info[1353] : '',
              電源式: info[1354] !== '' && info[1354] !== 0,
              電池式: info[1355] !== '' && info[1355] !== 0,
              電源その他: info[1356] !== '' && info[1356] !== 0 ? info[1356] : '',
              付属品1種類: info[1357] !== '' && info[1357] !== 0 ? info[1357] : '',
              付属品1型番: info[1358] !== '' && info[1358] !== 0 ? info[1358] : '',
              付属品2種類: info[1359] !== '' && info[1359] !== 0 ? info[1359] : '',
              付属品2型番: info[1360] !== '' && info[1360] !== 0 ? info[1360] : '',
              付属品3種類: info[1361] !== '' && info[1361] !== 0 ? info[1361] : '',
              付属品3型番: info[1362] !== '' && info[1362] !== 0 ? info[1362] : '',
              付属品4種類: info[1363] !== '' && info[1363] !== 0 ? info[1363] : '',
              付属品4型番: info[1364] !== '' && info[1364] !== 0 ? info[1364] : '',
              付属品5種類: info[1365] !== '' && info[1365] !== 0 ? info[1365] : '',
              付属品5型番: info[1366] !== '' && info[1366] !== 0 ? info[1366] : '',
              端末対応キャッシュレス区分クレジットカード: info[1371] !== '' && info[1371] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1372] !== '' && info[1372] !== 0,
              端末対応キャッシュレス区分QRコード: info[1373] !== '' && info[1373] !== 0,
              端末対応キャッシュレス区分その他: info[1374] !== '' && info[1374] !== 0,
              端末対応キャッシュレス区分JDebit: info[1375] !== '' && info[1375] !== 0
            }
            : null,
          // 決済端末5.
          info[1391] !== '' && info[1391] !== 0
            ? {
              種別: info[1391] !== '' && info[1391] !== 0 ? info[1391] : '',
              メーカー名: info[1392] !== '' && info[1392] !== 0 ? info[1392] : '',
              製品名: info[1393] !== '' && info[1393] !== 0 ? info[1393] : '',
              型番: info[1394] !== '' && info[1394] !== 0 ? info[1394] : '',
              画像ファイル名: info[1395] !== '' && info[1395] !== 0 ? info[1395] : '',
              製品URL: info[1396] !== '' && info[1396] !== 0 ? info[1396] : '',
              幅: info[1397] !== '' && info[1397] !== 0 ? info[1397] : '',
              高さ: info[1398] !== '' && info[1398] !== 0 ? info[1398] : '',
              奥行: info[1399] !== '' && info[1399] !== 0 ? info[1399] : '',
              重量: info[1400] !== '' && info[1400] !== 0 ? info[1400] : '',
              有線LAN: info[1401] !== '' && info[1401] !== 0,
              USB: info[1402] !== '' && info[1402] !== 0,
              WiFi: info[1403] !== '' && info[1403] !== 0,
              Bluetooth: info[1404] !== '' && info[1404] !== 0,
              モバイル通信: info[1405] !== '' && info[1405] !== 0,
              通信規格その他: info[1406] !== '' && info[1406] !== 0 ? info[1406] : '',
              電源式: info[1407] !== '' && info[1407] !== 0,
              電池式: info[1408] !== '' && info[1408] !== 0,
              電源その他: info[1409] !== '' && info[1409] !== 0 ? info[1409] : '',
              付属品1種類: info[1410] !== '' && info[1410] !== 0 ? info[1410] : '',
              付属品1型番: info[1411] !== '' && info[1411] !== 0 ? info[1411] : '',
              付属品2種類: info[1412] !== '' && info[1412] !== 0 ? info[1412] : '',
              付属品2型番: info[1413] !== '' && info[1413] !== 0 ? info[1413] : '',
              付属品3種類: info[1414] !== '' && info[1414] !== 0 ? info[1414] : '',
              付属品3型番: info[1415] !== '' && info[1415] !== 0 ? info[1415] : '',
              付属品4種類: info[1416] !== '' && info[1416] !== 0 ? info[1416] : '',
              付属品4型番: info[1417] !== '' && info[1417] !== 0 ? info[1417] : '',
              付属品5種類: info[1418] !== '' && info[1418] !== 0 ? info[1418] : '',
              付属品5型番: info[1419] !== '' && info[1419] !== 0 ? info[1419] : '',
              端末対応キャッシュレス区分クレジットカード: info[1424] !== '' && info[1424] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1425] !== '' && info[1425] !== 0,
              端末対応キャッシュレス区分QRコード: info[1426] !== '' && info[1426] !== 0,
              端末対応キャッシュレス区分その他: info[1427] !== '' && info[1427] !== 0,
              端末対応キャッシュレス区分JDebit: info[1428] !== '' && info[1428] !== 0
            }
            : null,
          // 決済端末6.
          info[1444] !== '' && info[1444] !== 0
            ? {
              種別: info[1444] !== '' && info[1444] !== 0 ? info[1444] : '',
              メーカー名: info[1445] !== '' && info[1445] !== 0 ? info[1445] : '',
              製品名: info[1446] !== '' && info[1446] !== 0 ? info[1446] : '',
              型番: info[1447] !== '' && info[1447] !== 0 ? info[1447] : '',
              画像ファイル名: info[1448] !== '' && info[1448] !== 0 ? info[1448] : '',
              製品URL: info[1449] !== '' && info[1449] !== 0 ? info[1449] : '',
              幅: info[1450] !== '' && info[1450] !== 0 ? info[1450] : '',
              高さ: info[1451] !== '' && info[1451] !== 0 ? info[1451] : '',
              奥行: info[1452] !== '' && info[1452] !== 0 ? info[1452] : '',
              重量: info[1453] !== '' && info[1453] !== 0 ? info[1453] : '',
              有線LAN: info[1454] !== '' && info[1454] !== 0,
              USB: info[1455] !== '' && info[1455] !== 0,
              WiFi: info[1456] !== '' && info[1456] !== 0,
              Bluetooth: info[1457] !== '' && info[1457] !== 0,
              モバイル通信: info[1458] !== '' && info[1458] !== 0,
              通信規格その他: info[1459] !== '' && info[1459] !== 0 ? info[1459] : '',
              電源式: info[1460] !== '' && info[1460] !== 0,
              電池式: info[1461] !== '' && info[1461] !== 0,
              電源その他: info[1462] !== '' && info[1462] !== 0 ? info[1462] : '',
              付属品1種類: info[1463] !== '' && info[1463] !== 0 ? info[1463] : '',
              付属品1型番: info[1464] !== '' && info[1464] !== 0 ? info[1464] : '',
              付属品2種類: info[1465] !== '' && info[1465] !== 0 ? info[1465] : '',
              付属品2型番: info[1466] !== '' && info[1466] !== 0 ? info[1466] : '',
              付属品3種類: info[1467] !== '' && info[1467] !== 0 ? info[1467] : '',
              付属品3型番: info[1468] !== '' && info[1468] !== 0 ? info[1468] : '',
              付属品4種類: info[1469] !== '' && info[1469] !== 0 ? info[1469] : '',
              付属品4型番: info[1470] !== '' && info[1470] !== 0 ? info[1470] : '',
              付属品5種類: info[1471] !== '' && info[1471] !== 0 ? info[1471] : '',
              付属品5型番: info[1472] !== '' && info[1472] !== 0 ? info[1472] : '',
              端末対応キャッシュレス区分クレジットカード: info[1477] !== '' && info[1477] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1478] !== '' && info[1478] !== 0,
              端末対応キャッシュレス区分QRコード: info[1479] !== '' && info[1479] !== 0,
              端末対応キャッシュレス区分その他: info[1480] !== '' && info[1480] !== 0,
              端末対応キャッシュレス区分JDebit: info[1481] !== '' && info[1481] !== 0
            }
            : null,
          // 決済端末7.
          info[1497] !== '' && info[1497] !== 0
            ? {
              種別: info[1497] !== '' && info[1497] !== 0 ? info[1497] : '',
              メーカー名: info[1498] !== '' && info[1498] !== 0 ? info[1498] : '',
              製品名: info[1499] !== '' && info[1499] !== 0 ? info[1499] : '',
              型番: info[1500] !== '' && info[1500] !== 0 ? info[1500] : '',
              画像ファイル名: info[1501] !== '' && info[1501] !== 0 ? info[1501] : '',
              製品URL: info[1502] !== '' && info[1502] !== 0 ? info[1502] : '',
              幅: info[1503] !== '' && info[1503] !== 0 ? info[1503] : '',
              高さ: info[1504] !== '' && info[1504] !== 0 ? info[1504] : '',
              奥行: info[1505] !== '' && info[1505] !== 0 ? info[1505] : '',
              重量: info[1506] !== '' && info[1506] !== 0 ? info[1506] : '',
              有線LAN: info[1507] !== '' && info[1507] !== 0,
              USB: info[1508] !== '' && info[1508] !== 0,
              WiFi: info[1509] !== '' && info[1509] !== 0,
              Bluetooth: info[1510] !== '' && info[1510] !== 0,
              モバイル通信: info[1511] !== '' && info[1511] !== 0,
              通信規格その他: info[1512] !== '' && info[1512] !== 0 ? info[1512] : '',
              電源式: info[1513] !== '' && info[1513] !== 0,
              電池式: info[1514] !== '' && info[1514] !== 0,
              電源その他: info[1515] !== '' && info[1515] !== 0 ? info[1515] : '',
              付属品1種類: info[1516] !== '' && info[1516] !== 0 ? info[1516] : '',
              付属品1型番: info[1517] !== '' && info[1517] !== 0 ? info[1517] : '',
              付属品2種類: info[1518] !== '' && info[1518] !== 0 ? info[1518] : '',
              付属品2型番: info[1519] !== '' && info[1519] !== 0 ? info[1519] : '',
              付属品3種類: info[1520] !== '' && info[1520] !== 0 ? info[1520] : '',
              付属品3型番: info[1521] !== '' && info[1521] !== 0 ? info[1521] : '',
              付属品4種類: info[1522] !== '' && info[1522] !== 0 ? info[1522] : '',
              付属品4型番: info[1523] !== '' && info[1523] !== 0 ? info[1523] : '',
              付属品5種類: info[1524] !== '' && info[1524] !== 0 ? info[1524] : '',
              付属品5型番: info[1525] !== '' && info[1525] !== 0 ? info[1525] : '',
              端末対応キャッシュレス区分クレジットカード: info[1530] !== '' && info[1530] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1531] !== '' && info[1531] !== 0,
              端末対応キャッシュレス区分QRコード: info[1532] !== '' && info[1532] !== 0,
              端末対応キャッシュレス区分その他: info[1533] !== '' && info[1533] !== 0,
              端末対応キャッシュレス区分JDebit: info[1534] !== '' && info[1534] !== 0
            }
            : null,
          // 決済端末8.
          info[1550] !== '' && info[1550] !== 0
            ? {
              種別: info[1550] !== '' && info[1550] !== 0 ? info[1550] : '',
              メーカー名: info[1551] !== '' && info[1551] !== 0 ? info[1551] : '',
              製品名: info[1552] !== '' && info[1552] !== 0 ? info[1552] : '',
              型番: info[1553] !== '' && info[1553] !== 0 ? info[1553] : '',
              画像ファイル名: info[1554] !== '' && info[1554] !== 0 ? info[1554] : '',
              製品URL: info[1555] !== '' && info[1555] !== 0 ? info[1555] : '',
              幅: info[1556] !== '' && info[1556] !== 0 ? info[1556] : '',
              高さ: info[1557] !== '' && info[1557] !== 0 ? info[1557] : '',
              奥行: info[1558] !== '' && info[1558] !== 0 ? info[1558] : '',
              重量: info[1559] !== '' && info[1559] !== 0 ? info[1559] : '',
              有線LAN: info[1560] !== '' && info[1560] !== 0,
              USB: info[1561] !== '' && info[1561] !== 0,
              WiFi: info[1562] !== '' && info[1562] !== 0,
              Bluetooth: info[1563] !== '' && info[1563] !== 0,
              モバイル通信: info[1564] !== '' && info[1564] !== 0,
              通信規格その他: info[1565] !== '' && info[1565] !== 0 ? info[1565] : '',
              電源式: info[1566] !== '' && info[1566] !== 0,
              電池式: info[1567] !== '' && info[1567] !== 0,
              電源その他: info[1568] !== '' && info[1568] !== 0 ? info[1568] : '',
              付属品1種類: info[1569] !== '' && info[1569] !== 0 ? info[1569] : '',
              付属品1型番: info[1570] !== '' && info[1570] !== 0 ? info[1570] : '',
              付属品2種類: info[1571] !== '' && info[1571] !== 0 ? info[1571] : '',
              付属品2型番: info[1572] !== '' && info[1572] !== 0 ? info[1572] : '',
              付属品3種類: info[1573] !== '' && info[1573] !== 0 ? info[1573] : '',
              付属品3型番: info[1574] !== '' && info[1574] !== 0 ? info[1574] : '',
              付属品4種類: info[1575] !== '' && info[1575] !== 0 ? info[1575] : '',
              付属品4型番: info[1576] !== '' && info[1576] !== 0 ? info[1576] : '',
              付属品5種類: info[1577] !== '' && info[1577] !== 0 ? info[1577] : '',
              付属品5型番: info[1578] !== '' && info[1578] !== 0 ? info[1578] : '',
              端末対応キャッシュレス区分クレジットカード: info[1583] !== '' && info[1583] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1584] !== '' && info[1584] !== 0,
              端末対応キャッシュレス区分QRコード: info[1585] !== '' && info[1585] !== 0,
              端末対応キャッシュレス区分その他: info[1586] !== '' && info[1586] !== 0,
              端末対応キャッシュレス区分JDebit: info[1587] !== '' && info[1587] !== 0
            }
            : null,
          // 決済端末9.
          info[1603] !== '' && info[1603] !== 0
            ? {
              種別: info[1603] !== '' && info[1603] !== 0 ? info[1603] : '',
              メーカー名: info[1604] !== '' && info[1604] !== 0 ? info[1604] : '',
              製品名: info[1605] !== '' && info[1605] !== 0 ? info[1605] : '',
              型番: info[1606] !== '' && info[1606] !== 0 ? info[1606] : '',
              画像ファイル名: info[1607] !== '' && info[1607] !== 0 ? info[1607] : '',
              製品URL: info[1608] !== '' && info[1608] !== 0 ? info[1608] : '',
              幅: info[1609] !== '' && info[1609] !== 0 ? info[1609] : '',
              高さ: info[1610] !== '' && info[1610] !== 0 ? info[1610] : '',
              奥行: info[1611] !== '' && info[1611] !== 0 ? info[1611] : '',
              重量: info[1612] !== '' && info[1612] !== 0 ? info[1612] : '',
              有線LAN: info[1613] !== '' && info[1613] !== 0,
              USB: info[1614] !== '' && info[1614] !== 0,
              WiFi: info[1615] !== '' && info[1615] !== 0,
              Bluetooth: info[1616] !== '' && info[1616] !== 0,
              モバイル通信: info[1617] !== '' && info[1617] !== 0,
              通信規格その他: info[1618] !== '' && info[1618] !== 0 ? info[1618] : '',
              電源式: info[1619] !== '' && info[1619] !== 0,
              電池式: info[1620] !== '' && info[1620] !== 0,
              電源その他: info[1621] !== '' && info[1621] !== 0 ? info[1621] : '',
              付属品1種類: info[1622] !== '' && info[1622] !== 0 ? info[1622] : '',
              付属品1型番: info[1623] !== '' && info[1623] !== 0 ? info[1623] : '',
              付属品2種類: info[1624] !== '' && info[1624] !== 0 ? info[1624] : '',
              付属品2型番: info[1625] !== '' && info[1625] !== 0 ? info[1625] : '',
              付属品3種類: info[1626] !== '' && info[1626] !== 0 ? info[1626] : '',
              付属品3型番: info[1627] !== '' && info[1627] !== 0 ? info[1627] : '',
              付属品4種類: info[1628] !== '' && info[1628] !== 0 ? info[1628] : '',
              付属品4型番: info[1629] !== '' && info[1629] !== 0 ? info[1629] : '',
              付属品5種類: info[1630] !== '' && info[1630] !== 0 ? info[1630] : '',
              付属品5型番: info[1631] !== '' && info[1631] !== 0 ? info[1631] : '',
              端末対応キャッシュレス区分クレジットカード: info[1636] !== '' && info[1636] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1637] !== '' && info[1637] !== 0,
              端末対応キャッシュレス区分QRコード: info[1638] !== '' && info[1638] !== 0,
              端末対応キャッシュレス区分その他: info[1639] !== '' && info[1639] !== 0,
              端末対応キャッシュレス区分JDebit: info[1640] !== '' && info[1640] !== 0
            }
            : null,
          // 決済端末10.
          info[1656] !== '' && info[1656] !== 0
            ? {
              種別: info[1656] !== '' && info[1656] !== 0 ? info[1656] : '',
              メーカー名: info[1657] !== '' && info[1657] !== 0 ? info[1657] : '',
              製品名: info[1658] !== '' && info[1658] !== 0 ? info[1658] : '',
              型番: info[1659] !== '' && info[1659] !== 0 ? info[1659] : '',
              画像ファイル名: info[1660] !== '' && info[1660] !== 0 ? info[1660] : '',
              製品URL: info[1661] !== '' && info[1661] !== 0 ? info[1661] : '',
              幅: info[1662] !== '' && info[1662] !== 0 ? info[1662] : '',
              高さ: info[1663] !== '' && info[1663] !== 0 ? info[1663] : '',
              奥行: info[1664] !== '' && info[1664] !== 0 ? info[1664] : '',
              重量: info[1665] !== '' && info[1665] !== 0 ? info[1665] : '',
              有線LAN: info[1666] !== '' && info[1666] !== 0,
              USB: info[1667] !== '' && info[1667] !== 0,
              WiFi: info[1668] !== '' && info[1668] !== 0,
              Bluetooth: info[1669] !== '' && info[1669] !== 0,
              モバイル通信: info[1670] !== '' && info[1670] !== 0,
              通信規格その他: info[1671] !== '' && info[1671] !== 0 ? info[1671] : '',
              電源式: info[1672] !== '' && info[1672] !== 0,
              電池式: info[1673] !== '' && info[1673] !== 0,
              電源その他: info[1674] !== '' && info[1674] !== 0 ? info[1674] : '',
              付属品1種類: info[1675] !== '' && info[1675] !== 0 ? info[1675] : '',
              付属品1型番: info[1676] !== '' && info[1676] !== 0 ? info[1676] : '',
              付属品2種類: info[1677] !== '' && info[1677] !== 0 ? info[1677] : '',
              付属品2型番: info[1678] !== '' && info[1678] !== 0 ? info[1678] : '',
              付属品3種類: info[1679] !== '' && info[1679] !== 0 ? info[1679] : '',
              付属品3型番: info[1680] !== '' && info[1680] !== 0 ? info[1680] : '',
              付属品4種類: info[1681] !== '' && info[1681] !== 0 ? info[1681] : '',
              付属品4型番: info[1682] !== '' && info[1682] !== 0 ? info[1682] : '',
              付属品5種類: info[1683] !== '' && info[1683] !== 0 ? info[1683] : '',
              付属品5型番: info[1684] !== '' && info[1684] !== 0 ? info[1684] : '',
              端末対応キャッシュレス区分クレジットカード: info[1689] !== '' && info[1689] !== 0,
              端末対応キャッシュレス区分電子マネー: info[1690] !== '' && info[1690] !== 0,
              端末対応キャッシュレス区分QRコード: info[1691] !== '' && info[1691] !== 0,
              端末対応キャッシュレス区分その他: info[1692] !== '' && info[1692] !== 0,
              端末対応キャッシュレス区分JDebit: info[1693] !== '' && info[1693] !== 0
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

global.onShortenColumnGenerate = (): void => {
  const data = global.createShortenColumnDataBase()
  global.generateJson(data)
}
