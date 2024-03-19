import { Router } from 'express';
import { v1 } from './v1';

export const blockchain = Router();

blockchain.use('/v1', v1);
