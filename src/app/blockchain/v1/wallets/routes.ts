import { Router } from 'express';
import { controllers } from './controllers';
import { setDataSource } from '../../middleware/setDataSource';

export const walletsRouter = Router();

walletsRouter.get('/GetBalance', setDataSource, controllers.getBalance);
