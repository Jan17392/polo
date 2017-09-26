import { store, registerArbitrageTrade } from '../store'
import _ from 'underscore'

export const calculateArbsCoinigy = (data) => {
  let type = data['type'] === 'BUY' ? 'SELL' : 'BUY'
  let prices = store.getState().prices[data['label']][type]

  if (typeof prices !== 'undefined') {
    let bestPrice = 0
    let margin = 0

    if(type === 'BUY'){
     bestPrice = _.min(prices, function(entry){ return entry.price; });
     margin = parseFloat(data['price']) / bestPrice['price'] -1
    }else{
     bestPrice = _.max(prices, function(entry){ return entry.price; });
     margin = parseFloat(bestPrice['price']) / data['price'] -1
    }

    console.log('The ' + data['type'] + ' Price is: ' + data['price'])
    console.log('The ' + type + ' Price is: ' + bestPrice['price'])
    console.log('The margin is: ' + margin)

    if (margin > 0) {
      console.log('##################################################')
      console.log('##################################################')
      console.log('##################################################')
      console.log('##################################################')
      console.log(data['type'] + ' Market: ' + data['exchange'])
      console.log(type + 'Market: ' + bestPrice['exchange'])
    }

  }
}

export const calculateArbs = () => {
  return new Promise(function(resolve, reject){
    let offers = store.getState().prices
    let counter = 0
    let offersLength = Object.keys(offers).length

    for(let entry in offers){
      counter += 1
      let currentData = offers[entry]

      if(Object.keys(currentData['BUY']).length > 1) {
        //console.log('There is more than one exchange offering this market')
        let sellExchange = _.max(currentData['SELL'], function(entry){ return entry.highestBid })
        let buyExchange = _.min(currentData['BUY'], function(entry){ return entry.lowestAsk })
        let highestBid = sellExchange['highestBid']
        let lowestAsk = buyExchange['lowestAsk']
        let market = sellExchange['market']
        let margin = highestBid / lowestAsk - 1
        if (margin > 0.05) {
          console.log('###########################################')
          console.log('###########################################')
          console.log('Market: ' + market)
          console.log('Highest Bid' + highestBid + ' @ ' + sellExchange['exchange'])
          console.log('Lowest Ask' + lowestAsk + ' @ ' + buyExchange['exchange'])
          console.log('Margin: ' + margin)
          console.log('###########################################')
          console.log('###########################################')

          let data = {
            sellExchange: sellExchange,
            buyExchange: buyExchange,
            market: market,
            highestBid: highestBid,
            lowestAsk: lowestAsk,
            margin: margin,
            status: 'open'
          }

          //store.dispatch(registerArbitrageTrade(market, data))
        }
      }
      counter === offersLength && resolve()
    }
  })
}







