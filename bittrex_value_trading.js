import { MACD, RSI } from 'technicalindicators'
import { getCandles, getBalance, placeOrder, getMarketSummary } from './bittrex-request'
import { store, updateCurrentSignal, registerNewOrder } from './store'
import { CronJob } from 'cron'
import _ from 'underscore'

const altcoinsToMonitor = [
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
  'ENRG'
]
const fraction = 0.1


new CronJob('*/1 * * * *', function() {
  for(let entry in altcoinsToMonitor){
    console.log('Running Calculation for ' + altcoinsToMonitor[entry])
    runCalculation(altcoinsToMonitor[entry])
  }
}, null, true);


const runCalculation = (altcoin) => {
  let data = []
  let lastMACD = {}
  let lastRSI = 50
  let ichimoku = {}
  let closingPrices = []

  getCandles(altcoin, 'fiveMin')
    .then(dataResult => {
      data = dataResult
      closingPrices = _.pluck(data['result'], 'C')
      return calculateMACD(closingPrices)
    })
    .then(lastMACDResult => {
      lastMACD = lastMACDResult
      return calculateRSI(closingPrices)
    })
    .then(lastRSIResult => {
      lastRSI = lastRSIResult
      return calculateIchimoku(closingPrices)
    })
    .then(lastIchimoku => {
      ichimoku = lastIchimoku
      return updateSignals(lastMACD, lastRSI, ichimoku, altcoin)
    })
    .then(() => {
      let currentSignalMACD = store.getState().currentSignal['MACD'][altcoin]
      let currentSignalRSI = store.getState().currentSignal['RSI'][altcoin]

      if (currentSignalRSI['newSignal'] === 'neutral' && currentSignalRSI['previousSignal'] === 'buy') {
        let balance = 0

        getBalance('BTC')
          .then((balanceResult) => {
            balance = balanceResult['result']['Available']
            return getMarketSummary(altcoin)
          })
          .then((priceDetails) => {
            let price = priceDetails['result'][0]['Ask']
            let stake = (balance * fraction) / price
            console.log('Stake: ' + stake + ' for ' + price + ' in ' + altcoin)

            getBalance('BTC')
            .then((altBalanceResult) => {
              let altcoinBalance = altBalanceResult['result']['Available']
              if (altcoinBalance > 0) {
                //return placeOrder('buy', 'BTC', altcoin, stake * 0.5, price)
              }else{
                placeOrder('buy', 'BTC', altcoin, stake, price)
                return placeOrder('sell', 'BTC', altcoin, stake, price * 1.05)
              }
            })
            .then((result) => {
              console.log('Buy Order was submitted successfully')
              store.dispatch(registerNewOrder(result['result']['uuid']))
            })
            .catch((error) => {
              console.log('Already hold Coins of this type. Sell first, before buying more')
            })
          })
          .catch((error) => {
            console.log('Error during Balance Request and Buy Placement')
          })
        } //else if(currentSignalRSI['newSignal'] === 'neutral' && currentSignalRSI['previousSignal'] === 'sell'){
      //   let balance = 0

      //   getBalance(altcoin)
      //     .then((balanceResult) => {
      //       balance = balanceResult['result']['Available']
      //       return getMarketSummary(altcoin)
      //     })
      //     .then((priceDetails) => {
      //       let price = priceDetails['result'][0]['Bid']
      //       console.log('Stake: ' + balance + ' for ' + price + ' in ' + altcoin)
      //       return placeOrder('sell', 'BTC', altcoin, balance, price)
      //     })
      //     .then((result) => {
      //       console.log('Sell Order was submitted successfully')
      //       store.dispatch(registerNewOrder(result['result']['uuid'], Date.getTime()))
      //     })
      //     .catch((error) => {
      //       console.log('Error during Balance Request and Sell Placement')
      //     })
      // }
    })
    .catch((error) => {
      console.log('Error in Main Script')
    })
  }










const calculateMACD = (closingPrices) => {
  return new Promise(function(resolve, reject){
    let macdInput = {
      values: closingPrices,
      fastPeriod: 12,
      slowPeriod: 26,
      signalPeriod: 9,
      SimpleMAOscillator: false,
      SimpleMASignal: false
    }

    let macdOutput = MACD.calculate(macdInput)
    resolve(macdOutput[macdOutput.length -1])
  })
}

const calculateRSI = (closingPrices) => {
  return new Promise(function(resolve, reject){
    let rsiInput = {
      values : closingPrices,
      period : 14
    }

    let rsiOutput = RSI.calculate(rsiInput)
    resolve(rsiOutput[rsiOutput.length -1])
  })
}

