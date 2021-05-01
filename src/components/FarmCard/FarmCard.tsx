import React, { useMemo, useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";
import numeral from "numeral";
import styled from "styled-components";
//import { communityFarms } from 'config/constants'
import { Farm } from "contexts/Farming/types";
import DetailsSection from "./components/DetailsSection";
import { Box, Button, Card, CardTitle, Separator, Spacer } from "react-neu";
import CardHeading from "./components/CardHeading";
import CardActionsContainer from "./components/CardActionsContainer";
import Split from "components/Split";
import usePrices from "hooks/usePrices";
import { getFarmApy } from "utils";
import Label from "components/Label";
import useVersion from "hooks/useVersion";
import addresses from "constants/tokenAddresses";
import Loader from "components/Loader";

interface FarmCardProps {
  farm: Farm;
  account?: string;
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, account }) => {
  const { usingV2 } = useVersion();
  const [yin, setYin] = useState<string>();
  const [yang, setYang] = useState<string>();
  const [zen, setZen] = useState<string>();

  useEffect(() => {
    const { v1, v2 } = addresses;
    if (usingV2) {
      setYin(v2.yin);
      setYang(v2.yang);
      setZen(v2.zen);
    } else {
      setYin(v1.yin);
      setYang(v1.yang);
      setZen(v1.zen);
    }
  }, [usingV2]);

  const { prices } = usePrices();
  const [showExpandableSection, setShowExpandableSection] = useState(false);

  //const isCommunityFarm = communityFarms.includes(farm.token.symbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  let farmImage;
  if (farm.lpSymbol.includes(" LP")) {
    farmImage = farm.lpSymbol.replace(" LP", "").toLocaleLowerCase();
  } else {
    farmImage = farm.lpSymbol.toLocaleLowerCase();
  }

  let price = 0;
  switch (farm.lpSymbol) {
    case "YIN V1":
      price = prices.yinV1 || 1;
      break;
    case "YANG V1":
      price = prices.yangV1 || 1;
      break;
    default:
      price = prices[farm.lpSymbol.split(" ")[0].toLowerCase()] || 0;
  }
  const totalValueFormatted =
    "$" +
    (farm.liquidity
      ? numeral(farm?.liquidity.times(price).toString()).format("0.00a")
      : "-");

  const userValueFormatted =
    "$" +
    (farm.userData
      ? numeral(
          farm?.userData.stakedBalance
            .div(new BigNumber(10).pow(farm.token.decimals || 0))
            .times(price)
            .toString()
        ).format("0.00a")
      : "-");

  const lpLabel =
    farm.lpSymbol && farm.lpSymbol.toUpperCase().replace("PANCAKE", "");
  const earnLabel = farm.quoteToken.symbol;

  const farmAPY = useMemo(() => {
    const zero = new BigNumber(0);
    const quote = (farm.quoteToken.address as any)[
      Number(process.env.REACT_APP_CHAIN_ID || "56")
    ];

    if (quote === zen) {
      return getFarmApy(
        new BigNumber(1),
        new BigNumber((farm?.multiplier || 0) / (farm?.totalPoints || 1)),
        new BigNumber(prices.zen || 0),
        farm.liquidity?.times(
          price
        ) || zero
      );
    } else if (quote === yin) {
      return getFarmApy(
        farm.rewardRate || zero,
        new BigNumber((farm?.multiplier || 0) / (farm?.totalPoints || 1)),
        new BigNumber(prices.yin || 0),
        farm.liquidity?.times(
          price
        ) || zero
      );
    } else if (quote === yang) {
      return getFarmApy(
        farm.rewardRate || zero,
        new BigNumber((farm?.multiplier || 0) / (farm?.totalPoints || 1)),
        new BigNumber(prices.yang || 0),
        farm.liquidity?.times(
          price
        ) || zero
      );
    }
  }, [prices, farm, yin, yang, zen, price]);

  const liquidityUrlPathParts = `${farm.quoteToken.address}/${farm.token.address}`;
  const addLiquidityUrl = `https://exchange.pancakeswap.finance/#/add/${liquidityUrlPathParts}`;
  const lpAddress = (farm.lpAddresses as any)[
    process.env.REACT_APP_CHAIN_ID || 56
  ];

  return (
    <StyledCard>
      <CardTitle text={`${farm.lpSymbol} Farm`} />
      <CardHeading
        lpLabel={lpLabel}
        multiplier={"x" + (farm.multiplier?.toString() || "1")}
        farmImage={farmImage}
        tokenSymbol={farm.token.symbol}
      />
      {farm.contract ? (
        <Box
          column
          justifyContent="center"
          alignItems="center"
          minWidth="360px"
        >
          <Split>
            <Box column alignItems="center">
              <StyledAPR>
                APR : <b>{numeral(farmAPY || 0).format("0.00a") + "%"}</b>
              </StyledAPR>
            </Box>
            <Box column alignItems="center">
              <StyledAPR>
                Earn : <b>{earnLabel || ""}</b>
              </StyledAPR>
            </Box>
          </Split>
          {farm.depositFee !== undefined && (
            <>
              <Spacer size="sm" />
              <StyledAPR>
                Deposit fee : <b>{farm.depositFee}%</b>
              </StyledAPR>
            </>
          )}
          <CardActionsContainer
            farm={farm}
            account={account}
            addLiquidityUrl={addLiquidityUrl}
          />
          <Spacer />
          <Box column alignItems="center">
            <Box row justifyContent="space-between" width="100%">
              <Label text={"Your Stake "} />
              <Label text={" / "} />
              <Label text={"Total staked "} />
            </Box>
            <Box row justifyContent="space-between" width="100%">
              <Label text={`${userValueFormatted}`} />
              <Label text={"/"} />
              <Label text={`${totalValueFormatted}`} />
            </Box>
          </Box>
          <Spacer />
          {!showExpandableSection ? (
            <>
              <Button
                variant="tertiary"
                onClick={() => setShowExpandableSection(!showExpandableSection)}
              >
                Details
              </Button>
              <Spacer size="sm" />
            </>
          ) : (
            <>
              <Button
                variant="tertiary"
                onClick={() => setShowExpandableSection(!showExpandableSection)}
              >
                Show less
              </Button>
              <Spacer size="sm" />
              <Separator />
              <DetailsSection
                bscScanAddress={`https://bscscan.com/address/`}
                lpAddress={lpAddress}
                lpLabel={lpLabel}
                addLiquidityUrl={addLiquidityUrl}
                farm={farm}
              />
            </>
          )}
        </Box>
      ) : (
        <Box
          column
          justifyContent="center"
          alignItems="center"
          minWidth="360px"
          marginVertical={30}
          height="100%"
        >
          <Split>
            <Loader />
          </Split>
          <Spacer />
        </Box>
      )}
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  min-width: 600px;
  width: 50%;
  margin: 100px;
  padding: 100px;
`;

const StyledAPR = styled.span`
  font-size: 18px;
`;

export default FarmCard;
