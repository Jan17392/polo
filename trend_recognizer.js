import { MACD, RSI, WMA } from 'technicalindicators'
import { getCandles, getBalance, placeOrder, getMarketSummary, getMarketSummaries } from './bittrex-request'
import { store, updateCurrentSignal, registerTrendTrade, unregisterTrendTrade, registerWMA } from './store'
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
  'BITB'
]

const fraction = 0.1
const minEdge = 1.02
const minBV = 5
const period = 24

new CronJob('*/20 * * * *', function() {
  for(let entry in altcoinsToMonitor){
    let altcoin = altcoinsToMonitor[entry]

    getCandles(altcoin, 'hour')
    .then(data => {
      return weightedAverage(data['result'])
    })
    .then(resultWMA => {
      store.dispatch(registerWMA(altcoin, resultWMA))
    })
    .catch((error) => {
      console.log('Error in Main Script')
    })
  }
}, null, true);


const weightedAverage = (data) => {
  return new Promise(function(resolve, reject){
    let values = []

    for(let point in data){
      // Calculate the WMA data
      let wmaOutput = WMA.calculate({period : period, values : values})
      let lastWMA = wmaOutput[wmaOutput.length - 1]
      let lastPeriodWMA = wmaOutput.slice((period + 1) * -1, -1)
      let lastPeriodMaxWMA = Math.max(...lastPeriodWMA)

      // After doing the calculation add the current data point
      let currentPoint = data[point]
      let currentPointClosing = currentPoint['C']
      values.push(currentPointClosing)

      if (point == data.length - 1) {
        resolve({
          lastWMA: lastWMA,
          lastPeriodMaxWMA: lastPeriodMaxWMA,
          lastPeriodWMA: lastPeriodWMA
        })
      }
    }
  })
}


new CronJob('*/10 * * * * *', function() {
  getMarketSummaries()
    .then(data => {
      let result = data['result']

      for(let entry in result){
        let currentSummary = result[entry]
        let baseCoin = currentSummary['MarketName'].split('-')[0]
        let altcoin = currentSummary['MarketName'].split('-')[1]
        let altcoinData = store.getState().wmas[altcoin]
        let hasTrendTrade = typeof store.getState().trendOrders[altcoin] !== 'undefined'

        if (
          baseCoin === 'BTC' && 
          typeof altcoinData !== 'undefined' && 
          !hasTrendTrade) {
          console.log('Let the calculation begin!')

          let comparePrice = currentSummary['Last']
          let breakoutMonitor = altcoinData['lastPeriodWMA'].slice(-5)

          // Whether at least one price was below avg before - Don't take if ranging over avg.
          let isBreakout = altcoinData['lastPeriodMaxWMA'] > Math.min(...breakoutMonitor)

          console.log('ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ')
          console.log('ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ')
          console.log(comparePrice)
          console.log(breakoutMonitor)
          console.log(isBreakout)
          console.log(altcoinData['lastPeriodMaxWMA'])
          console.log(altcoin)
          console.log('ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ')
          console.log('ÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖÖ')

          if(comparePrice > altcoinData['lastPeriodMaxWMA'] && isBreakout){
            console.log('This is a great time to buy!')
            console.log('Buy Order was submitted successfully')
            store.dispatch(registerTrendTrade(altcoin, { 
              altcoin: altcoin,
              price: comparePrice
            }))
            currentSummary['lastPeriodMaxWMA'] = altcoinData['lastPeriodMaxWMA']
            database.ref('trendtrades/' + altcoin).push(currentSummary)
          }else{

          }
        }
      }
    })
    .catch((error) => {
      console.log('Error in Main Script')
    })
}, null, true);