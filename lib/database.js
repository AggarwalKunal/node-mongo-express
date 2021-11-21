const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	"Databases": {
		"DBName": process.env.DB_NAME || ``
	},
	"Collections": {
		"CollectionName": process.env.COLLECTION_NAME || ``
	}
};