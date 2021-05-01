import React, { useCallback, useState, useEffect } from "react";

import BigNumber from "bignumber.js";
import { useWallet } from "@binance-chain/bsc-use-wallet";

import numeral from "numeral";
import { Box, Button, Modal, ModalActions, ModalContent, ModalProps, ModalTitle, Separator, Spacer } from "react-neu";

import FancyValue from "components/FancyValue";
import Split from "components/Split";

import useBalances from "hooks/useBalances";
import LogoIcon from "components/LogoIcon";

const WalletModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const [, setWalletModalIsOpen] = useState(false);
  const { reset } = useWallet();
  const { yinBalance, yangBalance, zenBalance } = useBalances();

  const getDisplayBalance = useCallback((value?: BigNumber) => {
    if (value) {
      return numeral(value).format("0.00a");
    } else {
      return "--";
    }
  }, []);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem("account");
    localStorage.removeItem("walletProvider");
    setWalletModalIsOpen(false);
    reset();
    if (onDismiss) {
      onDismiss();
    }
  }, [reset, onDismiss]);

  useEffect(() => {
    //isOpen = !isOpen;
    if(onDismiss) onDismiss();
  }, [setWalletModalIsOpen, onDismiss]);

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="My Wallet" />
      <ModalContent>
        <Split>
          <Box row>
          <FancyValue
              icon={
                <LogoIcon yin/>
              }
              label="Yin balance"
              value={getDisplayBalance(yinBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={
                <LogoIcon yang/>
              }
              label="Yang balance"
              value={getDisplayBalance(yangBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={
                <LogoIcon zen/>
              }
              label="Zen balance"
              value={getDisplayBalance(zenBalance)}
            />
          </Box>
        </Split>
        <Spacer />
      </ModalContent>
      <Separator />
      <ModalActions>
        <Button onClick={onDismiss} text="Cancel" variant="secondary" />
        <Button onClick={handleSignOut} text="Sign Out" />
      </ModalActions>
    </Modal>
  );
};

export default WalletModal;
