use('ecomm');
const activeCategories = db.categories.find({ status: 'ATIVA' });
console.log(activeCategories);
