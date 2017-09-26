import socketCluster from 'socketcluster-client'
import { store, registerPrice } from './store'
import { calculateArbs } from './calculations/calculateArbs'

const api_credentials = {
  "apiKey": "77769d2a92c28ec809af1e709e1ab456",
  "apiSecret": "31918ec706ed2dadf65beffc7deea8b4"
}

const options = {
  hostname: "sc-02.coinigy.com",
  port: "443",
  secure: "true"
};

const SCsocket = socketCluster.connect(options);


SCsocket.on('connect', function (status) {
  SCsocket.on('error', function (err) {
    console.log(err)
  });

  SCsocket.emit("auth", api_credentials, function (err, token) {
    if (!err && token) {

      // Listening to ETH Channels:
      let scChannelETH1 = SCsocket.subscribe("TRADE-BTRX--ETH--BTC")
      let scChannelETH2 = SCsocket.subscribe("TRADE-PLNX--ETH--BTC")
      let scChannelETH3 = SCsocket.subscribe("TRADE-GMNI--ETH--BTC")
      let scChannelETH4 = SCsocket.subscribe("TRADE-BITF--ETH--BTC")
      let scChannelETH5 = SCsocket.subscribe("TRADE-BITS--ETH--BTC")
      let scChannelETH6 = SCsocket.subscribe("TRADE-BTCC--ETH--BTC")
      let scChannelETH7 = SCsocket.subscribe("TRADE-BTER--ETH--BTC")
      let scChannelETH8 = SCsocket.subscribe("TRADE-CCEX--ETH--BTC")
      let scChannelETH9 = SCsocket.subscribe("TRADE-CXIO--ETH--BTC")
      let scChannelETH10 = SCsocket.subscribe("TRADE-CPIA--ETH--BTC")
      let scChannelETH11 = SCsocket.subscribe("TRADE-GDAX--ETH--BTC")
      let scChannelETH12 = SCsocket.subscribe("TRADE-HUOB--ETH--BTC")
      let scChannelETH13 = SCsocket.subscribe("TRADE-KRKN--ETH--BTC")
      let scChannelETH14 = SCsocket.subscribe("TRADE-LIQU--ETH--BTC")
      let scChannelETH15 = SCsocket.subscribe("TRADE-OK--ETH--BTC")
      let scChannelETH16 = SCsocket.subscribe("TRADE-GOLD--ETH--BTC")
      let scChannelETH17 = SCsocket.subscribe("TRADE-VBTC--ETH--BTC")

      // Listening to OMG Channels:
      let scChannelOMG1 = SCsocket.subscribe("TRADE-BTRX--OMG--BTC")
      let scChannelOMG2 = SCsocket.subscribe("TRADE-PLNX--OMG--BTC")
      let scChannelOMG3 = SCsocket.subscribe("TRADE-GMNI--OMG--BTC")
      let scChannelOMG4 = SCsocket.subscribe("TRADE-BITF--OMG--BTC")
      let scChannelOMG5 = SCsocket.subscribe("TRADE-BITS--OMG--BTC")
      let scChannelOMG6 = SCsocket.subscribe("TRADE-BTCC--OMG--BTC")
      let scChannelOMG7 = SCsocket.subscribe("TRADE-BTER--OMG--BTC")
      let scChannelOMG8 = SCsocket.subscribe("TRADE-CCEX--OMG--BTC")
      let scChannelOMG9 = SCsocket.subscribe("TRADE-CXIO--OMG--BTC")
      let scChannelOMG10 = SCsocket.subscribe("TRADE-CPIA--OMG--BTC")
      let scChannelOMG11 = SCsocket.subscribe("TRADE-GDAX--OMG--BTC")
      let scChannelOMG12 = SCsocket.subscribe("TRADE-HUOB--OMG--BTC")
      let scChannelOMG13 = SCsocket.subscribe("TRADE-KRKN--OMG--BTC")
      let scChannelOMG14 = SCsocket.subscribe("TRADE-LIQU--OMG--BTC")
      let scChannelOMG15 = SCsocket.subscribe("TRADE-OK--OMG--BTC")
      let scChannelOMG16 = SCsocket.subscribe("TRADE-GOLD--OMG--BTC")
      let scChannelOMG17 = SCsocket.subscribe("TRADE-VBTC--OMG--BTC")

      // Listening to NEO Channels:
      let scChannelNEO1 = SCsocket.subscribe("TRADE-BTRX--NEO--BTC")
      let scChannelNEO2 = SCsocket.subscribe("TRADE-PLNX--NEO--BTC")
      let scChannelNEO3 = SCsocket.subscribe("TRADE-GMNI--NEO--BTC")
      let scChannelNEO4 = SCsocket.subscribe("TRADE-BITF--NEO--BTC")
      let scChannelNEO5 = SCsocket.subscribe("TRADE-BITS--NEO--BTC")
      let scChannelNEO6 = SCsocket.subscribe("TRADE-BTCC--NEO--BTC")
      let scChannelNEO7 = SCsocket.subscribe("TRADE-BTER--NEO--BTC")
      let scChannelNEO8 = SCsocket.subscribe("TRADE-CCEX--NEO--BTC")
      let scChannelNEO9 = SCsocket.subscribe("TRADE-CXIO--NEO--BTC")
      let scChannelNEO10 = SCsocket.subscribe("TRADE-CPIA--NEO--BTC")
      let scChannelNEO11 = SCsocket.subscribe("TRADE-GDAX--NEO--BTC")
      let scChannelNEO12 = SCsocket.subscribe("TRADE-HUOB--NEO--BTC")
      let scChannelNEO13 = SCsocket.subscribe("TRADE-KRKN--NEO--BTC")
      let scChannelNEO14 = SCsocket.subscribe("TRADE-LIQU--NEO--BTC")
      let scChannelNEO15 = SCsocket.subscribe("TRADE-OK--NEO--BTC")
      let scChannelNEO16 = SCsocket.subscribe("TRADE-GOLD--NEO--BTC")
      let scChannelNEO17 = SCsocket.subscribe("TRADE-VBTC--NEO--BTC")

      // Listening to LTC Channels:
      let scChannelLTC1 = SCsocket.subscribe("TRADE-BTRX--LTC--BTC")
      let scChannelLTC2 = SCsocket.subscribe("TRADE-PLNX--LTC--BTC")
      let scChannelLTC3 = SCsocket.subscribe("TRADE-GMNI--LTC--BTC")
      let scChannelLTC4 = SCsocket.subscribe("TRADE-BITF--LTC--BTC")
      let scChannelLTC5 = SCsocket.subscribe("TRADE-BITS--LTC--BTC")
      let scChannelLTC6 = SCsocket.subscribe("TRADE-BTCC--LTC--BTC")
      let scChannelLTC7 = SCsocket.subscribe("TRADE-BTER--LTC--BTC")
      let scChannelLTC8 = SCsocket.subscribe("TRADE-CCEX--LTC--BTC")
      let scChannelLTC9 = SCsocket.subscribe("TRADE-CXIO--LTC--BTC")
      let scChannelLTC10 = SCsocket.subscribe("TRADE-CPIA--LTC--BTC")
      let scChannelLTC11 = SCsocket.subscribe("TRADE-GDAX--LTC--BTC")
      let scChannelLTC12 = SCsocket.subscribe("TRADE-HUOB--LTC--BTC")
      let scChannelLTC13 = SCsocket.subscribe("TRADE-KRKN--LTC--BTC")
      let scChannelLTC14 = SCsocket.subscribe("TRADE-LIQU--LTC--BTC")
      let scChannelLTC15 = SCsocket.subscribe("TRADE-OK--LTC--BTC")
      let scChannelLTC16 = SCsocket.subscribe("TRADE-GOLD--LTC--BTC")
      let scChannelLTC17 = SCsocket.subscribe("TRADE-VBTC--LTC--BTC")

      // Listening to ZEC Channels:
      let scChannelZEC1 = SCsocket.subscribe("TRADE-BTRX--ZEC--BTC")
      let scChannelZEC2 = SCsocket.subscribe("TRADE-PLNX--ZEC--BTC")
      let scChannelZEC3 = SCsocket.subscribe("TRADE-GMNI--ZEC--BTC")
      let scChannelZEC4 = SCsocket.subscribe("TRADE-BITF--ZEC--BTC")
      let scChannelZEC5 = SCsocket.subscribe("TRADE-BITS--ZEC--BTC")
      let scChannelZEC6 = SCsocket.subscribe("TRADE-BTCC--ZEC--BTC")
      let scChannelZEC7 = SCsocket.subscribe("TRADE-BTER--ZEC--BTC")
      let scChannelZEC8 = SCsocket.subscribe("TRADE-CCEX--ZEC--BTC")
      let scChannelZEC9 = SCsocket.subscribe("TRADE-CXIO--ZEC--BTC")
      let scChannelZEC10 = SCsocket.subscribe("TRADE-CPIA--ZEC--BTC")
      let scChannelZEC11 = SCsocket.subscribe("TRADE-GDAX--ZEC--BTC")
      let scChannelZEC12 = SCsocket.subscribe("TRADE-HUOB--ZEC--BTC")
      let scChannelZEC13 = SCsocket.subscribe("TRADE-KRKN--ZEC--BTC")
      let scChannelZEC14 = SCsocket.subscribe("TRADE-LIQU--ZEC--BTC")
      let scChannelZEC15 = SCsocket.subscribe("TRADE-OK--ZEC--BTC")
      let scChannelZEC16 = SCsocket.subscribe("TRADE-GOLD--ZEC--BTC")
      let scChannelZEC17 = SCsocket.subscribe("TRADE-VBTC--ZEC--BTC")

      // Listening to QTUM Channels:
      let scChannelQTUM1 = SCsocket.subscribe("TRADE-BTRX--QTUM--BTC")
      let scChannelQTUM2 = SCsocket.subscribe("TRADE-PLNX--QTUM--BTC")
      let scChannelQTUM3 = SCsocket.subscribe("TRADE-GMNI--QTUM--BTC")
      let scChannelQTUM4 = SCsocket.subscribe("TRADE-BITF--QTUM--BTC")
      let scChannelQTUM5 = SCsocket.subscribe("TRADE-BITS--QTUM--BTC")
      let scChannelQTUM6 = SCsocket.subscribe("TRADE-BTCC--QTUM--BTC")
      let scChannelQTUM7 = SCsocket.subscribe("TRADE-BTER--QTUM--BTC")
      let scChannelQTUM8 = SCsocket.subscribe("TRADE-CCEX--QTUM--BTC")
      let scChannelQTUM9 = SCsocket.subscribe("TRADE-CXIO--QTUM--BTC")
      let scChannelQTUM10 = SCsocket.subscribe("TRADE-CPIA--QTUM--BTC")
      let scChannelQTUM11 = SCsocket.subscribe("TRADE-GDAX--QTUM--BTC")
      let scChannelQTUM12 = SCsocket.subscribe("TRADE-HUOB--QTUM--BTC")
      let scChannelQTUM13 = SCsocket.subscribe("TRADE-KRKN--QTUM--BTC")
      let scChannelQTUM14 = SCsocket.subscribe("TRADE-LIQU--QTUM--BTC")
      let scChannelQTUM15 = SCsocket.subscribe("TRADE-OK--QTUM--BTC")
      let scChannelQTUM16 = SCsocket.subscribe("TRADE-GOLD--QTUM--BTC")
      let scChannelQTUM17 = SCsocket.subscribe("TRADE-VBTC--QTUM--BTC")

      // Listening to NAV Channels:
      let scChannelNAV1 = SCsocket.subscribe("TRADE-BTRX--NAV--BTC")
      let scChannelNAV2 = SCsocket.subscribe("TRADE-PLNX--NAV--BTC")
      let scChannelNAV3 = SCsocket.subscribe("TRADE-GMNI--NAV--BTC")
      let scChannelNAV4 = SCsocket.subscribe("TRADE-BITF--NAV--BTC")
      let scChannelNAV5 = SCsocket.subscribe("TRADE-BITS--NAV--BTC")
      let scChannelNAV6 = SCsocket.subscribe("TRADE-BTCC--NAV--BTC")
      let scChannelNAV7 = SCsocket.subscribe("TRADE-BTER--NAV--BTC")
      let scChannelNAV8 = SCsocket.subscribe("TRADE-CCEX--NAV--BTC")
      let scChannelNAV9 = SCsocket.subscribe("TRADE-CXIO--NAV--BTC")
      let scChannelNAV10 = SCsocket.subscribe("TRADE-CPIA--NAV--BTC")
      let scChannelNAV11 = SCsocket.subscribe("TRADE-GDAX--NAV--BTC")
      let scChannelNAV12 = SCsocket.subscribe("TRADE-HUOB--NAV--BTC")
      let scChannelNAV13 = SCsocket.subscribe("TRADE-KRKN--NAV--BTC")
      let scChannelNAV14 = SCsocket.subscribe("TRADE-LIQU--NAV--BTC")
      let scChannelNAV15 = SCsocket.subscribe("TRADE-OK--NAV--BTC")
      let scChannelNAV16 = SCsocket.subscribe("TRADE-GOLD--NAV--BTC")
      let scChannelNAV17 = SCsocket.subscribe("TRADE-VBTC--NAV--BTC")

      // Listening to LSK Channels:
      let scChannelLSK1 = SCsocket.subscribe("TRADE-BTRX--LSK--BTC")
      let scChannelLSK2 = SCsocket.subscribe("TRADE-PLNX--LSK--BTC")
      let scChannelLSK3 = SCsocket.subscribe("TRADE-GMNI--LSK--BTC")
      let scChannelLSK4 = SCsocket.subscribe("TRADE-BITF--LSK--BTC")
      let scChannelLSK5 = SCsocket.subscribe("TRADE-BITS--LSK--BTC")
      let scChannelLSK6 = SCsocket.subscribe("TRADE-BTCC--LSK--BTC")
      let scChannelLSK7 = SCsocket.subscribe("TRADE-BTER--LSK--BTC")
      let scChannelLSK8 = SCsocket.subscribe("TRADE-CCEX--LSK--BTC")
      let scChannelLSK9 = SCsocket.subscribe("TRADE-CXIO--LSK--BTC")
      let scChannelLSK10 = SCsocket.subscribe("TRADE-CPIA--LSK--BTC")
      let scChannelLSK11 = SCsocket.subscribe("TRADE-GDAX--LSK--BTC")
      let scChannelLSK12 = SCsocket.subscribe("TRADE-HUOB--LSK--BTC")
      let scChannelLSK13 = SCsocket.subscribe("TRADE-KRKN--LSK--BTC")
      let scChannelLSK14 = SCsocket.subscribe("TRADE-LIQU--LSK--BTC")
      let scChannelLSK15 = SCsocket.subscribe("TRADE-OK--LSK--BTC")
      let scChannelLSK16 = SCsocket.subscribe("TRADE-GOLD--LSK--BTC")
      let scChannelLSK17 = SCsocket.subscribe("TRADE-VBTC--LSK--BTC")

      // Listening to PAY Channels:
      let scChannelPAY1 = SCsocket.subscribe("TRADE-BTRX--PAY--BTC")
      let scChannelPAY2 = SCsocket.subscribe("TRADE-PLNX--PAY--BTC")
      let scChannelPAY3 = SCsocket.subscribe("TRADE-GMNI--PAY--BTC")
      let scChannelPAY4 = SCsocket.subscribe("TRADE-BITF--PAY--BTC")
      let scChannelPAY5 = SCsocket.subscribe("TRADE-BITS--PAY--BTC")
      let scChannelPAY6 = SCsocket.subscribe("TRADE-BTCC--PAY--BTC")
      let scChannelPAY7 = SCsocket.subscribe("TRADE-BTER--PAY--BTC")
      let scChannelPAY8 = SCsocket.subscribe("TRADE-CCEX--PAY--BTC")
      let scChannelPAY9 = SCsocket.subscribe("TRADE-CXIO--PAY--BTC")
      let scChannelPAY10 = SCsocket.subscribe("TRADE-CPIA--PAY--BTC")
      let scChannelPAY11 = SCsocket.subscribe("TRADE-GDAX--PAY--BTC")
      let scChannelPAY12 = SCsocket.subscribe("TRADE-HUOB--PAY--BTC")
      let scChannelPAY13 = SCsocket.subscribe("TRADE-KRKN--PAY--BTC")
      let scChannelPAY14 = SCsocket.subscribe("TRADE-LIQU--PAY--BTC")
      let scChannelPAY15 = SCsocket.subscribe("TRADE-OK--PAY--BTC")
      let scChannelPAY16 = SCsocket.subscribe("TRADE-GOLD--PAY--BTC")
      let scChannelPAY17 = SCsocket.subscribe("TRADE-VBTC--PAY--BTC")

      // Listening to BCC Channels:
      let scChannelBCC1 = SCsocket.subscribe("TRADE-BTRX--BCC--BTC")
      let scChannelBCC2 = SCsocket.subscribe("TRADE-PLNX--BCC--BTC")
      let scChannelBCC3 = SCsocket.subscribe("TRADE-GMNI--BCC--BTC")
      let scChannelBCC4 = SCsocket.subscribe("TRADE-BITF--BCC--BTC")
      let scChannelBCC5 = SCsocket.subscribe("TRADE-BITS--BCC--BTC")
      let scChannelBCC6 = SCsocket.subscribe("TRADE-BTCC--BCC--BTC")
      let scChannelBCC7 = SCsocket.subscribe("TRADE-BTER--BCC--BTC")
      let scChannelBCC8 = SCsocket.subscribe("TRADE-CCEX--BCC--BTC")
      let scChannelBCC9 = SCsocket.subscribe("TRADE-CXIO--BCC--BTC")
      let scChannelBCC10 = SCsocket.subscribe("TRADE-CPIA--BCC--BTC")
      let scChannelBCC11 = SCsocket.subscribe("TRADE-GDAX--BCC--BTC")
      let scChannelBCC12 = SCsocket.subscribe("TRADE-HUOB--BCC--BTC")
      let scChannelBCC13 = SCsocket.subscribe("TRADE-KRKN--BCC--BTC")
      let scChannelBCC14 = SCsocket.subscribe("TRADE-LIQU--BCC--BTC")
      let scChannelBCC15 = SCsocket.subscribe("TRADE-OK--BCC--BTC")
      let scChannelBCC16 = SCsocket.subscribe("TRADE-GOLD--BCC--BTC")
      let scChannelBCC17 = SCsocket.subscribe("TRADE-VBTC--BCC--BTC")

      scChannelETH1.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH2.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH3.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH4.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH5.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH6.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH7.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH8.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH9.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH10.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH11.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH12.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH13.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH14.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH15.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH16.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelETH17.watch(function (data) {
        console.log('Channel ETH 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG1.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG2.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG3.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG4.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG5.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG6.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG7.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG8.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG9.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG10.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG11.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG12.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG13.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG14.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG15.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG16.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelOMG17.watch(function (data) {
        console.log('Channel OMG 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO1.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO2.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO3.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO4.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO5.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO6.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO7.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO8.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO9.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO10.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO11.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO12.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO13.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO14.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO15.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO16.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNEO17.watch(function (data) {
        console.log('Channel NEO 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC1.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC2.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC3.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC4.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC5.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC6.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC7.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC8.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC9.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC10.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC11.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC12.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC13.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC14.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC15.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC16.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLTC17.watch(function (data) {
        console.log('Channel LTC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC1.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC2.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC3.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC4.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC5.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC6.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC7.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC8.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC9.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC10.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC11.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC12.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC13.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC14.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC15.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC16.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelZEC17.watch(function (data) {
        console.log('Channel ZEC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM1.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM2.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM3.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM4.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM5.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM6.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM7.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM8.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM9.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM10.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM11.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM12.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM13.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM14.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM15.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM16.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelQTUM17.watch(function (data) {
        console.log('Channel QTUM 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV1.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV2.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV3.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV4.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV5.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV6.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV7.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV8.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV9.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV10.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV11.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV12.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV13.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV14.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV15.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV16.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelNAV17.watch(function (data) {
        console.log('Channel NAV 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK1.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK2.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK3.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK4.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK5.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK6.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK7.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK8.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK9.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK10.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK11.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK12.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK13.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK14.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK15.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK16.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelLSK17.watch(function (data) {
        console.log('Channel LSK 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY1.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY2.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY3.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY4.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY5.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY6.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY7.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY8.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY9.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY10.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY11.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY12.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY13.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY14.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY15.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY16.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelPAY17.watch(function (data) {
        console.log('Channel PAY 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC1.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC2.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC3.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC4.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC5.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC6.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC7.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC8.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC9.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC10.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC11.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC12.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC13.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC14.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC15.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC16.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })

      scChannelBCC17.watch(function (data) {
        console.log('Channel BCC 1');
        store.dispatch(registerPrice(data))
        calculateArbs(data)
      })


    } else {
      console.log(err)
    }
  })
})
