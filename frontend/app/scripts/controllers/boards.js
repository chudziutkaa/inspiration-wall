'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:BoardsCtrl
 * @description
 * # BoardsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .factory('Board', function($resource){
    return $resource('/api/boards/:id');
  });

angular.module('frontendApp')
  .controller('BoardsCtrl', function ($scope, Board) {

    $scope.boards = {};
    Board.query(function(response){
      $scope.boards = response;
    });
    // console.log($scope.boards);

    // $scope.hello = "Hola!"

    $scope.addMode = false;

    $scope.toggleAdd = function () {
      $scope.addMode = !$scope.addMode;
    }

    $scope.addBoard = function (newBoardTitle) {
      // var newBoard = { "title": newBoardTitle }
      // console.log(newBoard);
      Board.save({title: newBoardTitle}, function (newBoard){
        $scope.boards.push(newBoard);
      });
      console.log("Dodano");
      $scope.toggleAdd();
    }
});
