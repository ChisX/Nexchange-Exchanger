var request = require('request');
let baseURL = 'https://api.n.exchange/en/api/v1/';

module.exports = new class Exchanger {
  async AvailablePair(coins) {
    return new Promise((resolve,reject) => {
      request(baseURL+'pair/', (error, response, body) => {
        if (error) { reject(error); }
        if (JSON.parse(body).find(item => { return item.name = coins; })) { resolve(true); } else { resolve(false); }
      });
    })
  }
  
  async PairPrice(coins) {
    return new Promise((resolve,reject) => {
      request(baseURL+'get_price/'+coins, (error, response, body) => {
        if (error) { reject(error); }
        resolve(JSON.parse(body).price);
      });
    })
  }
  
  async checkCompleted(reference) {
    return new Promise((resolve,reject) => {
      request({
        method: 'GET',
        url: `https://api.n.exchange/en/api/v1/orders/${reference}/`,
        headers: { 'Content-Type': 'application/json' },
      }, (error, response, body) => {
        if (error) { reject(err); } else { resolve(JSON.parse(body).status_name[1]); }
      });
    })
  }
}

// let COIN1 = 'BTC';
// let COIN2 = 'XMR';
// AvailablePair(COIN1+COIN2).then(info => {console.log(info);})
// PairPrice(COIN1+COIN2).then(info => {console.log(info);})
