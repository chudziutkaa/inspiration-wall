'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:ListsCtrl
 * @description
 * # ListsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .factory('List', function($resource) {
    return $resource('api/boards/:board_id/lists/:id')
  });

angular.module('frontendApp')
  .controller('ListsCtrl', function ($scope, List, $routeParams) {
    
    $scope.board = $routeParams
  });
