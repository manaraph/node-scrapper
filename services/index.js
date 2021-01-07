const AppDAO = require('./dao');
const SalesRepository = require('./salesRepository');

const dao = new AppDAO('./salesbot.sqlite3');
const salesRepo = new SalesRepository(dao);

const initiateDB = async () => {
	try {
		await salesRepo.createTable();
		console.log('Database Initiated.');
	} catch (error) {
		console.log(error);
	}
} 

module.exports = {
	initiateDB,
	salesRepo,
};
