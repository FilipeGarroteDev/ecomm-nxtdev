import categoriesModel from '../src/models/categoriesModel';
import productsModel from '../src/models/productsModel';

async function cleanCategoriesCollection() {
  await categoriesModel.deleteMany({});
}

async function cleanProductsCollection() {
  await productsModel.deleteMany({});
}

const cleanDB = {
  cleanCategoriesCollection,
  cleanProductsCollection,
};

export default cleanDB;
