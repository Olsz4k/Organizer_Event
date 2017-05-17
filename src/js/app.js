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

app.controller('selectionCtrl', ['$scope', '$http', function($scope, $http) {

     $http.get('./events.json').then(successCallback, errorCallback);

    $scope.function30days= function () {
       console.log('funkcja 30 days dziala');
        $("#7days").removeClass("active");
        $("#14days").removeClass("active");
        $("#30days").addClass("active");

    };

    $scope.function14days= function () {
        $("#7days").removeClass('active');
        $("#14days").addClass("active");
        $("#30days").removeClass('active');

        console.log('funkcja 14 days dziala');
    };

    $scope.function7days= function () {
        $("#7days").addClass("active");
        $("#14days").removeClass('active');
        $("#30days").removeClass('active');
        console.log('funkcja 7 days dziala');
    };

    function successCallback(result){
        $scope.events = result.data;
    }

    function errorCallback(error){
        //error code
    }

}]);
