import { createStore, combineReducers } from 'redux'

const prices = (state={}, action) => {
  switch(action.type) {
    case 'REGISTER_PRICE':
      let currencyPair = action.data['label']
      let marketType = action.data['type']
      let exchange = action.data['exchange']
      let currentState = state

      if (typeof currentState[action.currencyPair] === 'undefined') {
        currentState[action.currencyPair] = {}
        currentState[action.currencyPair][action.marketType] = {}
        currentState[action.currencyPair][action.marketType][action.exchange] = action.data
      }else if(typeof currentState[action.currencyPair][action.marketType] === 'undefined'){
        currentState[action.currencyPair][action.marketType] = {}
        currentState[action.currencyPair][action.marketType][action.exchange] = action.data
      }else{
        currentState[action.currencyPair][action.marketType][action.exchange] = action.data
      }
      return {
        ...state
      }
    default:
      return state
  }
}

const arbitrageTrades = (state={}, action) => {
  switch(action.type) {
    case 'REGISTER_ARBITRAGE_TRADE':
      if ((typeof state[action.key] !== 'undefined'
      && state[action.key]['status'] === 'open')
      || typeof state[action.key] === 'undefined') {
        return {
          ...state,
          [action.key]: action.data
        }
      }
    default:
      return state
  }
}

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

const trendOrders = (state={}, action) => {
  switch(action.type) {
    case 'REGISTER_TREND_TRADE':
      return {
        ...state,
        [action.key]: action.data
      }
    case 'UNREGISTER_TREND_TRADE':
      const orderRemoved = {...state}
      delete orderRemoved[action.key]
      return orderRemoved
    default:
      return state
  }
}

const wmas = (state={}, action) => {
  switch(action.type) {
    case 'REGISTER_WMA':
      return {
        ...state,
        [action.key]: action.data
      }
    default:
      return state
  }
}

const coinBalance = (state={}, action) => {
  switch(action.type) {
    case 'UPDATE_COIN_BALANCE':
      let currentState = state
      if (typeof currentState[action.exchange] === 'undefined') {
        currentState[action.exchange] = {}
        currentState[action.exchange][action.altcoin] = action.balance
      }else{
        currentState[action.exchange][action.altcoin] = action.balance
      }
      return currentState
    default:
      return state
  }
}

const currentSignal = (state={}, action) => {
  switch(action.type) {
    case 'UPDATE_CURRENT_SIGNAL':
      let currentState = state
      if (typeof currentState[action.indicator] === 'undefined') {
        currentState[action.indicator] = {}
        currentState[action.indicator][action.altcoin] = action.signal
      }else{
        currentState[action.indicator][action.altcoin] = action.signal
      }
      return currentState
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

export const updateCurrentSignal = (altcoin, indicator, signal) => ({
  type: 'UPDATE_CURRENT_SIGNAL',
  altcoin,
  indicator,
  signal
})

export const updateCoinBalance = (exchange, altcoin, balance) => ({
  type: 'UPDATE_COIN_BALANCE',
  exchange,
  altcoin,
  balance
})

export const registerPrice = (currencyPair, marketType, exchange, data) => ({
  type: 'REGISTER_PRICE',
  currencyPair,
  marketType,
  exchange,
  data
})

export const registerArbitrageTrade = (key, data) => ({
  type: 'REGISTER_ARBITRAGE_TRADE',
  key,
  data
})

export const registerTrendTrade = (key, data) => ({
  type: 'REGISTER_TREND_TRADE',
  key,
  data
})

export const unregisterTrendTrade = (key) => ({
  type: 'UNREGISTER_TREND_TRADE',
  key
})

export const registerWMA = (key, data) => ({
  type: 'REGISTER_WMA',
  key,
  data
})

export const store = createStore(combineReducers({
  openOrders,
  trendOrders,
  arbitrageTrades,
  currentSignal,
  coinBalance,
  prices,
  wmas
}))
