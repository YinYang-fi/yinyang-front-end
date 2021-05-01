import { ethers } from "ethers";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import request from "request";
import { getBEP20Contract } from "utils";

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const getPoolStartBlock = async (peaceMaster) => {
  return await peaceMaster.methods.origin().call();
};

export const stake = async (contract, amount, account, poolId, onTxHash) => {
  console.log(contract, new BigNumber(amount).times(new BigNumber(10).pow(18)));
  return contract.methods
    .deposit(
      poolId,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
    )
    .send(
      {
        from: account,
      },
      async (error, txHash) => {
        if (error) {
          onTxHash && onTxHash("");
          console.log("Staking error", error);
          return false;
        }
        onTxHash && onTxHash(txHash);
        const status = await waitTransaction(contract._provider, txHash);
        if (!status) {
          console.log("Staking transaction failed.");
          return false;
        }
        return true;
      }
    );
};

export const unstake = async (contract, amount, account, poolId, onTxHash) => {
  return contract.methods
    .withdraw(
      poolId,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()
    )
    .send(
      {
        from: account,
      },
      async (error, txHash) => {
        if (error) {
          onTxHash && onTxHash("");
          console.log("Unstaking error", error);
          return false;
        }
        onTxHash && onTxHash(txHash);
        const status = await waitTransaction(contract._provider, txHash);
        if (!status) {
          console.log("Unstaking transaction failed.");
          return false;
        }
        return true;
      }
    );
};

export const harvest = async (contract, account, poolId, onTxHash) => {
  return contract.methods.deposit(poolId, 0).send(
    {
      from: account,
    },
    async (error, txHash) => {
      if (error) {
        onTxHash && onTxHash("");
        console.log("Harvest error", error);
        return false;
      }
      onTxHash && onTxHash(txHash);
      const status = await waitTransaction(contract._provider, txHash);
      if (!status) {
        console.log("Harvest transaction failed.");
        return false;
      }
      return true;
    }
  );
};

export const harvestAll = async (zenGarden, account, onTxHash) => {
  return zenGarden.methods.harvestAll().send(
    {
      from: account,
    },
    async (error, txHash) => {
      if (error) {
        onTxHash && onTxHash("");
        console.log("Harvest All error", error);
        return false;
      }
      onTxHash && onTxHash(txHash);
      const status = await waitTransaction(zenGarden._provider, txHash);
      if (!status) {
        console.log("Harvest All transaction failed.");
        return false;
      }
      return true;
    }
  );
};

export const harvestTokens = async (peaceMaster, account, onTxHash) => {
  return peaceMaster.methods.harvest().send(
    {
      from: account,
    },
    async (error, txHash) => {
      if (error) {
        onTxHash && onTxHash("");
        console.log("Harvest error", error);
        return false;
      }
      onTxHash && onTxHash(txHash);
      const status = await waitTransaction(peaceMaster._provider, txHash);
      if (!status) {
        console.log("Harvest transaction failed.");
        return false;
      }
      return true;
    }
  );
};

export const isHarvestable = async (peaceMaster) => {
  return await peaceMaster.methods.isHarvestable().call();
};

export const approve = async (tokenContract, poolContract, account) => {
  return tokenContract.methods
    .approve(poolContract.options.address, ethers.constants.MaxUint256)
    .send({
      from: account,
      //gas: 80000,
    });
};

export const getPoolContracts = async (yinyang) => {
  const pools = Object.keys(yinyang.contracts)
    .filter((c) => c.indexOf("_pool") !== -1)
    .reduce((acc, cur) => {
      const newAcc = {
        ...acc,
      };
      newAcc[cur] = yinyang.contracts[cur];
      return newAcc;
    }, {});
  return pools;
};

export const getRewardRate = async (contract, number) => {
  const res = await contract.methods
    .getGeneratedReward(number, number + 1)
    .call();
  return new BigNumber(res).div(new BigNumber(10).pow(18));
};

export const getEarned = async (contract, poolId, account) => {
  try {
    const res = await contract.methods.pendingRewards(poolId, account).call();
    let earned = new BigNumber(res);
    return earned;
  } catch (err) {
    return new BigNumber(0);
  }
};

export const getStaked = async (contract, poolId, account) => {
  try {
    const res = await contract.methods.userInfo(poolId, account).call();
    return new BigNumber(res.amount);
  } catch (err) {
    return new BigNumber(0);
  }
};

export const getPeriod = async (peaceMaster) => {
  const period = await peaceMaster.methods.epochDuration().call();
  return new BigNumber(period);
};

export const getCurrentEpoch = async (peaceMaster) => {
  const timestamp = await peaceMaster.methods.epochStart().call();
  return new BigNumber(timestamp);
};

