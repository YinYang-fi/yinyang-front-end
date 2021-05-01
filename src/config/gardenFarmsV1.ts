import tokens from 'constants/tokens'
import { FarmConfig } from './types'

const gardenFarms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'YIN V1-BDO LP',
    lpAddresses: tokens.yinBDO.address,
    token: tokens.yinBDO,
    quoteToken: tokens.zenV1,
    multiplier: 9,
    totalPoints: 20,
    pairAddress: "0x7483700228Fe54b964D6f6bECc932C9FB9C5491a",
    addLiquidityUrl: "https://v1exchange.pancakeswap.finance/#/add/0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454/0xfDCFd19532ffc45772d99Ddb1d68748B3236e249"
  },
  {
    pid: 1,
    lpSymbol: 'YANG V1-SOUP LP',
    lpAddresses: tokens.yangSoup.address,
    token: tokens.yangSoup,
    quoteToken: tokens.zenV1,
    multiplier: 9,
    totalPoints: 20,
    pairAddress: "0x86Ad56A59c2dfBB708c246e01BFE9D2bea795EE9",
    addLiquidityUrl: "https://v1exchange.pancakeswap.finance/#/add/0x94F559aE621F1c810F31a6a620Ad7376776fe09E/0x13709bCC1964EEE12C8Dc799e8a81653bdFea5eB",
  },
  {
    pid: 2,
    lpSymbol: 'ZEN V1-SOUP LP',
    lpAddresses: tokens.zenSoup.address,
    token: tokens.zenSoup,
    quoteToken: tokens.zenV1,
    multiplier: 1,
    totalPoints: 20,
    pairAddress: "0x38742D67E520D04e6c9fa667bcdd8ab0A78befF4",
    addLiquidityUrl: "https://v1exchange.pancakeswap.finance/#/add/0x94F559aE621F1c810F31a6a620Ad7376776fe09E/0x423592F97B2D64fF384c7bc68d566391CB62e81C",
  },
  {
    pid: 3,
    lpSymbol: 'ZEN V1-BDO LP',
    lpAddresses: tokens.zenBDO.address,
    token: tokens.zenBDO,
    quoteToken: tokens.zenV1,
    multiplier: 1,
    totalPoints: 20,
    pairAddress: "0x1e7fd27B0282C59BbCD3E7D7dF9DbF01aCfC2418",
    addLiquidityUrl: "https://v1exchange.pancakeswap.finance/#/add/0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454/0xfDCFd19532ffc45772d99Ddb1d68748B3236e249",
  },
]

export default gardenFarms