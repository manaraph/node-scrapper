class EventRepository {
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
      `SELECT * FROM events WHERE date = ?`,
      [date])
  }
  
  erase() {
    return this.dao.run(
      `TRUNCATE TABLE sales`
    )
  }
}
  
module.exports = EventRepository;
