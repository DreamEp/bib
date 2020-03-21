const axios = require('axios');
const cheerio = require('cheerio');

//Function to calculate distance with gps localisation
function calculate_distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */

//Function to parse all the data needed on a page
const parse = data => {
  //load the page and saved it in $ thanks to cheerio library
  const $ = cheerio.load(data);

  //Scrape the data given the path to acced to it in the current page
  const name = $('.section-main h2.restaurant-details__heading--title').text();
  const address = $('.restaurant-details__heading > ul > li:nth-child(1)').text();
  const street = address.split(',')[0];
  var city =address.split(',')[1];
  //Using of trim to delete all the blank space before and after the information needed
  if(city != undefined) city = city.trim();
  var postal_code = address.split(',')[2];
  if(postal_code != undefined) postal_code = postal_code.trim();
  var state= address.split(',')[6];
  if(state != undefined) state = state.trim();

  var price_min= $('div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text().split('\n')[2];
  if(price_min != undefined) price_min = price_min.trim();
  price_min = parseFloat(price_min);
  var price_max = $('div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text().split('\n')[5];
  if(price_max != undefined) price_max = price_max.trim();
  price_max = parseFloat(price_max);
  var average_price = ((price_max - price_min)/2).toFixed(2)

  var type = $('div.restaurant-details__heading.d-lg-none > ul > li.restaurant-details__heading-price').text().split('•')[1];
  if(type != undefined) type = type.trim();

  //take the phone number and return it in the format need to fill the one given by maitre_restaurateur pages too. 
  //0225648798 for exemple
  var phone = $('span[x-ms-format-detection="none"]').text().trim();
	phone=phone.replace(/\s/g, '');
	phone=phone.substring(3)
  phone="0".concat(phone);

  //Take the geolocalisation of the esilv
  const esilv_pos = ['48.896166', '2.235912'];
  const esilv_lat = parseFloat(esilv_pos[0]).toFixed(2);
  const esilv_long = parseFloat(esilv_pos[1]).toFixed(2);
  
  //Take the geolocalisation of the restaurant in an array of size 2
  const position_restau = $(".section-main div.row div.google-map__static")
  ["0"].children[1].attribs.src.split("=")[2]
  .split(",");
  const restau_lat = parseFloat(position_restau[0]).toFixed(2);
  const restau_long = parseFloat(position_restau[1]).toFixed(2);

  //Calculate distance between the restaurant and the esilv calling calculate_distance function
  const distance = calculate_distance(esilv_lat, esilv_long, restau_lat, restau_long).toFixed(2);

  const website = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section:nth-child(4) > div.row > div:nth-child(1) > div > div.collapse__block-item.link-item > a').attr('href');
  
  var experience =$('#experience-section > ul > li:nth-child(2)').text().split('\n')[2];
  if(experience != undefined) experience = experience.trim();

  console.log("New restaurant scrapped :\t" + name + " - " + city + ", " + state + ", " + distance);

  //return all the information needed
  return  {
    name,
    type,
    street,
    city,
    postal_code,
    state,
    average_price,
    phone,
    website,
    restau_lat,
    restau_long,
    distance,
    experience
  };
}

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */

 //Function to scrape a restaurant on the url given, calling parse function
module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    //called the parse function to parse the data on the url given
    return parse(data);
  }

  console.error(status);

  return null;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */

//Function which return all the urls of differents bib gourmand in an array
const get = async () => {
  //take the main page of bib gourmand restaurant as a base page
  const base = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/";
  var restaurants_urls = [];
  //loop through the pages of the base page to get all the bob gourmand restaurants on each pages
  for(let i=1;i<18;i++)
  {
    try {
      console.log("Get all url on page : " + i)

      //Change the url of the current page each iteration
      url = base+i.toString();
      const response = await axios(url);
      const {data, status} = response;
  
      const $ = cheerio.load(data);
      //Get the link following the right path on the inspection page
      const links = $("a[class='link']")

      //push the links in the array following the right implementation of a link
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
  //return our array of links_restaurants
  return restaurants_urls;
};

//Function which call or get and scrapeRestaurant function to return all the information of each bib gourmand restaurants
module.exports.scrapeAllRestaurant = async () => {
  //get the array of differents restaurants url using get function
  const restaurants_urls = await get();
  let restaurants = [];
  for (url of restaurants_urls) {
    //Scrape all restaurant given his url
    restaurants.push(await this.scrapeRestaurant(url));
  }
  //return all the informations
  return restaurants;
};
