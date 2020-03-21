const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');

//parse the data on the given page
const parse = data => {
  const $ = cheerio.load(data);
  $('div.annuaire_single').each(function (index, element) {
    
    var name =  $(element).find('a').text().trim();
    const sep = name.indexOf(' (');
    name = name.substring(0,sep);

    var address = $(element).find('div.single_info3 > div:nth-child(2)').text();
    address = address.replace(/\n|  /g,'');

    var phone = $(element).find('div.single_info3 > div:nth-child(3)').text();
    if (phone!=undefined)
    {
      phone=phone.trim().replace(/,/g, '').split(" ").join("");
    }
    //push the information in the json format given the key and id
    maitres.push(JSON.stringify({ name: name, address: address, phone: phone }, null, 2));

  });
};

//scrape the restaurants on the current page
module.exports.scrapeRestaurant = async (current_page) => {
  maitres = [];
  //need to use post function to fill the network status of the page or we can't acced to the information
  const response = await axios.post('https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult/', querystring.stringify({
    //go to the base page and then add the request id of our post function, and the page needed by using current page
      page: `${current_page}`,
      sort: 'undefined',
      request_id: '65d735289ed77565f95d90c43afe5398'
    })
  );
  const {data, status} = response;
  
  //parse all the restaurant on the given page and push them in our maitre array in the json format
  if (status >= 200 && status < 300) {
    yes = parse(data, maitres);
  }

  return maitres;
};