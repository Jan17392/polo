import { MACD, RSI, WMA } from 'technicalindicators'
import { getCandles, getBalance, placeOrder, getMarketSummary } from './bittrex-request'
import { store, updateCurrentSignal, registerNewOrder } from './store'
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
  'PAY',
  'LTC',
  'IOP',
  'OK',
  'NEO',
  'PINK',
  'OMG',
  'WINGS',
  'ETH',
  'LSK',
  'BCC',
  'KMD',
  'MCO',
  'QTUM',
  'NAV',
  'XRP',
  'PAY',
  'XVG',
  'DGB',
  'DASH',
  'BCC',
  'EBST',
  'START',
  'ARK',
  'TRIG',
  'RISE',
  'BAT',
  'ZEC',
  'SC',
  'NXC',
  'RDD',
  'SYNX',
  'DOGE',
  'STRAT',
  'BTS',
  'UBQ',
  'GAME',
  'WAVES',
  'SNT',
  'PTOY',
  'BURST',
  'ENRG',
  'BTG',
  'CVC',
  'MTL',
  'ETC',
  'XLM',
  'DNT',
  'ADX',
  'FUN',
  'SLR',
  'GRS',
  'VTC',
  'XRM',
  'BAY',
  'XZC',
  'SWT',
  'MUE',
  'INCNT',
  'RCN',
  'CANN',
  'ARDR',
  'MONA',
  'FCT',
  'SYS',
  'PIVX',
  'SALT',
  'NXS',
  'GNT',
  'BITB',
  'RDD'
]

//const fraction = 0.1


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
      return weightedAverage(data['result'])
    })
    .then(buyResult => {
      if (buyResult['isActive'] === 'true') {
        console.log('This is an awesome time to buy ' + altcoin)
        console.log(buyResult['currentPoint'])
        console.log(buyResult['lastWMA'])
        database.ref('trendtrades/' + altcoin).push(buyResult['currentPoint'])
      }else{
        console.log('No Signal for ' + altcoin + ' status is: ' + buyResult['isActive'])
      }
    })
    .catch((error) => {
      console.log('Error in Main Script')
    })
}

const weightedAverageHistory = (data) => {
  return new Promise(function(resolve, reject){
    let period = 50
    let values = []
    let isActive = false

    for(let point in data){
      let currentPoint = data[point]
      let currentPointClosing = currentPoint['C']
      values.push(currentPointClosing)
      if (values.length > period) {
        let wmaOutput = WMA.calculate({period : period, values : values})
        var slicedWMA = wmaOutput.slice(wmaOutput.length - period)
        console.log('******************')
        console.log(currentPointClosing)
        console.log(Math.max(...slicedWMA))
        console.log('******************')
        if (currentPointClosing > (Math.max(...slicedWMA) * 1.05) && !isActive) {
          isActive = true
          console.log('THIS PRICE IS HIGHER THAN THE WEIGHTED MOVING AVERAGE OF THE LAST 50 PERIODS')
          console.log(currentPoint)
        }else if(currentPointClosing < Math.max(...slicedWMA) && isActive){
          isActive = false
        }
      }
    }
    resolve()
  })
}

const weightedAverage = (data) => {
  return new Promise(function(resolve, reject){
    let period = 50
    let values = []
    let breakoutMonitor = []
    let isActive = 'false'

    for(let point in data){
      
      let currentPoint = data[point]
      let currentPointClosing = currentPoint['C']
      
      values.push(currentPointClosing)
      
      let wmaOutput = WMA.calculate({period : period, values : values})
      //let slicedWMA = wmaOutput.slice(wmaOutput.length - period)
      let lastWMA = wmaOutput[wmaOutput.length - 1]
      breakoutMonitor.push(currentPointClosing > lastWMA)//wmaOutput[wmaOutput.length -1])
      
      let slicedBreakoutMonitor = breakoutMonitor.slice(breakoutMonitor.length - 5)
      let isBreakout = breakoutMonitor.length >= 5 ? slicedBreakoutMonitor.indexOf(false) > -1 : false

      if (currentPointClosing > lastWMA && isBreakout && isActive === 'false') {
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