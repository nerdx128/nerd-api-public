import { Router } from 'express';
import { plantsRouter } from './routes';

export const plants = Router();

plants.use(plantsRouter);
