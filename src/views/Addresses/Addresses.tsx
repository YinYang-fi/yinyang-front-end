import React from "react";
import { Container } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import addresses from "constants/tokenAddresses";
import AddressButton from "components/AddressButton";

const Addresses: React.FC = () => {
  const { v1, v2 } = addresses;

  return (
    <Page>
      <PageHeader icon={"🎖️"} title={"Addresses"} subtitle={"Official Addresses"} />
      <Container size="sm">
        <h2>Yin Yang Addresses &amp; Assets</h2>
        <AddressButton
          name="Yin"
          address={v2.yin.toLowerCase()}
          uniswap={true}
          unitext="Buy at Pancakeswap"
          unilink="https://exchange.pancakeswap.finance/#/?inputCurrency="
        />
        <AddressButton
          name="Yang"
          address={v2.yang.toLowerCase()}
          uniswap={true}
          unitext="Buy at Pancakeswap"
          unilink="https://exchange.pancakeswap.finance/#/?inputCurrency="
        />
        <AddressButton
          name="Zen"
          address={v2.zen.toLowerCase()}
          uniswap={true}
          unitext="Buy at Pancakeswap"
          unilink="https://exchange.pancakeswap.finance/#/?inputCurrency="
        />
        <AddressButton
          name="Yin V1"
          address={v1.yin.toLowerCase()}
          uniswap={false}
          unitext="Buy at Pancakeswap"
          unilink="https://exchange.pancakeswap.finance/#/?inputCurrency="
        />
        <AddressButton
          name="Yang V1"
          address={v1.yang.toLowerCase()}
          uniswap={false}
          unitext="Buy at Pancakeswap"
          unilink="https://exchange.pancakeswap.finance/#/?inputCurrency="
        />
        <AddressButton
          name="Zen V1"
          address={v1.zen.toLowerCase()}
          uniswap={false}
          unitext="Buy at Pancakeswap"
          unilink="https://exchange.pancakeswap.finance/#/?inputCurrency="
        />

        <h3>Yin Yang Contracts Addresses</h3>
        <AddressButton name="Zen Garden" address={v2.zenGarden.toLowerCase()} uniswap={false} />
        <AddressButton name="Peace Master" address={v2.peaceMaster.toLowerCase()} uniswap={false} />
        <AddressButton name="Yin Distrbutor" address={v2.yinDistributor.toLowerCase()} uniswap={false} />
        <AddressButton name="Yang Distributor" address={v2.yangDistributor.toLowerCase()} uniswap={false} />

        {/*<h3>Other Addresses</h3>
        <AddressButton
          name="SOUP"
          address={soup.toLowerCase()}
          uniswap={true}
          unitext="Buy at Pancakeswap"
          unilink="https://exchange.pancakeswap.finance/#/?inputCurrency="
        />
        <AddressButton
          name="BDO"
          address={bdo.toLowerCase()}
          uniswap={true}
          unitext="Buy at Pancakeswap"
          unilink="https://exchange.pancakeswap.finance/#/?inputCurrency="
        />*/}
      </Container>
    </Page>
  );
};

export default Addresses;
