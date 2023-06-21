import express from 'express';
import CategoriesController from '../controllers/categoriesController.js';

const router = express.Router();

router
  .get('/categories', CategoriesController.getAllCategories)
  .post('/categories', CategoriesController.insertNewCategory)
  .get('/categories/:id', CategoriesController.getCategoryById);

export default router;
