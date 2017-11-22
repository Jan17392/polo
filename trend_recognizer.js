import { MACD, RSI, WMA } from 'technicalindicators'
import { getCandles, getBalance, placeOrder, getMarketSummary } from './bittrex-request'
import { store, updateCurrentSignal, registerTrendTrade, unregisterTrendTrade } from './store'
import * as admin from 'firebase-admin'
import { CronJob } from 'cron'
import _ from 'underscore'

const serviceAccountCryptoTracker = "./cryptotracker-firebase.json"
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountCryptoTracker),
  databaseURL: "https://cryptotracker-de36f.firebaseio.com/"
})
let database = admin.database()

const altcoinsToMonitor = [
  'PAY', 'LTC', 'IOP', 'OK', 'NEO', 'PINK',
  'OMG', 'WINGS', 'ETH', 'LSK', 'BCC', 'KMD',
  'MCO', 'QTUM', 'NAV', 'XRP', 'PAY', 'XVG',
  'DGB', 'DASH', 'BCC', 'EBST', 'START', 'ARK',
  'TRIG', 'RISE', 'BAT', 'ZEC', 'SC', 'NXC',
  'RDD', 'SYNX', 'DOGE', 'STRAT', 'BTS', 'UBQ',
  'GAME', 'WAVES', 'SNT', 'PTOY', 'BURST', 'ENRG',
  'BTG', 'CVC', 'MTL', 'ETC', 'XLM', 'DNT', 'ADX',
  'FUN', 'SLR', 'GRS', 'VTC', 'XRM', 'BAY', 'XZC',
  'SWT', 'MUE', 'INCNT', 'RCN', 'CANN', 'ARDR',
  'MONA', 'FCT', 'SYS', 'PIVX', 'SALT', 'NXS', 'GNT',
  'BITB', 'RDD'
]

const fraction = 0.1
const minEdge = 1.0325
const minBV = 3
const period = 50

new CronJob('*/2 * * * *', function() {
  for(let entry in altcoinsToMonitor){
    console.log('Running Calculation for ' + altcoinsToMonitor[entry])
    runCalculation(altcoinsToMonitor[entry])
  }
}, null, true);

const runCalculation = (altcoin) => {
  let data = []
  let lastMACD = {}
  let closingPrices = []

  getCandles(altcoin, 'hour')
    .then(data => {
      let thisClosingPrice = data['result'][data['result'].length - 1]['C']
      let previousClosingPrice = data['result'][data['result'].length - 2]['C']
      //managePlacedTrades(altcoin, thisClosingPrice, previousClosingPrice)
      return weightedAverage(data['result'])
    })
    .then(buyResult => {
      if (buyResult['isActive'] === 'true') {
        console.log('This is an awesome time to buy ' + altcoin)
        // Register Trade with Firebase
        database.ref('trendtrades/' + altcoin).push(buyResult['currentPoint'])
        // Start Trade Placement
        //placeTrade(altcoin, buyResult['currentPoint']['C'])
      }else{
        console.log('No Signal for ' + altcoin + ' status is: ' + buyResult['isActive'])
      }
    })
    .catch((error) => {
      console.log('Error in Main Script')
    })
}

const weightedAverage = (data) => {
  return new Promise(function(resolve, reject){
    let values = []
    let breakoutMonitor = []
    let isActive = 'false'

    for(let point in data){
      let currentPoint = data[point]
      let currentPointClosing = currentPoint['C']
      values.push(currentPointClosing)
      let wmaOutput = WMA.calculate({period : period, values : values})
      let lastWMA = wmaOutput[wmaOutput.length - 1]
      breakoutMonitor.push(currentPointClosing > lastWMA)  
      let slicedBreakoutMonitor = breakoutMonitor.slice(breakoutMonitor.length - 5)
      let isBreakout = breakoutMonitor.length >= 5 ? slicedBreakoutMonitor.indexOf(false) > -1 : false

      if (currentPointClosing > (lastWMA * minEdge) && isBreakout && isActive === 'false' && currentPoint['BV'] > minBV) {
        isActive = 'true'
      }else if(isActive === 'true'){
        isActive = 'inactive'
      }else if(currentPointClosing < lastWMA){
        isActive = 'false'
      }

      if (point == data.length - 1) {
        resolve({
          isActive: isActive,
          currentPoint: currentPoint,
          lastWMA: lastWMA
        })
      }
    }
  })
}

const placeTrade = (altcoin, wantPrice) => {
  let balance = 0
  getBalance('BTC')
    .then(balanceResult => {
      balance = balanceResult['result']['Available']
      return getMarketSummary(altcoin)
    })
    .then(priceDetails => {
      let price = priceDetails['result'][0]['Ask']
      let stake = (balance * fraction) / price
      console.log('Stake: ' + stake + ' for ' + price + ' in ' + altcoin)

      getBalance(altcoin)
      .then(altBalanceResult => {
        let altcoinBalance = altBalanceResult['result']['Available']
        if (altcoinBalance > 0) {
          console.log('Already holding this ' + altcoin + ' skipping buy')
        }else{
          return placeOrder('buy', 'BTC', altcoin, stake, price)
        }
      })
      .then(result => {
        console.log('Buy Order was submitted successfully')
        store.dispatch(registerTrendTrade(altcoin, { 
          altcoin: altcoin, 
          uuid: result['result']['uuid'], 
          stake: stake, 
          price: price
        }))
      })
      .catch(error => {
        console.log('Already hold Coins of this type. Sell first, before buying more')
      })
    })
    .catch(error => {
      console.log('Error during Balance Request and Buy Placement')
    })
}

const managePlacedTrades = (altcoin, thisClosingPrice, previousClosingPrice) => {
  let hasTrendTrade = typeof store.getState().trendOrders[altcoin] !== 'undefined'
  console.log('Checking ' + altcoin + ' for Placed Trades')
  console.log('Had Trend Trade: ' + hasTrendTrade)

  // Compare to last closing price and sell if conditions are met // Conditions: Moving 3% Stop-Loss (?)
  if (hasTrendTrade && thisClosingPrice < (previousClosingPrice * 0.97)) {
    console.log('previousClosingPrice: ' + previousClosingPrice)
    console.log('thisClosingPrice: ' + thisClosingPrice)
    let balance = 0

    getBalance(altcoin)
      .then(balanceResult => {
        balance = balanceResult['result']['Available']
        return getMarketSummary(altcoin)
      })
      .then((priceDetails) => {
        let price = priceDetails['result'][0]['Bid']
        console.log('Stake: ' + balance + ' for ' + price + ' in ' + altcoin)
        return placeOrder('sell', 'BTC', altcoin, balance, price)
      })
      .then((result) => {
        console.log('Sell Order was submitted successfully')
        store.dispatch(unregisterTrendTrade(altcoin))
      })
      .catch((error) => {
        console.log('Error during Balance Request and Sell Placement')
      })
  }  
}


