import tokens from 'constants/tokens'
import { FarmConfig } from './types'

const yinFarms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'YANG-WBNB LP',
    lpAddresses: tokens.yangBNB.address,
    token: tokens.yangBNB,
    quoteToken: tokens.yinV2,
    multiplier: 1,
    totalPoints: 2,
    depositFee: 0,
    pairAddress: "0xB18f839671884584Ea69b1d80fa6626B6f11BAA1",
    addLiquidityUrl: "https://exchange.pancakeswap.finance/#/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/0x2d33A0D0f1Aea1F17311574FF47d4EE8a7cc153F"
  },
  {
    pid: 1,
    lpSymbol: 'YIN V1',
    lpAddresses: tokens.yinV1.address,
    token: tokens.yinV1,
    quoteToken: tokens.yinV2,
    multiplier: 1,
    totalPoints: 2,
    depositFee: 100,
  },
]

export default yinFarms