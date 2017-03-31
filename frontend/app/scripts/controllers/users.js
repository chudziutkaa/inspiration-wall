'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('UsersCtrl', function ($scope, $http, $window, Token) {
    
    $scope.register = function(username, email, password1, password2){
      var user = {
        "user": {
          "username": username,
          "email" : email,
          "password" : password1,
          "password_confirmation": password2
        }
      }
      $http.post('/api/register', user );
      $scope.login(user.user.username, user.user.password);
    }

    $scope.login = function(username, password){
      var user = {
        "username" : username,
        "password" : password
      }

      var token = "";
      $http.post('/api/login', user)
        .then(function(response){
          token = response.data['auth_token'];
          saveToken(response.data['auth_token']);
          $window.location.reload();
          $window.location = '/#/boards';
        });
    }

    $scope.parseJwt = function(){
      var token = Token.token;
      console.log(token);
      if (token) {
        console.log(token);
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        $scope.currentUser = { 
          "user_id" : JSON.parse($window.atob(base64)).user_id,
          "username": JSON.parse($window.atob(base64)).username
         };
        console.log($scope.currentUser);
        return $scope.currentUser;
      }
    }

    $scope.parseJwt();

    var saveToken = function(token) {
      $window.localStorage['jwtToken'] = token;
    }

    $scope.logout = function() {
      $window.localStorage.removeItem('jwtToken');
      $scope.currentUser = false;
      $window.location = '/#/';
    }
  });
