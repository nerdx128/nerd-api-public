import { Router } from 'express';
import { controllers } from './controllers';
import { setDataSource } from '../../middleware/setDataSource';

export const projectsRouter = Router();

projectsRouter.get('/GetAll', setDataSource, controllers.getAll);
projectsRouter.get('/Get/:id', setDataSource, controllers.getById);
projectsRouter.post('/Add', setDataSource, controllers.add);
projectsRouter.put('/Update', setDataSource, controllers.update);
projectsRouter.put('/Archive/:id', setDataSource, controllers.archive);
projectsRouter.delete('/Delete/:id', setDataSource, controllers.delete);
