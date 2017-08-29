'use strict';

/* Controllers */

function IndexCtrl($scope, $http) {
  $http.get('/classifiers').
    success(function(data, status, headers, config) {
      $scope.classifiers = data.classifiers;
    });
}


function ClassifiersCtrl($scope, $http) {
  $http.get('/classifiers').
    success(function(data, status, headers, config) {
      $scope.classifiers = data.classifiers;
    });
}