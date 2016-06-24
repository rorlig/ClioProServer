/**
 * Teams model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Teams = require('./teams.model');
var TeamsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TeamsEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Teams.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TeamsEvents.emit(event + ':' + doc._id, doc);
    TeamsEvents.emit(event, doc);
  }
}

module.exports = TeamsEvents;
