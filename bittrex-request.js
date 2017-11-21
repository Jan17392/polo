import bittrex from 'node.bittrex.api'
import request from 'request'

bittrex.options({
  'apikey': '',// process.env.API_KEY,
  'apisecret': '' // process.env.API_SECRET
});

export function getCandles(altcoin, interval){
  return new Promise(function(resolve, reject){
    bittrex.getcandles({ marketName: 'BTC-' + altcoin, tickInterval: interval }, function(data, err){
      if(!err){
        resolve(data)
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    })
  })
}

export function placeOrder(type, basecoin, altcoin, stake, price){
  return new Promise(function(resolve, reject){
    bittrex.sendCustomRequest('https://bittrex.com/api/v1.1/market/' + type + 'limit?&market=' + basecoin + '-' + altcoin + '&quantity=' + stake + '&rate=' + price, function( data, err ) {
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

export function getMarketSummaries(){
  return new Promise(function(resolve, reject){
    bittrex.getmarketsummaries(function( data, err ) {
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

export function getCurrencies(){
  return new Promise(function(resolve, reject){
    bittrex.sendCustomRequest('https://bittrex.com/api/v1.1/public/getcurrencies', function( data, err ) {
      if(!err){
        resolve(data)
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    }, true )
  })
}

export function getTickerBittrex(basecoin, altcoin){
  return new Promise(function(resolve, reject){
    bittrex.getticker( { market : basecoin + '-' + altcoin }, function( data, err ) {
      if(!err){
        resolve(data)
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    })
  })
}

export function getTickerBter(){
  return new Promise(function(resolve, reject){
    request('http://data.bter.com/api2/1/tickers', function (err, response, body) {
      if(!err){
        resolve(JSON.parse(body))
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    })
  })
}

export function getTickerCryptopia(){
  return new Promise(function(resolve, reject){
    request('https://www.cryptopia.co.nz/api/GetMarkets', function (err, response, body) {
      if(!err){
        resolve(JSON.parse(body))
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    })
  })
}

export function getTickerNovaexchange(){
  return new Promise(function(resolve, reject){
    request('https://novaexchange.com/remote/v2/markets/', function (err, response, body) {
      if(!err){
        resolve(JSON.parse(body))
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    })
  })
}

export function getTickerHitbtc(){
  return new Promise(function(resolve, reject){
    request('https://api.hitbtc.com/api/1/public/ticker', function (err, response, body) {
      if(!err){
        resolve(JSON.parse(body))
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    })
  })
}

export function getTickerLiqui(){
  return new Promise(function(resolve, reject){
    request('https://api.liqui.io/api/3/ticker/eth_btc-ltc_btc-snm_btc-ae_btc-bat_btc-mgo_btc-zrx_btc-tnt_btc-gnt_btc-cvc_btc-eos_btc-dnt_btc-stx_btc-round_btc-1st_btc-sngls_btc-edg_btc-vsl_btc-san_btc-icn_btc-snt_btc-bcc_btc-wings_btc-waves_btc-adx_btc-dash_btc-ant_btc-omg_btc-myst_btc-lun_btc-qtum_btc-mln_btc-taas_btc-gup_btc-rlc_btc-pay_btc-storj_btc-oax_btc-qrl_btc-trst_btc-dgd_btc-cfi_btc-tkn_btc-time_btc-ptoy_btc-mco_btc-ae_eth-snm_eth-zrx_eth-tnt_eth-stx_eth-eos_eth-dnt_eth-cvc_eth-1st_eth-bat_eth-icn_eth-bcc_eth-mgo_eth-ltc_eth-edg_eth-snt_eth-omg_eth-san_eth-sngls_eth-wings_eth-vsl_eth-waves_eth-mln_eth-myst_eth-gnt_eth-ant_eth-dash_eth-taas_eth-adx_eth-gup_eth-oax_eth-qtum_eth-lun_eth-bnt_eth-pay_eth-tkn_eth-mco_eth-bcap_eth-ptoy_eth-time_eth-net_eth-trst_eth-cfi_eth-incnt_eth-qrl_eth-storj_eth-hmq_eth-rlc_eth-dgd_eth-plu_eth-round_eth-rep_eth-xid_eth-gno_eth?ignore_invalid=1', function (err, response, body) {
      if(!err){
        resolve(JSON.parse(body))
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    })
  })
}

export function getTickerCcex(){
  return new Promise(function(resolve, reject){
    request('https://c-cex.com/t/prices.json', function (err, response, body) {
      if(!err){
        resolve(JSON.parse(body))
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    })
  })
}

export function getOrderHistory(){
  return new Promise(function(resolve, reject){
    bittrex.sendCustomRequest('https://bittrex.com/api/v1.1/account/getorderhistory', function( data, err ) {
      if(!err){
        resolve(data)
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    }, true )
  })
}

export function withdrawCoins(withdrawCurrency, stake, receivingWallet){
  return new Promise(function(resolve, reject){
    bittrex.sendCustomRequest('https://bittrex.com/api/v1.1/account/withdraw?currency=' + withdrawCurrency + '&quantity=' + stake + '&address=' + receivingWallet, function( data, err ) {
      if(!err){
        resolve(data)
      }else{
        console.log('Error: ' + JSON.stringify(err))
        reject()
      }
    }, true )
  })
}



