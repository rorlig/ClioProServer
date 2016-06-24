'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var TeamsSchema = new Schema({
  handler: String,
  canine: String,
  company: String,
  name: String
});

module.exports = mongoose.model('Teams', TeamsSchema);
