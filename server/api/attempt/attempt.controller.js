/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/v1/attempt              ->  index
 * POST    /api/v1/attempt              ->  create
 * GET     /api/v1/attempt/:id          ->  show
 * PUT     /api/v1/attempt/:id          ->  update
 * DELETE  /api/v1/attempt/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Attempt = require('./attempt.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Attempts
exports.index = function(req, res) {
  Attempt.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Attempt from the DB
exports.show = function(req, res) {
  Attempt.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Attempt in the DB
exports.create = function(req, res) {
  var resp = {}
  console.log(JSON.stringify(req.body))
  resp.success = true
  resp.error = {}
  resp.response = {}
  resp.body = req.body
  return res.json(resp);
};

// Updates an existing Attempt in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Attempt.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Attempt from the DB
exports.destroy = function(req, res) {
  Attempt.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
