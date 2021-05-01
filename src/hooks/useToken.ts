import { useCallback, useEffect, useState } from "react";

import BigNumber from "bignumber.js";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { provider } from "web3-core";

import { getBNBPool, getBEP20Contract } from "utils";

const useToken = (tokenAddress?: string) => {
  const [name, setName] = useState<string>();
  const [symbol, setSymbol] = useState<string>();
  const [decimals, setDecimals] = useState<number>();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();
  const [BNBPoolDepth, setBNBPoolDepth] = useState<number>();
  const { ethereum }: { ethereum: provider } = useWallet();

  const addressPattern = /^0x[a-fA-F0-9]{40}$/i;
  const validValue = (tokenAddress?.search(addressPattern) || 0) >= 0;

  const fetchInfo = useCallback(async () => {
    if (
      !ethereum ||
      !tokenAddress ||
      tokenAddress === "0x0000000000000000000000000000000000000000" ||
      !validValue
    ) {
      return;
    }
    const contract = getBEP20Contract(ethereum, tokenAddress);
    try {
      setName(await contract.methods.name().call());
      setSymbol(await contract.methods.symbol().call());
      const tmpDecimals = await contract.methods.decimals().call();
      setDecimals(tmpDecimals);
      setTotalSupply(
        new BigNumber(await contract.methods.totalSupply().call()).div(
          new BigNumber(10).pow(tmpDecimals)
        )
      );
        const has = await getBNBPool(ethereum, tokenAddress)
        setBNBPoolDepth(has)
    } catch (e) {
      console.log("Invalid token", e);
      setName("Unknown token");
      setSymbol("???");
      setDecimals(18);
      setTotalSupply(new BigNumber(0));
    }
  }, [ethereum, tokenAddress, validValue]);

  useEffect(() => {
    fetchInfo();
  }, [ethereum, tokenAddress, fetchInfo]);

  useEffect(() => {
    let refreshInterval = setInterval(fetchInfo, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchInfo, ethereum]);

  return {
    name,
    symbol,
    decimals,
    totalSupply,
    BNBPoolDepth
  };
};

export default useToken;
