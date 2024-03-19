import { Router } from 'express';
import { controllers } from './controllers';
import { setDataSource } from '../../middleware/setDataSource';

export const degreesRouter = Router();

degreesRouter.get('/GetAll', setDataSource, controllers.getAll);
degreesRouter.get('/Get/:id', setDataSource, controllers.getById);
degreesRouter.post('/Add', setDataSource, controllers.add);
degreesRouter.put('/Update', setDataSource, controllers.update);
degreesRouter.put('/Archive/:id', setDataSource, controllers.archive);
degreesRouter.delete('/Delete/:id', setDataSource, controllers.delete);
