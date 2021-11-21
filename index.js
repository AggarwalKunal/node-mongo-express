/** Require modules and config files */
const express = require('express');
const config = require('./lib/config');

/** Add helper function */
const fetchData = require('./helperFunctions/fetchData');
const schemaValidate = require('./helperFunctions/schemaValidate');

/** Create express application */
const app = express();

/** Accept JSON input in express application */
app.use(express.json());

/** For default purpose, using get method */
app.get("/", (req, res) => res.send("Welcome !!!"));

/** POST API */
app.post("/", async (req, res) => {
	try {
		let body = req.body;
		await schemaValidate(body);
		let data = await fetchData(body);
		res.send(data);
	}
	catch (error) {
		res.status(400).send(error);
	}
})

app.listen(config.PORT, () => console.log(`Server is up and running on port ${config.PORT}`));