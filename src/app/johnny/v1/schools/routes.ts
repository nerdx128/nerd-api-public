import { Router } from 'express';
import { controllers } from './controllers';
import { setDataSource } from '../../middleware/setDataSource';

export const schoolsRouter = Router();

schoolsRouter.get('/GetAll', setDataSource, controllers.getAll);
schoolsRouter.get('/Get/:id', setDataSource, controllers.getById);
schoolsRouter.post('/Add', setDataSource, controllers.add);
schoolsRouter.put('/Update', setDataSource, controllers.update);
schoolsRouter.put('/Archive/:id', setDataSource, controllers.archive);
schoolsRouter.delete('/Delete/:id', setDataSource, controllers.delete);
