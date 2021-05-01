import React, { useCallback, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "react-neu";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { UseWalletProvider } from "@binance-chain/bsc-use-wallet";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MobileMenu from "components/MobileMenu";
import TopBar from "components/TopBar";

import { BalancesProvider } from "contexts/Balances";
import { FarmingProvider } from "contexts/Farming";
import { PricesProvider } from "contexts/Prices";
import { GovernanceProvider } from "contexts/Governance";
import YinYangProvider from "contexts/YinYangProvider";
import bsc from "@binance-chain/bsc-use-wallet";
import useLocalStorage from "hooks/useLocalStorage";

import Garden from "views/Garden";
import FAQ from "views/FAQ";
import Home from "views/Home";
import Governance from "views/Governance";
import Addresses from "views/Addresses";
import History from "views/History";
import Genesis from "views/Genesis";
import { VersionProvider } from "contexts/Version";

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false);
  }, [setMobileMenu]);

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true);
  }, [setMobileMenu]);

  return (
    <Router>
      <Providers>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/garden">
            <Garden />
          </Route>
          <Route path="/faq">
            <FAQ />
          </Route>
          <Route exact path="/governance">
            <Governance />
          </Route>
          <Route exact path="/genesis">
            <Genesis />
          </Route>
          <Route exact path="/history">
            <History />
          </Route>
          <Route exact path="/addresses">
            <Addresses />
          </Route>
        </Switch>
      </Providers>
    </Router>
  );
};

const Providers: React.FC = ({ children }) => {
  const [darkModeSetting] = useLocalStorage("darkMode", false);
  const { dark: darkTheme, light: lightTheme } = useMemo(() => {
    return createTheme({
      baseColor: { h: 338, s: 100, l: 41 },
      baseColorDark: { h: 339, s: 89, l: 49 },
      borderRadius: 28,
    });
  }, []);
  return (
    <ThemeProvider
      darkModeEnabled={darkModeSetting}
      darkTheme={darkTheme}
      lightTheme={lightTheme}
    >
      <UseWalletProvider
        chainId={Number(process.env.REACT_APP_CHAIN_ID || "56")}
        connectors={{
          bsc,
        }}
      >
        <VersionProvider>
          <YinYangProvider>
            <PricesProvider prices={{}}>
              <BalancesProvider>
                <FarmingProvider>
                  <GovernanceProvider>
                    {children}
                    <ToastContainer />
                  </GovernanceProvider>
                </FarmingProvider>
              </BalancesProvider>
            </PricesProvider>
          </YinYangProvider>
        </VersionProvider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;
