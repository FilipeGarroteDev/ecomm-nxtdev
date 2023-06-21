import express from 'express';
import db from './config/dbConfig.js';
import router from './routes/index.js';

db.on('error', console.log.bind(console, 'Erro de conexão com o Banco de Dados'));
db.once('open', () => {
  console.log('Conexão bem sucedida com o banco de dados.');
});

const server = express();

router(server);

export default server;
