import { getMarketSummaries, getTickerBter, getTickerCryptopia, getTickerNovaexchange, getTickerHitbtc, getTickerLiqui, getTickerCcex } from './bittrex-request'
import { store, registerPrice } from './store'
import { calculateArbs } from './calculations/calculateArbs'
import { start_transactions } from './transactions/start_transactions'
import { CronJob } from 'cron'

new CronJob('*/10 * * * * *', function() {
  getMarketSummaries()
  .then(result => {
    let offers = result['result']
    for(let entry in offers){
      let currentData = offers[entry]
      let currencyPair = (currentData['MarketName'].split('-')[1] + '_' + currentData['MarketName'].split('-')[0]).toLowerCase()
      let baseCurrency = currentData['MarketName'].split('-')[0].toLowerCase()
      let altCurrency = currentData['MarketName'].split('-')[1].toLowerCase()
      let exchange = 'btrx'

      let data = {
        market: currencyPair,
        exchange: exchange,
        high: currentData['High'],
        low: currentData['Low'],
        last: currentData['Last'],
        lowestAsk: currentData['Ask'],
        highestBid: currentData['Bid'],
        baseVolume: currentData['BaseVolume'],
        quoteVolume: currentData['Volume'],
        baseCurrency: baseCurrency,
        altCurrency: altCurrency
      }

      store.dispatch(registerPrice(currencyPair, 'BUY', exchange, data))
      store.dispatch(registerPrice(currencyPair, 'SELL', exchange, data))
    }
  })

  getTickerBter()
  .then(result => {
    for(let entry in result){
      let currentData = result[entry]
      let currencyPair = entry
      let baseCurrency = entry.split('_')[1]
      let altCurrency = entry.split('_')[0]
      let exchange = 'bter'

      let data = {
        market: entry,
        exchange: exchange,
        high: parseFloat(currentData['high24hr']),
        low: parseFloat(currentData['low24hr']),
        last: parseFloat(currentData['last']),
        lowestAsk: parseFloat(currentData['lowestAsk']),
        highestBid: parseFloat(currentData['highestBid']),
        baseVolume: currentData['baseVolume'],
        quoteVolume: currentData['quoteVolume'],
        baseCurrency: baseCurrency,
        altCurrency: altCurrency
      }

      store.dispatch(registerPrice(currencyPair, 'BUY', exchange, data))
      store.dispatch(registerPrice(currencyPair, 'SELL', exchange, data))
    }
  })

  getTickerLiqui()
  .then(result => {
    for(let entry in result){
      let currentData = result[entry]
      let currencyPair = entry
      let baseCurrency = currencyPair.split('_')[1]
      let altCurrency = currencyPair.split('_')[0]
      let exchange = 'liqui'

      let data = {
        market: currencyPair,
        exchange: exchange,
        high: currentData['high'],
        low: currentData['low'],
        last: currentData['last'],
        lowestAsk: currentData['sell'],
        highestBid: currentData['buy'],
        baseVolume: currentData['vol_cur'],
        quoteVolume: currentData['vol'],
        baseCurrency: baseCurrency,
        altCurrency: altCurrency
      }

      store.dispatch(registerPrice(currencyPair, 'BUY', exchange, data))
      store.dispatch(registerPrice(currencyPair, 'SELL', exchange, data))
    }
  })


  // getTickerCryptopia()
  // .then(data => {
  //   let result = data['Data']
  //   for(let entry in result){
  //     let currentData = result[entry]
  //     let currencyPair = (currentData['Label'].replace('/', '_')).toLowerCase()
  //     let baseCurrency = currencyPair.split('_')[1]
  //     let altCurrency = currencyPair.split('_')[0]
  //     let exchange = 'cryptopia'

  //     let data = {
  //       market: currencyPair,
  //       exchange: exchange,
  //       high: parseFloat(currentData['High']),
  //       low: parseFloat(currentData['Low']),
  //       last: parseFloat(currentData['LastPrice']),
  //       lowestAsk: parseFloat(currentData['AskPrice']),
  //       highestBid: parseFloat(currentData['BidPrice']),
  //       baseVolume: currentData['BaseVolume'],
  //       quoteVolume: currentData['Volume'],
  //       baseCurrency: baseCurrency,
  //       altCurrency: altCurrency
  //     }

  //     store.dispatch(registerPrice(currencyPair, 'BUY', exchange, data))
  //     store.dispatch(registerPrice(currencyPair, 'SELL', exchange, data))
  //   }
  // })

  // getTickerNovaexchange()
  // .then(data => {
  //   let result = data['markets']
  //   for(let entry in result){
  //     let currentData = result[entry]
  //     if (parseFloat(currentData['volume24h']) > 0 && currentData['currency'] !== 'BCC') {
  //       let currencyPair = (currentData['currency'] + '_' + currentData['basecurrency']).toLowerCase()
  //       let baseCurrency = currencyPair.split('_')[1]
  //       let altCurrency = currencyPair.split('_')[0]
  //       let exchange = 'novaexchange'

  //       let data = {
  //         market: currencyPair,
  //         exchange: exchange,
  //         high: parseFloat(currentData['high24h']),
  //         low: parseFloat(currentData['low24h']),
  //         last: parseFloat(currentData['last_price']),
  //         lowestAsk: parseFloat(currentData['ask']),
  //         highestBid: parseFloat(currentData['bid']),
  //         baseVolume: currentData['volume24h'],
  //         quoteVolume: 0,
  //         baseCurrency: baseCurrency,
  //         altCurrency: altCurrency
  //       }

  //       store.dispatch(registerPrice(currencyPair, 'BUY', exchange, data))
  //       store.dispatch(registerPrice(currencyPair, 'SELL', exchange, data))
  //     }
  //   }
  // })

  getTickerHitbtc()
  .then(result => {
    for(let entry in result){
      let currentData = result[entry]
      let baseCurrency = entry.substring(3,6).toLowerCase()
      let altCurrency = entry.substring(0,3).toLowerCase()

      if(entry.length === 7){
        baseCurrency = entry.substring(4,7).toLowerCase()
        altCurrency = entry.substring(0,4).toLowerCase()
      }

      let currencyPair = altCurrency + '_' + baseCurrency
      let exchange = 'hitbtc'

      let data = {
        market: currencyPair,
        exchange: exchange,
        high: parseFloat(currentData['high']),
        low: parseFloat(currentData['low']),
        last: parseFloat(currentData['last']),
        lowestAsk: parseFloat(currentData['ask']),
        highestBid: parseFloat(currentData['bid']),
        baseVolume: currentData['volume'],
        quoteVolume: currentData['volume_quote'],
        baseCurrency: baseCurrency,
        altCurrency: altCurrency
      }

      store.dispatch(registerPrice(currencyPair, 'BUY', exchange, data))
      store.dispatch(registerPrice(currencyPair, 'SELL', exchange, data))
    }
  })

  getTickerCcex()
  .then(result => {
    for(let entry in result){
      let currentData = result[entry]
      let baseCurrency = entry.split('-')[1]
      let altCurrency = entry.split('-')[0]
      let currencyPair = altCurrency + '_' + baseCurrency
      let exchange = 'ccex'

      let data = {
        market: currencyPair,
        exchange: exchange,
        high: currentData['high'],
        low: currentData['low'],
        last: currentData['lastprice'],
        lowestAsk: currentData['sell'],
        highestBid: currentData['buy'],
        baseVolume: 0,
        quoteVolume: 0,
        baseCurrency: baseCurrency,
        altCurrency: altCurrency
      }

      store.dispatch(registerPrice(currencyPair, 'BUY', exchange, data))
      store.dispatch(registerPrice(currencyPair, 'SELL', exchange, data))
    }
    calculateArbs()
    .then(() => {
      console.log('DONE')
      //start_transactions()
    })
  })
}, null, true);





