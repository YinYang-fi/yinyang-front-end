import { Farm } from "contexts/Farming/types";
import React from "react";
import { Box } from "react-neu";
import styled from "styled-components";

export interface ExpandableSectionProps {
  bscScanAddress: string;
  lpAddress?: string;
  removed?: boolean;
  lpLabel?: string;
  addLiquidityUrl?: string;
  farm?: Farm;
}

const StyledLinkExternal = styled.a`
  font-weight: 400;
`;

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  lpAddress,
  removed,
  lpLabel,
  addLiquidityUrl,
  farm,
}) => {
  return (
    <Box column margin={2} justifyContent="center">
      {!removed && farm?.addLiquidityUrl && (
        <StyledLinkExternal href={farm.addLiquidityUrl}>
          {`Get ${lpLabel}`}
        </StyledLinkExternal>
      )}
      <StyledLinkExternal href={bscScanAddress + lpAddress}>
        {"View Contract"}
      </StyledLinkExternal>
      {farm?.pairAddress && (
        <StyledLinkExternal
          href={"https://pancakeswap.info/pair/" + (farm?.pairAddress || 0)}
        >
          {"See Pair Info"}
        </StyledLinkExternal>
      )}
    </Box>
  );
};

export default DetailsSection;
