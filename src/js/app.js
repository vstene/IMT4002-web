'use strict';

angular.module('reporter.controllers', []);

angular.module('FieldReporter', ['ionic', 'reporter.controllers', 'LocalStorageModule', 'angularFileUpload'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    })
    .state('report-new', {
        url: '/report/new',
        templateUrl: 'templates/report/new.html',
        controller: 'ReportNewCtrl'
    });

    $urlRouterProvider.otherwise('/home');
});

