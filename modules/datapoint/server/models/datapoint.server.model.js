'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var DataPointSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
    default: 0
  }
});

mongoose.model('DataPoint', DataPointSchema);