export const getYinTotalSupply = async (yinyang) => {
  return await yinyang.contracts.yin.methods.totalSupply().call();
};

export const getYangTotalSupply = async (yinyang) => {
  return await yinyang.contracts.yang.methods.totalSupply().call();
};

export const getZenTotalSupply = async (yinyang) => {
  return await yinyang.contracts.zen.methods.totalSupply().call();
};

export const getZenCirculatingSupply = async (yinyang) => {
  return await yinyang.contracts.zen.methods.circulatingSupply().call();
};

export const getStats = async (yinyang) => {
  const yinTotalSupply = await getYinTotalSupply(yinyang);
  const yangTotalSupply = await getYangTotalSupply(yinyang);
  const zenCirculatingSupply = await getZenCirculatingSupply(yinyang);
  const zenTotalSupply = await getZenTotalSupply(yinyang);
  return {
    yinTotalSupply,
    yangTotalSupply,
    zenCirculatingSupply,
    zenTotalSupply,
  };
};

export const vote = async (peaceMaster, token, amount, account, onTxHash) => {
  return peaceMaster.methods.voteForNextTarget(token, amount).send(
    {
      from: account,
    },
    async (error, txHash) => {
      if (error) {
        onTxHash && onTxHash("");
        console.log("Vote error", error);
        return false;
      }
      onTxHash && onTxHash(txHash);
      const status = await waitTransaction(peaceMaster._provider, txHash);
      if (!status) {
        console.log("Vote transaction failed.");
        return false;
      }
      return true;
    }
  );
};

export const getUserVote = async (peaceMaster, v2, user) => {
  if (!v2) {
    const userVote = await peaceMaster.methods.voters(user).call();
    return {
      epoch: new Date(1000 * userVote.epoch),
      token: userVote.token,
      voices: new BigNumber(userVote.voices)
        .div(new BigNumber(10).pow(18))
        .toNumber(),
      shares: new BigNumber(userVote.voices)
        .div(new BigNumber(10).pow(18))
        .pow(2)
        .toNumber(),
    };
  } else {
    const userVote = await peaceMaster.methods.getUserVote(user).call();
    return {
      epoch: new Date(1000 * (await peaceMaster.methods.epochStart().call())),
      token: userVote.token,
      voices: new BigNumber(userVote.userShares)
        .div(new BigNumber(10).pow(18))
        .sqrt()
        .toNumber(),
      shares: new BigNumber(userVote.userShares)
        .div(new BigNumber(10).pow(18))
        .toNumber(),
    };
  }
};

export const getHistory = async (peaceMaster, pageStart = 0, pageSize = 10) => {
  const historyLength = await peaceMaster.methods.getHistoryLength().call();
  const start = Math.max(historyLength, historyLength - pageStart);
  const length = Math.max(0, start - pageSize);
  let res = [];
  for (let i = start - 1; i >= length; i--) {
    const tmp = await peaceMaster.methods.getHistory(i).call();
    res.push({
      epoch: new Date(1000 * tmp[0]),
      token: tmp[1],
      voices: new BigNumber(tmp[2]).div(new BigNumber(10).pow(9)).toNumber(),
      shares: new BigNumber(tmp[3]).div(new BigNumber(10).pow(18)).toNumber(),
    });
  }
  return res;
};

export const getProposals = async (peaceMaster) => {
  const length = await peaceMaster.methods.getPropositionsLength().call();
  let proposals = [];
  for (let i = 0; i < length; i++) {
    proposals.push(peaceMaster.methods.getProposition(i).call());
  }
  proposals = await Promise.all(proposals);
  return proposals.map((e) => {
    return {
      token: e[0] || "0x0000000000000000000000000000000000000000",
      voices: new BigNumber(e[1] || 0)
        .div(new BigNumber(10).pow(9)) // Account for sqrt
        .toNumber(),
      shares: new BigNumber(e[2] || 0)
        .div(new BigNumber(10).pow(18))
        .toNumber(),
    };
  });
};

export const getCurrentToken = async (peaceMaster) => {
  const address = await peaceMaster.methods.currentTarget().call();
  if (address === "0x0000000000000000000000000000000000000000") {
    return {
      name: "Skip this vote",
      symbol: "Skip",
      decimals: 18,
      address: "0x0000000000000000000000000000000000000000",
    };
  }

  const token = getBEP20Contract(peaceMaster._provider, address);
  return {
    name: await token.methods.name().call(),
    symbol: await token.methods.symbol().call(),
    decimals: await token.methods.decimals().call(),
    address: address,
  };
};

