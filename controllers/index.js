const { getSales, saveSales } = require('../services/util');

const getDailySales = async (req, res) => {
	const data = await getSales();
	res.status(200).json({
		status: 'success',
		data,
	});
};

const createDailySale = async (req, res) => {
	const { ps5Sales, xboxSales, date, responseTime } = req.body
	const { data } = await saveSales(ps5Sales, xboxSales, date, responseTime);
	return res.status(200).json({
		status: 'success',
		data,
	});
};

module.exports = {
	getDailySales,
	createDailySale,
};;