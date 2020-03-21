const maitre = require('./maitre');
const fs = require('fs');
const nbdepages = 154; //selector

//Create the json file and write the current restaurant on it
async function sandbox_maitre(page) {
  try {
    //get the information on the current url 
    const restaurant = await maitre.scrapeRestaurant(page);
    //write the information on our json file
    fs.appendFileSync('Maitre.json',restaurant);
    console.log(restaurant);
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, searchLink] = process.argv;


//function to loop through the pages and scrape/write all information
async function main()
{
  //loop through the pages given the number of pages
  for (let i = 1; i< nbdepages+1 ; i++)
  {
    //call the sandbox_maitre function on the current page
    console.log("🕵️‍♀️  browsing  page : " + i.toString());
    await sandbox_maitre(i);
    //add a coma at the end of each object restaurant to respect json format
    if(i < nbdepages) fs.appendFileSync('Maitre.json',",");
  }
  //add a ] at the end of the document to respect json format
  fs.appendFileSync('Maitre.json',"]");
}

//add [ at the beggining of the document to respect json format
fs.appendFileSync('Maitre.json',"[ \n");

//execute our main function
main();


