import { Router } from 'express';
import { contracts } from './contracts';
import { wallets } from './wallets';
import { openSea } from './opensea';

export const v1 = Router();

v1.use('/Contracts', contracts);
v1.use('/Wallets', wallets);
v1.use('/OpenSea', openSea);
