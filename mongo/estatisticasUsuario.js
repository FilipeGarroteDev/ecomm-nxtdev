use("ecomm");

function performStatistics(usuario) {
	const user = db.accounts.find({ usuario });

	if (!user) return console.log("O usuário informado não existe");

	const statisticData = db.orders.aggregate([
		{
			$match: {
				"account.nomeCliente": usuario,
			},
		},
		{
			$unwind: "$itens",
		},
		{
			$group: {
				_id: "$account.nomeCliente",
				totalItensQuantity: { $sum: "$itens.quantidade" },
				totalSpent: {
					$sum: {
						$multiply: ["$itens.precoUnitario", "$itens.quantidade"],
					},
				},
				totalSavedDiscount: { $sum: "$itens.desconto" },
			},
		},
	]);


	console.log(statisticData);
}
performStatistics("Filipe Garrote");
