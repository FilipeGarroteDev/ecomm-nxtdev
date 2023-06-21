import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema({
  _id: { type: String },
  status: { type: String, required: true },
  name: { type: String, required: true },
});

const categoriesModel = mongoose.model('categories', categoriesSchema);
export default categoriesModel;
