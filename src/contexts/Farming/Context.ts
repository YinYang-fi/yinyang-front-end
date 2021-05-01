import { createContext } from "react";

import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
  startTime: new Date("2021-04-23T09:30:00.00z"),
  harvestEpochTokens: () => {},
  onUpdateAccount: () => {},
  onHarvestToken: () => {},
  onHarvest: (contract: any, pid: number, name?: string) => {},
  onHarvestAllGenesis: () => {},
  onHarvestAllGarden: () => {},
  onStake: (contract: any, pid: number, amount: string, name?: string) => {},
  onUnstake: (contract: any, pid: number, amount: string, name?: string) => {},
  gardenFarms: [],
  yinFarms: [],
  yangFarms: [],
});

export default Context;
