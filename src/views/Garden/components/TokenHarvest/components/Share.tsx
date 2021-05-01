import React, { Fragment } from "react";
import { Box } from "react-neu";

import useToken from "hooks/useToken";

import styled from "styled-components";
import { Share } from "contexts/Farming/types";
import Split from "components/Split";

interface ProposalProps {
  share: Share;
}

export const ShareEntry: React.FC<ProposalProps> = ({ share }) => {
  const { name } = useToken(share.token);

  return (
    <Fragment>
      <Box justifyContent="center" padding={4} row>
        <Split>
          <Box row justifyContent="space-between">
            <StyledDescription>
              <b>{name || share.token}</b>
            </StyledDescription>
          
          <StyledState>{share.amount.toPrecision(5)}</StyledState>
          </Box>
        </Split>
      </Box>
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
