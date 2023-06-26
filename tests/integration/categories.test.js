import supertest from 'supertest';
import app from '../../src/app.js';
import cleanDB from '../utils.js';
import CategoriesModel from '../../src/models/categoriesModel.js';

const port = 3000;
const server = app.listen(port);

afterEach(async () => {
  await cleanDB.cleanCategoriesCollection();
});

afterAll(() => {
  server.close();
});

const request = supertest(app);

describe('GET api/categories', () => {
  it('Deve responder com status 200 e uma array vazia, caso não existam categorias no banco de dados.', async () => {
    const response = await request.get('/api/categories');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it('Deve responder com status 200 e a lista de categorias, caso existam categorias cadastradas no banco de dados.', async () => {
    await CategoriesModel.insertMany([
      {
        nome: 'INFORMÁTICA',
        status: 'ATIVA',
      },
      {
        nome: 'BELEZA',
        status: 'INATIVA',
      },
      {
        nome: 'CELULARES',
        status: 'ATIVA',
      },
    ]);
    const response = await request.get('/api/categories');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        _id: expect.any(String),
        nome: expect.any(String),
        status: expect.any(String),
      }),
    ]));
  });
});

let idCategoriaParametro;
describe('POST api/admin/categories', () => {
  it.each([
    ['ausência do campo nome', { status: 'ATIVA' }],
    ['campo nome iniciando com número', { nome: '1TECNOLOGIA', status: 'ATIVA' }],
    ['campo nome com menos de 3 caracteres', { nome: 'AB', status: 'ATIVA' }],
    ['campo status com valor inválido', { nome: 'TECNOLOGIA', status: 'QUALQUER' }],
  ])('Deve responder com status 422, caso seja fornecida uma categoria com %s.', async (title, mock) => {
    const response = await request.post('/api/admin/categories').send(mock);
    expect(response.status).toBe(422);
  });

  it.each([
    ['ATIVA', { nome: 'VESTUÁRIO', status: 'ATIVA' }],
    ['INATIVA', { nome: 'TECNOLOGIA', status: 'INATIVA' }],
  ])('Deve responder com status 201 e salvar o registro no banco, caso seja fornecido um body válido (teste com status = %s).', async (title, mock) => {
    const response = await request.post('/api/admin/categories').send(mock);
    const category = await CategoriesModel.findOne({ nome: mock.nome });
    idCategoriaParametro = category._id;

    expect(response.status).toBe(201);
    expect(category).toEqual(expect.objectContaining({
      _id: expect.any(Object),
      nome: mock.nome,
      status: mock.status,
    }));
  });
});

describe('GET api/categories/:id', () => {
  it('Deve responder com status 404, caso seja fornecido um id válido, porém inexistente.', async () => {
    const response = await request.get(`/api/categories/${idCategoriaParametro}`);
    expect(response.status).toBe(404);
  });

  it('Deve responder com status 400, caso seja fornecido um id inválido.', async () => {
    const response = await request.get('/api/categories/idInvalido');
    expect(response.status).toBe(400);
  });

  it('Deve responder com status 200 e retornar a categoria referente ao Id fornecido.', async () => {
    const newCategory = new CategoriesModel({ nome: 'TESTE', status: 'ATIVA' });
    const insertedCategory = await newCategory.save();

    const response = await request.get(`/api/categories/${insertedCategory._id.toHexString()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      _id: insertedCategory._id.toHexString(),
    }));
  });
});

describe('PUT api/admin/categories/:id', () => {
  it('Deve responder com status 404, caso seja fornecido um id válido, porém inexistente.', async () => {
    const response = await request.put(`/api/admin/categories/${idCategoriaParametro}`);
    expect(response.status).toBe(404);
  });

  it('Deve responder com status 400, caso seja fornecido um id inválido.', async () => {
    const response = await request.put('/api/admin/categories/idInvalido');
    expect(response.status).toBe(400);
  });

  it('Deve responder com status 200 e atualizar a categoria indicada', async () => {
    const newCategory = new CategoriesModel({ nome: 'TESTE', status: 'ATIVA' });
    const insertedCategory = await newCategory.save();

    const response = await request.put(`/api/admin/categories/${insertedCategory._id.toHexString()}`).send({ nome: 'ATUALIZADA' });

    const updatedCategory = await CategoriesModel.findById(insertedCategory._id);
    expect(response.status).toBe(200);
    expect(updatedCategory).toEqual(expect.objectContaining({
      _id: updatedCategory._id,
      nome: 'ATUALIZADA',
    }));
  });
});

describe('DELETE api/admin/categories/:id', () => {
  it('Deve responder com status 404, caso seja fornecido um id válido, porém inexistente.', async () => {
    const response = await request.delete(`/api/admin/categories/${idCategoriaParametro}`);
    expect(response.status).toBe(404);
  });

  it('Deve responder com status 400, caso seja fornecido um id inválido.', async () => {
    const response = await request.delete('/api/admin/categories/idInvalido');
    expect(response.status).toBe(400);
  });

  it('Deve responder com status 200 e deletar a categoria do banco', async () => {
    const newCategory = new CategoriesModel({ nome: 'TESTE', status: 'ATIVA' });
    const insertedCategory = await newCategory.save();

    const response = await request.delete(`/api/admin/categories/${insertedCategory._id.toHexString()}`).send({ nome: 'ATUALIZADA' });

    const updatedCategory = await CategoriesModel.findById(insertedCategory._id);
    expect(response.status).toBe(200);
    expect(updatedCategory).toBeNull();
  });
});

describe('PATCH api/admin/categories/:id', () => {
  it('Deve responder com status 404, caso seja fornecido um id válido, porém inexistente.', async () => {
    const response = await request.patch(`/api/admin/categories/${idCategoriaParametro}`);
    expect(response.status).toBe(404);
  });

  it('Deve responder com status 404 caso o id fornecido pertença a uma categoria já ativa', async () => {
    const newCategory = new CategoriesModel({ nome: 'TESTE', status: 'ATIVA' });
    const insertedCategory = await newCategory.save();

    const response = await request.patch(`/api/admin/categories/${insertedCategory._id.toHexString()}`).send({ nome: 'ATUALIZADA' });

    expect(response.status).toBe(404);
  });

  it('Deve responder com status 400, caso seja fornecido um id inválido.', async () => {
    const response = await request.patch('/api/admin/categories/idInvalido');
    expect(response.status).toBe(400);
  });

  it('Deve responder com status 200 e ativar a categoria corretamente', async () => {
    const newCategory = new CategoriesModel({ nome: 'TESTE', status: 'INATIVA' });
    const insertedCategory = await newCategory.save();

    const response = await request.patch(`/api/admin/categories/${insertedCategory._id.toHexString()}`).send({ nome: 'ATUALIZADA' });

    const updatedCategory = await CategoriesModel.findById(insertedCategory._id);
    expect(response.status).toBe(200);
    expect(updatedCategory).toEqual(expect.objectContaining({
      _id: updatedCategory._id,
      status: 'ATIVA',
    }));
  });
});
