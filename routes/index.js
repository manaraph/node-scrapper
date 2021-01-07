const express = require('express');

const router = express.Router();
const { getSalesForToday } = require('../controllers');

router.get('/', (req, res, next) => {
	res.json({
		message: 'Test endpoint ok',
	})
});

router.post('/sales', getSalesForToday);

module.exports = router;
