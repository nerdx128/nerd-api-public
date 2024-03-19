import { Router } from 'express';
import { rolesRouter } from './routes';

export const roles = Router();

roles.use(rolesRouter);
