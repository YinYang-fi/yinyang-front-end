import React, { useCallback } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import numeral from "numeral";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardTitle,
  Spacer,
  useTheme,
} from "react-neu";

import FancyValue from "components/FancyValue";
import Split from "components/Split";

import useTreasury from "hooks/useTreasury";
import useGovernance from "hooks/useGovernance";
import useFarming from "hooks/useFarming";

import LogoIcon from "components/LogoIcon";
import Label from "components/Label";

const Treasury: React.FC = () => {
  const { colors } = useTheme();
  const { totalYin, totalYang, totalUsdValue } = useTreasury();
  const { epochEnd } = useGovernance();
  const { isHarvestable, harvestEpochTokens } = useFarming();

  function roundTo(value: number, places: number) {
    var power = Math.pow(10, places);
    return Math.round(value * power) / power;
  }

  const totalYinRounded = roundTo(totalYin || 0, 5);
  const totalYangRounded = roundTo(totalYang || 0, 5);
  const totalUsdRounded = roundTo(totalUsdValue || 0, 5);

  const yinBal =
    typeof totalYin !== "undefined"
      ? numeral(totalYinRounded).format("0.00a")
      : "--";
  const yangBal =
    typeof totalYang !== "undefined"
      ? numeral(totalYangRounded).format("0.00a")
      : "--";

  const handleHarvestEpoch = useCallback(() => {
    harvestEpochTokens();
  }, [harvestEpochTokens]);

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const paddedHours = hours < 10 ? `0${hours}` : hours;
    const paddedDays = days < 10 ? `0${days}` : days;
    return (
      <Box row justifyContent="center">
        <Label
          text={`Next epoch starts in ${paddedDays}:${paddedHours}:${paddedMinutes}:${paddedSeconds}`}
        />
      </Box>
    );
  };

  return (
    <Box maxWidth="600px" minWidth="380px">
      <Card>
        <CardTitle text="Treasury Overview" />
        <Spacer size="sm" />
        <CardContent>
          <Box row>
            <Split>
              <Box alignItems="center" column>
                <LogoIcon yin />
                <FancyValue label="Reserve Yin" value={yinBal} />
              </Box>
              <Box alignItems="center" column>
                <LogoIcon yang />
                <FancyValue label="Reserve Yang" value={yangBal} />
              </Box>
            </Split>
          </Box>
          <Spacer />
          <Box column justifyContent="center">
            <FancyValue
              wrap
              value={`$${numeral(totalUsdRounded).format("000,000,000")}`}
              label={"Treasury funds"}
              valueSize="54px"
              valueColor={colors.primary.main}
              valueBold="800"
            />
          </Box>
        </CardContent>
        {isHarvestable ? (
          <CardActions>
            <Button
              full
              onClick={handleHarvestEpoch}
              text="Harvest this epoch's token for everybody!"
              variant="default"
            />
          </CardActions>
        ) : (
          <>
            {(epochEnd?.valueOf() || 0) - new Date().valueOf() > 0 && (
              <Countdown date={epochEnd} renderer={renderer} />
            )}
            <Spacer />
          </>
        )}
      </Card>
    </Box>
  );
};

export default Treasury;