export const getPoolInfo = async (yinyang, poolId) => {
  const info = await yinyang.contracts.peaceMaster.methods
    .poolInfo(poolId)
    .call();
  return {
    token: info.lpToken,
    points: info.allocPoint,
  };
};

export const getPendingShares = async (peaceMaster, account) => {
  const res = await peaceMaster.methods.pendingVoterShares(account).call();
  return res.map((e) => {
    return {
      token: e.token,
      amount: new BigNumber(e.amount).div(new BigNumber(10).pow(e.decimals)),
    };
  });
};

export const updateUserAccount = async (peaceMaster, account, onTxHash) => {
  return await peaceMaster.methods.updateUserAccount().send(
    {
      from: account,
    },
    async (error, txHash) => {
      if (error) {
        onTxHash && onTxHash("");
        console.log("Update error", error);
        return false;
      }
      onTxHash && onTxHash(txHash);
      const status = await waitTransaction(peaceMaster._provider, txHash);
      if (!status) {
        console.log("Update transaction failed.");
        return false;
      }
      return true;
    }
  );
};

export const getMissingUpdates = async (peaceMaster, account) => {
  return await peaceMaster.methods.updatesMissing(account).call();
};

export const claimToken = async (peaceMaster, account, onTxHash) => {
  return await peaceMaster.methods.claimAllVoterShares().send(
    {
      from: account,
    },
    async (error, txHash) => {
      if (error) {
        onTxHash && onTxHash("");
        console.log("Claim error", error);
        return false;
      }
      onTxHash && onTxHash(txHash);
      const status = await waitTransaction(peaceMaster._provider, txHash);
      if (!status) {
        console.log("Claim transaction failed.");
        return false;
      }
      return true;
    }
  );
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const waitTransaction = async (provider, txHash) => {
  const web3 = new Web3(provider);
  let txReceipt = null;
  while (txReceipt === null) {
    const r = await web3.eth.getTransactionReceipt(txHash);
    txReceipt = r;
    await sleep(2000);
  }
  return txReceipt.status;
};

export const getCurrentBlock = async (yinyang) => {
  try {
    return await yinyang.web3.eth.getBlock("latest");
  } catch (e) {
    console.log(e);
  }
};

const requestHttp = (url) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: url,
        json: true,
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      }
    );
  });
};

export const getPair = async (pair, tokenA, tokenB, fallbackPrice) => {
  try {
    const reserves = await pair.methods.getReserves().call();
    return {
      supply: new BigNumber(await pair.methods.totalSupply().call()),
      tokens: [
        await pair.methods.token0().call(),
        await pair.methods.token1().call(),
      ],
      reserves: [
        new BigNumber(reserves.reserve0),
        new BigNumber(reserves.reserve1),
      ],
    };
  } catch {
    return {
      supply: new BigNumber(0),
      tokens: [tokenA || "0", tokenB || "1"],
      reserves: [new BigNumber(1), new BigNumber(fallbackPrice || 0)],
    };
  }
};

export const getWBNBPrice = async () => {
  const data = await requestHttp("https://api.coingecko.com/api/v3/coins/wbnb");
  return data?.market_data?.current_price.usd || 0;
};

export const getBUSDPrice = async () => {
  const data = await requestHttp(
    "https://api.coingecko.com/api/v3/coins/binance-usd"
  );
  return data?.market_data?.current_price.usd || 0;
};

export const getBIFIPrice = async () => {
  const data = await requestHttp(
    "https://api.coingecko.com/api/v3/coins/beefy-finance"
  );
  return data?.market_data?.current_price.usd || 0;
};

export const getYinPrice = async () => {
  const data = await requestHttp("https://api.coingecko.com/api/v3/coins/yin");
  return data?.market_data?.current_price.usd || 0;
};

export const getYangPrice = async () => {
  const data = await requestHttp("https://api.coingecko.com/api/v3/coins/yang");
  return data.market_data?.current_price.usd || 0;
};

export const getZenPrice = async () => {
  const data = await requestHttp("https://api.coingecko.com/api/v3/coins/zen");
  return data.market_data?.current_price.usd;
};

export const getDPIPrices = async (from, to) => {
  const data = await requestHttp(
    "https://api.coingecko.com/api/v3/coins/defipulse-index/market_chart/range?vs_currency=usd&from=" +
      from +
      "&to=" +
      to
  );
  let newPrices = {};
  for (let i = 0; i < data.prices.length; i++) {
    newPrices[data.prices[i][0]] = data.prices[i][1];
  }
  return newPrices;
};

export const getMarketCap = async () => {
  const data = await requestHttp(
    "https://api.coingecko.com/api/v3/coins/yinyang-2"
  );
  return data?.market_data.market_cap.usd || 0;
};
