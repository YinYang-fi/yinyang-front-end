import React, { useMemo } from "react";
import { Modal, ModalContent, ModalProps, Spacer } from "react-neu";
import styled from "styled-components";
import { useWallet } from "@binance-chain/bsc-use-wallet";

import metamaskLogo from "assets/metamask-fox.svg";
import walletConnectLogo from "assets/wallet-connect.svg";
import bscLogo from "assets/binance-wallet.svg";

const ConfirmTransactionModal: React.FC<ModalProps> = ({ isOpen }) => {
  const { connector } = useWallet();

  const WalletLogo = useMemo(() => {
    if (connector === "injected") {
      return <img src={metamaskLogo} alt="Metamask" height={96} />;
    } else if (connector === "walletconnect") {
      return <img src={walletConnectLogo} alt="WalletConnect" height={72} />;
    } else if (connector === "bsc") {
      return <img src={bscLogo} alt="Binance Wallet" height={72} />;
    }
  }, [connector]);

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        {WalletLogo}
        <Spacer />
        <StyledText>Confirm transaction in wallet.</StyledText>
      </ModalContent>
    </Modal>
  );
};

const StyledText = styled.div`
  font-size: 24px;
  text-align: center;
`;

export default ConfirmTransactionModal;
