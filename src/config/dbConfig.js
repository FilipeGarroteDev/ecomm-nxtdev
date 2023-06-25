import mongoose from 'mongoose';

const database = process.argv[6] === '--test' ? 'ecomm-test' : 'ecomm';
mongoose.connect(`mongodb://admin:secret@localhost:27017/ecom${database}?authSource=admin`);

const db = mongoose.connection;

export default db;
