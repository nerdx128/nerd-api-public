import { Router } from 'express';
import { contractsRouter } from './routes';

export const contracts = Router();

contracts.use(contractsRouter);
