'use strict';

angular.module('reporter.controllers', []);

angular.module('FieldReporter', ['ionic', 'reporter.controllers'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
    });

    $urlRouterProvider.otherwise('/home');
});

