import React from "react";
import { Box, useTheme } from "react-neu";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import FarmIcon from "./FarmIcon";

export interface ExpandableSectionProps {
  lpLabel?: string;
  multiplier?: string;
  farmImage: string;
  tokenSymbol?: string;
}

const Wrapper = styled(Box)`
  margin: 8px 8px;
  svg {
    margin-right: 4px;
  }
`;

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  farmImage,
  tokenSymbol,
}) => {
  const { darkMode, colors } = useTheme();

  let labelColor: string;
  let borderColor: string;
  let backgroundColor: string;
  if (darkMode) {
    labelColor = colors.primary.main;
    borderColor = colors.primary.main;
    backgroundColor = colors.grey[800];
  } else {
    labelColor = colors.grey[600];
    borderColor = colors.grey[600];
    backgroundColor = colors.grey[400];
  }

  return (
    <Wrapper justifyContent="space-between" alignItems="center">
      <Box column alignItems="flex-end">
        <ValueHint data-tip={"Reward multiplier"}>{multiplier || "x1"}</ValueHint>
        <ReactTooltip
          place="top"
          type="light"
          effect="solid"
          className="tooltip"
          textColor={labelColor}
          borderColor={borderColor}
          backgroundColor={backgroundColor}
          border={true}
        />
      </Box>
      <FarmIcon poolName={farmImage} />
    </Wrapper>
  );
};

interface ValueHintProps {
  darkMode?: boolean;
}

const ValueHint = styled.span<ValueHintProps>`
  cursor: default;
  display: block;
  position: relative;
  right: 16px;
  background: #ae0e463b;
  color: ${(props) => props.theme.colors.primary.main};
  line-height: 16px;
  font-weight: bold;
  font-size: 12px;
  border: 2px solid ${(props) => props.theme.colors.primary.main};
  border-radius: 100px;
  padding: 0px 5px 1px 5px;
  opacity: 0.4;

  &:hover {
    opacity: 1;
    z-index: 10;
  }
`;

export default CardHeading;
