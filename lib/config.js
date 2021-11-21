const dotenv = require('dotenv');

const DEFAULT_PORT = 3000;
const DEFAULT_MONGODB_CONNECTION_URL = 'mongodb://localhost:27017';

dotenv.config();  //load configs from .env to process.env

module.exports = {
	"DB_URI": process.env.DB_URI || DEFAULT_MONGODB_CONNECTION_URL,
	"PORT": process.env.PORT || DEFAULT_PORT
};