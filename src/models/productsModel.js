import mongoose from 'mongoose';
import categoriesModel from './categoriesModel.js';

const productsSchema = new mongoose.Schema({
  nome: {
    type: String,
    minLength: [3, 'É necessário que o nome do produto tenha, no mínimo, 3 caracteres'],
    validate: {
      validator(val) {
        return /^[^\d][\wà-úÀ-Ú\s]*$/.test(val);
      },
      message: 'O nome do produto não pode começar com um número.',
    },
    required: true,
  },
  slug: {
    type: String,
    validate: {
      validator(val) {
        return /^[\w\d-]*?$/.test(val);
      },
      message: 'O slug do produto só pode conter letras (maiúsculas ou minúsculas), números e hífen.',
    },
    required: true,
  },
  precoUnitario: {
    type: 'Number',
    validate: {
      validator(val) {
        return val > 0;
      },
      message: 'O preço do produto deve ser maior que zero.',
    },
    required: true,
  },
  quantidadeEmEstoque: {
    type: 'Number',
    validate: {
      validator(val) {
        return val > 0 && val < 10000;
      },
      message: 'O produto deve ter uma quantidade maior que zero e menor que 10000.',
    },
    required: true,
  },
  categoryId: {
    type: String,
    validate: {
      async validator(val) {
        try {
          const validCategory = await categoriesModel.findById(val);
          return validCategory;
        } catch (error) {
          return false;
        }
      },
      message: 'O id da categoria deve ser um id válido, ou seja, deve ser referente a uma categoria existente.',
    },
    required: true,
  },
});

const productsModel = mongoose.model('products', productsSchema);

export default productsModel;
