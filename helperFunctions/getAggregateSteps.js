/**
 * Function to create query part for mongo and return for getting results
 * @param {*} filters 
 * @returns 
 */
function getAggregateSteps(filters) {
	const dateQuery = {};
	if (filters.startDate) {
		dateQuery.createdAt = dateQuery.createdAt || {};
		dateQuery.createdAt.$gt = new Date(filters.startDate);
	}
	if (filters.endDate) {
		dateQuery.createdAt = dateQuery.createdAt || {};
		dateQuery.createdAt.$lt = new Date(filters.endDate);
	}

	const countQuery = {};
	if (filters.minCount) {
		countQuery.totalCount = countQuery.totalCount || {};
		countQuery.totalCount.$gt = filters.minCount
	}
	if (filters.maxCount) {
		countQuery.totalCount = countQuery.totalCount || {};
		countQuery.totalCount.$lt = filters.maxCount
	}

	return [
		{ $match: dateQuery },
		{
			$project: {
				_id: 0,
				key: 1,
				createdAt: 1,
				totalCount: { $sum: '$counts' }
			}
		},
		{ $match: countQuery }
	];
}

module.exports = getAggregateSteps;