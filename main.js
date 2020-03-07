import http from 'http';
import express from 'express';
import bodyParser from'body-parser';
import dotenv from 'dotenv';
import apiclientes from './apiclientes/apiclientes'
import apierestaurante from './apirestaurante/apierestaurante'
import apirepartidor from './apirepartidor/apirepartidor'
import restaurantes from './restaurantes'
import pedidosPorConfir from './pedidosPorConfir'



dotenv.config();

const APP = express();
const Cli = express();
const Rest = express();
const Rep = express();

let pedidosRepartidor=[]
let totalRestaurante=0;
let totalRepartidor=0;

APP.use(bodyParser.json());
APP.use('/clientes', Cli)
APP.use('/restaurant', Rest)
APP.use('/repartidor', Rep)

const SERVER = http.createServer(APP)


apiclientes(Cli,restaurantes,pedidosPorConfir);
apierestaurante(Rest,restaurantes,pedidosRepartidor,totalRestaurante,totalRepartidor)
apirepartidor(Rep,pedidosRepartidor,totalRepartidor)


SERVER.listen(process.env.PORT)