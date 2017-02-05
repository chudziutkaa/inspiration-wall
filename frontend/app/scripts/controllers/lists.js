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
    
    $scope.lists = {};
    List.query(function(response){
      $scope.lists = response;
    });

    $scope.addList = function (newListName) {
      List.save({name: newListName, board_id: $routeParams.boardId}, function (newList){
        $scope.lists.push(newList);
        $scope.newListName = null;
      });
      console.log("Added");
    };

  });
