'use strict';

/* App Module */

var meanpocApp = angular.module('meanpocApp', [
  'ngRoute',
  'meanpocControllers',
  'ui.bootstrap'
]);

meanpocApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/users', {
        templateUrl: 'partials/user-list',
        controller: 'UserListCtrl'
      }).
      when('/users/:userId', {
        templateUrl: 'partials/user-detail.html',
        controller: 'UserDetailCtrl'
      }).
      when('/details/:userId', {
        templateUrl: '/details',
        controller: 'UserDetailCtrl'
      }).
      otherwise({
        redirectTo: '/users'
      });
  }]);