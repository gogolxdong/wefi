import { Networks, DEFAULT_NETWORK } from "../constants/blockchain";

const switchRequest = () => {
    const mainnet = Number(DEFAULT_NETWORK) == Networks.BSC;
    return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + mainnet ? Networks.BSC.toString(16) : Networks.BSC_TESTNET.toString(16) }],
    });
};

const addChainRequest = () => {
    const mainnet = Number(DEFAULT_NETWORK) == Networks.BSC;
    return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            {
                chainId: mainnet ? "0x" + Networks.BSC.toString(16) : "0x" + Networks.BSC_TESTNET.toString(16),
                chainName: mainnet ? "BSC" : "BSC_TESTNET",
                rpcUrls: mainnet ? ["https://bsc-dataseed.binance.org/"] : ["https://data-seed-prebsc-2-s2.binance.org:8545/"],
                blockExplorerUrls: mainnet ? ["https://bscscan.com/"] : ["https://testnet.bscscan.com/"],
                nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                },
            },
        ],
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
