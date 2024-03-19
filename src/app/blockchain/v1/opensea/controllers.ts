import { services } from './services';
import { Request, Response, NextFunction } from 'express';

export const controllers = {
    getNFTs: async (req: Request, res: Response, next: NextFunction) => {
        const { contract_address, wallet_address } = req.query;
        try {
            console.log(
                `NERDX::${new Date()}::Getting NFTs for ${wallet_address} on OpenSean contract ${contract_address}`
            );
            const data = await services.getNFTs(
                contract_address as string,
                wallet_address as string
            );
            res.status(200).json(data);
        } catch (error: any) {
            next(error.message);
        }
    },
};
