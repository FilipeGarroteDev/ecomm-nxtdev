import express from 'express';
import db from './config/dbConfig.js';
import router from './routes/index.js';

const server = express();

db.on('error', console.log.bind(console, 'Erro de conexão com o Banco de Dados'));
db.once('open', () => {
  console.log('Conexão bem sucedida com o banco de dados.');
});

router(server);

export default server;
