import { getOrder, cancelOrder } from './bittrex-request'
import { store, updateCurrentSignal, registerNewOrder, unregisterOrder } from './store'
import { CronJob } from 'cron'

const maxOfferRuntimeInMin = 1

new CronJob('*/20 * * * * *', function() {
  console.log('Checking Open Orders')
  let openOrdersStore = store.getState().openOrders
  let openOrders = Object.keys(openOrdersStore)

  for(let entry in openOrders){
    let uuid = openOrders[entry]
    console.log('Checking Open Order: ' + uuid)

    getOrder(uuid)
      .then((result) => {
        console.log(JSON.stringify(result))
        if (result['result']['IsOpen'] && store.getState().openOrders[uuid] + (maxOfferRuntimeInMin * 1000 * 60) < Date.getTime() ) {
          cancelOrder(uuid)
            .then((result) => {
              store.dispatch(unregisterOrder(uuid))
            })
            .catch((error) => {
              console.log('Order Cancellation failed')
            })
        }else if(!result['result']['IsOpen']){
          store.dispatch(unregisterOrder(uuid))
        }
      })
      .catch((error) => {
        console.log('Error in Getting Order')
      })
  }
}, null, true);
