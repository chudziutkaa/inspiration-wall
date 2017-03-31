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
        controllerAs: 'lists',
        resolve: {
          List: 'List',
          fetchedLists: function (List, $route) {
            var result = List.query({board_id: $route.current.params.boardId}).$promise;
            return result;
          }
        }
      })
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
  .config(function($httpProvider){
    $httpProvider.interceptors.push(function($q, $location, $window){
      return {
        'request': function(config) {
          config.headers = config.headers || {};
          if ($window.localStorage.jwtToken){
            config.headers.Authorization = $window.localStorage.jwtToken;
          }
          return config;
        },
        'responseError': function (response) {
          if (response.status == 401 || response.status == 403) {
            $location.path('/register');
          }
          return $q.reject(response);
        }
      }
    })
  })
