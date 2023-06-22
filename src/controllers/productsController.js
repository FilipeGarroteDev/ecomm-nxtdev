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

  static async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductsModel.findById(id);
      if (!product) return res.status(404).send('Não há quaisquer produtos com o id informado. Por gentileza, refaça a operação.');

      return res.status(200).send(product);
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).send('O id informado é inválido, favor informe um id compatível com o tipo ObjectID');
      }
      return res.status(500).send('Houve um erro com sua requisição. Por favor, tente novamente');
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const newProductData = req.body;

    try {
      const product = await ProductsModel.findByIdAndUpdate(id, { $set: newProductData }, { runValidators: true });

      if (!product) return res.status(404).send('Não há quaisquer produtos com o id informado. Por gentileza, refaça a operação.');

      return res.status(200).send('Produto atualizado com sucesso');
    } catch (error) {
      if (error.name === 'CastError' && (error.path === 'precoUnitario' || error.path === 'quantidadeEmEstoque')) {
        return res.status(400).send('O valor dos campos "quantidadeEmEstoque" e "precoUnitario" devem ser do tipo "Number"');
      }
      if (error.name === 'CastError' && error.path === '_id') {
        return res.status(400).send('O id informado é inválido, favor informe um id compatível com o tipo ObjectID');
      }
      if (error.name === 'ValidationError') {
        return res.status(422).send(error.message);
      }
      return res.status(500).send('Houve um erro com sua requisição. Por favor, tente novamente');
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      const product = await ProductsModel.findByIdAndDelete(id);
      if (!product) return res.status(404).send('Não há quaisquer produtos com o id informado. Por gentileza, refaça a operação.');

      return res.status(200).send('Produto removido com sucesso');
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).send('O id informado é inválido, favor informe um id compatível com o tipo ObjectID');
      }
      return res.status(500).send('Houve um erro com sua requisição. Por favor, tente novamente');
    }
  }
}

export default ProductsController;
