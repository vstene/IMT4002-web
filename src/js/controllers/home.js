'use strict';

angular.module('reporter.controllers', [])
.controller('HomeCtrl', function($scope) {
    console.log('home controller');
    $scope.leftButtons = [{
        type: 'button-light icon ion-plus medium',
        tap: function(e) {
        }
    }];
});