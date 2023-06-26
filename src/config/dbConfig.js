import mongoose from 'mongoose';

const database = process.argv[6] === '--test' ? 'ecomm-test' : 'ecomm';
const host = process.env.HOST_MONGO ? process.env.HOST_MONGO : 'localhost';
console.log(host);
mongoose.connect(`mongodb://admin:secret@${host}:27017/ecom${database}?authSource=admin`);

const db = mongoose.connection;

export default db;
