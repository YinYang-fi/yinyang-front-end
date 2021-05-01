import BigNumber from "bignumber.js/bignumber";
import * as Types from "./types.js";
import { SUBTRACT_GAS_LIMIT } from "./constants.js";
import addressMap from 'constants/tokenAddresses'

import ERC20Json from "../clean_build/contracts/v1/IERC20.json";

import UniPairJson from "../clean_build/contracts/v1/IPancakePair.json";
//import UniFactoryJson from "../clean_build/contracts/IPancakeFactory.json";
//import UniRouterJson from "../clean_build/contracts/IPancakeFactory.json";

import YinV1Json from "../clean_build/contracts/v1/Yin.json";
import YangV1Json from "../clean_build/contracts/v1/Yang.json";
import ZenV1Json from "../clean_build/contracts/v1/Zen.json";
import ZenGardenV1Json from "../clean_build/contracts/v1/ZenGarden.json"; 
import PeaceMasterV1Json from "../clean_build/contracts/v1/PeaceMaster.json";
import YinDistributorV1Json from "../clean_build/contracts/v1/YinDistributor.json";
import YangDistributorV1Json from "../clean_build/contracts/v1/YangDistributor.json";

import YinV2Json from "../clean_build/contracts/v2/Yin.json";
import YangV2Json from "../clean_build/contracts/v2/Yang.json";
import ZenV2Json from "../clean_build/contracts/v2/Zen.json";
import ZenGardenV2Json from "../clean_build/contracts/v2/ZenGarden.json"; 
import PeaceMasterV2Json from "../clean_build/contracts/v2/PeaceMaster.json";
import YinDistributorV2Json from "../clean_build/contracts/v2/YinDistributor.json";
import YangDistributorV2Json from "../clean_build/contracts/v2/YangDistributor.json";

export class Contracts {
  constructor(provider, networkId, web3, options) {
    this.web3 = web3;
    this.defaultConfirmations = options.defaultConfirmations;
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5;
    this.confirmationType = options.confirmationType || Types.ConfirmationType.Confirmed;
    this.defaultGas = options.defaultGas;
    this.defaultGasPrice = options.defaultGasPrice;

    this.uni_pair = new this.web3.eth.Contract(UniPairJson.abi);
    //this.uni_router = new this.web3.eth.Contract(UniRouterJson.abi);
    //this.uni_fact = new this.web3.eth.Contract(UniFactoryJson.abi);

    this.yin_busd_pool = new this.web3.eth.Contract(UniPairJson.abi, addressMap.v2["yinBUSDLP"]);
    this.yang_bnb_pool = new this.web3.eth.Contract(UniPairJson.abi, addressMap.v2["yangBNBLP"]);
    this.zen_bnb_pool = new this.web3.eth.Contract(UniPairJson.abi, addressMap.v2["zenBNBLP"]);
    this.zen_busd_pool = new this.web3.eth.Contract(UniPairJson.abi, addressMap.v2["zenBUSDLP"]);
    this.yin_bdo_pool = new this.web3.eth.Contract(UniPairJson.abi, addressMap.v1["yinBDOLP"]);
    this.yang_soup_pool = new this.web3.eth.Contract(UniPairJson.abi, addressMap.v1["yangSoupLP"]);
    this.zen_soup_pool = new this.web3.eth.Contract(UniPairJson.abi, addressMap.v1["zenSoupLP"]);
    this.zen_bdo_pool = new this.web3.eth.Contract(UniPairJson.abi, addressMap.v1["zenBDOLP"]);
    this.bdo_busd_pool = new this.web3.eth.Contract(UniPairJson.abi, addressMap["bdo_busd_pool"]);
    this.busd_bnb_pool = new this.web3.eth.Contract(UniPairJson.abi, addressMap["bnb_busd_pool"]);
    this.soup_bnb_pool = new this.web3.eth.Contract(UniPairJson.abi, addressMap["soup_bnb_pool"]);

    this.soup = new this.web3.eth.Contract(ERC20Json.abi, addressMap["soup"]);
    this.bdo = new this.web3.eth.Contract(ERC20Json.abi, addressMap["bdo"]);
    this.busd = new this.web3.eth.Contract(ERC20Json.abi, addressMap["busd"]);
    this.wbnb = new this.web3.eth.Contract(ERC20Json.abi, addressMap["wbnb"]);

    this.yinV1 = new this.web3.eth.Contract(YinV1Json.abi);
    this.yangV1 = new this.web3.eth.Contract(YangV1Json.abi);
    this.zenV1 = new this.web3.eth.Contract(ZenV1Json.abi);
    this.zenGardenV1 = new this.web3.eth.Contract(ZenGardenV1Json.abi, addressMap.v1["zenGarden"]);
    this.peaceMasterV1 = new this.web3.eth.Contract(PeaceMasterV1Json.abi, addressMap.v1["peaceMaster"]);
    this.yinDistributorV1 = new this.web3.eth.Contract(YinDistributorV1Json.abi, addressMap.v1["yinDistributor"]);
    this.yangDistributorV1 = new this.web3.eth.Contract(YangDistributorV1Json.abi, addressMap.v1["yangDistributor"]);

    this.yinV2 = new this.web3.eth.Contract(YinV2Json.abi);
    this.yangV2 = new this.web3.eth.Contract(YangV2Json.abi);
    this.zenV2 = new this.web3.eth.Contract(ZenV2Json.abi);
    this.zenGardenV2 = new this.web3.eth.Contract(ZenGardenV2Json.abi, addressMap.v2["zenGarden"]);
    this.peaceMasterV2 = new this.web3.eth.Contract(PeaceMasterV2Json.abi, addressMap.v2["peaceMaster"]);
    this.yinDistributorV2 = new this.web3.eth.Contract(YinDistributorV2Json.abi, addressMap.v2["yinDistributor"]);
    this.yangDistributorV2 = new this.web3.eth.Contract(YangDistributorV2Json.abi, addressMap.v2["yangDistributor"]);
    
    this.setProvider(provider, networkId);
  }

