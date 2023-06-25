import categoriesModel from '../src/models/categoriesModel';

export default async function cleanDB() {
  await categoriesModel.deleteMany({});
}
