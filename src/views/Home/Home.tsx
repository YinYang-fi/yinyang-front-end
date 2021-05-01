import React from "react";
import { Container, Spacer, useTheme, Card, CardContent, CardTitle, Box } from "react-neu";
import numeral from "numeral";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import FancyValue from "components/FancyValue";

import useTVL from "hooks/useTVL";

import Stats from "./components/Stats";
import Countdown, { CountdownRenderProps } from "react-countdown";

const Home: React.FC = () => {
  const { colors } = useTheme();
  const { tvl } = useTVL();

  const v2Time = new Date("2021-04-24T09:30:00Z");

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const paddedHours = hours < 10 ? `0${hours}` : hours.toString();
    const paddedDays = days < 10 ? `0${days}` : days.toString();
    return (
      <Card>
        <CardTitle text="V2 starts in:" />
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
        icon={"☯"}
        subtitle={"A DAO powered by two reflect tokens"}
        title="Welcome to YinYang"
        rotate={true}
      />
      <Container>
      {(v2Time?.valueOf() || 0) - new Date().valueOf() > 0 && (
          <Countdown date={v2Time} renderer={renderer} />
        )}
        <Spacer />
        <Card>
          <CardContent>
            <FancyValue
              wrap
              value={tvl ? `TVL $${numeral(tvl).format("000,000,000")}` : "Loading TVL..."}
              valueSize="54px"
              valueColor={colors.primary.main}
              valueBold="800"
              label={"Across all pools and treasury"}
            />
          </CardContent>
        </Card>
        <Spacer />
        <Stats />
      </Container>
    </Page>
  );
};

export default Home;
