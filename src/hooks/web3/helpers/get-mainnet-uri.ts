export const getMainnetURI = (network: number): string => {
    if (network == 56) {
        return "https://bsc-dataseed4.ninicoin.io/"
    } else if (network == 97) {
        return "https://data-seed-prebsc-1-s2.binance.org:8545/"
    } else if (network == 137){
        return "https://polygon-rpc.com/"
    } else {
        return ""
    }
}
