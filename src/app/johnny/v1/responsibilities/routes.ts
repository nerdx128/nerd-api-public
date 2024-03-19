import { Router } from 'express';
import { controllers } from './controllers';
import { setDataSource } from '../../middleware/setDataSource';

export const responsibilitiesRouter = Router();

responsibilitiesRouter.get('/GetAll', setDataSource, controllers.getAll);
responsibilitiesRouter.get('/Get/:id', setDataSource, controllers.getById);
responsibilitiesRouter.post('/Add', setDataSource, controllers.add);
responsibilitiesRouter.put('/Update', setDataSource, controllers.update);
responsibilitiesRouter.put('/Archive/:id', setDataSource, controllers.archive);
responsibilitiesRouter.delete('/Delete/:id', setDataSource, controllers.delete);
