'use strict';

require('./scss.main.scss');

// node modules
const path = require('path');

// npm modules
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');

// Angular modules
const ngTouch = require('angular-touch'); //uiBootstrap dependency
const ngAnimate = require('angular-animate'); //uiBootstrap dependency
const uiRouter = require('angular-ui-router'); // Allows angular to router the view
const ngFileUpload = require('ng-file-upload'); // Allows angular to deal with uploading files
const uiBootstrap = require('angular-ui-bootstrap'); // Allows angular to work with bootstrap

// Create the Angular module

const portfolio = angular.module('portfolio', [
  ngTouch,
  ngAnimate,
  uiRouter,
  ngFileUpload,
  uiBootstrap,
]);

// Declaring context initially
let context;

// Load configuration files
context = require.context('./config/', true, /.js$/);
context.keys().forEach( key => {
  portfolio.config(context(key));
});

// Load view controllers.

context = require.context('./view/', true, /.js$/);
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js'));
  let module = context(key);

  portfolio.controller(name, module);
});

// load services
context = require.context('./service/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key); // value of module.exports
  portfolio.service(name, module);
});

// load components
context = require.context('./component/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key); // value of module.exports
  portfolio.component(name, module);
});

// load directives
context = require.context('./directive/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key); // value of module.exports
  portfolio.directive(name, module);
});

// load filters
context = require.context('./filter/', true, /.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key); // value of module.exports
  portfolio.filter(name, module);
});
