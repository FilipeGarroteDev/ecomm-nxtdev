import express from 'express';
import categoriesRouter from './categoriesRoute.js';

export default function routes(app) {
  app
    .get('/', (_, res) => {
      res.status(200).send('Página Inicial');
    })
    .use(express.json())
    .use('/api', categoriesRouter);
}
