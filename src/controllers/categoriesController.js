import CategoriesModel from '../models/categories.js';

class CategoriesController {
  static async getAllCategories(_, res) {
    try {
      const categories = await CategoriesModel.find();
      return res.status(200).send(categories);
    } catch (error) {
      return res.status(400).send('Houve um erro na requisição. Por favor, tente novamente');
    }
  }

  static async insertNewCategory(req, res) {
    const newCategory = new CategoriesModel(req.body);
    try {
      const categories = await newCategory.save();
      return res.status(201).send(categories);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(422).send(error.message);
      }
      return res.status(400).send('Houve um erro com sua requisição. Por favor, tente novamente');
    }
  }
}

export default CategoriesController;
