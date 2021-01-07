// const { salesRepo } = require('../services');

const { getSales } = require('../services/botService');

const getDailySales = async (req, res) => {
	const data = await getSales();
	res.status(200).json({
		status: 'success',
		data,
	});
};

module.exports = {
	getDailySales,
};;