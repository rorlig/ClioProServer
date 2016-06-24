/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Teams = require('../api/teams/teams.model');


Thing.find({}).removeAsync()
  .then(function() {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, CoffeeScript, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).removeAsync()
  .then(function() {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    })
    .then(function() {
      console.log('finished populating users');
    });
  });


Teams.find({}).removeAsync()
  .then(function() {
    Teams.createAsync({
      name: 'DALE FEUQUAY & FIODOR --- AEGIS',
      handler: 'DALE FEUQUAY',
      canine: 'FIODOR',
      company: 'AEGIS'
    }, {
      name: 'FEUQUAY,DALE-5795 & TESSA-1853  --- AEGIS',
      handler: 'DALE FEUQUAY',
      canine: 'TESSA',
      company: 'AEGIS'
    }, {
      name: 'GOHN,ANDREW-6415 & DUPLO-4130  --- AEGIS',
      handler: 'ANDREW GOHN',
      canine: 'DUPLO',
      company: 'AEGIS'
    }, {
      name: 'GOLDSBERRY,CHRISTIAN,S-6646 & MAX-8819  --- SOC',
      handler: 'CHRISTIAN GOLDSBERRY',
      canine: 'MAX',
      company: 'SOC'
    }, {
      name: 'GONZALEZ JR,JOSE-9241 & DEE-4877  --- AEGIS',
      handler: 'JOSE GONZALEZ JR',
      canine: 'DEE',
      company: 'AEGIS'

    }, {
      name: 'HOLLIDAY JR,MILFORD-6809 & DOVISZ-0346  --- SOC',
      handler: 'MILFORD HOLLIDAY JR',
      canine: 'DOVISZ',
      company: 'SOC'
    })
  })
