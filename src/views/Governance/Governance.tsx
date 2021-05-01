import React, { useCallback, useState } from "react";
import {
  Spacer,
  Card,
  CardTitle,
  CardContent,
  Separator,
  Surface,
  Button,
} from "react-neu";
import Countdown, { CountdownRenderProps } from "react-countdown";
import styled from "styled-components";

import Page from "components/Page";
import PageHeader from "components/PageHeader";

import SeparatorGrid from "./components/SeparatorWithCSS";
import Box from "./components/BoxWithDisplay";
import Label from "components/Label";

import useGovernance from "hooks/useGovernance";

import {
  ProposalEntry,
  StyledProposalContentInner,
} from "./components/Proposal";
import AddressInput from "components/AddressInput";
import VoteModal from "./components/VoteModal";
import HarvestReadyNotice from "./components/HarvestReadyNotice";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { NULL_ADDR } from "constants/tokenAddresses";
import VoterStats from "./components/VoterStats";
import BrokenNotice from "./components/BrokenNotice";
import useVersion from "hooks/useVersion";
import useFarming from "hooks/useFarming";

const Governance: React.FC = () => {
  const { usingV2 } = useVersion();
  const { account } = useWallet();
  const {
    proposals,
    userVote,
    epochStart,
    epochEnd,
    currentToken,
  } = useGovernance();
  const { pendingShares } = useFarming();

  const [voteAddress, setVoteAddress] = useState("");
  const [voteModalIsOpen, setVoteModalIsOpen] = useState(false);

  const addressPattern = /^0x[a-fA-F0-9]{40}$/i;

  const totalVoices = proposals
    ?.map((e) => e.voices)
    .reduce((old, current) => old + current);
  const totalShares = proposals
    ?.map((e) => e.shares)
    .reduce((old, current) => old + current);
  const filteredProposals = proposals.map((e) => {
    return {
      ...e,
      totalVoices: totalVoices,
      totalShares: totalShares,
    };
  });

  const votedForLastEpoch =
    epochStart?.valueOf() === (userVote?.epoch.valueOf() || 0);

  const handleDismissVoteModal = useCallback(() => {
    setVoteModalIsOpen(false);
  }, [setVoteModalIsOpen]);

  const handleVoteClick = useCallback(() => {
    setVoteModalIsOpen(true);
  }, [setVoteModalIsOpen]);

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const paddedHours = hours < 10 ? `0${hours}` : hours;
    const paddedDays = days < 10 ? `0${days}` : days;
    return (
      <Box row justifyContent="center">
        <StyledDescriptionMain>
          {`Next epoch starts in ${paddedDays}:${paddedHours}:${paddedMinutes}:${paddedSeconds}`}
        </StyledDescriptionMain>
      </Box>
    );
  };

  return (
    <Page>
      <PageHeader icon={`🧭`} subtitle="Vote on tokens below!" title="Govern" />
      {(epochEnd?.valueOf() || 0) > new Date().valueOf() && (
        <Countdown date={epochEnd} renderer={renderer} />
      )}
      <Box column maxWidth="90%">
        {!usingV2 && <BrokenNotice />}
        <Spacer />
        {votedForLastEpoch &&
          (currentToken?.address || NULL_ADDR) !== NULL_ADDR &&
          (pendingShares?.length || -1) > 0 && <HarvestReadyNotice />}
        <VoterStats />
        <Spacer />
        <Card>
          <CardTitle text="Proposed tokens" />
          <Spacer size="sm" />
          <CardContent>
            <Box
              display="grid"
              alignItems="center"
              paddingLeft={4}
              paddingRight={4}
              paddingBottom={1}
              row
            >
              <StyledProposalContentInner>
                <SeparatorGrid
                  orientation={"vertical"}
                  stretch={true}
                  gridArea={"spacer0"}
                />
                <StyledDescriptionMain>Token name</StyledDescriptionMain>
                <SeparatorGrid
                  orientation={"vertical"}
                  stretch={true}
                  gridArea={"spacer1"}
                />
                <StyledStateMain>Voices</StyledStateMain>
                <SeparatorGrid
                  orientation={"vertical"}
                  stretch={true}
                  gridArea={"spacer2"}
                />
                <StyledButtonMain>Action</StyledButtonMain>
              </StyledProposalContentInner>
            </Box>
            <Spacer size="sm" />
            {filteredProposals && (
              <Surface>
                {filteredProposals.map((prop, i) => {
                  if (i === 0) {
                    return <ProposalEntry key={prop.token} prop={prop} />;
                  } else {
                    return [
                      <Separator key={prop.token + "1"} />,
                      <ProposalEntry key={prop.token} prop={prop} />,
                    ];
                  }
                })}
              </Surface>
            )}
          </CardContent>
        </Card>
        <Spacer size="md" />
        <Card>
          <CardTitle text="Propose another token" />
          <CardContent>
            <Label
              text="Input the address of the contract you want to vote for here"
              labelPosition="center"
            />
            <AddressInput
              value={voteAddress}
              onChange={(e: any) => setVoteAddress(e.target.value)}
            />
            <Spacer />
            <Button
              disabled={
                (voteAddress?.search(addressPattern) || 0) < 0 || !account
              }
              text="Vote"
              variant="secondary"
              onClick={handleVoteClick}
            />
          </CardContent>
        </Card>
        <Spacer />
        {voteModalIsOpen && (
          <VoteModal
            prop={{
              token: voteAddress,
              voices: 0,
              shares: 0,
              totalVoices:
                proposals && proposals.length > 0
                  ? proposals[0].totalVoices
                  : 0,
              totalShares:
                proposals && proposals.length > 0
                  ? proposals[0].totalShares
                  : 0,
            }}
            isOpen={voteModalIsOpen}
            onDismiss={handleDismissVoteModal}
          />
        )}
        <Button
          text="Check votes history"
          variant="default"
          to="/history"
          full
        />
        <Spacer size="lg" />
      </Box>
    </Page>
  );
};

export const StyledButtonMain = styled.div`
  font-weight: 600;
  display: grid;
  grid-area: vote;
  margin-left: 10px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledDescriptionMain = styled.span`
  font-weight: 600;
  display: grid;
  grid-area: desc;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledStateMain = styled.span`
  font-weight: 600;
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: state;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export default Governance;
