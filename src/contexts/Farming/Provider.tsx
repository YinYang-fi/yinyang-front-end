import React, { useCallback, useEffect, useState } from "react";

import { provider } from "web3-core";
import { BigNumber } from "bignumber.js";
import { useWallet } from "@binance-chain/bsc-use-wallet";

import ConfirmTransactionModal from "components/ConfirmTransactionModal";
import useYinYang from "hooks/useYinYang";

import {
  claimToken,
  getEarned,
  getStaked,
  harvestTokens,
  stake,
  unstake,
  getPendingShares,
  getMissingUpdates,
  updateUserAccount,
  isHarvestable as harvestable,
  harvest,
  getRewardRate,
} from "yinyang-sdk/utils";

import Context from "./Context";
import { getAllowance, getBalance } from "utils";
import { useToast } from "hooks/useToast";
import { Farm, Share } from "./types";

import gardenFarmsConfigV1 from "config/gardenFarmsV1";
import yinFarmsConfigV1 from "config/yinFarmsV1";
import yangFarmsConfigV1 from "config/yangFarmsV1";
import gardenFarmsConfigV2 from "config/gardenFarmsV2";
import yinFarmsConfigV2 from "config/yinFarmsV2";
import yangFarmsConfigV2 from "config/yangFarmsV2";
import _addresses from "constants/tokenAddresses";
import useVersion from "hooks/useVersion";

