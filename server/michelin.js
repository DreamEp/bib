const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);
  const name = $('.section-main h2.restaurant-details__heading--title').text();
  const experience = $('#experience-section > ul > li:nth-child(2)').text();

  var adress = $('.fa-map-marker-alt').closest('li').text();
  adress = adress.slice(0, adress.length / 2);
  const priceAndType = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text();
  const price = priceAndType.split('•')[0].replace(/ /gi, '').replace(/\n/gi, '');
  const type = priceAndType.split('•')[1].replace(/\n/gi, '').trim();

  const phone = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div:nth-child(1) > div > div > a').attr('href');
  const website = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div.collapse__block-item.link-item > a').attr('href');

  const restaurant = {
    name: name,
    adress: adress,
    price: price,
    type: type,
    phone: phone,
    website:website,
    experience: experience
  };
  console.log(restaurant.name + " " + restaurant.adress + "\n");
  
  return restaurant;

};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
const get = async () => {
  var url = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/";
  var restaurants_urls = [];
  for(let i=1;i<16;i++)
  {
    try {
      url = url+i;
      const response = await axios(url);
      const {data, status} = response;
  
      console.log("load data")
      const $ = cheerio.load(data);
  
      
      $("div[class='col-md-6 col-lg-6 col-xl-3']").each( function () {
        var link = $('a', this).last().attr('href');
        restaurants_urls.push("https://guide.michelin.com" + link);
     });
  
      console.log(i)
    }
    catch (e) {
      console.log(e);
      process.exit(1);
    }
  }
  console.log(restaurants_urls);
  console.log(restaurants_urls.length)
  return restaurants_urls;
};

module.exports.scrapeAllRestaurant = async () => {
  const restaurants_urls = await get();
  var restaurants = {table:[]};
  let i = 1;
  for (url of restaurants_urls) {
    restaurants.table.push(await this.scrapeRestaurant(url));
    i++;
  }
  return restaurants;
};
