function IndexCtrl($scope, $http) {
  $http.get('/classifiers').
    success(function(data, status, headers, config) {
      $scope.classifiers = data.classifiers;
    });
}
