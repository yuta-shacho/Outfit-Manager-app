import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import { amber, blue, blueGrey, brown, green, grey, lightBlue, orange, pink, purple, red, yellow } from "@mui/material/colors";
import { TransactionCategory, TransactionColor, TransactionGenre } from "../types";

declare module "@mui/material/styles" {
  interface Palette {
    monthExpenseColor: PaletteColor;
    yearExpenseColor: PaletteColor;
    
    categoryColor: Record<TransactionCategory, string>;
    genreColor: Record<TransactionGenre, string>;
    colorBgColor: Record<TransactionColor,string>;
    colorBorderColor: Record<TransactionColor,string>;
  }

  interface PaletteOptions {
    monthExpenseColor?: PaletteColorOptions;
    yearExpenseColor?: PaletteColorOptions;
    categoryColor?: Record<TransactionCategory, string>;
    genreColor?: Record<TransactionGenre, string>;
    colorBgColor?: Record<TransactionColor,string>;
    colorBorderColor?: Record<TransactionColor,string>;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: "Noto Sans JP, Roboto, Helvetica Neue, Arial, sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  palette: {
    //今月の出費
    monthExpenseColor: {
      main: "#ff9800",
      light: "#ed6c02",
      dark: "#e65100",
    },
    //今年の出費
    yearExpenseColor: {
      main: "#ef5350",
      light: "#d32f2f",
      dark: "#c62828",
    },

    //カテゴリーグラフの色定義
    categoryColor: {
    トップス: lightBlue[500], 
   ジャケット・アウター: grey[800],
   パンツ: green[600],
   スカート: purple[200],
   ワンピース: pink[300],
   バッグ: amber[600],
   靴: brown[700],
   アクセサリー: grey[400],
    },

    genreColor: {
    カジュアル: grey[200],
    きれいめ: blue[500],
    ストリート: red[700],
    アウトドア・テック: brown[700],
    モード: purple[900],
    ミリタリー: green[700],
    韓国: pink[200],
    },

    colorBgColor: {
       ブラック系: grey[800],
       ホワイト系: grey[50],
       グレイ系: blueGrey[200],
       ブラウン系: brown[200],
       レッド系: red[200],
       ピンク系: pink[200],
       パープル系: purple[200],
       ブルー系: blue[200],
       グリーン系: green[200],
       イエロー系: yellow[200],
       オレンジ系: orange[200],
    },

    colorBorderColor: {
       ブラック系: grey[900],
       ホワイト系: grey[500],
       グレイ系: blueGrey[500],
       ブラウン系: brown[500],
       レッド系: red[500],
       ピンク系: pink[500],
       パープル系: purple[500],
       ブルー系: blue[500],
       グリーン系: green[400],
       イエロー系: yellow[500],
       オレンジ系: orange[500],
    }
  },
});
