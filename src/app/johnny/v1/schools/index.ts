import { Router } from 'express';
import { schoolsRouter } from './routes';

export const schools = Router();

schools.use(schoolsRouter);
