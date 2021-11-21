# node-mongo-express

API with a single endpoint that fetches the data from the MongoDB collection and return the results in the requested format


### Requirements

* nodejs version >= 14
* npm version >= 7
* mongoDB


### Install and run

* `npm i` or `npm install` - install dependencies
* set environment variables `PORT`,`DB_URI`,`DB_NAME` and `COLLECTION_NAME` in `.env` file
* `npm start` - run the server

To run the tests:
* `npm test`

### API

After server is started you can send a POST request it.