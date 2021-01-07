const puppeteer = require('puppeteer');
const { salesRepo } = require('.');

// Get formatted date
const getDateOnly = (datetime) =>
  `${datetime.getMonth() + 1}/${datetime.getDate()}/${datetime.getFullYear()}`;

const scrapper = async (url) => {
  // Launch the browser
  const browser = await puppeteer.launch();
  // Create an instance of the page
  const page = await browser.newPage();
  // Go to the web page that we want to scrap
  await page.goto(url);

  // Select elements from the web page
  const data = await page.evaluate(() => {
    const nodes = document.querySelectorAll(
      '#srp-river-results > ul > li > div > div.s-item__info.clearfix > div.s-item__details.clearfix > div > span > span'
    );
    const list = [].slice.call(nodes);
    let total = 0;
    let plusIncluded = false;
    
    // Get total sales count
    list.forEach((node) => {
      const nodeText = node.innerText;
      if (nodeText.includes('sold')) {
        const count = nodeText.split(' ')[0];
        plusIncluded = plusIncluded || count.includes('+');
        const cleanCount = count.split('+')[0];
        total += Number(cleanCount);
      }
    });
    return { total, plusIncluded };
  });

  await browser.close();
  return data;
};

const getSales = async () => {
  const start = new Date().getTime();
  
  // Scrap ebay for Ps5 sales count
  const { total: ps5Count, plusIncluded: ps5PlusIncluded } = await scrapper(
    'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=ps5&_sacat=0'
  );

  // Scrap ebay for Xbox sales count
  const {total: xboxCount, plusIncluded: xboxPlusIncluded} = await scrapper(
    'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1312&_nkw=xbox+series+x&_sacat=0&LH_TitleDesc=0&_osacat=0&_odkw=ps5'
  );
  const date = new Date();
  const today = getDateOnly(date);
  const end = date.getTime();
  const time = ((end - start) / 1000).toFixed(2);
  const responseTime = `${time} seconds`;
  const ps5Sales = ps5PlusIncluded ? `${ps5Count}+ Ps5 sold on ${today}` : `${ps5Count} Ps5 sold on ${today}`;
  const xboxSales = xboxPlusIncluded ? `${xboxCount}+ Xbox sold on ${today}` : `${xboxCount} Xbox sold on ${today}`;
  const data = {
    responseTime,
    ps5Sales,
    xboxSales,
    date: today,
  };
  return data;
};

const saveSales = async (ps5Sales, xboxSales, date, responseTime) => {
	const data = await salesRepo.create(ps5Sales, xboxSales, date, responseTime);
	return {
		status: 'success',
		data,
	};
}

module.exports = {
  scrapper,
  getSales,
  getDateOnly,
  saveSales,
};
