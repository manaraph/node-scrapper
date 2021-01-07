// const { salesRepo } = require('../services');

const { getSales } = require('../services/botService');

const getSalesForToday = async (req, res) => {
	const data = await getSales();
	res.status(200).json({
		status: 'success',
		data,
	});
};

module.exports = {
	getSalesForToday,
};;