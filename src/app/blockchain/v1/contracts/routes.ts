import { Router } from 'express';
import { controllers } from './controllers';
import { setDataSource } from '../../middleware/setDataSource';

export const contractsRouter = Router();

contractsRouter.get('/GetBalance', setDataSource, controllers.getBalance);
