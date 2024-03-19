export const getChainName = (chain: number) => {
    switch (chain) {
        case 5:
            return 'goerli';
        case 137:
            return 'matic';
        case 80001:
            return 'mumbai';
        case 11155111:
            return 'sepolia';
        default:
            return 'ethereum';
    }
};
