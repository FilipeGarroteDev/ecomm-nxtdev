use('ecomm');

const soldBooks = db.products.updateMany(
  { categoria: 'LIVROS' },
  { $set: { estoque: 0 } },
);

console.log(soldBooks);
