const dotenv = require('dotenv');

const DEFAULT_PORT = 3000;
const DEFAULT_MONGODB_CONNECTION_URL = 'mongodb://localhost:27017';
const DEFAULT_URL = 'http://localhost:8080';

dotenv.config();

module.exports = {
	"DB_URI": process.env.DB_URI || DEFAULT_MONGODB_CONNECTION_URL,
	"PORT": process.env.PORT || DEFAULT_PORT,
	"API_URL": process.env.Server_URL || DEFAULT_URL
};