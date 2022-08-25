import { Networks } from "../../constants";

export const getMainnetURI = (network: Networks): string => {
  switch (network) {
    case Networks.BSC:
      return "https://dataseed1.binance.org/";
    case Networks.BSC_TESTNET:
     return "https://data-seed-prebsc-1-s2.binance.org:8545/";
    case Networks.RINKEBY:
      return "https://rinkeby.infura.io/v3/";
    case Networks.AVAX_TEST:
      return "https://api.avax-test.network/ext/bc/C/rpc"
    default:
      return "http://127.0.0.1:8545/";
  }
};
