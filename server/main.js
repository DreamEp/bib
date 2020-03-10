/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');

restaurants_url = [];
restaurants_url = michelin.get();
for(var i =0; i <restaurants_url.length; i++){
    michelin.scrapeRestaurant(restaurants_url[i])
}


