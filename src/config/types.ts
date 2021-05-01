export interface Address {
  97?: string;
  56: string;
}

export interface Token {
  symbol: string;
  address?: Address;
  decimals?: number;
  projectLink?: string;
}

export interface FarmConfig {
  pid: number;
  lpSymbol: string;
  lpAddresses: Address;
  token: Token;
  quoteToken: Token;
  multiplier?: number;
  totalPoints?: number;
  depositFee?: number;
  pairAddress?: string;
  addLiquidityUrl?: string;
  finished?: boolean;
}
