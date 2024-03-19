import { getAddress } from 'ethers';
import axios from 'axios';
import { dataSource } from './setDataSource';
import { ContractEntity } from '../entities';
import { getChainName } from './utils';

const version = `v2`;
const baseUrl = `https://api.opensea.io/api/${version}`;
const baseTestUrl = `https://testnets-api.opensea.io/api/${version}`;
const apiKey = process.env.OPENSEA_API_KEY as string;
const headers = {
    accept: 'application/json',
    'X-API-KEY': apiKey,
    'content-type': 'application/json',
};

const openseaProtocol = '0x00000000000000adc04c56bf30ac9d3c0aaf14dc';
const zeroAddress = getAddress('0x0000000000000000000000000000000000000000');
const openseaConduit =
    '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000';
const openseaFeeRecipient = '0x0000a26b00c1F0DF003000390027140000fAa719';

export const openseaCall = async (config: {
    httpsMethod: string;
    endpoint: string;
    network: string;
    data: any;
}) => {
    const url = ['mainnet', 'polygon'].includes(config.network)
        ? baseUrl
        : baseTestUrl;
    console.log({ url });
    return await axios({
        method: config.httpsMethod,
        url: `${url}/${config.endpoint}`,
        headers: headers,
        data: config.data,
    })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        });
};

export const getOpenSeaContract = async (contract_address: string) => {
    const dbContract = (await dataSource
        .createQueryBuilder('contracts', 'c')
        .where('c.archived = (:archived) AND c.address = (:address)', {
            archived: false,
            address: contract_address,
        })
        .getOne()) as ContractEntity;
    const { chain_id, address } = dbContract;
    const network = getChainName(chain_id as number);
    const osContract = await openseaCall({
        httpsMethod: 'GET',
        endpoint: `asset_contract/${address}`,
        network,
        data: {},
    });
    return osContract.data;
};
