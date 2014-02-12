'use strict';

angular.module('reporter.controllers')
.controller('HomeCtrl', function($scope, $state, FieldReportService) {
    $scope.leftButtons = [{
        type: 'button button-icon',
        content: '<i class="icon ion-ios7-plus-empty">',
        tap: function() {
            $state.go('report-new');
        }
    }];

    $scope.fieldReports = FieldReportService.getFieldReports();
});
