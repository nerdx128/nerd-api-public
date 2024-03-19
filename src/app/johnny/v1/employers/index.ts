import { Router } from 'express';
import { employersRouter } from './routes';

export const employers = Router();

employers.use(employersRouter);
