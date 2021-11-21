const fetch = require('node-fetch');
const expect = require('chai').use(require('chai-as-promised')).expect;
var config = require('../lib/config');

let apiUrl = config.API_URL;
var options = {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' }
};

describe('Validation errors:', function () {
	it('POST / with wrong startDate - should return error', async function () {
		options['body'] = JSON.stringify({
			"startDate": "20128-120-01",
			"endDate": "2018-01-30",
			"minCount": 2700,
			"maxCount": 3000
		});

		let respData = await fetch(`${apiUrl}`, options);
		let json = await respData.json();
		console.log('json here: ', JSON.stringify(json));

		if (json.code) {
			expect(json).to.haveOwnProperty('code').to.equal(1);
		}
		if (json.msg) {
			expect(json).to.haveOwnProperty('msg').to.equal("Type, value or length mismatch for the property 'startDate'.");
		}
	});

	it('POST / with wrong endDate - should return error', async function () {
		options['body'] = JSON.stringify({
			"startDate": "2016-12-01",
			"endDate": "2012s8-01-30",
			"minCount": 2700,
			"maxCount": 3000
		});

		let respData = await fetch(`${apiUrl}`, options);
		let json = await respData.json();
		console.log('json here: ', JSON.stringify(json));

		if (json.code) {
			expect(json).to.haveOwnProperty('code').to.equal(1);
		}
		if (json.msg) {
			expect(json).to.haveOwnProperty('msg').to.equal("Type, value or length mismatch for the property 'endDate'.");
		}
	});

	it('POST / with wrong minCount - should return error', async function () {
		options['body'] = JSON.stringify({
			"startDate": "2016-12-01",
			"endDate": "2018-01-30",
			"minCount": "2700",
			"maxCount": 3000
		});

		let respData = await fetch(`${apiUrl}`, options);
		let json = await respData.json();
		console.log('json here: ', JSON.stringify(json));

		if (json.code) {
			expect(json).to.haveOwnProperty('code').to.equal(1);
		}
		if (json.msg) {
			expect(json).to.haveOwnProperty('msg').to.equal("Type, value or length mismatch for the property 'minCount'.");
		}
	});

	it('POST / with wrong maxCount - should return error', async function () {
		options['body'] = JSON.stringify({
			"startDate": "2016-12-01",
			"endDate": "2018-01-30",
			"minCount": 2700,
			"maxCount": "3000"
		});

		let respData = await fetch(`${apiUrl}`, options);
		let json = await respData.json();
		console.log('json here: ', JSON.stringify(json));

		if (json.code) {
			expect(json).to.haveOwnProperty('code').to.equal(1);
		}
		if (json.msg) {
			expect(json).to.haveOwnProperty('msg').to.equal("Type, value or length mismatch for the property 'maxCount'.");
		}
	});
})

describe('Input errors:', function () {
	it('POST / with startDate >= endDate - should return error', async function () {
		options['body'] = JSON.stringify({
			"startDate": "2019-12-01",
			"endDate": "2018-01-30",
			"minCount": 2700,
			"maxCount": 3000
		});

		let respData = await fetch(`${apiUrl}`, options);
		let json = await respData.json();
		console.log('json here: ', JSON.stringify(json));

		if (json.code) {
			expect(json).to.haveOwnProperty('code').to.equal(2);
		}
		if (json.msg) {
			expect(json).to.haveOwnProperty('msg').to.equal("startDate should be less than endDate");
		}
	});

	it('POST / with minCount >= maxCount - should return error', async function () {
		options['body'] = JSON.stringify({
			"startDate": "2016-12-01",
			"endDate": "2018-01-30",
			"minCount": 22700,
			"maxCount": 3000
		});

		let respData = await fetch(`${apiUrl}`, options);
		let json = await respData.json();
		console.log('json here: ', JSON.stringify(json));

		if (json.code) {
			expect(json).to.haveOwnProperty('code').to.equal(3);
		}
		if (json.msg) {
			expect(json).to.haveOwnProperty('msg').to.equal("minCount should be less that maxCount");
		}
	});
})

describe('Return data - with filters:', function () {
	it('POST / with all filters - return filtered records', async function () {
		options['body'] = JSON.stringify({
			"startDate": "2016-12-01",
			"endDate": "2018-01-30",
			"minCount": 2700,
			"maxCount": 3000
		});

		let respData = await fetch(`${apiUrl}`, options);
		let json = await respData.json();
		console.log('json here: ', JSON.stringify(json));

		if (json.code) {
			if (json.code == 0) {
				expect(json).to.haveOwnProperty('code').to.equal(0);
				expect(json).to.haveOwnProperty('msg').to.equal("Success");
				expect(json).to.haveOwnProperty('records');
			}
			if (json.code == 4) {
				expect(json).to.haveOwnProperty('code').to.equal(4);
				expect(json).to.haveOwnProperty('msg').to.equal("Something Went Wrong!!!");
			}
		}
	});
})