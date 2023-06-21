use('ecomm');

const goodStockNivelProducts = db.products.find(
  { quantidadeEmEstoque: { $gte: 3 } },
  { _id: 1, nome: 1, quantidadeEmEstoque: 1 },
);

console.log(goodStockNivelProducts);
