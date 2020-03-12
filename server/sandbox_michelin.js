/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');


async function sandbox_michelin () {
  try {
    console.log(`🕵️‍♀️  browsing  source`);

    const restaurants = await michelin.scrapeAllRestaurant();

    console.log(restaurants);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, searchLink] = process.argv;


sandbox_michelin()