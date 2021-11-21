const con = require('../lib/conf/mongo');
const database = require("../lib/database");
const getAggregateSteps = require('./getAggregateSteps');

/**
 * Function to get data from db
 * @param {*} data 
 */
function fetchData(data) {
	if (typeof (data) == "string") {
		try {
			data = JSON.parse(data);
		}
		catch (error) {
			console.log('parse-err: ', error);
		}
	}
	console.log('check-data-fetch-db: ', data);

	return new Promise(async (resolve, reject) => {
		if (data.startDate && data.endDate && (data.startDate >= data.endDate)) {
			reject({ "code": 2, "msg": "startDate should be less than endDate" });
		}
		if (data.minCount && data.maxCount && (data.minCount >= data.maxCount)) {
			reject({ "code": 3, "msg": "minCount should be less that maxCount" });
		}

		let client = await con.connect();

		try {
			let resp = { "code": 0, "msg": "Success", "records": [] };

			let filters = getAggregateSteps(data);

			let res = await client.db(database.Databases["DBName"]).collection(database.Collections["CollectionName"]).aggregate(filters).toArray();
			console.log('mongo-res: ', JSON.stringify(res));

			if (res && res.length) {
				resp["records"] = res;
			}

			resolve(resp);
		}
		catch (error) {
			console.log('mongo-err: ', error);
			reject({ "code": 4, "msg": "Something Went Wrong!!!" });
		}
		finally {
			client.close();
		}
	})
};

module.exports = fetchData;