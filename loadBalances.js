import { store, updateCoinBalance } from './store'
import { getBalances } from './bittrex-request'

// Load all Altcoin Balances on Script Start and Store them
getBalances()
.then((data) => {
  let balances = data['result']
  for(let entry in balances){
    store.dispatch(updateCoinBalance(balances[entry]['Currency'], balances[entry]['Available']))
  }
})
