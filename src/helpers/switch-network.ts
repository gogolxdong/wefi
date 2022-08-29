import { Networks, DEFAULT_NETWORK } from "../constants/blockchain";

const switchRequest = () => {
  const mainnet = Number(DEFAULT_NETWORK) == Networks.BSC;
  return window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [
      {
        chainId:"0x" + DEFAULT_NETWORK.toString(16)
      },
    ],
  });
};

const addChainRequest = () => {
  let network;
  switch (DEFAULT_NETWORK) {
    case Networks.BSC:
      network = {
        chainId: "0x" + Networks.BSC.toString(16),
        chainName: "BSC",
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        blockExplorerUrls: ["https://bscscan.com/"],
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB",
          decimals: 18,
        },
      };
      return;
    case Networks.BSC_TESTNET:
      network = {
        chainId: "0x" + Networks.BSC_TESTNET.toString(16),
        chainName: "BSC",
        rpcUrls: ["https://data-seed-prebsc-1-s2.binance.org:8545/"],
        blockExplorerUrls: ["https://testnet.bscscan.com/"],
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB",
          decimals: 18,
        },
      };
      return;
    case Networks.MATIC:
      network = {
        chainId: "0x" + Networks.MATIC.toString(16),
        chainName: "Polygen",
        rpcUrls: ["https://polygon-rpc.com/"],
        blockExplorerUrls: ["https://polygonscan.com/"],
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
      };
      return;
  }
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [network],
  });
};

export const swithNetwork = async () => {
  if (window.ethereum) {
    try {
      await switchRequest();
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await addChainRequest();
          await switchRequest();
        } catch (addError) {
          console.log(error);
        }
      }
      console.log(error);
    }
  }
};
