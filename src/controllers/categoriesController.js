import categoriesModel from '../models/categories.js';

class CategoriesController {
  static async getAllCategories(req, res) {
    try {
      const categories = await categoriesModel.find();
      return res.status(200).send(categories);
    } catch (error) {
      return res.status(400).send('Houve um erro na requisição. Por favor, tente novamente');
    }
  }
}

export default CategoriesController;
