var app = angular.module('app', []);

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

        $scope.events = result.data;

        $scope.activeCategory = "all";
        $scope.activeTime = 30; // przedzial czasu w dniach

        // Ustawienie kategorii
        $scope.setActiveCategory = function( newCategory ) {
            $(".badge").removeClass('active');
            $(".badge."+newCategory+"-cat").addClass('active');
            $scope.activeCategory = newCategory;
            $scope.sortEvents();
        };

        // Ustawienie przedziału czasu
        $scope.setActiveTime = function( newTime ) {
            $(".time-buttons button").removeClass('active');
            $(".time-buttons #"+newTime+"days").addClass('active');
            $scope.activeTime = newTime;
            $scope.sortEvents();
        };

        // Sortowanie wydarzeń
        $scope.sortEvents = function() {

            var dateSort = [];
            var catSort = [];

            // Sortowanie po dacie
            for (var i = 0; i < result.data.length; i++) {

                var thisDate = new Date( result.data[i].date ); // data wydarzenia
                var today = new Date(); // dzisiejsza data
                var time = thisDate - today; // różnica czasu w milisekundach

                // 1000*60*60*24ms = 1 dzien
                if ( time < 1000*60*60*24*$scope.activeTime) {
                    dateSort.push(result.data[i]);
                }

            }

            // Sortowanie po kategorii
            for (var j = 0; j < dateSort.length; j++) {

                if ( dateSort[j].category === $scope.activeCategory || $scope.activeCategory === "all") {
                    catSort.push(dateSort[j]);
                }

            }
            $scope.events = catSort;
        }

    }

    function errorCallback(error) {
        console.log("Nie udalo sie pobrac pliku JSON!");
    }

}]);