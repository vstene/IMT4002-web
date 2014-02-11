'use strict';

angular.module('reporter.controllers')
.controller('HomeCtrl', function($scope, $state) {
    $scope.leftButtons = [{
        type: 'button-icon ion-plus',
        tap: function() {
            $state.go('report-new');
        }
    }];
});
