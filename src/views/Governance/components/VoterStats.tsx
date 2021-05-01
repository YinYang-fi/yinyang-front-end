import React, { useEffect, useState } from "react";
import styled from "styled-components";
import numeral from "numeral";

import {
  Card,
  CardContent,
  CardTitle,
} from "react-neu";

import useGovernance from "hooks/useGovernance";

import Split from "components/Split";
import FancyValue from "components/FancyValue";

const VoterStats: React.FC = () => {
  const { proposals } = useGovernance();

  const [voices, setVoices] = useState<number>(0);
  const [shares, setShares] = useState<number>(0);

  useEffect(() => {
    if (proposals.length > 0) {
      setVoices(proposals[0].totalVoices || 0);
      setShares(proposals[0].totalShares || 0);
    }
  }, [setVoices, setShares, proposals]);

  return (
    <Split>
      <Card>
        <CardTitle text="Voices expressed" />
        <CardContent>
          <FancyValue value={numeral(voices.toFixed(4)).format("0.00a")}/>
        </CardContent>
      </Card>
      <Card>
        <CardTitle text="Number of shares" />
        <CardContent>
          <FancyValue value={numeral(shares.toFixed(4)).format("0.00a")}/>
        </CardContent>
      </Card>
    </Split>
  );
};

export interface StyledIconProps {
  size?: number;
}

export const StyledTitle = styled.h2`
  font-weight: 600;
  display: grid;
  grid-area: desc;
  text-align: center;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledIcon = styled.img<StyledIconProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  max-height: ${(props) => (props.size ? props.size * 50 : "50")}px;
  max-width: ${(props) => (props.size ? props.size * 50 : "50")}px;
`;

export const StyledStat = styled.div`
  font-weight: 600;
  display: grid;
  grid-area: desc;
  text-align: center;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export default VoterStats;
