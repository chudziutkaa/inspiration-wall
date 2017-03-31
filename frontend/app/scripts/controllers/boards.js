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
    return $resource('/api/boards/:id', {id: '@id'});
  });

angular.module('frontendApp')
  .controller('BoardsCtrl', function ($scope, Board, Token) {  

    $scope.boards = {};
    Board.query(function(response){
      $scope.boards = response;
      console.log($scope.boards);
    })

    $scope.addMode = false;

    $scope.toggleAdd = function () {
      $scope.addMode = !$scope.addMode;
    }

    $scope.addBoard = function (newBoardTitle, user_id) {
      var board = {title: newBoardTitle, user_id: user_id}
      console.log("Board: ", board)
      Board.save(board, function (newBoard){
        $scope.boards.push(newBoard);
        $scope.newBoardTitle = null;
      });
      console.log("Dodano");
      $scope.toggleAdd();
    }

    $scope.deleteBoard = function (board) {
      Board.delete({id: board.id});
      var index = $scope.boards.indexOf(board);
      $scope.boards.splice(index, 1);
    }

});
