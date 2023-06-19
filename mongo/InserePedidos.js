use('ecomm');

const allOfAccounts = db.accounts
  .find({
    $or: [
      { usuario: 'Filipe Garrote' },
      { usuario: 'Joaquim José' },
      { usuario: 'Roberto Carlos' },
    ],
  })
  .toArray();

const filipeAccountId = allOfAccounts.find(
  (account) => account.usuario === 'Filipe Garrote',
)._id;
const joaquimAccountId = allOfAccounts.find(
  (account) => account.usuario === 'Joaquim José',
)._id;
const robertoAccountId = allOfAccounts.find(
  (account) => account.usuario === 'Roberto Carlos',
)._id;

const allOfProducts = db.products
  .find({
    $or: [
      { nome: 'Notebook Samsung' },
      { nome: 'Sofá 3 lugares' },
      { nome: 'Clean Architecture' },
      { nome: 'Mesa de jantar 6 lugares' },
    ],
  })
  .toArray();

const notebook = allOfProducts.find(
  (product) => product.nome === 'Notebook Samsung',
);
const sofa = allOfProducts.find((product) => product.nome === 'Sofá 3 lugares');
const cleanArchitecture = allOfProducts.find(
  (product) => product.nome === 'Clean Architecture',
);
const mesa = allOfProducts.find(
  (product) => product.nome === 'Mesa de jantar 6 lugares',
);

const insertedCorrectOrders = db.orders.insertMany([
  {
    dataPedido: new Date(),
    account: {
      accountId: filipeAccountId,
      nomeCliente: 'Filipe Garrote',
    },
    enderecoEntrega: {
      bairro: 'Jd. Monte Kemel',
      rua: 'Av. da Renovação',
      numero: '13',
      cep: '01313-13',
      complemento: 'apto 50',
      cidade: 'São Paulo',
      uf: 'SP',
    },
    itens: [
      {
        productId: notebook._id,
        quantidade: 1,
        precoUnitario: NumberDecimal(notebook.precoUnitario),
        desconto: NumberDecimal('276.79'),
      },
      {
        productId: sofa._id,
        quantidade: 1,
        precoUnitario: NumberDecimal(sofa.precoUnitario),
      },
    ],
  },
  {
    dataPedido: new Date(),
    account: {
      accountId: joaquimAccountId,
      nomeCliente: 'Joaquim José',
    },
    enderecoEntrega: {
      bairro: 'Alegria',
      rua: 'Av. da Vitória',
      numero: '13',
      cep: '01313-13',
      complemento: 'apto 50',
      cidade: 'São Paulo',
      uf: 'SP',
    },
    itens: [
      {
        productId: cleanArchitecture._id,
        quantidade: 3,
        precoUnitario: NumberDecimal(cleanArchitecture.precoUnitario),
      },
    ],
  },
  {
    dataPedido: new Date(),
    account: {
      accountId: robertoAccountId,
      nomeCliente: 'Roberto Carlos',
    },
    enderecoEntrega: {
      bairro: 'Felicidade',
      rua: 'Av. da Democracia',
      numero: '13',
      cep: '01313-13',
      cidade: 'São Paulo',
      uf: 'SP',
    },
    itens: [
      {
        productId: mesa._id,
        quantidade: 1,
        precoUnitario: NumberDecimal(mesa.precoUnitario),
      },
    ],
  },
]);

console.log(insertedCorrectOrders);
