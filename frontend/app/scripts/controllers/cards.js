'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp').factory('Card', function($resource, $routeParams){
  return $resource('api/boards/:board_id/lists/:list_id/cards/:id', 
    {board_id: $routeParams.boardId, list_id: '@list_id'});
});

angular.module('frontendApp')
  .controller('CardsCtrl', function ($scope, Card, $routeParams) {

    $scope.board = $routeParams.boardId;

    $scope.addCard = function (newCardTitle, list) {
      Card.save({title: newCardTitle, board_id: $routeParams.boardId, list_id: list.id}, function (newCard){
        list.cards.push(newCard);
        $scope.newCardTitle = null;
      });
      console.log("Added");
    };

  });
