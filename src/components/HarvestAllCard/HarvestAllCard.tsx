import React, { useCallback } from "react";
import { Box, Button, Card, Spacer } from "react-neu";

import LogoIcon from "components/LogoIcon";
import Split from "components/Split";
import FancyValue from "components/FancyValue";
import useFarming from "hooks/useFarming";

interface HarvestAllProps {
  rewards: { amount: string; label: string }[];
}

const HarvestAllCard: React.FC<HarvestAllProps> = ({ rewards }) => {
  const { onHarvestAllGenesis, onHarvestAllGarden } = useFarming();

  const handleHarvest = useCallback(() => {
    if (rewards.filter((e) => e.label === "zen").length > 0) {
      onHarvestAllGarden();
    } else {
      onHarvestAllGenesis();
    }
  }, [rewards, onHarvestAllGarden, onHarvestAllGenesis]);
  return (
    <Card>
      <Box column alignItems="center" margin={10}>
        <Spacer />
        <Split>
          <Spacer />
          {rewards.map((reward) => (
            <Box>
              <LogoIcon
                yin={reward.label === "yin"}
                yang={reward.label === "yang"}
                zen={reward.label === "zen"}
              />
              <FancyValue
                wrap
                label={"Pending $" + reward.label.toUpperCase()}
                value={reward.amount}
              />
            </Box>
          ))}
          <Spacer />
        </Split>
        <Spacer size="sm" />
        <Box>
          <Button
            full={false}
            text="Harvest all farms"
            onClick={handleHarvest}
          />
        </Box>
        <Spacer />
      </Box>
    </Card>
  );
};

interface ValueHintProps {
  darkMode?: boolean;
}

export default HarvestAllCard;
