import { services } from './services';
import { Request, Response, NextFunction } from 'express';
import { parseIni } from '@smithy/shared-ini-file-loader/dist-types/parseIni';

export const controllers = {
    getBalance: async (req: Request, res: Response, next: NextFunction) => {
        const { wallet_address, network_id } = req.query;
        try {
            console.log(
                `NERDX::${new Date()}::Getting balance for ${wallet_address}`
            );
            const data = await services.getBalance(
                wallet_address as string,
                parseInt(network_id as string)
            );
            res.status(200).json(data);
        } catch (error: any) {
            next(error.message);
        }
    },
};
