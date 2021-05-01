import React, { Fragment } from "react";
import numeral from "numeral";

import SeparatorGrid from "./SeparatorWithCSS";
import Box from "./BoxWithDisplay";

import useToken from "hooks/useToken";

import styled from "styled-components";
import { Vote } from "../../../contexts/Governance/types";

interface ProposalProps {
  prop: Vote;
}

const NULL_ADDR = "0x0000000000000000000000000000000000000000"

export const ProposalEntry: React.FC<ProposalProps> = ({ prop }) => {
  const { name } = useToken(prop.token);

  return (
    <Fragment>
      <Box display="grid" alignItems="center" padding={4} row>
        <StyledProposalContentInner>
          <StyledDescription>
            {prop.token === NULL_ADDR ? "Skipped epoch" : name}
          </StyledDescription>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer1"} />
          <StyledVoices>{numeral(prop.voices).format("0.00a")}</StyledVoices>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer2"} />
          <StyledShares>{numeral(prop.shares).format("0.00a")}</StyledShares>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer3"} />
          <StyledDate>
            {prop.epoch.toLocaleString()}
          </StyledDate>
        </StyledProposalContentInner>
      </Box>
    </Fragment>
  );
};

export const StyledDescription = styled.span`
  display: grid;
  grid-area: desc;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledVoices = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: voices;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledShares = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: shares;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledDate = styled.div`
  display: grid;
  grid-area: date;
  margin-left: 10px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledProposalContentInner = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 70fr 5px 18fr 5px 18fr 5px 18fr;
  grid-template-areas: "desc spacer1 voices spacer2 shares spacer3 date";
  grid-template-rows: 100fr;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
  }
`;
