var app = angular.module('app', []);

app.controller('eventsCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('./events.json').then(successCallback, errorCallback);

    function successCallback(result){
        $scope.events = result.data;
    }

    function errorCallback(error){
        //error code
    }

}]);

app.controller('dateCtrl', function ($scope, $interval) {

    var tick = function() {
        $scope.time = Date.now();
    };
    tick();
    $interval(tick, 1000);
    $scope.data = new Date();

});