const Provider: React.FC = ({ children }) => {
  const yinyang = useYinYang();
  const { usingV2 } = useVersion();
  const { v1, v2 } = _addresses;

  interface Config {
    init: Farm[];
    contract: any;
    address: string;
  }
  const [configs, setConfigs] = useState<{
    yinDistributor: Config;
    yangDistributor: Config;
    zenGarden: Config;
    peaceMaster: Config;
  }>();

  useEffect(() => {
    let tmp1: any = {};
    let tmp2: any = {};
    let tmp3: any = {};
    let tmp4: any = {};
    if (usingV2) {
      tmp1.address = v2.yinDistributor;
      tmp2.address = v2.yangDistributor;
      tmp3.address = v2.zenGarden;
      tmp4.address = v2.peaceMaster;
      tmp3.init = gardenFarmsConfigV2;
      tmp1.init = yinFarmsConfigV2;
      tmp2.init = yangFarmsConfigV2;
      tmp1.contract = yinyang?.contracts?.yinDistributorV2;
      tmp2.contract = yinyang?.contracts?.yangDistributorV2;
      tmp3.contract = yinyang?.contracts?.zenGardenV2;
      tmp4.contract = yinyang?.contracts?.peaceMasterV2;
    } else {
      tmp1.address = v1.yinDistributor;
      tmp2.address = v1.yangDistributor;
      tmp3.address = v1.zenGarden;
      tmp4.address = v1.peaceMaster;
      tmp3.init = gardenFarmsConfigV1;
      tmp1.init = yinFarmsConfigV1;
      tmp2.init = yangFarmsConfigV1;
      tmp1.contract = yinyang?.contracts?.yinDistributorV1;
      tmp2.contract = yinyang?.contracts?.yangDistributorV1;
      tmp3.contract = yinyang?.contracts?.zenGardenV1;
      tmp4.contract = yinyang?.contracts?.peaceMasterV1;
    }
    setConfigs({
      yinDistributor: tmp1,
      yangDistributor: tmp2,
      zenGarden: tmp3,
      peaceMaster: tmp4,
    });
    if (!yinyang) {
      setGardenFarms(tmp3.init);
      setYinFarms(tmp1.init);
      setYangFarms(tmp2.init);
    } else {
      setGardenFarms([]);
      setYinFarms([]);
      setYangFarms([]);
    }
  }, [usingV2, v1, v2, yinyang]);

  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false);
  const [startTime] = useState<Date>(new Date("2021-04-24T09:30:00.00z"));
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [isHarvestable, setIsHarvestable] = useState(false);
  const [isStaking, setIsStaking] = useState(false);
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [missingUpdates, setMissingUpdates] = useState<number>();
  const [pendingShares, setPendingShares] = useState<Share[]>();
  const [gardenFarms, setGardenFarms] = useState<Farm[]>(
    configs?.zenGarden.init || []
  );
  const [yinFarms, setYinFarms] = useState<Farm[]>(
    configs?.yinDistributor.init || []
  );
  const [yangFarms, setYangFarms] = useState<Farm[]>(
    configs?.yangDistributor.init || []
  );

  const {
    account,
    ethereum,
  }: { account: string | null; ethereum: provider } = useWallet();
  const toast = useToast();

  const fetchHarvestable = useCallback(async () => {
    if (!account || !yinyang || !configs?.peaceMaster.contract) return;
    const h: boolean = await harvestable(configs.peaceMaster.contract);
    setIsHarvestable(h);
  }, [account, setIsHarvestable, configs, yinyang]);

  const fetchPendingShare = useCallback(async () => {
    if (!account || !yinyang || !configs?.peaceMaster.contract) return;
    const shares = await getPendingShares(
      configs.peaceMaster.contract,
      account
    );
    setPendingShares(shares);
  }, [account, configs, yinyang]);

  const fetchMissingUpdates = useCallback(async () => {
    if (!account || !yinyang || !configs?.peaceMaster.contract) return;
    const missed = await getMissingUpdates(
      configs.peaceMaster.contract,
      account
    );
    setMissingUpdates(missed);
  }, [account, configs, yinyang]);

  const fetchGardenFarms = useCallback(async () => {
    if (!configs?.zenGarden) return;
    let farms = configs.zenGarden.init;
    let i = 0;
    for (let f of configs?.zenGarden.init) {
      const lpAddress = (f.lpAddresses as any)[
        process.env.REACT_APP_CHAIN_ID || 56
      ];

      try {
        const liquidity = (
          await getBalance(ethereum, lpAddress, configs.zenGarden.address)
        ).div(new BigNumber(10).pow(18));

        let userData;
        if (account) {
          const earnings = await getEarned(
            configs.zenGarden.contract,
            f.pid,
            account
          );
          const stakedBalance = await getStaked(
            configs.zenGarden.contract,
            f.pid,
            account
          );
          const tokenBalance = await getBalance(ethereum, lpAddress, account);
          const allowance = await getAllowance(
            account,
            configs.zenGarden.address,
            lpAddress,
            ethereum
          );
          userData = {
            earnings: earnings,
            stakedBalance: stakedBalance,
            tokenBalance: tokenBalance,
            allowance: allowance,
          };
        }
        farms[i] = {
          ...f,
          contract: configs.zenGarden.contract,
          liquidity: liquidity,
          rewardRate: new BigNumber(1),
          userData: userData,
        };
      } catch (err) {
        console.log(err);
      }
      setGardenFarms(farms);
      i += 1;
    }
  }, [account, setGardenFarms, configs, ethereum]);

  const fetchYinFarms = useCallback(async () => {
    if (
      !yinyang ||
      !configs?.yinDistributor ||
      !configs?.yinDistributor.contract
    )
      return;

    let farms = configs.yinDistributor.init;
    let i = 0;
    for (let f of configs?.yinDistributor.init) {
      const lpAddress = (f.lpAddresses as any)[
        process.env.REACT_APP_CHAIN_ID || 56
      ];

      const number = await yinyang.web3.eth.getBlockNumber();

      try {
        const liquidity = (
          await getBalance(ethereum, lpAddress, configs.yinDistributor.address)
        ).div(new BigNumber(10).pow(18));
        const rewardRate = await getRewardRate(
          configs.yinDistributor.contract,
          number
        );

        let userData;
        if (account) {
          const earnings = await getEarned(
            configs.yinDistributor.contract,
            f.pid,
            account
          );
          const stakedBalance = await getStaked(
            configs.yinDistributor.contract,
            f.pid,
            account
          );
          const tokenBalance = await getBalance(ethereum, lpAddress, account);
          const allowance = await getAllowance(
            account,
            configs.yinDistributor.address,
            lpAddress,
            ethereum
          );
          userData = {
            earnings: earnings,
            stakedBalance: stakedBalance,
            tokenBalance: tokenBalance,
            allowance: allowance,
          };
        }
        farms[i] = {
          ...f,
          contract: configs.yinDistributor.contract,
          liquidity: liquidity,
          rewardRate: rewardRate,
          userData: userData,
        };
      } catch (err) {
        console.log(err);
      }
      setYinFarms(farms);
      i += 1;
    }
  }, [account, setYinFarms, yinyang, configs, ethereum]);

  const fetchYangFarms = useCallback(async () => {
    if (
      !yinyang ||
      !configs?.yangDistributor ||
      !configs?.yangDistributor.contract
    )
      return;

    let farms = configs.yangDistributor.init;
    let i = 0;
    for (let f of configs?.yangDistributor.init) {
      const lpAddress = (f.lpAddresses as any)[
        process.env.REACT_APP_CHAIN_ID || 56
      ];

      const number = await yinyang.web3.eth.getBlockNumber();

      try {
        const liquidity = (
          await getBalance(ethereum, lpAddress, configs.yangDistributor.address)
        ).div(new BigNumber(10).pow(18));
        const rewardRate = await getRewardRate(
          configs.yangDistributor.contract,
          number
        );

        let userData;
        if (account) {
          const earnings = await getEarned(
            configs.yangDistributor.contract,
            f.pid,
            account
          );
          const stakedBalance = await getStaked(
            configs.yangDistributor.contract,
            f.pid,
            account
          );
          const tokenBalance = await getBalance(ethereum, lpAddress, account);
          const allowance = await getAllowance(
            account,
            configs.yangDistributor.address,
            lpAddress,
            ethereum
          );
          userData = {
            earnings: earnings,
            stakedBalance: stakedBalance,
            tokenBalance: tokenBalance,
            allowance: allowance,
          };
        }
        farms[i] = {
          ...f,
          contract: configs.yangDistributor.contract,
          liquidity: liquidity,
          rewardRate: rewardRate,
          userData: userData,
        };
      } catch (err) {
        console.log(err);
      }
      setYangFarms(farms);
      i += 1;
    }
  }, [account, setYangFarms, yinyang, configs, ethereum]);

  const fetchBalances = useCallback(async () => {
    fetchHarvestable();
    fetchMissingUpdates();
    fetchPendingShare();
    fetchGardenFarms();
    fetchYinFarms();
    fetchYangFarms();
  }, [
    fetchHarvestable,
    fetchMissingUpdates,
    fetchPendingShare,
    fetchGardenFarms,
    fetchYinFarms,
    fetchYangFarms,
  ]);

  const handleUpdateAccount = useCallback(async () => {
    if (!configs?.peaceMaster) return;
    setConfirmTxModalIsOpen(true);
    try {
      await updateUserAccount(configs.peaceMaster.contract, account, () => {
        setConfirmTxModalIsOpen(false);
        setIsHarvesting(true);
      });
      await fetchPendingShare();
      toast.success("Account up to date");
    } finally {
      setIsHarvesting(false);
    }
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsHarvesting,
    fetchPendingShare,
    configs,
    toast,
  ]);

  const harvestEpochTokens = useCallback(async () => {
    if (!account || !configs?.peaceMaster) return;
    setConfirmTxModalIsOpen(true);
    try {
      await harvestTokens(configs.peaceMaster.contract, account, () => {
        setConfirmTxModalIsOpen(false);
        setIsHarvesting(true);
      });
      toast.success("Harvested epoch");
    } finally {
      setIsHarvesting(false);
    }
  }, [account, configs, toast]);

  const handleHarvestToken = useCallback(async () => {
    if (!account || !configs?.peaceMaster) return;
    setConfirmTxModalIsOpen(true);
    try {
      await claimToken(configs.peaceMaster.contract, account, () => {
        setConfirmTxModalIsOpen(false);
        setIsHarvesting(true);
      });
      toast.success("Tokens claimed");
    } finally {
      setIsHarvesting(false);
    }
    setIsHarvesting(false);
  }, [account, setConfirmTxModalIsOpen, setIsHarvesting, configs, toast]);

  const handleHarvest = useCallback(
    async (contract: any, pid: number, name?: string) => {
      if (!yinyang) return;
      setConfirmTxModalIsOpen(true);
      try {
        await harvest(contract, account, pid, () => {
          setConfirmTxModalIsOpen(false);
          setIsHarvesting(true);
        });
        toast.success("Harvested " + name);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsHarvesting(false);
      }
      setConfirmTxModalIsOpen(false);
    },
    [account, setConfirmTxModalIsOpen, setIsHarvesting, yinyang, toast]
  );

  const handleHarvestAllGenesis = useCallback(async () => {
    if (!yinyang || !yinFarms || !yangFarms) return;
    for (const e of yinFarms) {
      if ((e.userData?.earnings || 0) > 0) {
        handleHarvest(configs?.yinDistributor.contract, e.pid, e.token.symbol);
      }
    }
    for (const e of yangFarms) {
      if ((e.userData?.earnings || 0) > 0) {
        handleHarvest(configs?.yangDistributor.contract, e.pid, e.token.symbol);
      }
    }
  }, [handleHarvest, configs, yinyang, yinFarms, yangFarms]);

  const handleHarvestAllGarden = useCallback(async () => {
    if (!yinyang || !gardenFarms) return;
    for (const e of gardenFarms) {
      if ((e.userData?.earnings || 0) > 0) {
        handleHarvest(configs?.zenGarden.contract, e.pid, e.token.symbol);
      }
    }
  }, [handleHarvest, configs, yinyang, gardenFarms]);

  const handleStake = useCallback(
    async (contract: any, pid: number, amount: string, name?: string) => {
      if (!contract) return;
      setConfirmTxModalIsOpen(true);
      try {
        await stake(contract, amount, account, pid, () => {
          setConfirmTxModalIsOpen(false);
          setIsStaking(true);
        });
        setIsStaking(false);
        toast.success("Staked " + name);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsUnstaking(false);
      }
      setConfirmTxModalIsOpen(false);
    },
    [account, setConfirmTxModalIsOpen, setIsStaking, toast]
  );

  const handleUnstake = useCallback(
    async (contract: any, pid: number, amount: string, name?: string) => {
      if (!yinyang) return;
      setConfirmTxModalIsOpen(true);
      try {
        await unstake(contract, amount, account, pid, () => {
          setConfirmTxModalIsOpen(false);
          setIsUnstaking(true);
        });
        toast.success("Unstaked " + name);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsUnstaking(false);
      }
      setConfirmTxModalIsOpen(false);
    },
    [account, setConfirmTxModalIsOpen, setIsUnstaking, yinyang, toast]
  );

  useEffect(() => {
    fetchBalances();
    let refreshInterval = setInterval(() => fetchBalances(), 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchBalances]);

  return (
    <Context.Provider
      value={{
        startTime,
        isHarvesting,
        isHarvestable,
        isStaking,
        isUnstaking,
        harvestEpochTokens,
        onUpdateAccount: handleUpdateAccount,
        onHarvestToken: handleHarvestToken,
        onHarvest: handleHarvest,
        onHarvestAllGenesis: handleHarvestAllGenesis,
        onHarvestAllGarden: handleHarvestAllGarden,
        onStake: handleStake,
        onUnstake: handleUnstake,
        missingUpdates,
        pendingShares,
        gardenFarms,
        yinFarms,
        yangFarms,
      }}
    >
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  );
};

export default Provider;
