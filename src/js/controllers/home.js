'use strict';

angular.module('reporter.controllers')
.controller('HomeCtrl', function($scope, $state, FieldReportService) {
    $scope.leftButtons = [{
        type: 'button-icon ion-plus',
        tap: function() {
            $state.go('report-new');
        }
    }];

    $scope.fieldReports = FieldReportService.getFieldReports();
});
