'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var teamsCtrlStub = {
  index: 'teamsCtrl.index',
  show: 'teamsCtrl.show',
  create: 'teamsCtrl.create',
  update: 'teamsCtrl.update',
  destroy: 'teamsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var teamsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './teams.controller': teamsCtrlStub
});

describe('Teams API Router:', function() {

  it('should return an express router instance', function() {
    teamsIndex.should.equal(routerStub);
  });

  describe('GET /api/teams', function() {

    it('should route to teams.controller.index', function() {
      routerStub.get
                .withArgs('/', 'teamsCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/teams/:id', function() {

    it('should route to teams.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'teamsCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/teams', function() {

    it('should route to teams.controller.create', function() {
      routerStub.post
                .withArgs('/', 'teamsCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/teams/:id', function() {

    it('should route to teams.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'teamsCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/teams/:id', function() {

    it('should route to teams.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'teamsCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/teams/:id', function() {

    it('should route to teams.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'teamsCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
