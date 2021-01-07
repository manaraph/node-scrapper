class EventRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY,
      date DATETIME,
      ps5_sales INTEGER,
      xbox_sales INTEGER`;
    return this.dao.run(sql)
  }
  
  create(id, date, ps5_sales, xbox_sales) {
		return this.dao.run(
			'INSERT INTO events (id, date, ps5_sales, xbox_sales) VALUES (?, ?, ?, ?)',
			[id, date, ps5_sales, xbox_sales])
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
