const express = require('express');
const { getDailySales, createDailySale, getAllSales, getSalesByDate, eraseSales, eraseARecord } = require('../controllers');

const router = express.Router();

router.get('/', (req, res, next) => {
	res.json({
		status: 'success',
		message: 'A puppeteer bot in Node.js that pulls and spits out the number of sold PS5’s and Xbox Series X per day on eBay.',
	})
});

router.get('/sales', getDailySales);
router.post('/sales', createDailySale);
router.get('/sales/getAll', getAllSales);
router.get('/sales/byDate', getSalesByDate);
router.delete('/sales/byDate', eraseARecord);
router.delete('/sales/erase', eraseSales);

module.exports = router;
