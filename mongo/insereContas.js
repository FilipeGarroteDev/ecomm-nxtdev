use('ecomm');

const insertedCorrectAccounts = db.accounts.insertMany([
  {
    usuario: 'Joaquim José',
    email: 'joaquim@joaquim.com',
    senha: 'joaquim',
    dataCriacao: new Date(),
    cpf: '11122233344',
    telefone: '1122223333',
    endereco: {
      bairro: 'Alegria',
      rua: 'Av. da Vitória',
      numero: '13',
      cep: '01313-13',
      complemento: 'apto 50',
      cidade: 'São Paulo',
      uf: 'SP',
    },
  },
  {
    usuario: 'Roberto Carlos',
    email: 'roberto@roberto.com',
    senha: 'roberto',
    dataCriacao: new Date(),
    cpf: '13122233344',
    telefone: '1322223333',
    endereco: {
      bairro: 'Felicidade',
      rua: 'Av. da Democracia',
      numero: '13',
      cep: '01313-13',
      cidade: 'São Paulo',
      uf: 'SP',
    },
  },
  {
    usuario: 'Filipe Garrote',
    email: 'filipe@filipe.com',
    senha: 'filipe',
    dataCriacao: new Date(),
    cpf: '13132233344',
    telefone: '2122223333',
    endereco: {
      bairro: 'Jd. Monte Kemel',
      rua: 'Av. da Renovação',
      numero: '13',
      cep: '01313-13',
      complemento: 'apto 50',
      cidade: 'São Paulo',
      uf: 'SP',
    },
  },
]);

console.log(insertedCorrectAccounts);
