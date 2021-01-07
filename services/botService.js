const puppeteer = require('puppeteer');

const scrapper = async (url) => {
  // Launch the browser
  const browser = await puppeteer.launch();
  // Create an instance of the page
  const page = await browser.newPage();
  // Go to the web page that we want to scrap
  await page.goto(url);

  // Here we can select elements from the web page
  const data = await page.evaluate(() => {
    const nodes = document.querySelectorAll(
      '#srp-river-results > ul > li > div > div.s-item__info.clearfix > div.s-item__details.clearfix > div > span > span'
    );
    const list = [].slice.call(nodes);
    const sold = list
      .map( (e) => {
        return e.innerText;
      })
      .join('\n');
    return {
      sold,
    };
  });

  await browser.close();
  return data;
};

const getSales = async () => {
  const start = new Date().getTime();
  const ps5Sales = await scrapper(
    'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=ps5&_sacat=0'
  );
  const xboxSales = await scrapper(
    'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1312&_nkw=xbox+series+x&_sacat=0&LH_TitleDesc=0&_osacat=0&_odkw=ps5'
  );
  const end = new Date().getTime();
  const time = ((end - start) / 1000).toFixed(2);
  const responseTime = `${time} seconds`;
  const data = {
    responseTime,
    ps5Sales,
    xboxSales,
  };
  return data;
}

module.exports = {
  scrapper,
  getSales,
};
