const express = require('express');
const morgan = require('morgan');
const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
const { scrapper } = require('./services/botService');
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

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, `./logs/${logDate}.log`),
  { flags: 'a+' }
);
app.use(
  morgan(
    ':remote-addr\t\t:remote-user\t\t:date\t\t":method :url HTTP/:http-version"\t\t:status\t\t:response-time ms\t\t:res[content-length]\t\t":referrer"\t\t":user-agent"',
    { stream: accessLogStream }
  )
);
app.use(cors({ origin: true, credentials: true }));

// Schedule tasks to run daily on the server.
cron.schedule('* * * * *', async () => {
  const start = new Date().getTime();
  const ps5Sales = await scrapper(
    'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=ps5&_sacat=0'
  );
  const xboxSales = await scrapper(
    'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1312&_nkw=xbox+series+x&_sacat=0&LH_TitleDesc=0&_osacat=0&_odkw=ps5'
  );
  console.log({
    ps5Sales,
    xboxSales,
  });
  const end = new Date().getTime();
  const time = end - start;
  console.log(time);
});

server.listen(PORT, () => {
  console.error(`Server running on http://localhost:${PORT}.`);
});
