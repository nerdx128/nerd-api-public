import { Router } from 'express';
import { controllers } from './controllers';
import { setDataSource } from '../../middleware/setDataSource';

export const skillsRouter = Router();

skillsRouter.get('/GetAll', setDataSource, controllers.getAll);
skillsRouter.get('/Get/:id', setDataSource, controllers.getById);
skillsRouter.post('/Add', setDataSource, controllers.add);
skillsRouter.put('/Update', setDataSource, controllers.update);
skillsRouter.put('/Archive/:id', setDataSource, controllers.archive);
skillsRouter.delete('/Delete/:id', setDataSource, controllers.delete);
