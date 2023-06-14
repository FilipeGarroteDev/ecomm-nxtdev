use("ecomm");

function comprarProduto(nome, quantidade, comprador) {
	const user = db.accounts.findOne({ usuario: comprador });
	const product = db.products.findOne({ nome });

	if (!user)
		return console.log(
			`Não existe nenhum usuário com o nome informado. Refaça a operação.`
		);

	if (!product)
		return console.log(`Não existe o produto informado. Refaça a operação.`);

	if (product.quantidadeEmEstoque < quantidade)
		return console.log(`Não há unidades do ${nome} disponíveis em estoque.`);

	db.orders.insertOne({
		dataPedido: new Date(),
		account: {
			accountId: user._id,
			nomeCliente: "Filipe Garrote",
		},
		enderecoEntrega: {
			bairro: "Jd. Monte Kemel",
			rua: "Av. da Renovação",
			numero: "13",
			cep: "01313-13",
			complemento: "apto 50",
			cidade: "São Paulo",
			uf: "SP",
		},
		itens: [
			{
				productId: product._id,
				quantidade,
				precoUnitario: NumberDecimal(product.precoUnitario),
				desconto: NumberDecimal("150.50"),
			},
		],
	});

	db.products.updateOne(
		{ nome },
		{ $inc: { quantidadeEmEstoque: -quantidade } }
	);
}

comprarProduto("Galaxy Tab S8", 2, "Filipe Garrote");
