import React, { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { provider } from "web3-core";

import addresses from "constants/tokenAddresses";
import { getBalance } from "utils";

import Context from "./Context";
import useVersion from "hooks/useVersion";

const Provider: React.FC = ({ children }) => {
  const { usingV2 } = useVersion();
  const { v1, v2 } = addresses;
  let yin: string, yang: string, zen: string
  if(usingV2) {
    yin = v2.yin
    yang = v2.yang
    zen = v2.zen
  } else {
    yin = v1.yin
    yang = v1.yang
    zen = v1.zen
  }
  const [yinBalance, setYinBalance] = useState<BigNumber>();
  const [yangBalance, setYangBalance] = useState<BigNumber>();
  const [zenBalance, setZenBalance] = useState<BigNumber>();

  const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

  const fetchBalances = useCallback(
    async (userAddress: string, provider: provider) => {
      const balances = await Promise.all([
        await getBalance(provider, yin, userAddress),
        await getBalance(provider, yang, userAddress),
        await getBalance(provider, zen, userAddress),
      ]);
      setYinBalance(new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(18)));
      setYangBalance(new BigNumber(balances[1]).dividedBy(new BigNumber(10).pow(18)));
      setZenBalance(new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18)));
    },
    [yin, yang, zen, setYinBalance, setYangBalance, setZenBalance]
  );

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum);
    }
  }, [account, ethereum, fetchBalances]);

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum);
      let refreshInterval = setInterval(() => fetchBalances(account, ethereum), 10000);
      return () => clearInterval(refreshInterval);
    }
  }, [account, ethereum, fetchBalances]);

  return (
    <Context.Provider
      value={{
        yinBalance,
        yangBalance,
        zenBalance,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
