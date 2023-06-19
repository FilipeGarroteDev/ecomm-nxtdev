use('ecomm');

const booksAndCellphones = db.products.find({
  $or: [{ categoria: 'LIVROS' }, { categoria: 'CELULARES' }],
});

console.log(booksAndCellphones);
