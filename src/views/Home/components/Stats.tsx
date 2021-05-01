import React, { useCallback } from "react";
import styled from "styled-components";
import numeral from "numeral";
import { Box, Card, CardContent, Separator, Spacer, useTheme } from "react-neu";

import FancyValue from "components/FancyValue";

import Split from "components/Split";

import addresses from "constants/tokenAddresses";
import useToken from "hooks/useToken";
import LogoIcon from "components/LogoIcon";
import usePrices from "hooks/usePrices";
import useVersion from "hooks/useVersion";

const Stats: React.FC = () => {
  const { usingV2 } = useVersion();
  const { prices } = usePrices();
  const { busd, wbnb, bdo, soup, v1, v2 } = addresses;
  let yin: string, yang: string, zen: string;
  let yinPrice: number, yangPrice: number, zenPrice: number;
  if (usingV2) {
    yin = v2.yin;
    yang = v2.yang;
    zen = v2.zen;
    yinPrice = prices.yin || 0;
    yangPrice = prices.yang || 0;
    zenPrice = prices.zen || 0;
  } else {
    yin = v1.yin;
    yang = v1.yang;
    zen = v1.zenSoupLP;
    yinPrice = prices.yinV1 || 0;
    yangPrice = prices.yangV1 || 0;
    zenPrice = prices.zenV1 || 0;
  }

  const { darkMode } = useTheme();

  const yinSupply = useToken(yin).totalSupply?.toNumber();
  const yangSupply = useToken(yang).totalSupply?.toNumber();
  const zenSupply = useToken(zen).totalSupply?.toNumber();

  const getDisplayBalance = useCallback((value?: number) => {
    if (value) {
      return numeral(value).format("0.00a");
    } else {
      return "--";
    }
  }, []);

  return (
    <Split>
      <Box column>
        <Card>
          <CardContent>
            <LogoIcon yin text />
            <Spacer />
            <Separator />
            <Spacer />
            <FancyValue
              wrap
              label={"Price"}
              value={getDisplayBalance(yinPrice || 0) + (yinPrice ? "$" : "")}
            />
            <Spacer />
            <FancyValue
              wrap
              label={"Circulating supply"}
              value={getDisplayBalance(yinSupply)}
            />
            <Spacer />
            <StyledLink
              darkMode={darkMode}
              href={`https://${
                usingV2 ? "" : "v1"
              }exchange.pancakeswap.finance/#/swap?inputCurrency=${
                usingV2 ? busd.toLowerCase() : bdo.toLowerCase()
              }&outputCurrency=${yin.toLowerCase()}`}
              target="_blank"
              color="white"
              overflow="true"
            >
              <StyledYinButton darkMode={darkMode}>
                <StyledSpan>
                  <span>Buy Yin</span>
                </StyledSpan>
              </StyledYinButton>
            </StyledLink>
          </CardContent>
        </Card>
      </Box>
      <Box column>
        <Card>
          <CardContent>
            <LogoIcon yang text />
            <Spacer />
            <Separator />
            <Spacer />
            <FancyValue
              wrap
              label={"Price"}
              value={getDisplayBalance(yangPrice) + (yangPrice ? "$" : "")}
            />
            <Spacer />
            <FancyValue
              wrap
              label={"Circulating supply"}
              value={getDisplayBalance(yangSupply)}
            />
            <Spacer />
            <StyledLink
              darkMode={darkMode}
              href={`https://${
                usingV2 ? "" : "v1"
              }exchange.pancakeswap.finance/#/swap?inputCurrency=${
                usingV2 ? wbnb.toLowerCase : soup.toLowerCase()
              }&outputCurrency=${yang.toLowerCase()}`}
              target="_blank"
              color="white"
              overflow="true"
            >
              <StyledYangButton darkMode={darkMode}>
                <StyledSpan>
                  <span>Buy Yang</span>
                </StyledSpan>
              </StyledYangButton>
            </StyledLink>
          </CardContent>
        </Card>
      </Box>
      <Box column>
        <Card>
          <CardContent>
            <LogoIcon zen text />
            <Spacer />
            <Separator />
            <Spacer />
            <FancyValue
              wrap
              label={"Price"}
              value={getDisplayBalance(zenPrice) + (zenPrice ? "$" : "")}
            />
            <Spacer />
            <FancyValue
              wrap
              label={"Circulating supply"}
              value={getDisplayBalance(zenSupply)}
            />
            <Spacer />
            <StyledLink
              darkMode={darkMode}
              href={`https://${
                usingV2 ? "" : "v1"
              }exchange.pancakeswap.finance/#/swap?inputCurrency=${
                usingV2 ? wbnb.toLowerCase : soup.toLowerCase()
              }&outputCurrency=${zen.toLowerCase()}`}
              target="_blank"
              color="white"
              overflow="true"
            >
              <StyledZenButton darkMode={darkMode}>
                <StyledSpan>
                  <span>Buy Zen</span>
                </StyledSpan>
              </StyledZenButton>
            </StyledLink>
          </CardContent>
        </Card>
      </Box>
    </Split>
  );
};

