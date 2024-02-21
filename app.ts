import dotenv from 'dotenv';
import express  from 'express';
import { appLoader } from './src/loader/app';
import router from './src/routes';

const app = express();
dotenv.config();
appLoader(app, router);
