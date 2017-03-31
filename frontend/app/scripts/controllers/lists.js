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
    console.log($routeParams);
    return $resource('api/boards/:board_id/lists/:id', {board_id: '@board_id', id: '@id'})
  });

angular.module('frontendApp')
  .controller('ListsCtrl', function ($scope, List, $routeParams, fetchedLists) {
    
    $scope.boardLists = fetchedLists;

    $scope.addList = function (newListName) {
      List.save({name: newListName, board_id: $routeParams.boardId}, function (newList){
        $scope.boardLists.push(newList);
        $scope.newListName = null;
      });
    };

    $scope.deleteList = function (list) {
      List.delete({board_id: $routeParams.boardId, id: list.id});
      var index = $scope.boardLists.indexOf(list);
      $scope.boardLists.splice(index, 1);
    }

  });
