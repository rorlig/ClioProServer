/**
 * Attempt model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Attempt = require('./attempt.model');
var AttemptEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AttemptEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Attempt.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AttemptEvents.emit(event + ':' + doc._id, doc);
    AttemptEvents.emit(event, doc);
  }
}

module.exports = AttemptEvents;
