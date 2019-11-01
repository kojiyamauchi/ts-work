interface HTMLElement extends Element {
  swiper: any
}

interface CommonDictionaryTypes<SecondIndex = string, ThirdIndex = string> {
  [key: string]: [boolean, SecondIndex, ThirdIndex, string?]
}

interface BinTypeA {
  dataID: number
  ロゴ画像名: string
  決済事業者番号: string
  決済事業者名称: string
  キャッシュレスサービス名称: string
  キャッシュレスサービス区分: string
  ブランドサービス: string[]
  特設WebURL: string
  検索サービス: string
}

interface NonBinTypeA {
  dataID: number
  ロゴ画像名: string
  決済事業者番号: string
  決済事業者名称: string
  キャッシュレスサービス名称: string
  キャッシュレスサービス区分: string
  キャッシュレスサービス区分その他: string
  ハウスカードの確認: boolean
  ブランドサービス: string
  特設WebURL: string
  検索サービス: string
  消費者向け問合せ窓口1名称: string
  消費者向け問合せ窓口1受付時間: string
  消費者向け問合せ窓口1電話番号: string
  消費者向け問合せ窓口1受付時間の補足等: string
  消費者向け問合せ窓口2名称: string
  消費者向け問合せ窓口2受付時間: string
  消費者向け問合せ窓口2電話番号: string
  消費者向け問合せ窓口2受付時間の補足等: string
  消費者向け問合せ窓口3名称: string
  消費者向け問合せ窓口3受付時間: string
  消費者向け問合せ窓口3電話番号: string
  消費者向け問合せ窓口3受付時間の補足等: string
  消費者向け問合せ窓口4名称: string
  消費者向け問合せ窓口4受付時間: string
  消費者向け問合せ窓口4電話番号: string
  消費者向け問合せ窓口4受付時間の補足等: string
  消費者向け問合せ窓口5名称: string
  消費者向け問合せ窓口5受付時間: string
  消費者向け問合せ窓口5電話番号: string
  消費者向け問合せ窓口5受付時間の補足等: string
}

interface TypeB {
  dataID: number
  ロゴ画像: string
  決済事業者1: string
  決済事業者2: string
  利用料率: string
  利用可能な決済手段: string[]
  期間終了後の手数料の取扱い: string
  入金タイミング: string
  利用決済端末: string
  個票: [
    {
      対応可能なブランド: {
        [key: string]: string[]
      }
      サービスURL: string
      決済手数料: {
        [key: string]: string
      }
      発生する費用: {
        期間中: {
          [key: string]: string
        }
        期間終了後: {
          [key: string]: string
        }
      }
      入金タイミング: string
      月次一括の場合の締日: string
      月次一括の場合の支払日: string
      複数回の場合の回数: string
      振込手数料: string
      サービス提供エリア: string[]
      営業対象業種: {
        [key: string]: boolean
      }
      受付開始時間: string
      受付終了時間: string
      受付時間の補足: string
      加盟店向けサービス問合せ電話番号: string
      加盟店向けサービス問合せメールアドレス: string
      加盟店向けサービス問合せ備考: string
    }
  ]
  対応可能な決済端末: [
    {
      種別: string
      メーカー名: string
      製品名: string
      型番: string
      画像ファイル名: string
      製品URL: string
      幅: number
      高さ: number
      奥行: number
      重量: number
      有線LAN: boolean
      USB: boolean
      WiFi: boolean
      Bluetooth: boolean
      モバイル通信: boolean
      通信規格その他: string
      電源式: boolean
      電池式: boolean
      電源その他: string
      付属品1種類: string
      付属品1型番: string
      付属品2種類: string
      付属品2型番: string
      付属品3種類: string
      付属品3型番: string
      付属品4種類: string
      付属品4型番: string
      付属品5種類: string
      付属品5型番: string
      端末対応キャッシュレス区分クレジットカード: boolean
      端末対応キャッシュレス区分電子マネー: boolean
      端末対応キャッシュレス区分QRコード: boolean
      端末対応キャッシュレス区分その他: boolean
      端末対応キャッシュレス区分JDebit: boolean
    }
  ]
}
