import ProductsModel from '../models/productsModel.js';

class ProductsController {
  static async getAllProducts(_, res) {
    try {
      const products = await ProductsModel.find();
      return res.status(200).send(products);
    } catch (error) {
      return res.status(500).send('Houve um erro na requisição. Por favor, tente novamente');
    }
  }

  static async insertNewProduct(req, res) {
    const newProduct = new ProductsModel(req.body);
    try {
      const product = await newProduct.save();
      return res.status(201).send(product);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(422).send(error.message);
      }
      return res.status(500).send('Houve um erro com sua requisição. Por favor, tente novamente');
    }
  }

  // static async getCategoryById(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const category = await CategoriesModel.findById(id);
  //     if (!category) return res.status(404).send('Não há quaisquer categorias com o id informado. Por gentileza, refaça a operação.');

  //     return res.status(200).send(category);
  //   } catch (error) {
  //     if (error.name === 'CastError') {
  //       return res.status(400).send('O id informado é inválido, favor informe um id compatível com o tipo ObjectID');
  //     }
  //     return res.status(500).send('Houve um erro com sua requisição. Por favor, tente novamente');
  //   }
  // }

  // static async updateCategory(req, res) {
  //   const { id } = req.params;
  //   const newCategoryData = req.body;

  //   try {
  //     const category = await CategoriesModel.findByIdAndUpdate(id, { $set: newCategoryData }, { runValidators: true });

  //     if (!category) return res.status(404).send('Não há quaisquer categorias com o id informado. Por gentileza, refaça a operação.');

  //     return res.status(200).send('Categoria atualizada com sucesso');
  //   } catch (error) {
  //     if (error.name === 'CastError') {
  //       return res.status(400).send('O id informado é inválido, favor informe um id compatível com o tipo ObjectID');
  //     }
  //     if (error.name === 'ValidationError') {
  //       return res.status(422).send(error.message);
  //     }
  //     return res.status(500).send('Houve um erro com sua requisição. Por favor, tente novamente');
  //   }
  // }

  // static async deleteCategory(req, res) {
  //   const { id } = req.params;

  //   try {
  //     const category = await CategoriesModel.findByIdAndDelete(id);
  //     console.log(category);
  //     if (!category) return res.status(404).send('Não há quaisquer categorias com o id informado. Por gentileza, refaça a operação.');

  //     return res.status(200).send('Categoria removida com sucesso');
  //   } catch (error) {
  //     if (error.name === 'CastError') {
  //       return res.status(400).send('O id informado é inválido, favor informe um id compatível com o tipo ObjectID');
  //     }
  //     return res.status(500).send('Houve um erro com sua requisição. Por favor, tente novamente');
  //   }
  // }

  // static async activeCategory(req, res) {
  //   const { id } = req.params;

  //   try {
  //     const category = await CategoriesModel.findOneAndUpdate({ _id: id, status: 'INATIVA' }, { $set: { status: 'ATIVA' } });

  //     if (!category) return res.status(404).send('Não há categoria com o id informado OU essa categoria já foi ativada.');

  //     return res.status(200).send('Categoria ativada!');
  //   } catch (error) {
  //     console.log(error);
  //     if (error.name === 'CastError') {
  //       return res.status(400).send('O id informado é inválido, favor informe um id compatível com o tipo ObjectID');
  //     }
  //     return res.status(500).send('Houve um erro com sua requisição. Por favor, tente novamente');
  //   }
  // }
}

export default ProductsController;
