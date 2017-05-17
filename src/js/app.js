var app = angular.module('app', []);

app.controller('eventsCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('./events.json').then(successCallback, errorCallback);

    function successCallback(result){
        // $scope.events = result.data;
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
    function successCallback(result){
        // $scope.events = result.data;
        $scope.function30days= function () {
            $(".btn-group > .btn").removeClass("active");
            $("#30days").addClass("active");

            var tablica = [result.data[0] , result.data[1]];

            $scope.events = tablica;

            console.log(result.data[0].id);


        };

        $scope.function14days= function () {
            $(".btn-group > .btn").removeClass("active");
            $("#14days").addClass("active");

            var tablica = [result.data[3] , result.data[2]];
            $scope.events = tablica;
        };

        $scope.function7days= function () {
            $(".btn-group > .btn").removeClass("active");
            $("#7days").addClass("active");

            var tablica = [result.data[4] , result.data[5]];
            $scope.events = tablica;
        };
    }

    function errorCallback(error){
        //error code
    }

}]);