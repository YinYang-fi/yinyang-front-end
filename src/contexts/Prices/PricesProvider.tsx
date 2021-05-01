import React, { useCallback, useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";
import useYinYang from "hooks/useYinYang";

import PricesContext from "./PricesContext";

import { Pair, PriceContext } from "./types";
import { getBIFIPrice, getBUSDPrice, getPair, getWBNBPrice } from "yinyang-sdk/utils";
import addresses from "constants/tokenAddresses";

const PricesProvider: React.FC<PriceContext> = ({ children }) => {
  const yinyang = useYinYang();
  const { bdo, soup, wbnb, busd, v1, v2 } = addresses;

  const [yinPrice, setYinPrice] = useState<number>();
  const [yangPrice, setYangPrice] = useState<number>();
  const [zenPrice, setZenPrice] = useState<number>();
  const [yinV2Price, setYinV2Price] = useState<number>();
  const [yangV2Price, setYangV2Price] = useState<number>();
  const [zenV2Price, setZenV2Price] = useState<number>();
  const [busdPrice, setBUSDPrice] = useState<number>();
  const [bdoPrice, setBdoPrice] = useState<number>();
  const [soupPrice, setSoupPrice] = useState<number>();
  const [bnbPrice, setBNBPrice] = useState<number>();
  const [bifiPrice, setBIFIPrice] = useState<number>();
  const [yinBdoPrice, setYinBDOPrice] = useState<number>();
  const [yangSoupPrice, setYangSoupPrice] = useState<number>();
  const [zenBdoPrice, setZenBdoPrice] = useState<number>();
  const [zenSoupPrice, setZenSoupPrice] = useState<number>();
  const [yinBUSDPrice, setYinBUSDPrice] = useState<number>();
  const [yangBNBPrice, setYangBNBPrice] = useState<number>();
  const [zenBUSDPrice, setZenBUSDPrice] = useState<number>();
  const [zenBNBPrice, setZenBNBPrice] = useState<number>();

  const fetchPairs = useCallback(async () => {
    if (!yinyang) return;
    setBNBPrice(await getWBNBPrice());
    setBIFIPrice(await getBIFIPrice());
    setBUSDPrice(await getBUSDPrice());
    let yin_busd: Pair = await getPair(yinyang.contracts.yin_busd_pool);
    let yang_bnb: Pair = await getPair(yinyang.contracts.yang_bnb_pool);
    let zen_busd: Pair = await getPair(yinyang.contracts.zen_busd_pool);
    let zen_bnb: Pair = await getPair(yinyang.contracts.zen_bnb_pool);
    let yin_bdo: Pair = await getPair(yinyang.contracts.yin_bdo_pool);
    let yang_soup: Pair = await getPair(yinyang.contracts.yang_soup_pool);
    let zen_bdo: Pair = await getPair(yinyang.contracts.zen_bdo_pool);
    let zen_soup: Pair = await getPair(yinyang.contracts.zen_soup_pool);
    let soup_bnb: Pair = await getPair(yinyang.contracts.soup_bnb_pool, soup, wbnb, bnbPrice);
    let bdo_busd: Pair = await getPair(yinyang.contracts.bdo_busd_pool, bdo, busd, 1);

    const zero = new BigNumber(0);

    const bdo_index = bdo_busd.tokens.indexOf(bdo);
    try  {
    setBdoPrice(
      bdo_busd.supply.isGreaterThan(zero)
        ? bdo_busd.reserves[1 - bdo_index]
            .div(bdo_busd.reserves[bdo_index])
            .toNumber() * (busdPrice || 0)
        : 0
    );
    } catch (e) {
      setBdoPrice(0.3)
    }

    try {
    const soup_index = soup_bnb.tokens.indexOf(soup);
    setSoupPrice(
      soup_bnb.supply.isGreaterThan(zero)
        ? soup_bnb.reserves[1 - soup_index]
            .div(soup_bnb.reserves[soup_index])
            .toNumber() * (bnbPrice || 0)
        : 0
    );
    } catch(e) {
      setSoupPrice(28);
    }

    const yin_index = yin_bdo.tokens.indexOf(v1.yin);
    setYinBDOPrice(
      yin_bdo.supply.isGreaterThan(zero)
        ? yin_bdo.reserves[1 - yin_index]
            .times(2 * (bdoPrice || 0))
            .div(yin_bdo.supply)
            .toNumber()
        : 0
    );
    setYinPrice(
      yin_bdo.supply.isGreaterThan(zero)
        ? yin_bdo.reserves[1 - yin_index]
            .div(yin_bdo.reserves[yin_index])
            .toNumber() * (bdoPrice || 0)
        : 0
    );

    const yinV2_index = yin_busd.tokens.indexOf(v2.yin);
    setYinBUSDPrice(
      yin_busd.supply.isGreaterThan(zero)
        ? yin_busd.reserves[1 - yinV2_index]
            .times(2 * (busdPrice || 0))
            .div(yin_busd.supply)
            .toNumber()
        : 0
    );
    setYinV2Price(
      yin_busd.supply.isGreaterThan(zero)
        ? yin_busd.reserves[1 - yinV2_index]
            .div(yin_busd.reserves[yinV2_index])
            .toNumber() * (busdPrice || 0)
        : 0
    );

    const yang_index = yang_soup.tokens.indexOf(v1.yang);
    setYangSoupPrice(
      yang_soup.supply.isGreaterThan(zero)
        ? yang_soup.reserves[1 - yang_index]
            .times(2 * (soupPrice || 0))
            .div(yang_soup.supply)
            .toNumber()
        : 0
    );
    setYangPrice(
      yang_soup.supply.isGreaterThan(zero)
        ? yang_soup.reserves[1 - yang_index]
            .div(yang_soup.reserves[yang_index])
            .toNumber() * (soupPrice || 0)
        : 0
    );

    const yangV2_index = yang_bnb.tokens.indexOf(v2.yang);
    setYangBNBPrice(
      yang_bnb.supply.isGreaterThan(zero)
        ? yang_bnb.reserves[1 - yangV2_index]
            .times(2 * (bnbPrice || 0))
            .div(yang_bnb.supply)
            .toNumber()
        : 0
    );
    setYangV2Price(
      yang_bnb.supply.isGreaterThan(zero)
        ? yang_bnb.reserves[1 - yangV2_index]
            .div(yang_bnb.reserves[yangV2_index])
            .toNumber() * (bnbPrice || 0)
        : 0
    );

    const zen_index = zen_bdo.tokens.indexOf(v1.zen);
    try {
    setZenPrice(
      zen_bdo.supply.isGreaterThan(zero)
        ? zen_bdo.reserves[1 - zen_index]
            .div(zen_bdo.reserves[zen_index])
            .toNumber() * (busdPrice || 0)
        : 0
    );
    } catch(e) {
      setZenPrice(0)
    }

    setZenBdoPrice(
      zen_bdo.supply.isGreaterThan(zero)
        ? zen_bdo.reserves[zen_index]
            .times(2 * (zenPrice || 0))
            .div(zen_bdo.supply)
            .toNumber()
        : 0
    );

    const zen2_index = zen_soup.tokens.indexOf(v1.zen);
    setZenSoupPrice(
      zen_soup.supply.isGreaterThan(zero)
        ? zen_soup.reserves[zen2_index]
            .times(2 * (zenPrice || 0))
            .div(zen_soup.supply)
            .toNumber()
        : 0
    );

    const zenV2_index = zen_busd.tokens.indexOf(v2.zen);
    setZenV2Price(
      zen_busd.supply.isGreaterThan(zero)
        ? zen_busd.reserves[1 - zenV2_index]
            .div(zen_busd.reserves[zenV2_index])
            .toNumber() * (busdPrice || 0)
        : 0
    );

    try {
    setZenBUSDPrice(
      zen_busd.supply.isGreaterThan(zero)
        ? zen_busd.reserves[zenV2_index]
            .times(2 * (zenV2Price || 0))
            .div(zen_busd.supply)
            .toNumber()
        : 0
    );
    } catch(e) {
      setZenBUSDPrice(0)
    }

    try {
    const zenV22_index = zen_bnb.tokens.indexOf(v2.zen);
    // console.log(zenV22_index, zen_bnb)
    setZenBNBPrice(
      zen_bnb.supply.isGreaterThan(zero)
        ? zen_bnb.reserves[zenV22_index]
            .times(2 * (zenV2Price || 0))
            .div(zen_bnb.supply)
            .toNumber()
        : 0
    );
    } catch(e) {
      setZenBNBPrice(0)
    }

    /*console.log({
      bifiPrice,
      bnbPrice,
      busdPrice,
      bdoPrice,
      soupPrice,
      yinV2Price,
      yinPrice,
      yangPrice,
      yangV2Price,
      zenPrice,
      zenV2Price,
      yinBdoPrice,
      yangBNBPrice,
      yangSoupPrice,
      zenBUSDPrice,
      zenBNBPrice
    });*/
  }, [yinyang, bnbPrice, busdPrice, soupPrice, bdoPrice, zenPrice, zenV2Price, bdo, soup, wbnb, busd, v1, v2]);

  useEffect(() => {
    if (yinyang) {
      fetchPairs();
    }
  }, [fetchPairs, yinyang]);

  useEffect(() => {
    if (yinyang) {
      let refreshInterval = setInterval(fetchPairs, 150000);
      return () => clearInterval(refreshInterval);
    }
  }, [yinyang, fetchPairs]);

  return (
    <PricesContext.Provider
      value={{
        prices: {
          yin: yinV2Price,
          yang: yangV2Price,
          zen: zenV2Price,
          yinV1: yinPrice,
          yangV1: yangPrice,
          zenV1: zenPrice,
          bdo: bdoPrice,
          busd: busdPrice,
          soup: soupPrice,
          wbnb: bnbPrice,
          bifi: bifiPrice,
          "yin-bdo": yinBdoPrice,
          "yang-soup": yangSoupPrice,
          "zen-bdo": zenBdoPrice,
          "zen-soup": zenSoupPrice,
          "yin-busd": yinBUSDPrice,
          "yang-wbnb": yangBNBPrice,
          "zen-busd": zenBUSDPrice,
          "zen-wbnb": zenBNBPrice,
        },
      }}
    >
      {children}
    </PricesContext.Provider>
  );
};

export default PricesProvider;
