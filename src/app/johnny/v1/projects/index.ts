import { Router } from 'express';
import { projectsRouter } from './routes';

export const projects = Router();

projects.use(projectsRouter);