  setProvider(provider, networkId) {
    this.peaceMasterV1.setProvider(provider);
    this.zenGardenV1.setProvider(provider);
    this.yinDistributorV1.setProvider(provider);
    this.yangDistributorV1.setProvider(provider);
    this.peaceMasterV2.setProvider(provider);
    this.zenGardenV2.setProvider(provider);
    this.yinDistributorV2.setProvider(provider);
    this.yangDistributorV2.setProvider(provider);
    const contracts = [
      { contract: this.yinV1, json: YinV1Json },
      { contract: this.yangV1, json: YangV1Json },
      { contract: this.zenV1, json: ZenV1Json },
      { contract: this.zenGardenV1, json: ZenGardenV1Json },
      { contract: this.peaceMasterV1, json: PeaceMasterV1Json },
      { contract: this.yinDistributorV1, json: YinDistributorV1Json },
      { contract: this.yangDistributorV1, json: YangDistributorV1Json },
      { contract: this.yinV2, json: YinV2Json },
      { contract: this.yangV2, json: YangV2Json },
      { contract: this.zenV2, json: ZenV2Json },
      { contract: this.zenGardenV2, json: ZenGardenV2Json },
      { contract: this.peaceMasterV2, json: PeaceMasterV2Json },
      { contract: this.yinDistributorV2, json: YinDistributorV2Json },
      { contract: this.yangDistributorV2, json: YangDistributorV2Json },
    ];

    contracts.forEach((contract) => this.setContractProvider(contract.contract, contract.json, provider, networkId));
    this.soup.options.address = addressMap["soup"];
    this.busd.options.address = addressMap["busd"];
    this.wbnb.options.address = addressMap["wbnb"];

    this.names = {};
    this.names[this.yinV1.options.address] = "Yin";
    this.names[this.yangV1.options.address] = "Yang";
    this.names[this.zenV1.options.address] = "Zen";
    this.names[this.zenGardenV1.options.address] = "Zen Garden";
    this.names[this.peaceMasterV1.options.address] = "Peace Master";
    this.names[this.yinDistributorV1.options.address] = "Yin Distributor";
    this.names[this.yangDistributorV1.options.address] = "Yang Distributor";
    this.names[this.yinV2.options.address] = "Yin";
    this.names[this.yangV2.options.address] = "Yang";
    this.names[this.zenV2.options.address] = "Zen";
    this.names[this.zenGardenV2.options.address] = "Zen Garden";
    this.names[this.peaceMasterV2.options.address] = "Peace Master";
    this.names[this.yinDistributorV2.options.address] = "Yin Distributor";
    this.names[this.yangDistributorV2.options.address] = "Yang Distributor";
  }

