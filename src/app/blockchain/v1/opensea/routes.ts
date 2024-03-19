import { Router } from 'express';
import { controllers } from './controllers';
import { setDataSource } from '../../middleware/setDataSource';

export const openSeaRouter = Router();

openSeaRouter.get('/GetBalance', setDataSource, controllers.getNFTs);
