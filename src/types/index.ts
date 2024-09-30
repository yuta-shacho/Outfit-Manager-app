export type TransactionCategory =
  | "トップス"
  | "ジャケット・アウター"
  | "パンツ"
  | "スカート"
  | "ワンピース"
  | "バッグ"
  | "靴"
  | "アクセサリー";
export type TransactionColor =
  | "ブラック系"
  | "ホワイト系"
  | "グレイ系"
  | "ブラウン系"
  | "レッド系"
  | "ピンク系"
  | "パープル系"
  | "ブルー系"
  | "グリーン系"
  | "イエロー系"
  | "オレンジ系";
export type TransactionGenre =
  | "カジュアル"
  | "きれいめ"
  | "ストリート"
  | "アウトドア・テック"
  | "モード"
  | "ミリタリー"
  | "韓国";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  content: string;
  category: TransactionCategory;
  color: TransactionColor;
  genre: TransactionGenre;
}

export interface Balance {
  monthExpense: number;
  yearExpense: number;
}

export interface CalendarContent {
  start: string;
  monthExpense: string;
}

export type ExpenseType = "monthExpense" | "yearExpense";
