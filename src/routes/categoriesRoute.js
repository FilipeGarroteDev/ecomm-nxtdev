import express from 'express';
import CategoriesController from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();

categoriesRouter
  .get('/categories', CategoriesController.getAllCategories)
  .post('/admin/categories', CategoriesController.insertNewCategory)
  .get('/categories/:id', CategoriesController.getCategoryById)
  .put('/admin/categories/:id', CategoriesController.updateCategory)
  .delete('/admin/categories/:id', CategoriesController.deleteCategory)
  .patch('/admin/categories/:id', CategoriesController.activeCategory);

export default categoriesRouter;
