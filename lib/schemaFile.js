const Ajv = require('ajv');
const ajv = new Ajv.default({ allErrors: true });
// Ajv option allErrors is required
require('ajv-errors')(ajv);
require('ajv-formats')(ajv);

/**
 * AJV Schema for input validation
 */
const postSchema = {
	"$async": true,
	"type": "object",
	"additionalProperties": false,
	"properties": {
		"startDate": {
			"type": "string",
			"format": "date"
		},
		"endDate": {
			"type": "string",
			"format": "date"
		},
		"minCount": {
			"type": "number"
		},
		"maxCount": {
			"type": "number"
		}
	},
	"errorMessage": {
		"type": 'Value type does not match', // will not replace internal "type" error for the property "foo"
		"required": 'Missing properties in the request',
		"additionalProperties": 'Should not have additional properties',
		"properties": {
			"startDate": "Type, value or length mismatch for the property 'startDate'.",
			"endDate": "Type, value or length mismatch for the property 'endDate'.",
			"minCount": "Type, value or length mismatch for the property 'minCount'.",
			"maxCount": "Type, value or length mismatch for the property 'maxCount'."
		}
	}
};

const validate = ajv.compile(postSchema);

module.exports = validate;