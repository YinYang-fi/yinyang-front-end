import _addressesV1 from "./contract_addresses_v1.json";
import _addressesV2 from "./contract_addresses_v2.json";

const addressesV1 = _addressesV1 as any;
const addressesV2 = _addressesV2 as any;

export const NULL_ADDR = "0x0000000000000000000000000000000000000000";

let factory1, factory2
let soup, bdo, wbnb, bifi, busd
let bdo_busd_pool, soup_bnb_pool, bnb_busd_pool
if (process.env.REACT_APP_CHAIN_ID === "56") {
  factory1 = "0xBCfCcbde45cE874adCB698cC183deBcF17952812";
  factory2 = "0x877fe7f4e22e21be397cd9364fafd4af4e15edb6";
  soup = "0x94F559aE621F1c810F31a6a620Ad7376776fe09E";
  bdo = "0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454";
  wbnb = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
  bifi = "0xCa3F508B8e4Dd382eE878A314789373D80A5190A";
  busd = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
  //bdo_busd_pool = "0x7483700228Fe54b964D6f6bECc932C9FB9C5491a";
  bdo_busd_pool = "0xc5b0d73A7c0E4eaF66baBf7eE16A2096447f7aD6";
  soup_bnb_pool = "0x284A5D8712C351Ca28417d131003120808dcE48B";
  bnb_busd_pool = "0x1B96B92314C44b159149f7E0303511fB2Fc4774f";
} else {
  factory1 = "0xd417A0A4b65D24f5eBD0898d9028D92E3592afCC";
  factory2 = "0xd417A0A4b65D24f5eBD0898d9028D92E3592afCC";
  soup = "0x64544969ed7ebf5f083679233325356ebe738930";
  bdo = "0x64544969ed7ebf5f083679233325356ebe738930";
  wbnb = "0x1e33833a035069f42d68D1F53b341643De1C018D";
  bifi = "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867";
  busd = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"
  bdo_busd_pool = "0x5b7169143223Fc2e4D6D6af3966983Ae17D7d405";
  //bdo_busd_pool = "0x5b7169143223Fc2e4D6D6af3966983Ae17D7d405";
  soup_bnb_pool = "0x74dC43c801CD85686F9D7F9d87CF3c71c7d3b3a8";
  bnb_busd_pool = "0xB5D0CDfAf63EC94ad86dF05F9C85299deDE41A17";
}

const v1 = {
  yin: addressesV1.Yin,
  yang: addressesV1.Yang,
  zen: addressesV1.Zen,
  zenSoupLP: addressesV1.ZenSOUP,
  zenBDOLP: addressesV1.ZenBDO,
  yinBDOLP: addressesV1.YinBDO,
  yangSoupLP: addressesV1.YangSOUP,
  zenGarden: addressesV1.ZenGarden,
  peaceMaster: addressesV1.PeaceMaster,
  yinDistributor: addressesV1.YinDistributor,
  yangDistributor: addressesV1.YangDistributor,
}

const v2 = {
  yin: addressesV2.Yin,
  yang: addressesV2.Yang,
  zen: addressesV2.Zen,
  zenBNBLP: addressesV2.ZenBNB,
  zenBUSDLP: addressesV2.ZenBUSD,
  yinBUSDLP: addressesV2.YinBUSD,
  yangBNBLP: addressesV2.YangBNB,
  zenGarden: addressesV2.ZenGarden,
  peaceMaster: addressesV2.PeaceMaster,
  yinDistributor: addressesV2.YinDistributor,
  yangDistributor: addressesV2.YangDistributor,
}

export default {
  factory1,
  factory2,
  soup,
  bdo,
  bifi,
  wbnb,
  busd,
  bdo_busd_pool,
  soup_bnb_pool,
  bnb_busd_pool,
  v1,
  v2
};
