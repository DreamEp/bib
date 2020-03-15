const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');


const parse = data => {
  const $ = cheerio.load(data);
  var maitres = []

  $('div.annuaire_single').each(function (index, element) {
    
    var name = $(element).find('a').text();
    name = name.replace(/\n|  /g,'');
    name_tab = name.split(' (');

    var address = $(element).find('div.single_info3 > div:nth-child(2)').text();
    address = address.replace(/\n|  /g,'');

    var tel = $(element).find('div.single_info3 > div:nth-child(3)').text();
    tel = tel.replace(/\n| /g,'');

    //console.log(tel);

    maitres.push(JSON.stringify({ name: name_tab[0], address: address, tel: tel }, null, 2));

  });
  console.log(maitres);
  return maitres;
};


module.exports.scrapeRestaurant = async (current_page) => {
  const response = await axios.post('https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult/', querystring.stringify({
      page: `${current_page}`,
      sort: 'undefined',
      request_id: '65d735289ed77565f95d90c43afe5398'
    })
  );
  const {data, status} = response;
  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};