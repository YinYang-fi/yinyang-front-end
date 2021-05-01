import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "react-neu";

import yinLogo from "assets/yin.png";
import yinV1Logo from "assets/yinV1.png";
import yangLogo from "assets/yang.png";
import yangV1Logo from "assets/yangV1.png";
import zenLogo from "assets/zen.png";
import zenV1Logo from "assets/zenV1.png";
import soupLogo from "assets/soup.png";
import bdoLogo from "assets/bdo.png";
import djinnLogo from "assets/djinn.svg";
import bifiLogo from "assets/bifi.png";
import bnbLogo from "assets/wbnb.png";
import busdLogo from "assets/busd.png";
import bonsai from "assets/bonsai.png";

export interface LogoIconContext {
  poolName: string;
}

const setImage = (name: string) => {
  switch (name) {
    case "yin":
      return yinLogo;
    case "yin v1":
      return yinV1Logo;
    case "yang":
      return yangLogo;
    case "yang v1":
      return yangV1Logo;
    case "zen":
      return zenLogo;
    case "zen v1":
      return zenV1Logo;
    case "soup":
      return soupLogo;
    case "djinn":
      return djinnLogo;
    case "bdo":
      return bdoLogo;
    case "bifi":
      return bifiLogo;
    case "wbnb":
      return bnbLogo;
    case "busd":
      return busdLogo;
    default:
      return;
  }
};

const FarmIcon: React.FC<LogoIconContext> = ({ poolName }) => {
  const [tokenA, tokenB] = poolName.split("-");
  const [a, setA] = useState<string>();
  const [b, setB] = useState<string>();

  useEffect(() => {
    setA(setImage(tokenA));
    setB(setImage(tokenB));
  }, [poolName, tokenA, tokenB]);

  return (
    <Box column alignItems="center" minHeight="93px">
      <StyledLogo>
        <StyledIcon src={a} size={1.2} alt={tokenA} />
        {b && (
          <>
            <StyledBonsai src={bonsai} size={1.2} alt="Bonsai" />
            <StyledIcon src={b} size={1.2} alt={tokenB} />
          </>
        )}
      </StyledLogo>
    </Box>
  );
};

interface StyledIconProps {
  size?: number;
}

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  height: 100%;
  min-height: 50px;
  min-width: 50px;
  padding: 0;
  text-decoration: none;
`;

const StyledIcon = styled.img<StyledIconProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  height: 100%;
  max-height: ${(props) => (props.size ? props.size * 50 : "50")}px;
  max-width: ${(props) => (props.size ? props.size * 50 : "50")}px;
`;

const StyledBonsai = styled.img<StyledIconProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  max-height: ${(props) => (props.size ? props.size * 100 : "100")}px;
  max-width: ${(props) => (props.size ? props.size * 100 : "100")}px;
`;

export default FarmIcon;
