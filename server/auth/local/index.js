'use strict';
var fs = require('fs');

var path = require('path');

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var root = path.dirname(require.main.filename);

    console.log(root);
    var resp = {}
    resp.success = true
    resp.error = {}
    resp.response = {}

    var error = err || info;
    if (error) {
      resp.success = false
      resp.error.errorCode = 401
      resp.error.errorMessage = "Invalid Login"
      console.log(resp)
      return res.json(resp);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = auth.signToken(user._id, user.role);
    var obj = {}
    var company = ["SOC", "AEGIS"]
    // var dogs = ["Rex", "Judy"]
    var dogs = [{
      "name": "Rex",
      "breed": "SPRINGER SPANIEL",
      "microchipNbr": "966000100192190",
      "sex": "Male",
      "color": "White and Brown"
    }, {
      "name": "JUDY",
      "breed": "SPRINGER SPANIEL",
      "microchipNbr": "966000100192191",
      "sex": "Female",
      "color": "White and Brown"
    }]
    var employer = ["SOC", "AEGIS", "AMK9"]
    var handler = [{
        "firstName": "John",
        "lastName": "Smith",
        "nationality": "United States",
        "employer": "SOC",
        "SSN": "1234"
    }, {
        "firstName": "Jane",
        "lastName": "Doe",
        "nationality": "United States",
        "employer": "AEGIS",
        "SSN": "1235"
    }]
    var data = []
    for (var i = 0; i < 20 ; i++) {
        var temp = {}
        temp.id = i

        temp.company = company[Math.floor(Math.random() * company.length)]
        temp.dog = dogs[Math.floor(Math.random() * dogs.length)]

        temp.employer = employer[Math.floor(Math.random() * employer.length)]
        temp.handler = handler[Math.floor(Math.random() * handler.length)]

        temp.name = temp.handler.firstName + " "  + temp.handler.lastName
        + "-" + temp.handler.SSN + " & " + temp.dog.name + "-"
        + temp.dog.microchipNbr.substring(0, 4)

        //status
        temp.status = "Active"
        // temp.name = ""
        temp.vetNotes = "vet notes for team " + temp.name
        temp.adminNotes = "admin notes for team " + temp.name
        temp.lastValidationDate = new Date()
        // console.log(temp)


         data.push(temp)
    }
    var exercises =[]
    var exerciseTypes = ["DSOT", "DSORT"]
    var exerciseIntent = ["Familiarization", "Validation"]
    for (var i = 0; i < 20 ; i++) {
      var exercise = {}
      exercise.location = "lane " + i
      exercise.type = exerciseTypes[Math.floor(Math.random() * exerciseTypes.length)]
      exercise.intent  = exerciseIntent[Math.floor(Math.random() * exerciseIntent.length)]
      exercise.description = "Boxes"
      exercise.id = i
      exercise.notes = "Notes for exercise " + i
      // exercise.attempts = []
      // console.log(exercise)


      var obstacles = []
      var hideType = ["Distractor", "Dynamite", "TNT"]
      var carriers = ["Luggage", "Boxes"]
      var isDistractor = true
      //obstacles within the exercise
      for (var j = 0; j< 10; ++j) {
        var obstacle = {}
        obstacle.hideType = hideType[Math.floor(Math.random() * hideType.length)]
        if (obstacle.hideType=="Distractor") {
          obstacle.isDistractor = true
        } else {
          obstacle.isDistractor = false
        }

        obstacle.carrier = carriers[Math.floor(Math.random() * carriers.length)]
        obstacle.id = j

        obstacles.push(obstacle)
      }
      exercise.obstacles = obstacles
      exercises.push(exercise)

    }
   obj.team = data;
   obj.exercise = exercises
   obj.token = token
   resp.response = obj
   res.json(resp)
 })(req, res, next)
});

module.exports = router;
