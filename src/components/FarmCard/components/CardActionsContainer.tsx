import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { provider as ProviderType } from "web3-core";
import { Box, Button, Separator, Spacer } from "react-neu";
import { Farm } from "contexts/Farming/types";
import useApproval from "hooks/useApproval";
import StakeAction from "./StakeAction";
import HarvestAction from "./HarvestAction";
import Label from "components/Label";
import { BigNumber } from "yinyang-sdk/lib";

interface FarmCardActionsProps {
  farm: Farm;
  provider?: ProviderType;
  account?: string;
  addLiquidityUrl?: string;
}

const CardActions: React.FC<FarmCardActionsProps> = ({
  farm,
  account,
  addLiquidityUrl,
}) => {
  const [requestedApproval, setRequestedApproval] = useState(false);
  const pid = farm.pid;
  const { tokenBalance, stakedBalance, earnings } = farm.userData || {};

  const lpAddress = (farm.lpAddresses as any)[
    process.env.REACT_APP_CHAIN_ID || 56
  ];
  const lpName = farm.lpSymbol.toUpperCase();
  const { onApprove, isApproved } = useApproval(
    lpAddress,
    farm?.contract?._address
  );

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      await onApprove();
      setRequestedApproval(false);
    } catch (e) {
      console.error(e);
    }
  }, [onApprove]);

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance?.div(new BigNumber(10).pow(18))}
        tokenBalance={tokenBalance?.div(new BigNumber(10).pow(18))}
        tokenName={lpName}
        pid={pid}
        donation={farm.depositFee === 100}
        contract={farm.contract}
      />
    ) : (
      <Button disabled={requestedApproval} onClick={handleApprove}>
        Approve
      </Button>
    );
  };

  const rawEarningsBalance = account
    ? earnings?.div(new BigNumber(10).pow(18)) || 0
    : 0;
  const displayBalance = rawEarningsBalance.toFixed(4);
  const rawStakedBalance = account
    ? farm.userData?.stakedBalance.div(new BigNumber(10).pow(18)) || 0
    : 0;
  const displayStaked = rawStakedBalance.toFixed(4);

  return (
    <Box column marginHorizontal={5} width="90%">
      <Spacer size="sm" />
      <Separator />
      <Spacer size="sm" />
      <Box row justifyContent="space-between" alignItems="center" width="100%">
        <Label text={farm.quoteToken.symbol + " Earned"} />
        <StyledAPR color={rawEarningsBalance === 0 ? "textDisabled" : "text"}>
          {displayBalance}
        </StyledAPR>
      </Box>
      <Spacer size="sm" />
      <Separator />
      <Spacer size="sm" />
      <Box row justifyContent="space-between" alignItems="center" width="100%">
        <Label text={lpName + " Staked"} />
        <StyledAPR color={rawStakedBalance === 0 ? "textDisabled" : "text"}>
          {displayStaked}
        </StyledAPR>
      </Box>
      <Spacer size="sm" />
      <Separator />
      <Spacer size="sm" />
      <Box row justifyContent="space-between" alignItems="center">
        <Box column alignItems="center" justifyContent="flex-end">
          {!account && !farm.contract ? (
            <Label text={"Not connected"} />
          ) : (
            renderApprovalOrStakeButton()
          )}
        </Box>
        <HarvestAction
          contract={farm.contract}
          earnings={earnings}
          earningSymbol={farm.quoteToken.symbol}
          pid={pid}
        />
      </Box>
    </Box>
  );
};

const StyledAPR = styled.span`
  font-size: 18;
`;

export default CardActions;
