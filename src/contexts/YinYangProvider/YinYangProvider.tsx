import React, { createContext, useEffect, useState } from "react";

import { useWallet } from "@binance-chain/bsc-use-wallet";

import { YinYang } from "yinyang-sdk/lib";

export interface YinYangContext {
  yinyang?: any;
}

export const Context = createContext<YinYangContext>({
  yinyang: undefined,
});

declare global {
  interface Window {
    yinyangsauce: any;
  }
}

const YingYangProvider: React.FC = ({ children }) => {
  const { ethereum } = useWallet();
  const [yinyang, setYingYang] = useState<any>();

  useEffect(() => {
    if (ethereum) {
      const yinyangLib = new YinYang(ethereum, "1", false, {
        defaultAccount: "",
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: "6000000",
        defaultGasPrice: "1000000000000",
        accounts: [],
        ethereumNodeTimeout: 10000,
      });

      setYingYang(yinyangLib);
      window.yinyangsauce = yinyangLib;
    }
  }, [ethereum]);

  return <Context.Provider value={{ yinyang }}>{children}</Context.Provider>;
};

export default YingYangProvider;
