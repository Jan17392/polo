import { start_buy_transaction } from './buy_transactions'
//import { start_sell_transaction } from './sell_transactions'
//import { start_withdraw_transaction } from './withdraw_transactions'
import { store } from '../store'

export const start_transactions = () => {
  let openTrades = store.getState().arbitrageTrades

  for(let entry in openTrades){
    let currentTrade = openTrades[entry]
    if (currentTrade['status'] === 'open') {
      start_buy_transaction(currentTrade)
    }
  }
}
