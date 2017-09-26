import { store, registerArbitrageTrade } from '../store'
import { withdrawCoins } from '../bittrex-request'

export const start_withdraw_transaction = (tradeDetails) => {
  let buyExchange = tradeDetails['buyExchange']['exchange']
  let sellExchange = tradeDetails['sellExchange']['exchange']
  let receivingWallet = store.getState().coinBalance[sellExchange][tradeDetails['altCurrency']]['CryptoAddress']

  // Place trade on the right exchange
  if (buyExchange === 'btrx') {
    btrx_withdraw_transaction(receivingWallet, tradeDetails)
  }else if(buyExchange === 'bter'){
    // bter_withdraw_transaction(receivingWallet, tradeDetails)
  }
}

// Monitor fullfillment status

const btrx_withdraw_transaction = (receivingWallet, tradeDetails) => {
  withdrawCoins(withdrawCurrency, stake, receivingWallet)
  .then((result) => {
    console.log('WITHDRAW Order successfully executed at Bittrex')
    tradeDetails['status'] = 'withdrawing'
    tradeDetails['buyExchange']['orderId'] = result['result']['uuid']
    store.dispatch(registerArbitrageTrade(buyTradeDetails['market'], tradeDetails))
  })
}
