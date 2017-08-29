// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.controllers','myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/index',
        controller: IndexCtrl
      }).
      when('/classifiers', {
        templateUrl: 'partials/classifiers',
        controller: ClassifiersCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
}]);