import tokens from 'constants/tokens'
import { FarmConfig } from './types'

const yangFarms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'YANG V1-SOUP LP',
    lpAddresses: tokens.yangSoup.address,
    token: tokens.yangSoup,
    quoteToken: tokens.yangV1,
    multiplier: 32,
    totalPoints: 45,
    pairAddress: "0x86Ad56A59c2dfBB708c246e01BFE9D2bea795EE9",
    addLiquidityUrl: "https://v1exchange.pancakeswap.finance/#/add/0x94F559aE621F1c810F31a6a620Ad7376776fe09E/0x13709bCC1964EEE12C8Dc799e8a81653bdFea5eB",
  },
  {
    pid: 1,
    lpSymbol: 'YIN V1',
    lpAddresses: tokens.yinV1.address,
    token: tokens.yinV1,
    quoteToken: tokens.yangV1,
    multiplier: 8,
    totalPoints: 45,
  },
  {
    pid: 2,
    lpSymbol: 'WBNB',
    lpAddresses: tokens.wbnb.address,
    token: tokens.wbnb,
    quoteToken: tokens.yangV1,
    multiplier: 1,
    totalPoints: 45,
  },
  {
    pid: 3,
    lpSymbol: 'SOUP',
    lpAddresses: tokens.soup.address,
    token: tokens.soup,
    quoteToken: tokens.yangV1,
    multiplier: 2,
    totalPoints: 45,
  },
]

export default yangFarms