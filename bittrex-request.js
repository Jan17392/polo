import bittrex from 'node.bittrex.api'

bittrex.options({
  'apikey': process.env.API_KEY,
  'apisecret': process.env.API_SECRET,
});

export function getCandles(altcoin){
  return new Promise(function(resolve, reject){
    bittrex.getcandles({ marketName: 'BTC-' + altcoin, tickInterval: 'fiveMin' }, function(data, err){
      if(!err){
        resolve(data)
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    })
  })
}

export function placeOrder(type, altcoin, stake, price){
  return new Promise(function(resolve, reject){
    bittrex.sendCustomRequest('https://bittrex.com/api/v1.1/market/' + type + 'limit?&market=BTC-' + altcoin + '&quantity=' + stake + '&rate=' + price, function( data, err ) {
      if(!err){
        console.log('PLACE ORDER: ' + JSON.stringify(data))
        resolve(data)
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    }, true )
  })
}

export function getBalance(altcoin){
  return new Promise(function(resolve, reject){
    bittrex.getbalance({ currency : altcoin }, function( data, err ) {
      if(!err){
        resolve(data)
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    })
  })
}

export function getBalances(altcoin){
  return new Promise(function(resolve, reject){
    bittrex.getbalances(function( data, err ) {
      if(!err){
        resolve(data)
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    })
  })
}

export function getMarketSummary(altcoin){
  return new Promise(function(resolve, reject){
    bittrex.getmarketsummary( { market : 'BTC-' + altcoin}, function( data, err ) {
      if(!err){
        resolve(data)
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    })
  })
}

export function getOrder(uuid){
  return new Promise(function(resolve, reject){
    bittrex.sendCustomRequest('https://bittrex.com/api/v1.1/account/getorder&uuid=' + uuid, function( data, err ) {
      if(!err){
        resolve(data)
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    }, true )
  })
}

export function cancelOrder(uuid){
  return new Promise(function(resolve, reject){
    bittrex.sendCustomRequest('https://bittrex.com/api/v1.1/market/cancel?uuid=' + uuid, function( data, err ) {
      if(!err){
        resolve(data)
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    }, true )
  })
}





