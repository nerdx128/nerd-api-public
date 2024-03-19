import { Router } from 'express';
import { controllers } from './controllers';
import { setDataSource } from '../../middleware/setDataSource';

export const rolesRouter = Router();

rolesRouter.get('/GetAll', setDataSource, controllers.getAll);
rolesRouter.get('/Get/:id', setDataSource, controllers.getById);
rolesRouter.post('/Add', setDataSource, controllers.add);
rolesRouter.put('/Update', setDataSource, controllers.update);
rolesRouter.put('/Archive/:id', setDataSource, controllers.archive);
rolesRouter.delete('/Delete/:id', setDataSource, controllers.delete);
