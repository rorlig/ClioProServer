'use strict';

var app = require('../../app');
var request = require('supertest');

var newAttempt;

describe('Attempt API:', function() {

  describe('GET /api/v1/attempt', function() {
    var attempts;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/attempt')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          attempts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      attempts.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/v1/attempt', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/v1/attempt')
        .send({
          name: 'New Attempt',
          info: 'This is the brand new attempt!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newAttempt = res.body;
          done();
        });
    });

    it('should respond with the newly created attempt', function() {
      newAttempt.name.should.equal('New Attempt');
      newAttempt.info.should.equal('This is the brand new attempt!!!');
    });

  });

  describe('GET /api/v1/attempt/:id', function() {
    var attempt;

    beforeEach(function(done) {
      request(app)
        .get('/api/v1/attempt/' + newAttempt._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          attempt = res.body;
          done();
        });
    });

    afterEach(function() {
      attempt = {};
    });

    it('should respond with the requested attempt', function() {
      attempt.name.should.equal('New Attempt');
      attempt.info.should.equal('This is the brand new attempt!!!');
    });

  });

  describe('PUT /api/v1/attempt/:id', function() {
    var updatedAttempt

    beforeEach(function(done) {
      request(app)
        .put('/api/v1/attempt/' + newAttempt._id)
        .send({
          name: 'Updated Attempt',
          info: 'This is the updated attempt!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedAttempt = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAttempt = {};
    });

    it('should respond with the updated attempt', function() {
      updatedAttempt.name.should.equal('Updated Attempt');
      updatedAttempt.info.should.equal('This is the updated attempt!!!');
    });

  });

  describe('DELETE /api/v1/attempt/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/v1/attempt/' + newAttempt._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when attempt does not exist', function(done) {
      request(app)
        .delete('/api/v1/attempt/' + newAttempt._id)
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
