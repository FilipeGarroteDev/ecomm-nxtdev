use('ecomm');

const products = db.products.find({
  $and: [{ precoUnitario: { $gte: 1000 } }, { precoUnitario: { $lte: 2000 } }],
});

console.log(products);
