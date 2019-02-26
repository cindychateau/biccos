'use strict';
module.exports = function (app) {
  var api = require('../controllers/apiController');

  app.route('/market_data')
    .get(api.getMarketData);
};