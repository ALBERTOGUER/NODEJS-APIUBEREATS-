import http from 'http';
import express from 'express';
import bodyParser from'body-parser';
import dotenv from 'dotenv';
import routes from './routes'



dotenv.config();

const APP = express();
APP.use(bodyParser.json());

const SERVER = http.createServer(APP)


routes(APP)

SERVER.listen(process.env.PORT)