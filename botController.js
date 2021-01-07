const puppeteer = require('puppeteer');

const scrapper = async () => {
  // Launch the browser
  const browser = await puppeteer.launch();
  // Create an instance of the page
  const page = await browser.newPage();
  // Go to the web page that we want to scrap
  await page.goto('https://www.imdb.com/title/tt1013752/');

  // Here we can select elements from the web page
  const data = await page.evaluate(() => {
    const title = document.querySelector(
      '#title-overview-widget > div.vital > div.title_block > div > div.titleBar > div.title_wrapper > h1'
    ).innerText;
    const summary = document.querySelector(
      '#title-overview-widget > div.plot_summary_wrapper > div.plot_summary > div.summary_text'
    ).innerText;
    // This object will be stored in the data variable
    return {
      title,
      summary,
    };
  });

  // Here we can do anything with this data
  // We close the browser
  await browser.close();
  console.log(data);
}

module.exports = {
  scrapper,
}
