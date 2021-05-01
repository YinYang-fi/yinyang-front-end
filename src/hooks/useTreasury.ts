import { useMemo } from "react";

import addresses from "constants/tokenAddresses";

import usePrices from "hooks/usePrices";
import useTokenBalance from "hooks/useTokenBalance";
import useVersion from "./useVersion";

const useTreasury = () => {
  const { usingV2 } = useVersion()
  const { v1, v2 } = addresses;
  let yin: string, yang: string, peaceMaster: string
  if(usingV2) {
    yin = v2.yin
    yang = v2.yang
    peaceMaster = v2.peaceMaster
  } else {
    yin = v1.yin
    yang = v1.yang
    peaceMaster = v1.peaceMaster
  }
  const { prices } = usePrices();
  const totalYin = useTokenBalance(peaceMaster, yin);
  const totalYang = useTokenBalance(peaceMaster, yang);
  const totalWBNBTokenBalance = useTokenBalance(peaceMaster, addresses.wbnb);
  const totalWBNBValue = (totalWBNBTokenBalance || 0);

  const totalUsdValue = useMemo(() => {
    const yinUSDValue = prices.yin && totalYin ? (prices.yin || 0) * totalYin : 0;
    const yangUSDValue =
    prices.yang && totalYang ? (prices.yang || 0) * totalYang : 0;
    return yinUSDValue + yangUSDValue;
  }, [prices, totalYin, totalYang]);

  return {
    totalWBNBValue,
    totalYin,
    totalYang,
    totalUsdValue,
  };
};

export default useTreasury;
