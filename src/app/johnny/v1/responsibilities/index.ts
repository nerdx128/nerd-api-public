import { Router } from 'express';
import { responsibilitiesRouter } from './routes';

export const responsibilities = Router();

responsibilities.use(responsibilitiesRouter);
