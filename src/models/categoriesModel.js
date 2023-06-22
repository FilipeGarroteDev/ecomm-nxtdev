import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: {
      values: ['ATIVA', 'INATIVA'],
      message: "Somente são aceitos os valores 'ATIVA' e 'INATIVA' para status",
    },
  },
  nome: {
    type: String,
    minLength: [3, 'É necessário que o nome da categoria tenha, no mínimo, 3 caracteres'],
    validate: {
      validator(val) {
        return /^[^\d][\wà-úÀ-Ú]*$/.test(val);
      },
      message: 'O nome da categoria não pode começar com um número.',
    },
    required: true,
  },
});

const categoriesModel = mongoose.model('categories', categoriesSchema);

export default categoriesModel;
