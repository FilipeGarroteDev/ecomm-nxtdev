import express from 'express';
import ProductsController from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter
  .get('/products', ProductsController.getAllProducts)
  .post('/admin/products', ProductsController.insertNewProduct)
  .get('/products/:id', ProductsController.getProductById)
  .put('/admin/products/:id', ProductsController.updateProduct)
  .delete('/admin/products/:id', ProductsController.deleteProduct);

export default productsRouter;
