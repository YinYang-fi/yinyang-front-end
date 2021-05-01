import React, { useCallback, useEffect, useState } from "react";

import BigNumber from "bignumber.js";
import { useWallet } from "@binance-chain/bsc-use-wallet";

import useYinYang from "hooks/useYinYang";
import {
  getProposals,
  vote,
  getUserVote,
  getCurrentToken,
  getPeriod,
  getCurrentEpoch,
  getHistory,
} from "yinyang-sdk/utils";

import Context from "./Context";

import { Proposal, Vote, Token } from "./types";
import { useToast } from "hooks/useToast";
import ConfirmTransactionModal from "components/ConfirmTransactionModal";
import useVersion from "hooks/useVersion";

const Provider: React.FC = ({ children }) => {
  const { usingV2 } = useVersion();
  const { account } = useWallet();
  const yinyang = useYinYang();
  const toast = useToast();

  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [currentToken, setCurrentToken] = useState<Token>();
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      token: "0x0000000000000000000000000000000000000000",
      voices: 0,
      shares: 0,
    },
  ]);
  const [userVote, setUserVote] = useState<Vote>();
  const [history, setHistory] = useState<Vote[]>();
  const [epochStart, setEpochStart] = useState<Date>();
  const [epochEnd, setEpochEnd] = useState<Date>();
  const [peaceMaster, setPeaceMaster] = useState<any>();

  useEffect(() => {
    if (yinyang) {
      if (usingV2) {
        setPeaceMaster(yinyang?.contracts.peaceMasterV2);
      } else {
        setPeaceMaster(yinyang?.contracts.peaceMasterV1);
      }
    }
  }, [usingV2, yinyang]);

  const fetchCurrentToken = useCallback(async () => {
    if (!peaceMaster) return;

    let token: Token = await getCurrentToken(peaceMaster);
    setCurrentToken(token);
  }, [setCurrentToken, peaceMaster]);

  const fetchProposals = useCallback(async () => {
    if (!yinyang || !peaceMaster) return;
    let props: any[] = await getProposals(peaceMaster);
    const totalVoices = props
      .map((e) => e.voices)
      .reduce((old, current) => old + current);
    const totalShares = props
      .map((e) => e.shares)
      .reduce((old, current) => old + current);
    props = props.sort((a, b) => {
      if (a.voices < b.voices) return -1;
      else if (a.voices > b.voices) return 1;
      else return 0;
    });
    setProposals(
      props.map((e) => {
        return {
          ...e,
          totalVoices,
          totalShares,
        };
      })
    );
  }, [setProposals, yinyang, peaceMaster]);

  const fetchUserVote = useCallback(async () => {
    if (!yinyang || !account || !peaceMaster) return;
    try {
      let vote: Vote = await getUserVote(peaceMaster, usingV2, account);
      setUserVote(vote);
    } catch (err) {
      return;
    }
  }, [setUserVote, usingV2, yinyang, account, peaceMaster]);

  const fetchHistory = useCallback(async () => {
    if (!peaceMaster) return;
    let vote: Vote[] = await getHistory(peaceMaster);
    setHistory(vote);
  }, [setHistory, peaceMaster]);

  const fetchCurrentEpoch = useCallback(async () => {
    if (!peaceMaster) return;
    let timestamp: BigNumber = await getCurrentEpoch(peaceMaster);
    let period: BigNumber = await getPeriod(peaceMaster);

    if (timestamp && period) {
      const start = new Date(timestamp.toNumber() * 1000);
      setEpochStart(start);
      setEpochEnd(new Date(timestamp.plus(period).toNumber() * 1000));
    }
  }, [setEpochStart, setEpochEnd, peaceMaster]);

  const handleVote = useCallback(
    async (proposal: string, amount: number) => {
      if (!peaceMaster) return;
      setConfirmTxModalIsOpen(true);
      try {
        await vote(
          peaceMaster,
          proposal,
          new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
          account,
          () => {
            setConfirmTxModalIsOpen(false);
            setIsVoting(true);
          }
        );
        fetchProposals();
        fetchUserVote();
        toast.success("Vote casted");
      } catch (e) {
        toast.error("Vote failed");
      } finally {
        setIsVoting(false);
      }
    },
    [
      account,
      fetchProposals,
      fetchUserVote,
      setConfirmTxModalIsOpen,
      setIsVoting,
      peaceMaster,
      toast,
    ]
  );

  useEffect(() => {
    if (yinyang) {
      fetchCurrentToken();
      fetchProposals();
      fetchUserVote();
      fetchCurrentEpoch();
      fetchHistory();
    }
  }, [
    fetchCurrentToken,
    fetchProposals,
    fetchUserVote,
    fetchCurrentEpoch,
    fetchHistory,
    yinyang,
  ]);

  useEffect(() => {
    if (yinyang) {
      fetchProposals();
      fetchUserVote();
      let refreshInterval = setInterval(fetchProposals, 100000);
      return () => clearInterval(refreshInterval);
    }
  }, [yinyang, fetchProposals, fetchUserVote]);

  return (
    <Context.Provider
      value={{
        currentToken,
        proposals,
        userVote,
        history,
        epochStart,
        epochEnd,
        isVoting,
        onVote: handleVote,
      }}
    >
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  );
};

export default Provider;
