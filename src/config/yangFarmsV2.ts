import tokens from 'constants/tokens'
import { FarmConfig } from './types'

const yangFarms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'YIN-BUSD LP',
    lpAddresses: tokens.yinBUSD.address,
    token: tokens.yinBUSD,
    quoteToken: tokens.yangV2,
    multiplier: 1,
    totalPoints: 2,
    depositFee: 0,
    pairAddress: "0x735C2af7E7857b32B34AA88c13A8D6b1557f3248",
    addLiquidityUrl: "https://exchange.pancakeswap.finance/#/add/0xe9e7cea3dedca5984780bafc599bd69add087d56/0x772D50652cA5C1ff5d10CdC9d7dCdbF22C0B0E43",
  },
  {
    pid: 1,
    lpSymbol: 'YANG V1',
    lpAddresses: tokens.yangV1.address,
    token: tokens.yangV1,
    quoteToken: tokens.yangV2,
    multiplier: 1,
    totalPoints: 2,
    depositFee: 100,
  },
]

export default yangFarms