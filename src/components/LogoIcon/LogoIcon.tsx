import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Box } from "react-neu";

import yinLogo from "assets/yin.png"
import yangLogo from "assets/yang.png"
import zenLogo from "assets/zen.png"

export interface LogoIconContext {
  yin?: boolean;
  yang?: boolean;
  zen?: boolean;
  text?: boolean;
  size?: number;
}

const LogoIcon: React.FC<LogoIconContext> = ({ yin, yang, zen, text, size }) => {
  return (
      <Box column alignItems="center">
        <StyledLogo to="/">
        {!yin && !yang && !zen && (
            <span
            role="img"
            style={{ transform: "rotate(90deg)", fontSize: "24px" }}
            >
            ☯
            </span>
        )}
        {yin && <StyledIcon src={yinLogo} size={size} alt="Yin" />}
        {yang && <StyledIcon src={yangLogo} size={size} alt="Yang" />}
        {zen && <StyledIcon src={zenLogo} size={1.3} alt="Zen" />}
        </StyledLogo>
        {text && (
            <StyledText>
            {!yin && !yang && !zen ? "YinYang" : zen ? "Zen" : !yin ? "Yang" : "Yin"}
            </StyledText>
        )}
    </Box>
  );
};

interface StyledIconProps {
  size?: number;
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`;

const StyledIcon = styled.img<StyledIconProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  max-height: ${(props) => props.size ? (props.size * 50) : "50"}px;
  max-width: ${(props) => props.size ? (props.size * 50) : "50"}px;
`;

const StyledText = styled.span`
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 700;
  margin-left: ${(props) => props.theme.spacing[2]}px;
  @media (max-width: 400px) {
    display: none;
  }
`;

export default LogoIcon;
