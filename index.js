import { MACD } from 'technicalindicators'
import { getCandles, getBalance, placeOrder, getMarketSummary } from './bittrex-request'
import { store, updateCurrentSignal, registerNewOrder } from './store'
import { CronJob } from 'cron'
import _ from 'underscore'

const altcoinsToMonitor = ['LTC', 'NEO', 'PINK', 'OMG', 'WINGS', 'ETH', 'LSK', 'BCC', 'KMD', 'MCO', 'QTUM', 'NAV', 'XRP', 'PAY', 'XVG', 'DGB']
const fraction = 0.1


new CronJob('*/30 * * * * *', function() {
  for(let entry in altcoinsToMonitor){
    console.log('Running Calculation for ' + altcoinsToMonitor[entry])
    runCalculation(altcoinsToMonitor[entry])
  }
}, null, true);


const runCalculation = (altcoin) => {
  getCandles(altcoin)
    .then((data) => {

      let closingPrices = _.pluck(data['result'], 'C')
      let macdInput = {
        values: closingPrices,
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
        SimpleMAOscillator: false,
        SimpleMASignal: false
      }

      let macdOutput = MACD.calculate(macdInput)
      let currentSignal = typeof store.getState().currentSignal[altcoin] === 'undefined' ? 'buy' : store.getState().currentSignal[altcoin]
      let lastEntry = macdOutput.length -1
      console.log('MACD for ' + altcoin + ' ' + macdOutput[lastEntry]['MACD'])


      if (macdOutput[lastEntry]['MACD'] > 0 && currentSignal === 'sell') {
        console.log('MACD MOVED INTO BUYING POSITION')
        store.dispatch(updateCurrentSignal(altcoin, 'buy'))
        let balance = 0

        getBalance('BTC')
          .then((balanceResult) => {
            balance = balanceResult['result']['Available']
            return getMarketSummary(altcoin)
          })
          .then((priceDetails) => {
            let price = priceDetails['result'][0]['Bid']
            let stake = (balance * fraction) / price
            console.log('Stake: ' + stake + ' for ' + price + ' in ' + altcoin)
            return placeOrder('buy', altcoin, stake, price)
          })
          .then((result) => {
            console.log('Buy Order was submitted successfully')
            store.dispatch(registerNewOrder(result['result']['uuid']))
          })
          .catch((error) => {
            console.log('Error during Balance Request and Buy Placement')
          })
      }else if(macdOutput[lastEntry]['MACD'] <= 0 && currentSignal === 'buy'){
        console.log('SELLING CURRENT POSITION OF: ' + altcoin)
        store.dispatch(updateCurrentSignal(altcoin, 'sell'))
        let balance = 0

        getBalance(altcoin)
          .then((balanceResult) => {
            balance = balanceResult['result']['Available']
            return getMarketSummary(altcoin)
          })
          .then((priceDetails) => {
            let price = priceDetails['result'][0]['Ask']
            console.log('Stake: ' + balance + ' for ' + price + ' in ' + altcoin)
            return placeOrder('sell', altcoin, balance, price)
          })
          .then((result) => {
            console.log('Sell Order was submitted successfully')
            store.dispatch(registerNewOrder(result['result']['uuid'], Date.getTime()))
          })
          .catch((error) => {
            console.log('Error during Balance Request and Sell Placement')
          })
      }
    })
    .catch((error) => {
      console.log('Error in Main Script')
    })
  }











