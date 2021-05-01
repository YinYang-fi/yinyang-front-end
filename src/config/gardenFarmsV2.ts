import tokens from 'constants/tokens'
import { FarmConfig } from './types'

const gardenFarms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'YIN-BUSD LP',
    lpAddresses: tokens.yinBUSD.address,
    token: tokens.yinBUSD,
    quoteToken: tokens.zenV2,
    multiplier: 9,
    totalPoints: 20,
    pairAddress: "0x735C2af7E7857b32B34AA88c13A8D6b1557f3248",
    addLiquidityUrl: "https://v1exchange.pancakeswap.finance/#/add/0xe9e7cea3dedca5984780bafc599bd69add087d56/0x772D50652cA5C1ff5d10CdC9d7dCdbF22C0B0E43",
  },
  {
    pid: 1,
    lpSymbol: 'YANG-WBNB LP',
    lpAddresses: tokens.yangBNB.address,
    token: tokens.yangBNB,
    quoteToken: tokens.zenV2,
    multiplier: 9,
    totalPoints: 20,
    pairAddress: "0xB18f839671884584Ea69b1d80fa6626B6f11BAA1",
    addLiquidityUrl: "https://exchange.pancakeswap.finance/#/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/0x2d33A0D0f1Aea1F17311574FF47d4EE8a7cc153F"
  },
  {
    pid: 2,
    lpSymbol: 'ZEN-BUSD LP',
    lpAddresses: tokens.zenBUSD.address,
    token: tokens.zenBUSD,
    quoteToken: tokens.zenV2,
    multiplier: 1,
    totalPoints: 20,
    pairAddress: "0xB22030894cC283bC01F6fC4D9E718FB945abf7FB",
    addLiquidityUrl: "https://exchange.pancakeswap.finance/#/add/0xe9e7cea3dedca5984780bafc599bd69add087d56/0x4406DfBe587917d405Dd28c4d61F71211d8Bb483",
  },
  {
    pid: 3,
    lpSymbol: 'ZEN-WBNB LP',
    lpAddresses: tokens.zenBNB.address,
    token: tokens.zenBNB,
    quoteToken: tokens.zenV2,
    multiplier: 1,
    totalPoints: 20,
    pairAddress: "0x594C5a0047AF4595D6A15a06A8c3bcd1C8951EdA",
    addLiquidityUrl: "https://exchange.pancakeswap.finance/#/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/0x4406DfBe587917d405Dd28c4d61F71211d8Bb483",
  },
]

export default gardenFarms