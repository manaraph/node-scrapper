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

module.exports = {
  scrapper,
};
