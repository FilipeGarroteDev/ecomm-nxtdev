import supertest from 'supertest';
import app from '../../src/app.js';
import cleanDB from '../utils.js';
import ProductsModel from '../../src/models/productsModel.js';
import CategoriesModel from '../../src/models/categoriesModel.js';

const port = 3000;
const server = app.listen(port);

afterEach(async () => {
  await cleanDB.cleanProductsCollection();
});

afterAll(async () => {
  await cleanDB.cleanCategoriesCollection();
  server.close();
});

let idCategoriaParametro;
const request = supertest(app);

describe('GET api/products', () => {
  it('Deve responder com status 200 e uma array vazia, caso não existam produtos no banco de dados.', async () => {
    const response = await request.get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it('Deve responder com status 200 e a lista de produtos, caso existam produtos cadastrados no banco de dados.', async () => {
    const insertedCategory = await CategoriesModel.create({ nome: 'TECNOLOGIA', status: 'ATIVA' });
    idCategoriaParametro = insertedCategory._id;

    await ProductsModel.insertMany([
      {
        nome: 'Celular Galaxy',
        slug: 'galaxy-s21',
        precoUnitario: 2000.99,
        quantidadeEmEstoque: 5,
        categoryId: insertedCategory._id,
      },
      {
        nome: 'Mouse gamer',
        slug: 'mouse-maneiro',
        precoUnitario: 283.20,
        quantidadeEmEstoque: 9,
        categoryId: insertedCategory._id,
      },
      {
        nome: 'Geladeira',
        slug: 'geladeira-brastemp',
        precoUnitario: 1990.50,
        quantidadeEmEstoque: 3,
        categoryId: insertedCategory._id,
      },
    ]);
    const response = await request.get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        _id: expect.any(String),
        nome: expect.any(String),
        slug: expect.any(String),
        precoUnitario: expect.any(Number),
        quantidadeEmEstoque: expect.any(Number),
        categoryId: expect.any(String),
      }),
    ]));
  });
});

describe('POST api/admin/products', () => {
  it.each([
    ['ausência do campo nome', {
      slug: 'glx-s21', precoUnitario: 2000, quantidadeEmEstoque: 10, categoryId: idCategoriaParametro,
    }],
    ['campo nome iniciando com número', {
      nome: '1CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 2000, quantidadeEmEstoque: 10, categoryId: idCategoriaParametro,
    }],
    ['ausência do campo slug', {
      nome: 'CELULAR GALAXY', precoUnitario: 2000, quantidadeEmEstoque: 10, categoryId: idCategoriaParametro,
    }],
    ['campo slug contendo caracteres especiais', {
      nome: 'CELULAR GALAXY', slug: 'glx@s21', precoUnitario: 2000, quantidadeEmEstoque: 10, categoryId: idCategoriaParametro,
    }],
    ['ausência do campo precoUnitario', {
      nome: 'CELULAR GALAXY', slug: 'glx-s21', quantidadeEmEstoque: 10, categoryId: idCategoriaParametro,
    }],
    ['campo precoUnitario com valor = 0', {
      nome: 'CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 0, quantidadeEmEstoque: 10, categoryId: idCategoriaParametro,
    }],
    ['ausência do campo quantidadeEmEstoque', {
      nome: 'CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 2000, categoryId: idCategoriaParametro,
    }],
    ['campo quantidadeEmEstoque com valor = 0', {
      nome: 'CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 2000, quantidadeEmEstoque: 0, categoryId: idCategoriaParametro,
    }],
    ['campo quantidadeEmEstoque com valor = 10001', {
      nome: 'CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 2000, quantidadeEmEstoque: 10001, categoryId: idCategoriaParametro,
    }],
    ['ausência do campo categoryId', {
      nome: 'CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 2000, quantidadeEmEstoque: 10,
    }],
    ['campo categoryId com um id inválido/inexistente', {
      nome: 'CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 2000, quantidadeEmEstoque: 10, categoryId: 'IdInválido',
    }],
  ])('Deve responder com status 422, caso seja fornecida uma categoria com %s.', async (title, mock) => {
    const response = await request.post('/api/admin/products').send(mock);
    expect(response.status).toBe(422);
  });

  it('Deve responder com status 201 e salvar o registro no banco, caso seja fornecido um body válido', async () => {
    const validProduct = {
      nome: 'CELULAR GALAXY',
      slug: 'glx-s21',
      precoUnitario: 2000.99,
      quantidadeEmEstoque: 10,
      categoryId: idCategoriaParametro,
    };

    const response = await request.post('/api/admin/products').send(validProduct);
    const product = await ProductsModel.findOne({ nome: validProduct.nome });

    expect(response.status).toBe(201);
    expect(product._id).toEqual(expect.any(Object));
  });
});

