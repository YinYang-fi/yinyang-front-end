import React, { useCallback, useState } from "react";
import styled from "styled-components";

import {
  Box,
  Button,
  Card,
  CardTitle,
  Separator,
  Spacer,
  Switch,
  SwitchButton,
} from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import useFarming from "hooks/useFarming";
import FarmCard from "components/FarmCard";
import Countdown, { CountdownRenderProps } from "react-countdown";
import FancyValue from "components/FancyValue";
import Loader from "components/Loader";
import { BigNumber } from "yinyang-sdk/lib";
import HarvestAllCard from "components/HarvestAllCard";

const Genesis: React.FC = () => {
  const { account } = useWallet();
  const { yinFarms, yangFarms, startTime } = useFarming();

  const [showFinished, setShowFinished] = useState(false);

  const handleToggleShow = useCallback(() => {
    setShowFinished(!showFinished);
  }, [showFinished]);

  const hasFinished =
    yinFarms.filter((e) => e.finished).length !== 0 ||
    yangFarms.filter((e) => e.finished).length !== 0;

  const hasStakes =
    (yinFarms.length > 0
      ? yinFarms
          .map((e) => e.userData?.earnings.toNumber() || 0)
          .reduce((a: number, b: number) => a + b)
      : 0) +
      (yangFarms.length > 0
        ? yangFarms
            .map((e) => e.userData?.earnings.toNumber() || 0)
            .reduce((a: number, b: number) => a + b)
        : 0) >
    0;

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const paddedHours = hours < 10 ? `0${hours}` : hours.toString();
    const paddedDays = days < 10 ? `0${days}` : days.toString();
    return (
      <StyledCard>
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
      </StyledCard>
    );
  };

  return (
    <Page>
      <PageHeader
        icon={"🚜"}
        subtitle="Farm the initial YIN and YANG supply"
        title="Genesis"
      />
      <Box column maxWidth="90%" alignItems="center">
        {(startTime?.valueOf() || 0) - new Date().valueOf() > 0 ? (
          <Countdown date={startTime} renderer={renderer} />
        ) : (
          hasStakes && (
            <HarvestAllCard
              rewards={[
                {
                  label: "yin",
                  amount:
                    yinFarms.length === 0
                      ? "0"
                      : yinFarms
                          .map((e) => e.userData?.earnings || new BigNumber(0))
                          .reduce((a, b) => a.plus(b))
                          .div(new BigNumber(10).pow(18))
                          .toNumber()
                          .toPrecision(4),
                },
                {
                  label: "yang",
                  amount:
                    yangFarms.length === 0
                      ? "0"
                      : yangFarms
                          .map((e) => e.userData?.earnings || new BigNumber(0))
                          .reduce((a, b) => a.plus(b))
                          .div(new BigNumber(10).pow(18))
                          .toNumber()
                          .toPrecision(4),
                },
              ]}
            />
          )
        )}
        {hasFinished && (
          <Box>
            <Subtitle>Show finished farms?</Subtitle>
            <Switch>
              <SwitchButton
                active={!showFinished}
                onClick={handleToggleShow}
                round
              >
                Hide
              </SwitchButton>
              <SwitchButton
                active={showFinished}
                onClick={handleToggleShow}
                round
              >
                Show
              </SwitchButton>
            </Switch>
          </Box>
        )}
        <Box>
          <Title>Yin Genesis</Title>
          <Separator />
          <Spacer />
          {yinFarms.length === 0 ? (
            <Loader />
          ) : (
            <StyledFarmContainer row justifyContent="center">
              {yinFarms
                .filter((e) => (showFinished ? true : !e.finished))
                .map((e) => {
                  return (
                    <StyledFarm
                      key={e.pid}
                      farm={e}
                      account={account ? account : undefined}
                    />
                  );
                })}
            </StyledFarmContainer>
          )}
        </Box>
        <Spacer />
        <Box>
          <Title>Yang Genesis</Title>
          <Separator />
          <Spacer />
          {yangFarms.length === 0 ? (
            <Loader />
          ) : (
            <StyledFarmContainer row justifyContent="center">
              {yangFarms
                .filter((e) => (showFinished ? true : !e.finished))
                .map((e) => {
                  return (
                    <StyledFarm
                      key={e.pid}
                      farm={e}
                      account={account ? account : undefined}
                    />
                  );
                })}
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

const StyledCard = styled(Card)`
  min-width: 380px;
`;

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

const Title = styled.h3`
  justify-content: center;
  font-size: 24px;
`;

const Subtitle = styled.h4`
  justify-content: center;
  font-size: 20px;
`;

export default Genesis;
