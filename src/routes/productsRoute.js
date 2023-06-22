import express from 'express';
import ProductsController from '../controllers/productsController.js';

const productsRouter = express.Router();

productsRouter
  .get('/products', ProductsController.getAllProducts)
  .post('/admin/products', ProductsController.insertNewProduct);
// .get('/categories/:id', CategoriesController.getCategoryById)
// .put('/admin/categories/:id', CategoriesController.updateCategory)
// .delete('/admin/categories/:id', CategoriesController.deleteCategory)
// .patch('/admin/categories/:id', CategoriesController.activeCategory);

export default productsRouter;
