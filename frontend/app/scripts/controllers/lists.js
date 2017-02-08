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
    return $resource('api/boards/:board_id/lists/:id', {board_id: $routeParams.boardId, id: '@id'})
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

    $scope.deleteList = function (list) {
      List.delete({id: list.id});
      var index = $scope.lists.indexOf(list);
      $scope.lists.splice(index, 1);
    }

  });
