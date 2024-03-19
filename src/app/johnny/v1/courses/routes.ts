import { Router } from 'express';
import { controllers } from './controllers';
import { setDataSource } from '../../middleware/setDataSource';

export const coursesRouter = Router();

coursesRouter.get('/GetAll', setDataSource, controllers.getAll);
coursesRouter.get('/Get/:id', setDataSource, controllers.getById);
coursesRouter.post('/Add', setDataSource, controllers.add);
coursesRouter.put('/Update', setDataSource, controllers.update);
coursesRouter.put('/Archive/:id', setDataSource, controllers.archive);
coursesRouter.delete('/Delete/:id', setDataSource, controllers.delete);
