import { services } from './services';
import { Request, Response, NextFunction } from 'express';

export const controllers = {
    getBalance: async (req: Request, res: Response, next: NextFunction) => {
        const { contract_address, wallet_address } = req.query;
        try {
            console.log(
                `NERDX::${new Date()}::Getting balance for ${wallet_address} on ${contract_address}`
            );
            const data = await services.getBalance(
                contract_address as string,
                wallet_address as string
            );
            res.status(200).json(data);
        } catch (error: any) {
            next(error.message);
        }
    },
};
