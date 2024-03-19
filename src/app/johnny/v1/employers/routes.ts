import { Router } from 'express';
import { controllers } from './controllers';
import { setDataSource } from '../../middleware/setDataSource';

export const employersRouter = Router();

employersRouter.get('/GetAll', setDataSource, controllers.getAll);
employersRouter.get('/Get/:id', setDataSource, controllers.getById);
employersRouter.post('/Add', setDataSource, controllers.add);
employersRouter.put('/Update', setDataSource, controllers.update);
employersRouter.put('/Archive/:id', setDataSource, controllers.archive);
employersRouter.delete('/Delete/:id', setDataSource, controllers.delete);
