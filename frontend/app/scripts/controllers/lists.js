'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:ListsCtrl
 * @description
 * # ListsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .factory('List', function($resource, $routeParams) {
    return $resource('api/boards/:board_id/lists/:id', {board_id: $routeParams.boardId})
  });

angular.module('frontendApp')
  .controller('ListsCtrl', function ($scope, List, $routeParams) {
    
    // $scope.id = $routeParams.boardId;

    $scope.lists = {};
    List.query(function(response){
      $scope.lists = response;
    });

  });
