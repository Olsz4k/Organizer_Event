var app = angular.module('app', []);

app.controller('eventsCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('./events.json').then(successCallback, errorCallback);

    function successCallback(result) {
        // $scope.events = result.data;
    }

    function errorCallback(error) {
        //error code
    }

}]);

app.controller('dateCtrl', function ($scope, $interval) {

    var tick = function () {
        $scope.time = Date.now();
    };
    tick();
    $interval(tick, 1000);
    $scope.data = new Date();

});

app.controller('selectionCtrl', ['$scope', '$http', function ($scope, $http) {

    $http.get('./events.json').then(successCallback, errorCallback);
    function successCallback(result) {
        // $scope.events = result.data;
        $scope.function30days = function () {
            $(".btn-group > .btn").removeClass("active");
            $("#30days").addClass("active");

            var tablica = [result.data[0], result.data[1], result.data[2], result.data[3]];

            $scope.events = tablica;
        };

        $scope.function14days = function () {
            $(".btn-group > .btn").removeClass("active");
            $("#14days").addClass("active");

            var tablica = [result.data[3], result.data[2]];
            $scope.events = tablica;
        };

        $scope.function7days = function () {
            $(".btn-group > .btn").removeClass("active");
            $("#7days").addClass("active");

            var tablica = [result.data[4], result.data[5], result.data[6]];
            $scope.events = tablica;
        };

        $scope.categoryIT = function () {
            var categoryEvent = [];

            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].category == "it") {
                    categoryEvent.push(result.data[i]);
                }

            }
            $scope.events = categoryEvent;

        };

        $scope.categoryEconomy = function () {
            var categoryEvent = [];

            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].category == "economy") {
                    categoryEvent.push(result.data[i]);
                }

            }
            $scope.events = categoryEvent;
        };
        $scope.categorySport = function () {
            var categoryEvent = [];

            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].category == "sport") {
                    categoryEvent.push(result.data[i]);
                }

            }
            $scope.events = categoryEvent;
        };
        $scope.categoryCharity = function () {
            var categoryEvent = [];

            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].category == "charity") {
                    categoryEvent.push(result.data[i]);
                }

            }
            $scope.events = categoryEvent;
        };
        $scope.categoryEntertainment = function () {
            var categoryEvent = [];

            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].category == "entertainment") {
                    categoryEvent.push(result.data[i]);
                }

            }
            $scope.events = categoryEvent;
        };
        $scope.categoryOrganisation = function () {
            var categoryEvent = [];

            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].category == "organisation") {
                    categoryEvent.push(result.data[i]);
                }

            }
            $scope.events = categoryEvent;
        };
    }

    function errorCallback(error) {
        //error code
    }

}]);