'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  DataPoint = mongoose.model('DataPoint'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * List of Articles
 */
exports.listSeconds = function (req, res) {
  var endResponse = {};
  var currentDate = new Date();
  DataPoint.find({
    'created': {'$gte': new Date(currentDate.getTime() - 30 * 60000)}
  }).sort('created').populate('user', 'displayName').exec(function (err, articles) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};