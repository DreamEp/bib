const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');


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

    maitres.push(JSON.stringify({ name: name, address: address, phone: phone }, null, 2));

  });
};


module.exports.scrapeRestaurant = async (current_page) => {
  maitres = [];
  const response = await axios.post('https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult/', querystring.stringify({
      page: `${current_page}`,
      sort: 'undefined',
      request_id: '65d735289ed77565f95d90c43afe5398'
    })
  );
  const {data, status} = response;
  
  if (status >= 200 && status < 300) {
    yes = parse(data, maitres);
  }

  return maitres;
};