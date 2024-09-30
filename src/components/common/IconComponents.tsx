import React from "react";
import { TransactionCategory, TransactionGenre } from "../../types";
import { FaTshirt } from "react-icons/fa";
import { GiMonclerJacket } from "react-icons/gi";
import { PiPantsFill } from "react-icons/pi";
import { GiSkirt } from "react-icons/gi";
import { GiAmpleDress } from "react-icons/gi";
import { BsHandbagFill } from "react-icons/bs";
import { GiConverseShoe } from "react-icons/gi";
import { GiHeartNecklace } from "react-icons/gi";
import { SiTeepublic } from "react-icons/si";
import { GiForestCamp } from "react-icons/gi";
import { GiSkateboard } from "react-icons/gi";
import { VscColorMode } from "react-icons/vsc";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { PiAirplaneTiltFill } from "react-icons/pi";
import { PiShirtFoldedFill } from "react-icons/pi";


const IconComponents: Record<TransactionCategory, JSX.Element> = {
    トップス: <FaTshirt />,
  ジャケット・アウター: <GiMonclerJacket  />,
  パンツ: <PiPantsFill />,
  スカート: <GiSkirt  />,
  ワンピース: <GiAmpleDress  />,
  バッグ: <BsHandbagFill />,
  靴: <GiConverseShoe  />,
  アクセサリー: <GiHeartNecklace  />
};

export const GenreIconComponent: Record<TransactionGenre, JSX.Element> = {
   カジュアル: <SiTeepublic />,
   きれいめ: <PiShirtFoldedFill />,
   ストリート: <GiSkateboard />,
   アウトドア・テック: <GiForestCamp />,
   モード: <VscColorMode />,
   ミリタリー: <FaPersonMilitaryRifle />,
   韓国: <PiAirplaneTiltFill />,
}



export default IconComponents;
