'use strict';

angular.module('reporter.controllers', []);
angular.module('reporter.services', []);

angular.module('FieldReporter', [
    'ionic',
    'angular-underscore',
    'reporter.controllers',
    'reporter.services',
    'angularFileUpload',
    'angularLocalStorage',
]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    })
    .state('report-new', {
        url: '/report/new',
        templateUrl: 'templates/report.html',
        controller: 'ReportCtrl'
    })
    .state('report-view', {
        url: '/report/:id',
        templateUrl: 'templates/report.html',
        controller: 'ReportCtrl'
    });

    $urlRouterProvider.otherwise('/home');
});

