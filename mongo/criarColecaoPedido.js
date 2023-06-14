use("ecomm");

db.createCollection("orders", {
	validator: {
		$jsonSchema: {
			bsonType: "object",
			required: ["_id", "dataPedido", "account", "enderecoEntrega", "itens"],
			additionalProperties: false,
			properties: {
				_id: {
					bsonType: "objectId",
					description: "Id da conta.",
				},
				dataPedido: {
					bsonType: "date",
					description: "O campo 'dataPedido' deve ser uma data válida.",
				},
				account: {
					bsonType: "object",
					required: ["accountId", "nomeCliente"],
					additionalProperties: false,
					properties: {
						accountId: {
							bsonType: "objectId",
							description: "O campo 'accountId' se refere ao id da conta.",
						},
						nomeCliente: {
							bsonType: "string",
							description: "O campo 'nomeCliente' deve ser uma string",
						},
					},
				},
				enderecoEntrega: {
					bsonType: "object",
					required: ["bairro", "rua", "numero", "cep", "cidade", "uf"],
					additionalProperties: false,
					properties: {
						bairro: {
							bsonType: "string",
							minLength: 1,
							description:
								"O campo 'bairro' deve ser uma string com, no mínimo, 1 caractere.",
						},
						rua: {
							bsonType: "string",
							minLength: 1,
							description:
								"O campo 'rua' deve ser uma string com, no mínimo, 1 caractere.",
						},
						numero: {
							bsonType: "string",
							minLength: 1,
							description:
								"O campo 'numero' deve ser uma string com, no mínimo, 1 caractere.",
						},
						complemento: {
							bsonType: "string",
							description:
								"O campo 'complemento' deve ser uma string e possui preenchimento opcional.",
						},
						cep: {
							bsonType: "string",
							minLength: 8,
							maxLength: 8,
							description:
								"O campo 'cep' deve ser uma string com, exatamente, 8 caracteres.",
						},
						cidade: {
							bsonType: "string",
							minLength: 5,
							description:
								"O campo 'cidade' deve ser uma string com, no mínimo, 5 caracteres.",
						},
						uf: {
							bsonType: "string",
							minLength: 2,
							maxLength: 2,
							description:
								"O campo 'uf' deve ser uma string com, exatamente, 2 caracteres.",
						},
					},
				},
				itens: {
					bsonType: "array",
					minItems: 1,
					description:
						"O campo 'telefone' deve ser uma string com, no mínimo, 10 caracteres.",
					items: {
						bsonType: "object",
						required: ["productId", "quantidade", "precoUnitario"],
						additionalProperties: false,
						properties: {
							productId: {
								bsonType: "objectId",
								description: "O campo 'productId' se refere ao id do produto.",
							},
							quantidade: {
								bsonType: "int",
								minimum: 1,
								description:
									"O campo 'quantidade' deve ser um número inteiro cujo valor é, no mínimo, 1.",
							},
							desconto: {
								bsonType: "decimal",
								minimum: 0,
								exclusiveMinimum: true,
								description:
									"O campo 'desconto' deve ser um valor decimal e, obrigatoriamente, maior que 0. Preenchimento opcional.",
							},
							precoUnitario: {
								bsonType: "decimal",
								minimum: 0,
								exclusiveMinimum: true,
								description:
									"O campo 'precoDecimal' deve ser um número decimal e, obrigatoriamente, maior que 0.",
							},
						},
					},
				},
			},
		},
	},
});
