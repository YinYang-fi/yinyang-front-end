import React from "react";
import BigNumber from "bignumber.js";
//import { useHarvest } from 'hooks/useHarvest'
//import { getBalanceNumber } from 'utils/formatBalance'
import { Box, Button } from "react-neu";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import useFarming from "hooks/useFarming";

interface FarmCardActionsProps {
  earnings?: BigNumber;
  contract?: any;
  earningSymbol?: string
  pid?: number;
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({
  contract,
  earnings,
  earningSymbol,
  pid,
}) => {
  const { account } = useWallet();
  const { onHarvest, isHarvesting } = useFarming();

  //const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0;
  const rawEarningsBalance = account ? earnings?.div(new BigNumber(10).pow(18)).toNumber() || 0 : 0;

  return (
    <Box justifyContent="space-between" alignItems="center">
      <Button
        disabled={rawEarningsBalance === 0 || isHarvesting}
        variant={rawEarningsBalance === 0 ? "secondary" : "default"}
        onClick={async () => onHarvest(contract, pid || 0, earningSymbol)}
      >
        {"Harvest"}
      </Button>
    </Box>
  );
};

export default HarvestAction;
