import { Router } from 'express';
import { openSeaRouter } from './routes';

export const openSea = Router();

openSea.use(openSeaRouter);
