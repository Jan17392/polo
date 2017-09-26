import { getOrderHistory } from '../bittrex-request'
import { store, registerArbitrageTrade } from '../store'
import { start_withdraw_transaction } from './withdraw_transactions'
import _ from 'underscore'

const monitor_buy_transactions = () => {
  getOrderHistory()
  .then((result) => {
    let orders = result['result']
    let openBuyOrders = store.getState().arbitrageTrades

    for(let entry in openBuyOrders){
      let currentBuyOrder = openBuyOrders[entry]['buyExchange']
      if (openBuyOrders[entry]['status'] === 'buying') {
        let orderId = currentBuyOrder['orderId']
        let openOrder = _.findWhere(orders, { 'OrderUuid': orderId })
        console.log('Order found: ' + JSON.stringify(openOrder))
        if (openOrder['QuantityRemaining'] == 0) {
          openBuyOrders[entry]['status'] = 'bought'
          store.dispatch(registerArbitrageTrade(currentBuyOrder['market'], openBuyOrders[entry]))
          start_withdraw_transaction(openBuyOrders[entry])
        }
      }
    }
  })
}
