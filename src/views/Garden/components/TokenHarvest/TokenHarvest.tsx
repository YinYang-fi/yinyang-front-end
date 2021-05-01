import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import {
  Surface,
  Button,
  Card,
  Separator,
  CardContent,
  Spacer,
  CardTitle,
} from "react-neu";
import { useWallet } from "@binance-chain/bsc-use-wallet";

import useFarming from "hooks/useFarming";
import useGovernance from "hooks/useGovernance";

import { getIcon } from "utils";
import { ShareEntry } from "./components/Share";
import OutdatedNotice from "./components/OutdatedNotice";

const TokenHarvest: React.FC = () => {
  const [earnedBalance, setEarnedBalance] = useState<number>(0);
  const [, setIcon] = useState<string>();

  const { status } = useWallet();
  const { currentToken } = useGovernance();
  const {
    pendingShares,
    missingUpdates,
    isHarvesting,
    onHarvestToken,
  } = useFarming();

  const findIcon = useCallback(async () => {
    if (currentToken) {
      setIcon(getIcon(currentToken?.address));
    }
  }, [currentToken]);

  const pendingRewards = useCallback(async () => {
    if (pendingShares && pendingShares.length > 0) {
      setEarnedBalance(
        pendingShares
          ?.map((e) => e.amount.toNumber())
          .reduce((old, current) => old + current) || 0
      );
    }
  }, [pendingShares]);

  useEffect(() => {
    findIcon();
    pendingRewards();
  });

  const HarvestAction = useMemo(() => {
    if (status !== "connected") {
      return <Button disabled full text="Harvest" variant="secondary" />;
    }
    if (!isHarvesting) {
      return (
        <Button
          disabled={earnedBalance <= 0}
          full
          onClick={onHarvestToken}
          text="Harvest"
          variant="secondary"
        />
      );
    }
    if (isHarvesting) {
      return <Button disabled full text="Harvesting..." variant="secondary" />;
    }
  }, [isHarvesting, earnedBalance, onHarvestToken, status]);

  return (
    <>
      {(missingUpdates || 0) > 0 && <OutdatedNotice />}
      {pendingShares && pendingShares.length > 0 ? (
        <Card>
          <CardTitle text="Your harvestable tokens" />
          <CardContent>
            <Surface>
              {pendingShares.map((prop, i) => {
                if (i === 0) {
                  return <ShareEntry key={prop.token} share={prop} />;
                } else {
                  return [
                    <Separator key={prop.token + "1"} />,
                    <ShareEntry key={prop.token} share={prop} />,
                  ];
                }
              })}
            </Surface>
            <Spacer />
            {HarvestAction}
          </CardContent>
        </Card>
      ) : null}
    </>
  );
};

export interface StyledIconProps {
  size?: number;
}

export const StyledTitle = styled.h2`
  font-weight: 600;
  display: grid;
  grid-area: desc;
  text-align: center;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledIcon = styled.img<StyledIconProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  max-height: ${(props) => (props.size ? props.size * 50 : "50")}px;
  max-width: ${(props) => (props.size ? props.size * 50 : "50")}px;
`;

export default TokenHarvest;
