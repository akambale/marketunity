var apiKey = require('./apiKeys.js');
var axios = require('axios');


module.exports = function(searchString) {
  var arr = [];

  var searchTerms = 'search=' + searchString.split(' ').join('&search=');

  var url = 'https://api.bestbuy.com/v1/products((' +
            searchTerms + 
            '))?apiKey=' + 
            apiKey.bestBuy +
            '&format=json';
  
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      arr = res.data.products;
      let results = arr.map(function(item) {
        return {
          name: item.name,
          url: item.url,
          price: item.salePrice,
          image: item.largeFrontImage,
          description: item.shortDescription
        };
      });
      resolve(results);
    }).catch(error => {
      reject(err);
    });
  });
};