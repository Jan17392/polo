import { createStore, combineReducers } from 'redux'

const openOrders = (state={}, action) => {
  switch(action.type) {
    case 'REGISTER_NEW_ORDER':
      return {
        ...state,
        [action.uuid]: action.timestamp
      }
    case 'UNREGISTER_ORDER':
      const orderRemoved = {...state}
      delete orderRemoved[action.uuid]
      return orderRemoved
    default:
      return state
  }
}

const coinBalance = (state={}, action) => {
  switch(action.type) {
    case 'UPDATE_COIN_BALANCE':
      return {
        ...state,
        [action.altcoin]: action.balance
      }
    default:
      return state
  }
}

const currentSignal = (state={}, action) => {
  switch(action.type) {
    case 'UPDATE_CURRENT_SIGNAL':
      return {
        ...state,
        [action.altcoin]: action.signal
      }
    default:
      return state
  }
}

export const registerNewOrder = (uuid, timestamp) => ({
  type: 'REGISTER_NEW_ORDER',
  uuid,
  timestamp
})

export const unregisterOrder = (uuid) => ({
  type: 'UNREGISTER_ORDER',
  uuid
})

export const updateCurrentSignal = (altcoin, signal) => ({
  type: 'UPDATE_CURRENT_SIGNAL',
  altcoin,
  signal
})

export const updateCoinBalance = (altcoin, balance) => ({
  type: 'UPDATE_COIN_BALANCE',
  altcoin,
  balance
})

export const store = createStore(combineReducers({
  openOrders,
  currentSignal,
  coinBalance
}))
