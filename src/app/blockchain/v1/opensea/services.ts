import { dataSource } from '../../middleware/setDataSource';
import { ContractEntity } from '../../entities';
import { NFT } from '../../definitions/opensea';
import { getOpenSeaContract, openseaCall } from '../../middleware/opensea';
import delay from 'delay';

export const services = {
    getNFTs: async (contract_address: string, wallet_address: string) => {
        try {
            if (!dataSource.isInitialized) await dataSource.initialize();
            console.log(
                'NERDX::',
                new Date().toISOString(),
                '::Getting Contract Info from DB for',
                contract_address
            );
            const osContract = await getOpenSeaContract(contract_address);
            const { collection, chain } = osContract;
            let nfts: Array<NFT> = [];
            let next = null;
            do {
                const endpoint = `chain/${chain}/account/${wallet_address}/nfts`;
                const query =
                    `?collection=${collection}&limit=200` +
                    (next ? `&next=${next}` : '');
                console.log(`${endpoint}${query}`);
                await delay(5000);
                await openseaCall({
                    httpsMethod: 'get',
                    endpoint: endpoint + query,
                    network: chain,
                    data: {},
                }).then((res) => {
                    nfts = nfts.concat(res.data.nfts);
                    if (res.data.next) next = res.data.next;
                    else next = null;
                });
            } while (next !== null);

            if (dataSource.isInitialized) await dataSource.destroy();
            return {
                code: 200,
                status: 'Success',
                message: `NFTs for ${wallet_address} on ${contract_address}`,
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
