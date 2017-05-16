var app = angular.module('app', []);

app.controller('eventsCtrl', ['$scope', function($scope) {

    $scope.events = [
        {
            id: 1,
            name: "Hackaton UEK",
            category: "it",
            icon: "code"
        },
        {
            id: 2,
            name: "Wydarzenie sportowe",
            category: "sport",
            icon: "futbol-o"
        },
        {
            id: 3,
            name: "UEK zwierzakom!",
            category: "charity",
            icon: "heart"
        },
        {
            id: 4,
            name: "Wybory do PS UEK",
            category: "autonomy",
            icon: "institution"
        }
    ];

}]);

app.controller('dateCtrl', function ($scope, $interval) {

    var tick = function() {
        $scope.time = Date.now();
    };
    tick();
    $interval(tick, 1000);
    $scope.data = new Date();

});