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

  const address = $('.restaurant-details__heading > ul > li:nth-child(1)').text();
  const street = address.split(',')[0];
  var city =address.split(',')[1];
  if(city != undefined) city = city.trim();
  var postal_code = address.split(',')[2];
  if(postal_code != undefined) postal_code = postal_code.trim();
  var state= address.split(',')[6];
  if(state != undefined) state = state.trim();

  var price_min= $('div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text().split('\n')[2];
  if(price_min != undefined) price_min = price_min.trim();
  price_min = price_min + " euros";
  var price_max = $('div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text().split('\n')[5];
  if(price_max != undefined) price_max = price_max.trim();
  price_max = price_max + " euros";

  var type = $('div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text().split('•')[1];
  if(type != undefined) type = type.trim();

  var phone = $('span[x-ms-format-detection="none"]').text().trim();
	phone=phone.replace(/\s/g, '');
	phone=phone.substring(3)
	phone="0".concat(phone);
  const website = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div.collapse__block-item.link-item > a').attr('href');
  
  var experience =$('#experience-section > ul > li:nth-child(2)').text().split('\n')[2];
  if(experience != undefined) experience = experience.trim();

  console.log("New restaurant scrapped :\t" + name + " - " + city + ", " + state);

  return  {
    name,
    type,
    street,
    city,
    postal_code,
    state,
    price_min,
    price_max,
    phone,
    website,
    experience
  };
}

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
  const base = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/";
  var restaurants_urls = [];
  for(let i=1;i<18;i++)
  {
    try {
      console.log("Get all url on page : " + i)

      url = base+i.toString();
      const response = await axios(url);
      const {data, status} = response;
  
      const $ = cheerio.load(data);
  
      const links = $("a[class='link']")

      if (links.length == 0) break
      else links.each(function(){restaurants_urls.push("https://guide.michelin.com" + $(this).attr('href'))}) 
      
    }
    catch (e) {
      console.log(e);
      process.exit(1);
    }
  }
  console.log("List of url restaurants : ");
  console.log(restaurants_urls);
  console.log("Number of url found : " + restaurants_urls.length)
  return restaurants_urls;
};


module.exports.scrapeAllRestaurant = async () => {
  const restaurants_urls = await get();
  let restaurants = [];
  let i = 1;
  for (url of restaurants_urls) {
    restaurants.push(await this.scrapeRestaurant(url));
    i++;
  }
  return restaurants;
};
