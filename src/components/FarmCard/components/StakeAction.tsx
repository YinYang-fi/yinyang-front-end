import React, { useCallback, useState } from "react";
import BigNumber from "bignumber.js";
import StakeModal from "components/StakeModal";
import UnstakeModal from "components/UnstakeModal";
import useFarming from "hooks/useFarming";
import { Box, Button, Spacer } from "react-neu";

interface FarmCardActionsProps {
  stakedBalance?: BigNumber;
  tokenBalance?: BigNumber;
  tokenName?: string;
  pid?: number;
  donation?: boolean;
  contract?: any;
}

const StakeAction: React.FC<FarmCardActionsProps> = ({
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  donation,
  contract,
}) => {
  const { onStake, onUnstake } = useFarming();

  const [isOpenDeposit, setIsOpenDeposit] = useState<boolean>(false);
  const [isOpenWithdraw, setIsOpenWithdraw] = useState<boolean>(false);

  const handleStaked = useCallback(
    (amount: string) => {
      onStake(contract, pid || 0, amount, tokenName);
      setIsOpenDeposit(!isOpenDeposit);
    },
    [contract, pid, tokenName, isOpenDeposit, onStake, setIsOpenDeposit]
  );

  const handleUnstaked = useCallback(
    (amount: string) => {
      onUnstake(contract, pid || 0, amount, tokenName);
      setIsOpenWithdraw(!isOpenWithdraw);
    },
    [contract, pid, tokenName, isOpenWithdraw, onUnstake, setIsOpenWithdraw]
  );

  const renderStakingButtons = () => {
    return stakedBalance?.eq(0) ? (
      <Button onClick={() => setIsOpenDeposit(!isOpenDeposit)}>
        {"Deposit"}
      </Button>
    ) : (
      <Box row width="100%" justifyContent="center">
        <Button
          full
          variant="tertiary"
          onClick={() => setIsOpenWithdraw(!isOpenWithdraw)}
        >
          -
        </Button>
        <Spacer size="sm"/>
        <Button
          full
          variant="secondary"
          onClick={() => setIsOpenDeposit(!isOpenDeposit)}
        >
          +
        </Button>
      </Box>
    );
  };

  return (
    <Box justifyContent="space-between" alignItems="center" width="100%">
      <StakeModal
        isOpen={isOpenDeposit}
        max={tokenBalance}
        tokenName={tokenName}
        onConfirm={handleStaked}
        onDismiss={() => setIsOpenDeposit(!isOpenDeposit)}
      />
      <UnstakeModal
        isOpen={isOpenWithdraw}
        max={donation ? new BigNumber(0) : stakedBalance}
        tokenName={tokenName}
        onConfirm={handleUnstaked}
        onDismiss={() => setIsOpenWithdraw(!isOpenWithdraw)}
      />
      {renderStakingButtons()}
    </Box>
  );
};

export default StakeAction;