  async callContractFunction(method, options) {
    const { confirmations, confirmationType, autoGasMultiplier, ...txOptions } = options;

    if (!this.blockGasLimit) {
      await this.setGasLimit();
    }

    if (!txOptions.gasPrice && this.defaultGasPrice) {
      txOptions.gasPrice = this.defaultGasPrice;
    }

    if (confirmationType === Types.ConfirmationType.Simulate || !options.gas) {
      let gasEstimate;
      if (this.defaultGas && confirmationType !== Types.ConfirmationType.Simulate) {
        txOptions.gas = this.defaultGas;
      } else {
        try {
          console.log("estimating gas");
          gasEstimate = await method.estimateGas(txOptions);
        } catch (error) {
          const data = method.encodeABI();
          const { from, value } = options;
          const to = method._parent._address;
          error.transactionData = { from, value, data, to };
          throw error;
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier;
        const totalGas = Math.floor(gasEstimate * multiplier);
        txOptions.gas = totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit;
      }

      if (confirmationType === Types.ConfirmationType.Simulate) {
        let g = txOptions.gas;
        return { gasEstimate, g };
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0);
    } else {
      txOptions.value = "0";
    }

    const promi = method.send(txOptions);

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    };

    let hashOutcome = OUTCOMES.INITIAL;
    let confirmationOutcome = OUTCOMES.INITIAL;

    const t = confirmationType !== undefined ? confirmationType : this.confirmationType;

    if (!Object.values(Types.ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`);
    }

    let hashPromise;
    let confirmationPromise;

    if (t === Types.ConfirmationType.Hash || t === Types.ConfirmationType.Both) {
      hashPromise = new Promise((resolve, reject) => {
        promi.on("error", (error) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.REJECTED;
            reject(error);
            const anyPromi = promi;
            anyPromi.off();
          }
        });

        promi.on("transactionHash", (txHash) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.RESOLVED;
            resolve(txHash);
            if (t !== Types.ConfirmationType.Both) {
              const anyPromi = promi;
              anyPromi.off();
            }
          }
        });
      });
    }

    if (t === Types.ConfirmationType.Confirmed || t === Types.ConfirmationType.Both) {
      confirmationPromise = new Promise((resolve, reject) => {
        promi.on("error", (error) => {
          if ((t === Types.ConfirmationType.Confirmed || hashOutcome === OUTCOMES.RESOLVED) && confirmationOutcome === OUTCOMES.INITIAL) {
            confirmationOutcome = OUTCOMES.REJECTED;
            reject(error);
            const anyPromi = promi;
            anyPromi.off();
          }
        });

        const desiredConf = confirmations || this.defaultConfirmations;
        if (desiredConf) {
          promi.on("confirmation", (confNumber, receipt) => {
            if (confNumber >= desiredConf) {
              if (confirmationOutcome === OUTCOMES.INITIAL) {
                confirmationOutcome = OUTCOMES.RESOLVED;
                resolve(receipt);
                const anyPromi = promi;
                anyPromi.off();
              }
            }
          });
        } else {
          promi.on("receipt", (receipt) => {
            confirmationOutcome = OUTCOMES.RESOLVED;
            resolve(receipt);
            const anyPromi = promi;
            anyPromi.off();
          });
        }
      });
    }

    if (t === Types.ConfirmationType.Hash) {
      const transactionHash = await hashPromise;
      if (this.notifier) {
        this.notifier.hash(transactionHash);
      }
      return { transactionHash };
    }

    if (t === Types.ConfirmationType.Confirmed) {
      return confirmationPromise;
    }

    const transactionHash = await hashPromise;
    if (this.notifier) {
      this.notifier.hash(transactionHash);
    }
    return {
      transactionHash,
      confirmation: confirmationPromise,
    };
  }

  async callConstantContractFunction(method, options) {
    const m2 = method;
    const { blockNumber, ...txOptions } = options;
    return m2.call(txOptions, blockNumber);
  }

  async setGasLimit() {
    const block = await this.web3.eth.getBlock("latest");
    this.blockGasLimit = block.gasLimit - SUBTRACT_GAS_LIMIT;
  }

  setContractProvider(contract, contractJson, provider, networkId) {
    contract.setProvider(provider);
    try {
      contract.options.address = contractJson.networks[networkId] && contractJson.networks[networkId].address;
    } catch (error) {
      // console.log(error)
    }
  }
}
