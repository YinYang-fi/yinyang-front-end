import { BigNumber } from "bignumber.js";
import addresses, { NULL_ADDR } from "constants/tokenAddresses";
import { ethers } from "ethers";
import Web3 from "web3";
import { TransactionReceipt } from "web3-core";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { provider } from "web3-core";
import { AbiItem } from "web3-utils";

import ERC20ABI from "yinyang-sdk/lib/clean_build/contracts/v1/BEP20.json";
import UniPairJson from "yinyang-sdk/lib/clean_build/contracts/v1/IPancakePair.json";
import PancakeFactory from "yinyang-sdk/lib/clean_build/contracts/v1/IPancakeFactory.json";

import yinLogo from "assets/yin.png";
import zenLogo from "assets/zen.png";
import yangLogo from "assets/yang.png";
import bdoLogo from "assets/bdo.png";
import soupLogo from "assets/soup.png";
import { Pair } from "contexts/Prices/types";

export const BSC_BLOCK_TIME = 3;
export const YINYANG_PER_BLOCK = new BigNumber(1);
export const BLOCKS_PER_YEAR = new BigNumber(
  (60 / BSC_BLOCK_TIME) * 60 * 24 * 365
); // 10512000

/**
 * Get farm APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param priceUsd price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApy = (
  rewardPerBlock: BigNumber,
  poolWeight: BigNumber,
  priceUsd: BigNumber,
  poolLiquidityUsd: BigNumber
): number | null => {
  const yearlyRewardAllocation = rewardPerBlock
    .times(BLOCKS_PER_YEAR)
    .times(poolWeight);
  const apy = yearlyRewardAllocation
    .times(priceUsd)
    .div(poolLiquidityUsd)
    .times(100);
  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber();
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const waitTransaction = async (provider: provider, txHash: string) => {
  const web3 = new Web3(provider);
  let txReceipt: TransactionReceipt | null = null;
  while (txReceipt === null) {
    const r = await web3.eth.getTransactionReceipt(txHash);
    txReceipt = r;
    await sleep(2000);
  }
  return txReceipt.status;
};

export const approve = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  provider: provider,
  onTxHash?: (txHash: string) => void
): Promise<boolean> => {
  try {
    const tokenContract = getBEP20Contract(provider, tokenAddress);
    return tokenContract.methods
      .approve(spenderAddress, ethers.constants.MaxUint256)
      .send({ from: userAddress }, async (error: any, txHash: string) => {
        if (error) {
          console.log("ERC20 could not be approved", error);
          onTxHash && onTxHash("");
          return false;
        }
        if (onTxHash) {
          onTxHash(txHash);
        }
        const status = await waitTransaction(provider, txHash);
        if (!status) {
          console.log("Approval transaction failed.");
          return false;
        }
        console.log(status);
        return true;
      });
  } catch (e) {
    console.log("error", e);
    return false;
  }
};

export const getAllowance = async (
  userAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  provider: provider
): Promise<BigNumber> => {
  try {
    const tokenContract: any = getBEP20Contract(provider, tokenAddress);
    tokenContract.setProvider(provider);
    const allowance: string = await tokenContract.methods
      .allowance(userAddress, spenderAddress)
      .call();
    return new BigNumber(allowance);
  } catch (err) {
    //console.log("Failed to get allowance for", tokenAddress);
    return new BigNumber(0);
  }
};

export const getBalance = async (
  provider: provider,
  tokenAddress: string,
  userAddress?: string
): Promise<BigNumber> => {
  try {
    const tokenContract = getBEP20Contract(provider, tokenAddress);
    const balance = new BigNumber(
      await tokenContract.methods.balanceOf(userAddress).call()
    );
    return balance;
  } catch (err) {
    return new BigNumber(0);
  }
};

export const getBEP20Contract = (provider: provider, address: string) => {
  const web3 = new Web3(provider);
  const contract: any = new web3.eth.Contract(
    (ERC20ABI.abi as unknown) as AbiItem,
    address
  );
  contract.setProvider(provider);
  return contract;
};

export const getBNBPool = async (provider: provider, address: string) => {
  if(address === addresses.wbnb) return 1;
  const web3 = new Web3(provider);
  const factory: any = new web3.eth.Contract(
    (PancakeFactory.abi as unknown) as AbiItem,
    addresses.factory2
  );
  factory.setProvider(provider);
  const pairAddr = await factory.methods.getPair(address, addresses.wbnb).call();
  if(pairAddr === NULL_ADDR) return 0

  const contract = new web3.eth.Contract((UniPairJson.abi as any), pairAddr);
  let pair: Pair;
  try {
    const reserves = await contract.methods.getReserves().call();
    pair = {
      supply: new BigNumber(await contract.methods.totalSupply().call()),
      tokens: [
        await contract.methods.token0().call(),
        await contract.methods.token1().call(),
      ],
      reserves: [
        new BigNumber(reserves.reserve0),
        new BigNumber(reserves.reserve1),
      ],
    };
  } catch {
    return 0
  }
  const bnb_index = pair.tokens.indexOf(addresses.wbnb);
  return pair.reserves[bnb_index].times(2).div(new BigNumber(10).pow(18)).toNumber()
};

export const bnToDec = (bn: BigNumber, decimals = 18) => {
  return bn.div(new BigNumber(10).pow(decimals)).toNumber();
};

export const decToBn = (dec: number, decimals = 18) => {
  return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals));
};

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed();
};

export const getNearestBlock = (from: Array<any>, target: number) => {
  return from.reduce(function (prev: any, curr: any) {
    return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
  });
};

export const getAMPM = (date: any) => {
  const hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  return ampm;
};

export const getTimestampDate = (obj: { ts: number; ap?: boolean }) => {
  const d = new Date(obj.ts * 1000);
  const s = ".";
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year =
    d.getFullYear().toString().substring(0, 2) +
    (obj.ap ? " " + getAMPM(d) : "");
  return (
    (day < 9 ? "0" + day : day) +
    s +
    (month <= 9 ? "0" + month : month) +
    s +
    year
  );
};

export const getIcon = (tokenAddress: string) => {
  switch (tokenAddress) {
    case addresses.v2.yin:
      return yinLogo;
    case addresses.v2.yang:
      return yangLogo;
    case addresses.v2.zen:
      return zenLogo;
    case addresses.bdo:
      return bdoLogo;
    case addresses.soup:
      return soupLogo;
    default:
      return;
  }
};
