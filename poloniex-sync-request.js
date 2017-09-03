import request from 'request'
import Promise from 'bluebird'

let baseUrl = 'https://poloniex.com/'
let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json; charset=utf-8'
}

// --------------------------------------------------
// SYNCHRONOUS CONNECTIONS TO POLONIEX
// --------------------------------------------------


// --------------------------------------------------
// Create a new Session by logging the user in
export function getTicker(){
  return new Promise(function(resolve, reject){
    let tickerOptions = {
      url: baseUrl + 'public?command=returnTicker',
      headers: headers
    }

    request.get(tickerOptions, function (error, response, body) {
      if (!error) {
        console.log(body)
        resolve(body);
        // let token = body.data
      }else{
        console.log(error)
        reject(error)
      }
    });
  })
}






// var prices = [1,2,3,4,5,6,7,8,9,10,12,13,15];
// var period = 2;

// console.log(EMA.calculate({period : period, values : prices}))




// var inputRSI = {
//   values : [127.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45,178.95,200.35,221.90,243.23,243.52,286.42,280.27,277.35,269.02,263.23,214.90],
//   period : 14
// }

// console.log(RSI.calculate(inputRSI))

// bittrex.getbalances( function( data, err ) {
//   console.log('BALANCES: ' + JSON.stringify(data) );
// });

// bittrex.getmarketsummary( { market : 'BTC-PINK'}, function( data, err ) {
//   console.log('MARKETSUMMARY: ' + JSON.stringify(data) );
// });

// bittrex.getbalance({ currency : 'BTC' }, function( data, err ) {
//   console.log('BITCOINBALANCE: ' + JSON.stringify(data) );
// });

// var websocketsclient = bittrex.websockets.subscribe(['BTC-ETH','BTC-SC','BTC-ZEN'], function(data) {
//   if (data.M === 'updateExchangeState') {
//     data.A.forEach(function(data_for) {
//       console.log('Market Update for '+ data_for.MarketName, data_for);
//     });
//   }
// });

// bittrex.getmarketsummaries( function( data, err ) {
//   if (err) {
//     return console.error(err);
//   }
//   for(let i in data.result ) {
//     bittrex.getticker( { market : data.result[i].MarketName }, function( ticker ) {
//       console.log( ticker );
//     });
//   }
// });

//import { getTicker } from './poloniex-sync-requests'

//getTicker()

// import autobahn from 'autobahn'
// let wsuri = "wss://api.poloniex.com";
// let connection = new autobahn.Connection({
//   url: wsuri,
//   realm: "realm1"
// });

// connection.onopen = function (session) {
//   function marketEvent (args,kwargs) {
//     console.log(args);
//   }
//   function tickerEvent (args,kwargs) {
//     console.log(args);
//   }
//   function trollboxEvent (args,kwargs) {
//     console.log(args);
//   }
//   session.subscribe('BTC_XMR', marketEvent);
//   session.subscribe('ticker', tickerEvent);
//   session.subscribe('trollbox', trollboxEvent);
// }

// connection.onclose = function () {
//   console.log("Websocket connection closed");
// }

// connection.open();

    //let currentSignalDifference = (macdOutput[entry]['MACD'] - macdOutput[entry]['signal'])
    //let profitMargin = 0
    // if (currentPositionStake > 0) {
    //   let initialPositionValue = currentPositionStake * currentPositionPrice
    //   let currentPositionValue = currentPositionStake * closingPrices[entry]
    //   profitMargin = (currentPositionValue / initialPositionValue) - 1
    //   console.log('INITIAL POSITION VALUE ' + initialPositionValue)
    //   console.log('CURRENT PRICE ' + closingPrices[entry])
    //   console.log('CURRENT POSITION VALUE ' + currentPositionValue)
    //   console.log('PROFIT MARGIN ' + profitMargin)
    // }
    // console.log('MACD: ' + macdOutput[entry]['MACD'])
    // console.log('Signal: ' + macdOutput[entry]['signal'])
    // console.log(macdOutput[entry]['MACD'] / macdOutput[entry]['signal'])








