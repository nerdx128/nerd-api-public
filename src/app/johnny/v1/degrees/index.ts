import { Router } from 'express';
import { degreesRouter } from './routes';

export const degrees = Router();

degrees.use(degreesRouter);
