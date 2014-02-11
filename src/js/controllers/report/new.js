'use strict';

angular.module('reporter.controllers')
.controller('ReportNewCtrl', function($scope, $state, localStorageService) {
    // Check if we have unsaved progress
    if (localStorageService.get('unsavedReport') === null) {

    } else {

    }

    $scope.attachments = [];

    $scope.leftButtons = [{
        type: 'button button-icon ion-arrow-left-c',
        tap: function() {
            $state.go('home');
        }
    }];

    $scope.onFileSelect = function($files) {
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];

            $scope.attachments.push(file);
        }
    };

    $scope.deleteFile = function(file) {
        angular.forEach($scope.attachments, function(attachment, index) {
            if (angular.equals(file, attachment)) {
                $scope.attachments.splice(index, 1);
            }
        });
    };
});
