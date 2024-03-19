import { dataSource } from '../../middleware/setDataSource';
import { getDefaultProvider, formatEther } from 'ethers';

export const services = {
    getBalance: async (wallet_address: string, network_id: number) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            const provider = getDefaultProvider(network_id);
            const balance = await provider.getBalance(wallet_address);
            if (dataSource.isInitialized) await dataSource.destroy();
            return {
                code: 200,
                status: 'Success',
                message: `Balance for ${wallet_address}`,
                balance: formatEther(balance),
            };
        } catch (error: any) {
            return {
                code: 500,
                status: error.message,
                message: 'Error in getBalance',
            };
        }
    },
};
