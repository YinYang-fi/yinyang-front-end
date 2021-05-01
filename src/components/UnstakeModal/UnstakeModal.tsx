import React, { useCallback, useState } from "react";

import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from "react-neu";

import TokenInput from "components/TokenInput";
import { BigNumber } from "bignumber.js";

interface UnstakeModalProps extends ModalProps {
  onConfirm: (amount: string) => void;
  max?: BigNumber;
  tokenName?: string;
  addLiquidityUrl?: string;
}

const UnstakeModal: React.FC<UnstakeModalProps> = ({
  isOpen,
  max,
  tokenName,
  onDismiss,
  onConfirm,
}) => {
  const [val, setVal] = useState("");

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value);
    },
    [setVal]
  );

  const handleSelectMax = useCallback(() => {
    setVal(max?.toFixed() || "0");
  }, [max, setVal]);

  const handleUnstakeClick = useCallback(() => {
    onConfirm(val);
  }, [onConfirm, val]);

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Unstake" />
      <ModalContent>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={max?.toFixed() || "0"}
          symbol={tokenName || ""}
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text="Cancel" variant="secondary" />
        <Button
          disabled={!val || !Number(val)}
          onClick={handleUnstakeClick}
          text="Unstake"
          variant={!val || !Number(val) ? "secondary" : "default"}
        />
      </ModalActions>
    </Modal>
  );
};

export default UnstakeModal;
