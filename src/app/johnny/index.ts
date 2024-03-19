import { Router } from 'express';
import { v1 } from './v1';

export const johnny = Router();

johnny.use('/v1', v1);
