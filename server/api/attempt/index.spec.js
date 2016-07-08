'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var attemptCtrlStub = {
  index: 'attemptCtrl.index',
  show: 'attemptCtrl.show',
  create: 'attemptCtrl.create',
  update: 'attemptCtrl.update',
  destroy: 'attemptCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var attemptIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './attempt.controller': attemptCtrlStub
});

describe('Attempt API Router:', function() {

  it('should return an express router instance', function() {
    attemptIndex.should.equal(routerStub);
  });

  describe('GET /api/v1/attempt', function() {

    it('should route to attempt.controller.index', function() {
      routerStub.get
                .withArgs('/', 'attemptCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/v1/attempt/:id', function() {

    it('should route to attempt.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'attemptCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/v1/attempt', function() {

    it('should route to attempt.controller.create', function() {
      routerStub.post
                .withArgs('/', 'attemptCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/v1/attempt/:id', function() {

    it('should route to attempt.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'attemptCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/v1/attempt/:id', function() {

    it('should route to attempt.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'attemptCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/v1/attempt/:id', function() {

    it('should route to attempt.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'attemptCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
