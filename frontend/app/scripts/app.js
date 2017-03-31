'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
  .module('frontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/boards', {
        templateUrl: 'views/boards.html',
        controller: 'BoardsCtrl',
        controllerAs: 'boards'
      })
      .when('/boards/:boardId', {
        templateUrl: 'views/lists.html',
        controller: 'ListsCtrl',
        controllerAs: 'lists'
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'UsersCtrl',
        controllerAs: 'users'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'UsersCtrl',
        controllerAs: 'users'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  .config(function($provide){
    $provide.factory('Token', function($window){
      var token = $window.localStorage['jwtToken'];
      return {token};
    })
  })
