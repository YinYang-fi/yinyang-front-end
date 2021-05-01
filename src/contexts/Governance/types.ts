import BigNumber from "bignumber.js";

export interface Proposal {
  token: string;
  voices: number;
  shares: number;
  totalShares?: number;
  totalVoices?: number;
}

export interface ProposalVotingPower {
  hash: string;
  power: number;
  voted: boolean;
  side: boolean;
}

export interface Vote {
  epoch: Date;
  token: string;
  voices: number;
  shares: number;
}

export interface Token {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
}

export interface ContextValues {
  proposals: Proposal[];
  votingPowers?: ProposalVotingPower[];
  currentPower?: number;
  currentToken?: Token;
  userVote?: Vote;
  history?: Vote[];
  epochStart?: Date;
  epochEnd?: Date;
  isVoting?: boolean;
  onVote: (proposal: string, amount: number) => void;
}
