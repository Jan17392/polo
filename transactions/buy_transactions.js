import { store, registerArbitrageTrade } from '../store'
import { placeOrder } from '../bittrex-request'

const fraction = 0.03

export const start_buy_transaction = (tradeDetails) => {
  let buyExchange = tradeDetails['buyExchange']['exchange']

  // Place trade on the right exchange
  if (buyExchange === 'btrx') {
    btrx_buy_transaction(tradeDetails)
  }else if(buyExchange === 'bter'){
    // bter_buy_transaction(tradeDetails)
  }
}

// Monitor fullfillment status

const btrx_buy_transaction = (tradeDetails) => {
  let buyTradeDetails = tradeDetails['buyExchange']

  let baseCurrencyAvailable = store.getState().coinBalance[buyTradeDetails['exchange']][buyTradeDetails['baseCurrency']]['Available']
  let baseCurrency = buyTradeDetails['baseCurrency'].toUpperCase()
  let altCurrency = buyTradeDetails['altCurrency'].toUpperCase()
  let price = buyTradeDetails['lowestAsk']
  let stake = (baseCurrencyAvailable * fraction) / price

  console.log('Placing a BUY order at Bittrex to get ' + stake + ' ' + altCurrency + ' with ' + baseCurrency + ' @ ' + price)
  placeOrder('buy', baseCurrency, altCurrency, stake, price)
  .then((result) => {
    console.log('BUY Order successfully placed at Bittrex')
    tradeDetails['status'] = 'buying'
    tradeDetails['buyExchange']['orderId'] = result['result']['uuid']
    store.dispatch(registerArbitrageTrade(buyTradeDetails['market'], tradeDetails))
  })
}
