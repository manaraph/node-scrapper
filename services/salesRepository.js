class SalesRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      ps5Sales TEXT,
      xboxSales TEXT,
      responseTime TEXT)`;
    return this.dao.run(sql)
  }
  
  create(ps5Sales, xboxSales, date, responseTime) {
		return this.dao.run(
			'INSERT INTO sales (ps5Sales, xboxSales, date, responseTime) VALUES (?, ?, ?, ?)',
			[ps5Sales, xboxSales, date, responseTime])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM sales`)
  }

  getSalesByDate(date) {
    return this.dao.get(
      `SELECT * FROM sales WHERE date = ?`,
      [date])
  }

  deleteSalesByDate(date) {
    return this.dao.get(
      `DELETE FROM sales WHERE date = ?`,
      [date])
  }
  
  erase() {
    return this.dao.run(
      `DROP TABLE IF EXISTS sales;`
    )
  }
}
  
module.exports = SalesRepository;
