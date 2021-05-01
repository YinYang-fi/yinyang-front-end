import tokens from 'constants/tokens'
import { FarmConfig } from './types'

const yinFarms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'YIN V1-BDO LP',
    lpAddresses: tokens.yinBDO.address,
    token: tokens.yinBDO,
    quoteToken: tokens.yinV1,
    multiplier: 32,
    totalPoints: 45,
    pairAddress: "0x7483700228Fe54b964D6f6bECc932C9FB9C5491a",
    addLiquidityUrl: "https://exchange.pancakeswap.finance/#/add/0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454/0xfDCFd19532ffc45772d99Ddb1d68748B3236e249"
  },
  {
    pid: 1,
    lpSymbol: 'YANG V1',
    lpAddresses: tokens.yangV1.address,
    token: tokens.yangV1,
    quoteToken: tokens.yinV1,
    multiplier: 8,
    totalPoints: 45,
  },
  {
    pid: 2,
    lpSymbol: 'BIFI',
    lpAddresses: tokens.bifi.address,
    token: tokens.bifi,
    quoteToken: tokens.yinV1,
    multiplier: 1,
    totalPoints: 45,
  },
  {
    pid: 3,
    lpSymbol: 'BDO',
    lpAddresses: tokens.busd.address,
    token: tokens.busd,
    quoteToken: tokens.yinV1,
    multiplier: 2,
    totalPoints: 45,
  },
]

export default yinFarms