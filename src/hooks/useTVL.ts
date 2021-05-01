import { useCallback, useEffect, useState } from "react";

import usePrices from "hooks/usePrices";
import useTreasury from "./useTreasury";
import useFarming from "./useFarming";
import { BigNumber } from "bignumber.js";

const useTVL = () => {
  const { prices } = usePrices();
  const { totalUsdValue } = useTreasury();
  const { gardenFarms, yinFarms, yangFarms } = useFarming();

  const [tvl, setTVL] = useState<number>();

  const fetchTVL = useCallback(async () => {
    if (!gardenFarms || !yinFarms || !yangFarms) return;
    const zero = new BigNumber(0);

    let gardenValue = zero;
    for (let f of gardenFarms) {
      let price = 0;
      switch (f.lpSymbol) {
        case "YIN V1":
          price = prices.yinV1 || 0;
          break;
        case "YANG V1":
          price = prices.yangV1 || 0;
          break;
        default:
          price = prices[f.lpSymbol.split(" ")[0].toLowerCase()] || 0;
      }

      gardenValue = gardenValue.plus(f.liquidity?.times(price) || zero);
    }

    let yinFarmsValue = zero;
    for (let f of yinFarms) {
      let price = 0;
      switch (f.lpSymbol) {
        case "YIN V1":
          price = prices.yinV1 || 0;
          break;
        case "YANG V1":
          price = prices.yangV1 || 0;
          break;
        default:
          price = prices[f.lpSymbol.split(" ")[0].toLowerCase()] || 0;
      }

      yinFarmsValue = yinFarmsValue.plus(f.liquidity?.times(price) || zero);
    }

    let yangFarmsValue = zero;
    for (let f of yangFarms) {
      let price = 0;
      switch (f.lpSymbol) {
        case "YIN V1":
          price = prices.yinV1 || 0;
          break;
        case "YANG V1":
          price = prices.yangV1 || 0;
          break;
        default:
          price = prices[f.lpSymbol.split(" ")[0].toLowerCase()] || 0;
      }
      yangFarmsValue = yangFarmsValue.plus(f.liquidity?.times(price) || zero);
    }
    setTVL(
      gardenValue
        .plus(yinFarmsValue)
        .plus(yangFarmsValue)
        .plus(totalUsdValue)
        .toNumber()
    );
  }, [prices, gardenFarms, yinFarms, yangFarms, totalUsdValue, setTVL]);

  useEffect(() => {
    fetchTVL();
    let refreshInterval = setInterval(() => fetchTVL(), 30000);
    return () => clearInterval(refreshInterval);
  }, [fetchTVL]);

  return {
    tvl,
  };
};

export default useTVL;
