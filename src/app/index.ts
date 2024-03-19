import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { corsOptions } from './middleware/corsOptions';
import * as dotenv from 'dotenv';
import { johnny } from './johnny';
import { blockchain } from './blockchain';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

dotenv.config();

app.use('/Api/Johnny', johnny);
app.use('/Api/Blockchain', blockchain);
