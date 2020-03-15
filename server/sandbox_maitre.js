const maitre = require('./maitre');
const fs = require('fs');
const nbdepages = 154; //selector


async function sandbox_maitre(page) {
  try {

    const restaurant = await maitre.scrapeRestaurant(page);
    fs.appendFileSync('Maitre.json',restaurant);
    fs.appendFileSync('Maitre.json',"]");
    console.log(restaurant);
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, searchLink] = process.argv;



async function first()
{
  for (let i = 1; i< nbdepages+1 ; i++)
  {
    console.log("🕵️‍♀️  browsing  page : " + i.toString());

    await sandbox_maitre(i);
  }
}

first();
