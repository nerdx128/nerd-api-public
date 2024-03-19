import { Router } from 'express';
import { walletsRouter } from './routes';

export const wallets = Router();

wallets.use(walletsRouter);
