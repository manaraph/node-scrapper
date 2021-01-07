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
    // const total = list.reduce((accumulator, node)  => {
    //   const current = node.innerText;
    //   if (current.includes('sold')) {
    //     const amount = current.split(' ')[0];
    //     // amount.includes('+') ? 
    //     const currentSold = amount.split('+')[0];
    //     accumulator + currentSold;
    //   }
    // }, 0)

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
  console.log(data);
  return data;
};

module.exports = {
  scrapper,
};
