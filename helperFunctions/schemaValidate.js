const validatedSchema = require('../lib/schemaFile');

/**
 * validate the input data
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function validate_all(data) {
	return new Promise((resolve, reject) => {
		// console.log('validate_all data: ', data);

		validatedSchema(data)
			.then(function (res) {
				// console.log('validate-res: ', res);
				resolve(res);
			})
			.catch(function (err) {
				// console.log('validate-err: ', JSON.stringify(err, null, 6));
				reject({ "code": 1, "msg": err.errors[0].message });
			})
	})
}

module.exports = validate_all;