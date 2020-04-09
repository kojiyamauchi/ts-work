interface HTMLElement extends Element {
  readonly swiper: any
}

type CommonDictionaryTypes<SecondIndex = string, ThirdIndex = string> = {
  readonly [key: string]: [boolean, SecondIndex, ThirdIndex, string?]
}

type BinTypeA = {
  readonly dataID: number
  readonly ロゴ画像名: string
  readonly 決済事業者番号: string
  readonly 決済事業者名称: string
  readonly キャッシュレスサービス名称: string
  readonly キャッシュレスサービス区分: string
  readonly ブランドサービス: string[]
  readonly 特設WebURL: string
  readonly 検索サービス: string
}

type NonBinTypeA = {
  readonly dataID: number
  readonly ロゴ画像名: string
  readonly 決済事業者番号: string
  readonly 決済事業者名称: string
  readonly キャッシュレスサービス名称: string
  readonly キャッシュレスサービス区分: string
  readonly キャッシュレスサービス区分その他: string
  readonly ハウスカードの確認: boolean
  readonly ブランドサービス: string
  readonly 特設WebURL: string
  readonly 検索サービス: string
  readonly 消費者向け問合せ窓口1名称: string
  readonly 消費者向け問合せ窓口1受付時間: string
  readonly 消費者向け問合せ窓口1電話番号: string
  readonly 消費者向け問合せ窓口1受付時間の補足等: string
  readonly 消費者向け問合せ窓口2名称: string
  readonly 消費者向け問合せ窓口2受付時間: string
  readonly 消費者向け問合せ窓口2電話番号: string
  readonly 消費者向け問合せ窓口2受付時間の補足等: string
  readonly 消費者向け問合せ窓口3名称: string
  readonly 消費者向け問合せ窓口3受付時間: string
  readonly 消費者向け問合せ窓口3電話番号: string
  readonly 消費者向け問合せ窓口3受付時間の補足等: string
  readonly 消費者向け問合せ窓口4名称: string
  readonly 消費者向け問合せ窓口4受付時間: string
  readonly 消費者向け問合せ窓口4電話番号: string
  readonly 消費者向け問合せ窓口4受付時間の補足等: string
  readonly 消費者向け問合せ窓口5名称: string
  readonly 消費者向け問合せ窓口5受付時間: string
  readonly 消費者向け問合せ窓口5電話番号: string
  readonly 消費者向け問合せ窓口5受付時間の補足等: string
}

type TypeB = {
  readonly dataID: number
  readonly ロゴ画像: string
  readonly 決済事業者1: string
  readonly 決済事業者2: string
  readonly 利用料率: string
  readonly 利用可能な決済手段: string[]
  readonly 期間終了後の手数料の取扱い: string
  readonly 入金タイミング: string
  readonly 利用決済端末: string
  readonly 個票: [
    {
      readonly 対応可能なブランド: {
        readonly [key: string]: string[]
      }
      readonly サービスURL: string
      readonly 決済手数料: {
        readonly [key: string]: string
      }
      readonly 発生する費用: {
        readonly 期間中: {
          readonly [key: string]: string
        }
        readonly 期間終了後: {
          readonly [key: string]: string
        }
      }
      readonly 入金タイミング: string
      readonly 月次一括の場合の締日: string
      readonly 月次一括の場合の支払日: string
      readonly 複数回の場合の回数: string
      readonly 入金サイクル?: string
      readonly 振込手数料: string
      readonly サービス提供エリア: string[]
      readonly 営業対象業種: {
        readonly [key: string]: boolean
      }
      readonly 受付開始時間: string
      readonly 受付終了時間: string
      readonly 受付時間の補足: string
      readonly 加盟店向けサービス問合せ電話番号: string
      readonly 加盟店向けサービス問合せメールアドレス: string
      readonly 加盟店向けサービス問合せ備考: string
    }
  ]
  readonly 対応可能な決済端末: [
    {
      readonly 種別: string
      readonly メーカー名: string
      readonly 製品名: string
      readonly 型番: string
      readonly 画像ファイル名: string
      readonly 製品URL: string
      readonly 幅: number
      readonly 高さ: number
      readonly 奥行: number
      readonly 重量: number
      readonly 有線LAN: boolean
      readonly USB: boolean
      readonly WiFi: boolean
      readonly Bluetooth: boolean
      readonly モバイル通信: boolean
      readonly 通信規格その他: string
      readonly 電源式: boolean
      readonly 電池式: boolean
      readonly 電源その他: string
      readonly 付属品1種類: string
      readonly 付属品1型番: string
      readonly 付属品2種類: string
      readonly 付属品2型番: string
      readonly 付属品3種類: string
      readonly 付属品3型番: string
      readonly 付属品4種類: string
      readonly 付属品4型番: string
      readonly 付属品5種類: string
      readonly 付属品5型番: string
      readonly 端末対応キャッシュレス区分クレジットカード: boolean
      readonly 端末対応キャッシュレス区分電子マネー: boolean
      readonly 端末対応キャッシュレス区分QRコード: boolean
      readonly 端末対応キャッシュレス区分その他: boolean
      readonly 端末対応キャッシュレス区分JDebit: boolean
    }
  ]
}

type HoldingInformationMember = {
  readonly ID: number
  readonly newspaperEvent: boolean
  readonly checkDate: string
  readonly 都道府県: string
  readonly 開催日: string
  readonly 会場名: string
  readonly 会場住所: string
  readonly 主催等: string
  readonly 問い合わせ先: string
  readonly タグ: string
}
