import { Router } from 'express';
import { skillsRouter } from './routes';

export const skills = Router();

skills.use(skillsRouter);
