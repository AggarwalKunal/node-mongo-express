console.log('MongoDB Connection');
const config = require('../config');
const MongoClient = require('mongodb').MongoClient;

/** Create mongodb client 
 * { useUnifiedTopology: true } removes connection warnings;
*/
module.exports = new MongoClient(config.DB_URI, { useUnifiedTopology: true });