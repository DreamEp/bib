/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const fs = require('fs');



async function sandbox_michelin () {
  try {
    console.log(`🕵️‍♀️  browsing  source`);

    const restaurants = await michelin.scrapeAllRestaurant();

    console.log(restaurants);
    console.log("Scraping of all michelin restaurants done");

    const restaurants_to_json = [];

    for (let i = 0; i < restaurants.length;i++) {		
      const restaurant = restaurants[i];
      restaurants_to_json.push(JSON.stringify(restaurant,null,2));
    }
    
    fs.appendFileSync('Michelin.json',"[ \n");
    fs.appendFileSync('Michelin.json',restaurants_to_json);
    fs.appendFileSync('Michelin.json',"]");

    console.log("Json file sorted with all michelin restaurants");

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, searchLink] = process.argv;




sandbox_michelin()