const calculateIchimoku = (closingPrices) => {
  return new Promise(function(resolve, reject){
    let historic79 = closingPrices.slice(-79)

    if(historic79.length < 79){
      reject()
    }else{

      let senkouSpan2Today = (_.max(historic79.slice(1, 53)) + _.min(historic79.slice(1, 53))) / 2
      let senkouSpan2Yesterday = (_.max(historic79.slice(0, 52)) + _.min(historic79.slice(0, 52))) / 2

      let kijunSenToday = (_.max(historic79.slice(-26)) + _.min(historic79.slice(-26))) / 2
      let kijunSenYesterday = (_.max(historic79.slice(-27, -1)) + _.min(historic79.slice(-27, -1))) / 2

      let tenkanSenToday = (_.max(historic79.slice(-9)) + _.min(historic79.slice(-9))) / 2
      let tenkanSenYesterday = (_.max(historic79.slice(-10, -1)) + _.min(historic79.slice(-10, -1))) / 2

      let senkouSpan1Today = (kijunSenToday + tenkanSenToday) / 2
      let senkouSpan1Yesterday = (kijunSenYesterday + tenkanSenYesterday) / 2

      let chicouSpanToday = historic79.slice(53, 54)[0]
      let chicouSpanYesterday = historic79.slice(52, 53)[0]

      let priceToday = historic79.slice(-1)[0]
      let priceYesterday = historic79.slice(-2)[0]


      let result = {
        kijunSenToday: kijunSenToday,
        kijunSenYesterday: kijunSenYesterday,
        tenkanSenToday: tenkanSenToday,
        tenkanSenYesterday: tenkanSenYesterday,
        senkouSpan1Today: senkouSpan1Today,
        senkouSpan1Yesterday: senkouSpan1Yesterday,
        senkouSpan2Today: senkouSpan2Today,
        senkouSpan2Yesterday: senkouSpan2Yesterday,
        chicouSpanToday: chicouSpanToday,
        chicouSpanYesterday: chicouSpanYesterday,
        priceToday: priceToday,
        priceYesterday: priceYesterday
      }

      //console.log(result)
      resolve(result)
    }
  })
}







