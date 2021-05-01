import React, { useCallback, useState } from "react";

import BigNumber from "bignumber.js";
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from "react-neu";

import TokenInput from "components/TokenInput";

interface StakeModalProps extends ModalProps {
  onConfirm: (amount: string) => void;
  max?: BigNumber;
  tokenName?: string;
}

const StakeModal: React.FC<StakeModalProps> = ({
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

  const handleStakeClick = useCallback(() => {
    onConfirm(val);
  }, [onConfirm, val]);

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Stake" />
      <ModalContent>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={max?.toFixed() || "0"}
          symbol={tokenName || "??"}
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text="Cancel" variant="secondary" />
        <Button
          disabled={!val || !Number(val)}
          onClick={handleStakeClick}
          text="Stake"
          variant={!val || !Number(val) ? "secondary" : "default"}
        />
      </ModalActions>
    </Modal>
  );
};

export default StakeModal;
