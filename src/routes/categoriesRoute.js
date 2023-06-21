import express from 'express';
import CategoriesController from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/categories', CategoriesController.getAllCategories);

export default router;