const updateSignals = (lastMACD, lastRSI, ichimoku, altcoin) => {
  let previousMACDSignalExists = typeof store.getState().currentSignal['MACD'] === 'undefined' ? false : true
  let previousRSISignalExists = typeof store.getState().currentSignal['RSI'] === 'undefined' ? false : true

  let previousMACDSignal = 'buy'
  let previousRSISignal = 'neutral'


  if (previousMACDSignalExists) {
    previousMACDSignal = store.getState().currentSignal['MACD'][altcoin]
  }

  if (lastMACD['MACD'] - lastMACD['signal'] > 0 && previousMACDSignal === 'sell') {
    console.log('MACD MOVED INTO BUY POSITION')
    store.dispatch(updateCurrentSignal(altcoin, 'MACD', 'buy'))
  }else if(lastMACD['MACD'] - lastMACD['signal'] < 0 && previousMACDSignal === 'buy'){
    console.log('MACD MOVED INTO SELL POSITION')
    store.dispatch(updateCurrentSignal(altcoin, 'MACD', 'sell'))
  }

  if (previousRSISignalExists && typeof store.getState().currentSignal['RSI'][altcoin] !== 'undefined') {
    previousRSISignal = store.getState().currentSignal['RSI'][altcoin]['newSignal']
  }

  if (lastRSI < 30) {
    console.log('This coin is oversold - Change RSI recommendation to BUY ')
    store.dispatch(updateCurrentSignal(altcoin, 'RSI', { previousSignal: previousRSISignal, newSignal: 'buy' }))
  }else if(lastRSI > 70){
    console.log('This coin is overbought - Change RSI recommendation to SELL ')
    store.dispatch(updateCurrentSignal(altcoin, 'RSI', { previousSignal: previousRSISignal, newSignal: 'sell' }))
  }else{
    console.log('Nothing changed, RSI is neutral')
    store.dispatch(updateCurrentSignal(altcoin, 'RSI', { previousSignal: previousRSISignal, newSignal: 'neutral' }))
  }


  // let ichimokuSignals = []
  // let ichimokuSignalsCounterBuy = 0
  // let ichimokuSignalsCounterSell = 0
  // let maxSenkouSpanToday = Math.max([ichimoku['senkouSpan1Today'], ichimoku['senkouSpan2Today']])[0]
  // let minSenkouSpanToday = Math.min([ichimoku['senkouSpan1Today'], ichimoku['senkouSpan2Today']])[0]
  // let maxSenkouSpanYesterday = Math.max([ichimoku['senkouSpan1Yesterday'], ichimoku['senkouSpan2Yesterday']])[0]
  // let minSenkouSpanYesterday = Math.min([ichimoku['senkouSpan1Yesterday'], ichimoku['senkouSpan2Yesterday']])[0]


  // // BUY Signals Ichimoku
  // if (ichimoku['tenkanSenYesterday'] < ichimoku['kijunSenYesterday'] &&
  //   ichimoku['tenkanSenToday'] > ichimoku['kijunSenToday'] &&
  //   ichimoku['priceToday'] > maxSenkouSpanToday) {
  //   // Crossing of KS & TS from bottom to top - Golden Cross
  //   console.log('Ichimoku Golden Cross - Recommendation to BUY ')
  //   ichimokuSignals.push('Golden Cross')
  //   ichimokuSignalsCounterBuy += 1
  // }

  // if (ichimoku['priceYesterday'] < ichimoku['kijunSenYesterday'] &&
  //   ichimoku['priceToday'] > ichimoku['kijunSenToday'] &&
  //   ichimoku['priceToday'] > maxSenkouSpanToday) {
  //   // Crossing of KS & Price from bottom to top - Price Cross
  //   console.log('Ichimoku Price Cross - Recommendation to BUY ')
  //   ichimokuSignals.push('Price Cross')
  //   ichimokuSignalsCounterBuy += 1
  // }

  // if (ichimoku['priceYesterday'] < maxSenkouSpanYesterday &&
  //   ichimoku['priceToday'] > maxSenkouSpanToday) {
  //   // Break of price out of the cloud from bottom to top - Cloud Cross
  //   console.log('Ichimoku Cloud Cross - Recommendation to BUY ')
  //   ichimokuSignals.push('Cloud Cross')
  //   ichimokuSignalsCounterBuy += 1
  // }

  // if (ichimoku['senkouSpan1Yesterday'] < ichimoku['senkouSpan2Yesterday'] &&
  //   ichimoku['senkouSpan1Today'] > ichimoku['senkouSpan2Today'] &&
  //   ichimoku['priceToday'] > maxSenkouSpanToday) {
  //   // Crossing SenkouSpans from bottom to top - Senkou Cross
  //   console.log('Ichimoku Senkou Cross - Recommendation to BUY ')
  //   ichimokuSignals.push('Senkou Cross')
  //   ichimokuSignalsCounterBuy += 1
  // }

  // if (ichimoku['chicouSpanYesterday'] < ichimoku['priceYesterday'] &&
  //   ichimoku['chicouSpanToday'] > ichimoku['priceToday'] &&
  //   ichimoku['priceToday'] > maxSenkouSpanToday) {
  //   // Crossing ChicouSpans from bottom to top - Chicou Cross
  //   console.log('Ichimoku Chicou Cross - Recommendation to BUY ')
  //   ichimokuSignals.push('Chicou Cross')
  //   ichimokuSignalsCounterBuy += 1
  // }



  // // Sell Signals Ichimoku
  // if (ichimoku['tenkanSenYesterday'] > ichimoku['kijunSenYesterday'] &&
  //   ichimoku['tenkanSenToday'] < ichimoku['kijunSenToday'] &&
  //   ichimoku['priceToday'] < minSenkouSpanToday) {
  //   // Crossing of KS & TS from top to bottom - Death Cross
  //   console.log('Ichimoku Death Fall - Recommendation to SELL')
  //   ichimokuSignals.push('Death Fall')
  //   ichimokuSignalsCounterSell += 1
  // }

  // if (ichimoku['priceYesterday'] > ichimoku['kijunSenYesterday'] &&
  //   ichimoku['priceToday'] < ichimoku['kijunSenToday'] &&
  //   ichimoku['priceToday'] < minSenkouSpanToday) {
  //   // Crossing of KS & Price from top to bottom - Price Fall
  //   console.log('Ichimoku Price Fall - Recommendation to SELL')
  //   ichimokuSignals.push('Price Fall')
  //   ichimokuSignalsCounterSell += 1
  // }

  // if (ichimoku['priceYesterday'] > maxSenkouSpanYesterday &&
  //   ichimoku['priceToday'] < maxSenkouSpanToday) {
  //   // Break of price out of the cloud from bottom to top - Cloud Fall
  //   console.log('Ichimoku Cloud Fall - Recommendation to SELL')
  //   ichimokuSignals.push('Cloud Fall')
  //   ichimokuSignalsCounterSell += 1
  // }

  // if (ichimoku['senkouSpan1Yesterday'] > ichimoku['senkouSpan2Yesterday'] &&
  //   ichimoku['senkouSpan1Today'] < ichimoku['senkouSpan2Today'] &&
  //   ichimoku['priceToday'] < minSenkouSpanToday) {
  //   // Crossing SenkouSpans from top to bottom - Senkou Fall
  //   console.log('Ichimoku Senkou Fall - Recommendation to SELL')
  //   ichimokuSignals.push('Senkou Fall')
  //   ichimokuSignalsCounterSell += 1
  // }

  // if (ichimoku['chicouSpanYesterday'] > ichimoku['priceYesterday'] &&
  //   ichimoku['chicouSpanToday'] < ichimoku['priceToday'] &&
  //   ichimoku['priceToday'] < minSenkouSpanToday) {
  //   // Crossing ChicouSpans from bottom to top - Chicou Fall
  //   console.log('Ichimoku Chicou Fall - Recommendation to SELL')
  //   ichimokuSignals.push('Chicou Fall')
  //   ichimokuSignalsCounterSell += 1
  // }

  // store.dispatch(updateCurrentSignal(altcoin, 'Ichimoku', {
  //   buyCounter: ichimokuSignalsCounterBuy,
  //   sellCounter: ichimokuSignalsCounterSell,
  //   signals: ichimokuSignals
  // }))
}