describe('GET api/products/:id', () => {
  it('Deve responder com status 404, caso seja fornecido um id válido, porém inexistente.', async () => {
    const categoryToBeDeleted = await CategoriesModel.create({ nome: 'CATEGORIA', status: 'ATIVA' });
    await CategoriesModel.findByIdAndDelete(categoryToBeDeleted._id);

    const response = await request.get(`/api/products/${categoryToBeDeleted._id}`);
    expect(response.status).toBe(404);
  });

  it('Deve responder com status 400, caso seja fornecido um id inválido.', async () => {
    const response = await request.get('/api/products/idInvalido');
    expect(response.status).toBe(400);
  });

  it('Deve responder com status 200 e retornar o produto referente ao Id fornecido.', async () => {
    const newProduct = new ProductsModel({
      nome: 'CELULAR GALAXY',
      slug: 'glx-s21',
      precoUnitario: 2000,
      quantidadeEmEstoque: 10,
      categoryId: idCategoriaParametro,
    });
    const insertedProduct = await newProduct.save();

    const response = await request.get(`/api/products/${insertedProduct._id.toHexString()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      _id: insertedProduct._id.toHexString(),
    }));
  });
});

describe('PUT api/admin/products/:id', () => {
  it('Deve responder com status 404, caso seja fornecido um id válido, porém inexistente.', async () => {
    const categoryToBeDeleted = await CategoriesModel.create({ nome: 'CATEGORIA', status: 'ATIVA' });
    await CategoriesModel.findByIdAndDelete(categoryToBeDeleted._id);

    const response = await request.put(`/api/admin/products/${categoryToBeDeleted._id}`).send({
      nome: 'CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 2000, quantidadeEmEstoque: 10, categoryId: idCategoriaParametro,
    });
    expect(response.status).toBe(404);
  });

  it('Deve responder com status 400, caso seja fornecido um id inválido.', async () => {
    const response = await request.put('/api/admin/products/idInvalido').send({
      nome: 'CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 2000, quantidadeEmEstoque: 10, categoryId: idCategoriaParametro,
    });
    expect(response.status).toBe(400);
  });

  it.each([
    ['campo nome iniciando com número', {
      nome: '1CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 2000, quantidadeEmEstoque: 10, categoryId: idCategoriaParametro,
    }],
    ['campo slug contendo caracteres especiais', {
      nome: 'CELULAR GALAXY', slug: 'glx@s21', precoUnitario: 2000, quantidadeEmEstoque: 10, categoryId: idCategoriaParametro,
    }],

    ['campo precoUnitario com valor = 0', {
      nome: 'CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 0, quantidadeEmEstoque: 10, categoryId: idCategoriaParametro,
    }],

    ['campo quantidadeEmEstoque com valor = 0', {
      nome: 'CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 2000, quantidadeEmEstoque: 0, categoryId: idCategoriaParametro,
    }],
    ['campo quantidadeEmEstoque com valor = 10001', {
      nome: 'CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 2000, quantidadeEmEstoque: 10001, categoryId: idCategoriaParametro,
    }],
    ['campo categoryId com um id inválido/inexistente', {
      nome: 'CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 2000, quantidadeEmEstoque: 10, categoryId: 'IdInválido',
    }],
  ])('Deve responder com status 422, caso seja fornecido, no body, objeto com %s.', async (title, mock) => {
    const newProduct = await ProductsModel.create({
      nome: 'CELULAR GALAXY', slug: 'glx-s21', precoUnitario: 2000, quantidadeEmEstoque: 10, categoryId: idCategoriaParametro,
    });

    const response = await request.put(`/api/admin/products/${newProduct._id.toHexString()}`).send(mock);
    expect(response.status).toBe(422);
  });

  it('Deve responder com status 200 e atualizar o produto indicado, ', async () => {
    const newProduct = new ProductsModel({
      nome: 'CELULAR GALAXY',
      slug: 'glx-s21',
      precoUnitario: 2000,
      quantidadeEmEstoque: 10,
      categoryId: idCategoriaParametro,
    });

    const insertedProduct = await newProduct.save();

    const response = await request.put(`/api/admin/products/${insertedProduct._id.toHexString()}`).send({ nome: 'PRODUTO ATUALIZADO' });

    const updatedProduct = await ProductsModel.findById(insertedProduct._id);
    expect(response.status).toBe(200);
    expect(updatedProduct).toEqual(expect.objectContaining({
      _id: updatedProduct._id,
      nome: 'PRODUTO ATUALIZADO',
    }));
  });
});

describe('DELETE api/admin/products/:id', () => {
  it('Deve responder com status 404, caso seja fornecido um id válido, porém inexistente.', async () => {
    const categoryToBeDeleted = await CategoriesModel.create({ nome: 'CATEGORIA', status: 'ATIVA' });
    await CategoriesModel.findByIdAndDelete(categoryToBeDeleted._id);

    const response = await request.delete(`/api/admin/products/${categoryToBeDeleted._id}`);
    expect(response.status).toBe(404);
  });

  it('Deve responder com status 400, caso seja fornecido um id inválido.', async () => {
    const response = await request.delete('/api/admin/products/idInvalido');
    expect(response.status).toBe(400);
  });

  it('Deve responder com status 200 e deletar o produto do banco', async () => {
    const newProduct = new ProductsModel({
      nome: 'CELULAR GALAXY',
      slug: 'glx-s21',
      precoUnitario: 2000,
      quantidadeEmEstoque: 10,
      categoryId: idCategoriaParametro,
    });

    const insertedProduct = await newProduct.save();

    const response = await request.delete(`/api/admin/products/${insertedProduct._id.toHexString()}`).send({ nome: 'ATUALIZADA' });

    const deletedProduct = await ProductsModel.findById(insertedProduct._id);
    expect(response.status).toBe(200);
    expect(deletedProduct).toBeNull();
  });
});
