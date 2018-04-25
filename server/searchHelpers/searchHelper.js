const bestBuy = require('./bestbuy.js');
const ebay = require('./ebay.js');

// module.exports = function(searchString) {
  const bubbleSortByPrice = function(arr) {

    //do this loop as many times as there are elements in the array
    let x = 0;
    while (x < arr.length) {
    //for loop
      for (var i = 0; i < arr.length - 1; i++) {
      //compare the first index to the next index
        //if the second price is greater than the first price
        if (parseFloat(arr[i + 1].price) > parseFloat(arr[i].price)) {
          //store the value of the second
          let storage = arr[i + 1];
          //set the vaue of the second as the first
          arr[i + 1] = arr[i]; 
          //set the value of the first as the storage
          arr[i] = storage;
        }
      }
      x++;
    }
  
    return arr;
  };

  async function aggregateResults(searchString) {
    let ebayResults = await ebay(searchString);
    let bestBuyResults = await bestBuy(searchString);
    
    return ebayResults.concat(bestBuyResults);
  }
  
 return bubbleSortByPrice(aggregateResults(searchString));
};

