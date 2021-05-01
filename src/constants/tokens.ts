import addresses from "./tokenAddresses"

const { v1, v2, wbnb, bdo, soup, bifi, busd } = addresses

const tokens = {
    // ECOSYSTEM TOKENS
    yinV1: {
        symbol: "YIN V1",
        address: {
            56: v1.yin,
            97: v1.yin,
        },
        decimals: 18,
        projectLink: ""
    },
    yangV1: {
        symbol: "YANG V1",
        address: {
            56: v1.yang,
            97: v1.yang,
        },
        decimals: 18,
        projectLink: ""
    },
    zenV1: {
        symbol: "ZEN V1",
        address: {
            56: v1.zen,
            97: v1.zen,
        },
        decimals: 18,
        projectLink: ""
    },
    yinV2: {
        symbol: "YIN",
        address: {
            56: v2.yin,
            97: v2.yin,
        },
        decimals: 18,
        projectLink: ""
    },
    yangV2: {
        symbol: "YANG",
        address: {
            56: v2.yang,
            97: v2.yang,
        },
        decimals: 18,
        projectLink: ""
    },
    zenV2: {
        symbol: "ZEN",
        address: {
            56: v2.zen,
            97: v2.zen,
        },
        decimals: 18,
        projectLink: ""
    },
    // GENERAL TOKENS
    wbnb: {
        symbol: "WBNB",
        address: {
            56: wbnb,
            97: wbnb,
        },
        decimals: 18,
        projectLink: ""
    },
    bdo: {
        symbol: "BDO",
        address: {
            56: bdo,
            97: bdo,
        },
        decimals: 18,
        projectLink: ""
    },
    soup: {
        symbol: "SOUP",
        address: {
            56: soup,
            97: soup
        },
        decimals: 18,
        projectLink: ""
    },
    busd: {
        symbol: "BUSD",
        address: {
            56: busd,
            97: busd
        },
        decimals: 18,
        projectLink: ""
    },
    bifi: {
        symbol: "BIFI",
        address: {
            56: bifi,
            97: bifi
        },
        decimals: 18,
        projectLink: ""
    },
    // LP TOKENS
    yinBDO: {
        symbol: "YIN-BDO LP V1",
        address: {
            56: v1.yinBDOLP,
            97: v1.yinBDOLP,
        },
        decimals: 18,
        projectLink: ""
    },
    yangSoup: {
        symbol: "YANG-SOUP LP V1",
        address: {
            56: v1.yangSoupLP,
            97: v1.yangSoupLP,
        },
        decimals: 18,
        projectLink: ""
    },
    zenBDO: {
        symbol: "ZEN-BDO LP V1",
        address: {
            56: v1.zenBDOLP,
            97: v1.zenBDOLP,
        },
        decimals: 18,
        projectLink: ""
    },
    zenSoup: {
        symbol: "ZEN-SOUP LP V1",
        address: {
            56: v1.zenSoupLP,
            97: v1.zenSoupLP,
        },
        decimals: 18,
        projectLink: ""
    },
    yinBUSD: {
        symbol: "YIN-BUSD LP",
        address: {
            56: v2.yinBUSDLP,
            97: v2.yinBUSDLP,
        },
        decimals: 18,
        projectLink: ""
    },
    yangBNB: {
        symbol: "YANG-WBNB LP",
        address: {
            56: v2.yangBNBLP,
            97: v2.yangBNBLP,
        },
        decimals: 18,
        projectLink: ""
    },
    zenBUSD: {
        symbol: "ZEN-BUSD LP",
        address: {
            56: v2.zenBUSDLP,
            97: v2.zenBUSDLP,
        },
        decimals: 18,
        projectLink: ""
    },
    zenBNB: {
        symbol: "ZEN-WBNB LP",
        address: {
            56: v2.zenBNBLP,
            97: v2.zenBNBLP,
        },
        decimals: 18,
        projectLink: ""
    },
}

export default tokens