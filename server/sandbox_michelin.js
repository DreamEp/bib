/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const fs = require('fs');


//Function to execute in order to return our json with all informations on each restaurants of bib gourmand
async function sandbox_michelin () {
  try {
    console.log("🕵️‍♀️  browsing  source ");

    //Saved all the information of each bib gourmand restaurant by calling ScrapeRestaurant function 
    const restaurants = await michelin.scrapeAllRestaurant();

    console.log(restaurants);
    console.log("Scraping of all michelin restaurants done");

    const restaurants_to_json = [];

    //Loop through the restaurants
    for (let i = 0; i < restaurants.length;i++) {		
      const restaurant = restaurants[i];
      //push in an array restaurant_to_json the current restaurant in the json format
      restaurants_to_json.push(JSON.stringify(restaurant,null,2));
    }
    
    //Create the json file using the array with all information in the json format
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



//execute the function
sandbox_michelin()