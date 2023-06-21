use('ecomm');

db.products.createIndex({ nome: 1 });
db.products.createIndex({ precoUnitario: 1 });
db.products.createIndex({ categoria: 1 });

console.log(db.products.getIndexes());
