import _addressesV1 from "../constants/contract_addresses_v1.json";
import _addressesV2 from "../constants/contract_addresses_v2.json";
import useVersion from "./useVersion";

const useAddresses = () => {
  const { usingV2 } = useVersion();
  const addresses = usingV2 ? _addressesV2 as any : _addressesV1 as any;

  const NULL_ADDR = "0x0000000000000000000000000000000000000000";
  let soup,
    bdo,
    wbnb,
    bifi,
    busd_busd_pool,
    soup_bnb_pool,
    bnb_busd_pool,
    factory;

  if (process.env.REACT_APP_CHAIN_ID === "56") {
    soup = "0x94F559aE621F1c810F31a6a620Ad7376776fe09E";
    bdo = "0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454";
    wbnb = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
    bifi = "0xCa3F508B8e4Dd382eE878A314789373D80A5190A";
    busd_busd_pool = "0xc5b0d73A7c0E4eaF66baBf7eE16A2096447f7aD6";
    soup_bnb_pool = "0x284A5D8712C351Ca28417d131003120808dcE48B";
    bnb_busd_pool = "0x1B96B92314C44b159149f7E0303511fB2Fc4774f";
    factory = "0xBCfCcbde45cE874adCB698cC183deBcF17952812";
  } else {
    soup = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
    bdo = "0x64544969ed7EBf5f083679233325356EbE738930";
    wbnb = "0x1e33833a035069f42d68D1F53b341643De1C018D";
    bifi = "0xCa3F508B8e4Dd382eE878A314789373D80A5190A";
    busd_busd_pool = "0x5b7169143223Fc2e4D6D6af3966983Ae17D7d405";
    soup_bnb_pool = "0x74dC43c801CD85686F9D7F9d87CF3c71c7d3b3a8";
    bnb_busd_pool = "0xB5D0CDfAf63EC94ad86dF05F9C85299deDE41A17";
    factory = "0xd417A0A4b65D24f5eBD0898d9028D92E3592afCC";
  }

  const  yin = addresses.Yin;
  const  yang = addresses.Yang;
  const  zen = addresses.Zen;
  const  zenBNBLP = addresses.ZenSOUP;
  const  zenBUSDLP = addresses.ZenBDO;
  const  yinBUSDLP = addresses.YinBDO;
  const  yangBNBLP = addresses.YangSOUP;
  const  zenGarden = addresses.ZenGarden;
  const  peaceMaster = addresses.PeaceMaster;
  const  yinDistributor = addresses.YinDistributor;
  const  yangDistributor = addresses.YangDistributor;

  return {
    NULL_ADDR,
    yin,
    yang,
    zen,
    zenBNBLP,
    zenBUSDLP,
    yinBUSDLP,
    yangBNBLP,
    soup,
    bdo,
    wbnb,
    bifi,
    busd_busd_pool,
    soup_bnb_pool,
    bnb_busd_pool,
    factory,
    zenGarden,
    peaceMaster,
    yinDistributor,
    yangDistributor
  };
};

export default useAddresses;
