import React from "react";
import styled from "styled-components";

import { Box, Button, Card, CardTitle, Separator, Spacer } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";
import useGovernance from "hooks/useGovernance";
import useFarming from "hooks/useFarming";
import TokenHarvestor from "./components/TokenHarvest";
import VoteStartedNotice from "./components/VoteStartedNotice";
import Treasury from "./components/Treasury";

import bonsai from "assets/bonsai.png";
import Countdown, { CountdownRenderProps } from "react-countdown";
import FancyValue from "components/FancyValue";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import FarmCard from "components/FarmCard";
import Loader from "components/Loader";
import HarvestAllCard from "components/HarvestAllCard";
import { BigNumber } from "bignumber.js";

const Garden: React.FC = () => {
  const { account } = useWallet();
  const { userVote, epochStart } = useGovernance();
  const { gardenFarms, startTime } = useFarming();
  const canVote = !userVote ? false : userVote?.epoch === epochStart;

  const hasStakes =
    (gardenFarms.length > 0
      ? gardenFarms
          .map((e) => e.userData?.earnings.toNumber() || 0)
          .reduce((a: number, b: number) => a + b)
      : 0) > 0;

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const paddedHours = hours < 10 ? `0${hours}` : hours.toString();
    const paddedDays = days < 10 ? `0${days}` : days.toString();
    return (
      <Card>
        <CardTitle text="Farming starts in:" />
        <Spacer />
        <Box row justifyContent="center">
          <FancyValue value={paddedDays} label="Days" />
          <Spacer size="sm" />
          <FancyValue value={paddedHours} label="Hours" />
          <Spacer size="sm" />
          <FancyValue value={paddedMinutes} label="Minutes" />
          <Spacer size="sm" />
          <FancyValue value={paddedSeconds} label="Seconds" />
        </Box>
        <Spacer />
      </Card>
    );
  };

  return (
    <Page>
      <PageHeader
        image={bonsai}
        subtitle="Stake your LPs and harvest tokens"
        title="Zen Garden"
      />
      <Box column alignItems="center" maxWidth="90%">
        {canVote && <VoteStartedNotice />}
        {(startTime?.valueOf() || 0) - new Date().valueOf() > 0 && (
          <>
            <Countdown date={startTime} renderer={renderer} />
            <Spacer />
          </>
        )}
        <Box maxWidth="600px" minWidth="380px">
          <TokenHarvestor />
          <Spacer />
          <Treasury />
        </Box>
        <Spacer size="sm"/>
        {hasStakes && (
          <HarvestAllCard
          rewards={[
            {
              label: "zen",
              amount:
                gardenFarms.length === 0
                  ? "0"
                  : gardenFarms
                      .map((e) => e.userData?.earnings || new BigNumber(0))
                      .reduce((a, b) => a.plus(b))
                      .div(new BigNumber(10).pow(18))
                      .toNumber()
                      .toPrecision(4),
            },
          ]}
        />
        )}
        <Spacer size="sm"/>
        <Box>
          {gardenFarms.length === 0 ? (
            <Loader />
          ) : (
            <StyledFarmContainer row justifyContent="center">
              {gardenFarms.map((e) =>
                <StyledFarm
                  key={e.pid}
                  farm={e}
                  account={account ? account : undefined}
                />
              )}
            </StyledFarmContainer>
          )}
        </Box>
        <Spacer />
        <Separator />
        <Spacer />
        <Split>
          <Button full text="Addresses" to="/addresses" variant="secondary" />
        </Split>
      </Box>
    </Page>
  );
};

const StyledFarm = styled(FarmCard)`
  width: 50%;
  min-width: 380px;
`;

const StyledFarmContainer = styled(Box)`
  > * {
    margin: 5px;
  }
  display: flex;
  flex-wrap: wrap;
`;

export default Garden;
