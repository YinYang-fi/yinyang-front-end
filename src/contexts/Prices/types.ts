import { BigNumber } from "bignumber.js";

export interface Pair {
  supply: BigNumber;
  tokens: string[];
  reserves: BigNumber[];
}

export interface PriceContext {
  prices: { [token: string]: number | undefined };
}
