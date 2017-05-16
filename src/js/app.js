var app = angular.module('app', []);

app.controller('tabsCtrl', ['$scope', function($scope) {

    $scope.name = "Juwenalia UEK";

}]);

app.controller('dateCtrl', function ($scope, $interval) {

    var tick = function() {
        $scope.time = Date.now();
    };
    tick();
    $interval(tick, 1000);
    $scope.data = new Date();


});