interface StyledButtonProps {
  to?: string;
  darkMode?: boolean;
  uniswap?: boolean;
}

interface StyledLinkProps {
  darkMode?: boolean;
  color?: string;
  overflow?: string;
}

const StyledButton = styled.div<StyledButtonProps>`
  background: ${(props) =>
    props.darkMode
      ? "radial-gradient(circle at top,hsl(339deg 17% 15% / 100%),hsl(339deg 20% 10% / 100%))"
      : "radial-gradient(circle at top,hsl(338deg 20% 96% / 100%),hsl(338deg 20% 94% / 100%))"};
  box-shadow: ${(props) =>
    props.darkMode
      ? "-8px 8px 16px 0 hsl(339deg 20% 5% / 100%), 8px -8px 16px 0px hsl(339deg 100% 100% / 7.5%)"
      : "-8px 8px 16px 0 hsl(338deg 95% 4% / 15%), 8px -8px 16px 0px hsl(338deg 100% 100% / 100%);"};
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border: 0;
  border-radius: 28px;
  box-sizing: border-box;
  color: hsl(339deg 89% 49% / 100%);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  font-size: 16px;
  font-weight: 700;
  height: 48px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0;
  outline: none;
  padding-left: 24px;
  padding-right: 24px;
  white-space: nowrap;
  line-height: 50px;
  min-width: 48px;
  width: ${(props) => (!props.uniswap ? "-webkit-fill-available" : null)};
`;

const StyledYinButton = styled(StyledButton)`
  border-radius: 9px;
  color: #ffffff;
  background: radial-gradient(
      174.47% 188.91% at 1.84% 10%,
      rgb(255, 0, 122) 0%,
      rgb(6 44 97) 80%
    ),
    rgb(237, 238, 242);
  min-width: 152px;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledYangButton = styled(StyledButton)`
  border-radius: 9px;
  color: #ffffff;
  background: radial-gradient(
      174.47% 188.91% at 1.84% 10%,
      rgb(255, 0, 122) 0%,
      rgb(6 44 97) 80%
    ),
    rgb(237, 238, 242);
  min-width: 152px;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledZenButton = styled(StyledButton)`
  border-radius: 9px;
  color: #ffffff;
  background: radial-gradient(
      174.47% 188.91% at 1.84% 10%,
      rgb(255, 0, 122) 0%,
      rgb(6 44 97) 80%
    ),
    rgb(237, 238, 242);
  min-width: 152px;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledSpan = styled.span`
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledLink = styled.a<StyledLinkProps>`
  cursor: pointer;
  color: ${(props) => (props.color ? props.color : "white")};
  overflow: ${(props) => (props.overflow === "true" ? "initial" : "hidden")};
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px 5px;
  &:hover {
    color: ${(props) =>
      !props.darkMode
        ? props.color
          ? props.theme.colors.grey[400]
          : "white"
        : "white"};
  }
`;

export default Stats;
