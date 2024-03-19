import { Router } from 'express';
import { courses } from './courses';
import { degrees } from './degrees';
import { employers } from './employers';
import { plants } from './plants';
import { projects } from './projects';
import { responsibilities } from './responsibilities';
import { roles } from './roles';
import { schools } from './schools';
import { skills } from './skills';

export const v1 = Router();

v1.use('/Courses', courses);
v1.use('/Degrees', degrees);
v1.use('/Employers', employers);
v1.use('/Plants', plants);
v1.use('/Projects', projects);
v1.use('/Responsibilities', responsibilities);
v1.use('/Roles', roles);
v1.use('/Schools', schools);
v1.use('/Skills', skills);
