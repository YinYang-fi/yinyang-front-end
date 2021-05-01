import { FarmConfig } from "config/types";
import { BigNumber } from "bignumber.js";

export interface ContextValues {
  startTime: Date;
  tvl?: string;
  isApproved?: boolean;
  isApproving?: boolean;
  isHarvestable?: boolean;
  isHarvesting?: boolean;
  isRedeeming?: boolean;
  isStaking?: boolean;
  isUnstaking?: boolean;
  harvestEpochTokens: () => void;
  onUpdateAccount: () => void;
  onHarvestToken: () => void;
  onHarvest: (contract: any, pid: number, name?: string) => void;
  onHarvestAllGenesis: () => void;
  onHarvestAllGarden: () => void;
  onStake: (contract: any, pid: number, amount: string, name?: string) => void;
  onUnstake: (
    contract: any,
    pid: number,
    amount: string,
    name?: string
  ) => void;
  missingUpdates?: number;
  pendingShares?: Share[];
  gardenFarms: Farm[];
  yinFarms: Farm[];
  yangFarms: Farm[];
}

export interface Share {
  token: string;
  amount: BigNumber;
}

export interface PoolInfo {
  lpToken: string;
}

export interface Pool {
  staked: number;
  earned: number;
  pool: any;
}

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber;
  quoteTokenAmount?: BigNumber;
  lpTotalInQuoteToken?: BigNumber;
  tokenPriceVsQuote?: BigNumber;
  poolWeight?: BigNumber;
  apy?: BigNumber;
  liquidity?: BigNumber;
  rewardRate?: BigNumber;
  userData?: {
    allowance: BigNumber;
    tokenBalance: BigNumber;
    stakedBalance: BigNumber;
    earnings: BigNumber;
  };
  contract?: any;
}
