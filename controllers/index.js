const { salesRepo, initiateDB } = require('../services');
const { getSales, saveSales } = require('../services/util');

const getDailySales = async (req, res) => {
  const data = await getSales();
  res.status(200).json({
    status: 'success',
    data,
  });
};

const createDailySale = async (req, res) => {
  const { ps5Sales, xboxSales, date, responseTime } = req.body;
  const { data } = await saveSales(ps5Sales, xboxSales, date, responseTime);
  return res.status(200).json({
    status: 'success',
    data,
  });
};

const getAllSales = async (req, res) => {
  const data = await salesRepo.getAll();
  res.status(200).json({
    status: 'success',
    data,
  });
};

const getSalesByDate = async (req, res) => {
  const { date } = req.query;
  const data = await salesRepo.getSalesByDate(date);
  res.status(200).json({
    status: 'success',
    data,
  });
};

const eraseARecord = async (req, res) => {
	const { date } = req.query;
	const data = await salesRepo.deleteSalesByDate(date);
  res.status(200).json({
    status: 'success',
    data,
  });
};

const eraseSales = async (req, res) => {
	const data = await salesRepo.erase();
	initiateDB();
  res.status(200).json({
    status: 'success',
    data,
  });
};

module.exports = {
  getDailySales,
  createDailySale,
  getAllSales,
	getSalesByDate,
	eraseARecord,
	eraseSales,
};
