const express = require('express');
const morgan = require('morgan');
const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
const { scrapper } = require('./botController');
const PORT = 5000;

/**
 * express application
 */
const app = express();
const server = http.Server(app);
const logDate = new Date().toISOString().substring(0, 10);
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const accessLogStream = fs.createWriteStream(path.join(__dirname, `./logs/${logDate}.log`), { flags: 'a+' });
app.use(morgan(':remote-addr\t\t:remote-user\t\t:date\t\t":method :url HTTP/:http-version"\t\t:status\t\t:response-time ms\t\t:res[content-length]\t\t":referrer"\t\t":user-agent"', { stream: accessLogStream }));
app.use(cors({ origin: true, credentials: true }));

// Schedule tasks to run daily on the server.
cron.schedule('0 0 * * *', async () => {
  await scrapper();
});

server.listen(PORT, () => {
  console.error(`Server running on http://localhost:${PORT}.`);
});
