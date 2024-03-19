import { dataSource } from '../../middleware/setDataSource';
import { ContractEntity } from '../../entities';
import { Contract, getDefaultProvider } from 'ethers';

export const services = {
    getBalance: async (contract_address: string, wallet_address: string) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            console.log(
                'NERDX::',
                new Date().toISOString(),
                '::Getting Contract Info from DB for',
                contract_address
            );
            let dbContract = (await dataSource
                .createQueryBuilder('contracts', 'c')
                .where('c.archived = (:archived) AND c.address = (:address)', {
                    archived: false,
                    address: contract_address,
                })
                .getOne()) as ContractEntity;

            const provider = getDefaultProvider(dbContract.chain_id as number);
            const contract = new Contract(
                dbContract.address,
                dbContract.abi,
                provider
            );
            const balance =
                await contract.getFunction('balanceOf')(wallet_address);
            if (dataSource.isInitialized) await dataSource.destroy();
            return {
                code: 200,
                status: 'Success',
                message: `Balance for ${wallet_address} on ${dbContract.description} (${dbContract.address})`,
                balance: balance.toString(),
            };
        } catch (error: any) {
            console.log(error instanceof Error ? error.message : error);
            return {
                code: 500,
                status: error.message,
                message: 'Error in getBalance',
            };
        }
    },
};
