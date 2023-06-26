import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';
import db from './config/dbConfig.js';
import router from './routes/index.js';

const server = express();
const file = fs.readFileSync('./swagger/ecomm.yaml', 'utf8');
const swaggerFile = YAML.parse(file);

db.on('error', console.log.bind(console, 'Erro de conexão com o Banco de Dados'));
db.once('open', () => {
  console.log('Conexão bem sucedida com o banco de dados.');
});

router(server);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default server;
