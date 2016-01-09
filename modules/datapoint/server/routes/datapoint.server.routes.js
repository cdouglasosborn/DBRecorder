'use strict';

/**
 * Module dependencies.
 */
var datapoints = require('../controllers/datapoint.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/datapoints')
    .get(datapoints.listSeconds)
};
