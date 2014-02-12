'use strict';

angular.module('reporter.controllers')
.controller('ReportCtrl', function($scope, $state, $stateParams, FieldReportService) {
    $scope.isLoading = false;

    if ($stateParams && $stateParams.id) {
        $scope.report = FieldReportService.getFieldReport($stateParams.id);
    } else {
        $scope.report = FieldReportService.getUnsavedFieldReport();
    }

    $scope.leftButtons = [{
        type: 'button button-icon',
        content: '<i class="icon ion-ios7-arrow-thin-left"></i>',
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

    $scope.getLocation = function() {
        $scope.isLoading = true;

        window.navigator.geolocation.getCurrentPosition(function(position) {
            $scope.$apply(function() {
                $scope.isLoading = false;

                $scope.report.coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };

                FieldReportService.persistUnsavedFieldReport();
            });
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
        if (confirm('Are you sure you want to reset the form?')) {
            $scope.report = FieldReportService.resetUnsavedFieldReport();
        }
    };

    $scope.deleteReport = function() {
        if (confirm('Are you sure you want to delete the report?')) {
            $scope.report = FieldReportService.deleteFieldReport($scope.report.id);

            $state.go('home');
        }
    };
});
