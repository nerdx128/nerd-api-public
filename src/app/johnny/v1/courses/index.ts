import { Router } from 'express';
import { coursesRouter } from './routes';

export const courses = Router();

courses.use(coursesRouter);
