import { TransactionColor } from "../../types";
import {
  red,
  pink,
  purple,
  blue,
  green,
  yellow,
  orange,
  brown,
  grey,
} from "@mui/material/colors";

const TransactionColorComponents: Record<TransactionColor, string> = {
  ブラック系: grey[800],
  ホワイト系: grey[50],
  グレイ系: grey[400],
  ブラウン系: brown[300],
  レッド系: red[300],
  ピンク系: pink[300],
  パープル系: purple[300],
  ブルー系: blue[300],
  グリーン系: green[300],
  イエロー系: yellow[300],
  オレンジ系: orange[300],
};

export default TransactionColorComponents;
