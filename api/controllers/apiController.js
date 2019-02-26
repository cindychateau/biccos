'use strict';

const WebSocket = require('ws');
const config = require('../../config');
const helpers = require('../../helpers');

exports.getMarketData = function (req, res) {
  var instruments = [];
  var results = [];
  var symbol = req.query.symbol;
  var id = req.query.id;
  var ws = new WebSocket(config.biccos.wss);

  ws.onopen = function () {
    ws.send(helpers.getFrame('instruments'));
  };

  ws.onmessage = function (evt) {
    var frame = JSON.parse(evt.data);
    var method = frame.n;
    switch (method) {
      case 'GetInstruments':
        instruments = JSON.parse(frame.o);
        instruments.forEach(instrument => {
          ws.send(helpers.getFrame('subscribe1', {
            InstrumentId: instrument.InstrumentId
          }));
        });
        break;
      case "SubscribeLevel1":
        var subscribeResponse = JSON.parse(frame.o);
        subscribeResponse.Symbol = instruments.find(instrument => {
          return instrument.InstrumentId == subscribeResponse.InstrumentId;
        }).Symbol;
        results.push(subscribeResponse);
        if (results.length == instruments.length) {
          var response = null;
          if (symbol) {
            response = results.find(instrument => {
              return instrument.Symbol == symbol.toUpperCase();
            });
          } else if (id) {
            response = results.find(instrument => {
              return instrument.InstrumentId == parseInt(id);
            });
          } else {
            response = results;
          }
          if (response) {
            res.send(JSON.stringify(response));
          } else {
            res.status(404).send(JSON.stringify({
              error: 'Not Found',
              message: 'Resource not found',
              code: 404
            }));
          }
          ws.close();
        }
        break;
      default:
        break;
    }
  };
}