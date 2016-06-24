'use strict';

var app = require('../../app');
var request = require('supertest');

var newTeams;

describe('Teams API:', function() {

  describe('GET /api/teams', function() {
    var teamss;

    beforeEach(function(done) {
      request(app)
        .get('/api/teams')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          teamss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      teamss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/teams', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/teams')
        .send({
          name: 'New Teams',
          info: 'This is the brand new teams!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newTeams = res.body;
          done();
        });
    });

    it('should respond with the newly created teams', function() {
      newTeams.name.should.equal('New Teams');
      newTeams.info.should.equal('This is the brand new teams!!!');
    });

  });

  describe('GET /api/teams/:id', function() {
    var teams;

    beforeEach(function(done) {
      request(app)
        .get('/api/teams/' + newTeams._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          teams = res.body;
          done();
        });
    });

    afterEach(function() {
      teams = {};
    });

    it('should respond with the requested teams', function() {
      teams.name.should.equal('New Teams');
      teams.info.should.equal('This is the brand new teams!!!');
    });

  });

  describe('PUT /api/teams/:id', function() {
    var updatedTeams

    beforeEach(function(done) {
      request(app)
        .put('/api/teams/' + newTeams._id)
        .send({
          name: 'Updated Teams',
          info: 'This is the updated teams!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTeams = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTeams = {};
    });

    it('should respond with the updated teams', function() {
      updatedTeams.name.should.equal('Updated Teams');
      updatedTeams.info.should.equal('This is the updated teams!!!');
    });

  });

  describe('DELETE /api/teams/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/teams/' + newTeams._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when teams does not exist', function(done) {
      request(app)
        .delete('/api/teams/' + newTeams._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
