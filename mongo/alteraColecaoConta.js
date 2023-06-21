use('ecomm');

db.runCommand(
  { collMod: 'accounts' },
  {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'usuario',
          'email',
          'senha',
          'dataCriacao',
          'cpf',
          'telefone',
          'endereco',
        ],
        additionalProperties: false,
        validationLevel: 'strict',
        validationAction: 'error',
        properties: {
          _id: {
            bsonType: 'objectId',
            description: 'Id da conta.',
          },
          usuario: {
            bsonType: 'string',
            minLength: 5,
            description: "O campo 'usuario' deve ser uma string com, no mínimo, 5 caracteres.",
          },
          email: {
            bsonType: 'string',
            minLength: 5,
            pattern: '[a-z0-9]+@[a-z]+.[a-z]{2,3}',
            description: "O campo 'email' deve ser uma string com, no mínimo, 5 caracteres.",
          },
          senha: {
            bsonType: 'string',
            minLength: 5,
            description: "O campo 'senha' deve ser uma string com, no mínimo, 5 caracteres.",
          },
          dataCriacao: {
            bsonType: 'date',
            description: "O campo 'usuario' deve ser uma data válida.",
          },
          cpf: {
            bsonType: 'string',
            minLength: 11,
            maxLength: 11,
            pattern: '^//d{11}$',
            description: "O campo 'cpf' deve ser uma string com, exatamente, 11 caracteres.",
          },
          telefone: {
            bsonType: 'string',
            minLength: 10,
            pattern: '^//d{10}$',
            description: "O campo 'telefone' deve ser uma string com, no mínimo, 10 caracteres.",
          },
          endereco: {
            bsonType: 'object',
            required: ['bairro', 'rua', 'numero', 'cep', 'cidade', 'uf'],
            additionalProperties: false,
            properties: {
              bairro: {
                bsonType: 'string',
                minLength: 1,
                description: "O campo 'bairro' deve ser uma string com, no mínimo, 1 caractere.",
              },
              rua: {
                bsonType: 'string',
                minLength: 1,
                description: "O campo 'rua' deve ser uma string com, no mínimo, 1 caractere.",
              },
              numero: {
                bsonType: 'string',
                minLength: 1,
                pattern: '^d+|S/N+$',
                description: "O campo 'numero' deve ser uma string com, no mínimo, 1 caractere.",
              },
              complemento: {
                bsonType: 'string',
                description: "O campo 'complemento' deve ser uma string e possui preenchimento opcional.",
              },
              cep: {
                bsonType: 'string',
                minLength: 8,
                maxLength: 8,
                pattern: '^d{8}$',
                description: "O campo 'cep' deve ser uma string com, exatamente, 8 caracteres.",
              },
              cidade: {
                bsonType: 'string',
                minLength: 5,
                description: "O campo 'cidade' deve ser uma string com, no mínimo, 5 caracteres.",
              },
              uf: {
                bsonType: 'string',
                minLength: 2,
                maxLength: 2,
                pattern: '^AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO$',
                description: "O campo 'uf' deve ser uma string com, exatamente, 2 caracteres.",
              },
            },
          },
        },
      },
    },
  },
);
