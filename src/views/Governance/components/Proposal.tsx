import React, { useCallback, useState, Fragment } from "react";
import numeral from "numeral";
import { Button } from "react-neu";

import SeparatorGrid from "./SeparatorWithCSS";
import Box from "./BoxWithDisplay";

import useToken from "hooks/useToken";
import useGovernance from "hooks/useGovernance";

import styled from "styled-components";
import { Proposal } from "../../../contexts/Governance/types";
import VoteModal from "./VoteModal";

interface ProposalProps {
  prop: Proposal;
}

const NULL_ADDR = "0x0000000000000000000000000000000000000000"

export const ProposalEntry: React.FC<ProposalProps> = ({ prop }) => {
  const { userVote } = useGovernance();
  const { name } = useToken(prop.token);

  const [voteModalIsOpen, setVoteModalIsOpen] = useState(false);

  const handleDismissVoteModal = useCallback(() => {
    setVoteModalIsOpen(false);
  }, [setVoteModalIsOpen]);

  const handleVoteClick = useCallback(() => {
    setVoteModalIsOpen(true);
  }, [setVoteModalIsOpen]);

  return (
    <Fragment>
      <Box display="grid" alignItems="center" padding={4} row>
        <StyledProposalContentInner>
          <Box row >
            {userVote?.token === prop.token && userVote?.voices > 0 && 
            <span role="img" aria-label="voted" title="You voted for this token">🗳️</span>
            }
            <StyledDescription>
              {prop.token === NULL_ADDR ? "Skip this epoch" : <a href={`https://bscscan.com/address/${prop.token}`}>{name}</a>}
            </StyledDescription>
          </Box>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer1"} />
          <StyledState>{numeral(prop.totalVoices ? 100 * prop.voices / (prop.totalVoices || prop.voices) : 100).format("0.00a") + "%"}</StyledState>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer2"} />
          <StyledButton>
            <Button size="sm" onClick={handleVoteClick} text="Vote" variant="tertiary" />
          </StyledButton>
        </StyledProposalContentInner>
      </Box>
      <VoteModal key={prop.token} prop={prop} isOpen={voteModalIsOpen} onDismiss={handleDismissVoteModal}/>
    </Fragment>
  );
};

export const StyledButton = styled.div`
  display: grid;
  grid-area: vote;
  margin-left: 10px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledDescription = styled.span`
  display: grid;
  grid-area: desc;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledState = styled.span`
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

export const StyledProposalContentInner = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 70fr 5px 12fr 5px 18fr;
  grid-template-areas: "desc spacer1 state spacer2 vote";
  grid-template-rows: 100fr;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
  }
`;
