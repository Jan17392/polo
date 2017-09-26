import { store, updateCoinBalance } from './store'
import { getBalances } from './bittrex-request'

// Load all Altcoin Balances on Script Start and Store them
getBalances()
.then((data) => {
  let balances = data['result']
  for(let entry in balances){
    let altcoin = balances[entry]['Currency'].toLowerCase()
    store.dispatch(updateCoinBalance('btrx', altcoin, balances[entry]))
  }
})

// TODO: Load Bter Altcoin balances
