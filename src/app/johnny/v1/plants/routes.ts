import { Router } from 'express';
import { controllers } from './controllers';
import { setDataSource } from '../../middleware/setDataSource';

export const plantsRouter = Router();

plantsRouter.get('/GetAll', setDataSource, controllers.getAll);
plantsRouter.get('/Get/:id', setDataSource, controllers.getById);
plantsRouter.post('/Add', setDataSource, controllers.add);
plantsRouter.put('/Update', setDataSource, controllers.update);
plantsRouter.put('/Archive/:id', setDataSource, controllers.archive);
plantsRouter.delete('/Delete/:id', setDataSource, controllers.delete);
