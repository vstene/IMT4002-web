'use strict';

angular.module('reporter.controllers')
.controller('ReportCtrl', function($scope, $state, $stateParams, FieldReportService) {
    if ($stateParams && $stateParams.id) {
        $scope.report = FieldReportService.getFieldReport($stateParams.id);
    } else {
        $scope.report = FieldReportService.getUnsavedFieldReport();
    }

    $scope.leftButtons = [{
        type: 'button button-icon ion-arrow-left-c',
        tap: function() {
            $state.go('home');
        }
    }];

    $scope.onFileSelect = function($files) {
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];

            $scope.report.attachments.push(file);
        }

        if ($scope.report.createdAt === null) {
            FieldReportService.persistUnsavedFieldReport();
        }
    };

    $scope.removeAttachment = function(file) {
        angular.forEach($scope.attachments, function(attachment, index) {
            if (angular.equals(file, attachment)) {
                $scope.report.attachments.splice(index, 1);
            }
        });
    };

    $scope.saveUnfinishedFieldReport = function() {
        if ($scope.report.createdAt === null) {
            FieldReportService.persistUnsavedFieldReport();
        }
    };

    $scope.saveReport = function() {
        if ($scope.report.createdAt === null) {
            FieldReportService.createFieldReport();
        } else {
            FieldReportService.updateFieldReport($scope.report);
        }

        $state.go('home');
    };

    $scope.resetReport = function() {
        $scope.report = FieldReportService.resetUnsavedFieldReport();
    };

    $scope.deleteReport = function() {
        $scope.report = FieldReportService.deleteFieldReport($scope.report.id);

        $state.go('home');
    };
});
