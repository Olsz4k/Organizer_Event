var app = angular.module('app', ["ngSanitize", "angular-click-outside", 'firebase']);

app.controller('dateCtrl', function ($scope, $interval) {

    var tick = function () {
        $scope.time = Date.now();
    };
    tick();
    $interval(tick, 1000);
    $scope.data = new Date();

});

app.controller('selectionCtrl', ['$scope', '$http', '$firebase', function ($scope, $http, $firebase) {

    // connect do Firebase database
    var databaseRef = new Firebase("https://organizer-event.firebaseio.com/");


    databaseRef.on('value', function (snap) {
        // get all event from Firebase
        // $scope.events = $firebase(databaseRef).$asArray();

        var dateSort = [];
        snap.forEach(function (data) {
            var tmp = data.val();
            var thisDate = new Date(tmp.date); // data wydarzenia
            var today = new Date(); // dzisiejsza data

            // Check and push future event
            if (thisDate > today) {

                dateSort.push(tmp);
            }
            $scope.events = dateSort;
        });


        //get number of object in Firebase
        // console.log(snap.numChildren());

        $scope.activeCategory = "all";
        $scope.activeTime = 30; // przedzial czasu w dniach

        // Ustawienie kategorii
        $scope.setActiveCategory = function (newCategory, callback) {
            $(".badge").removeClass('active');
            $(".badge." + newCategory + "-cat").addClass('active');
            $scope.activeCategory = newCategory;
            $scope.sortEvents();
        };

        // Ustawienie przedziału czasu
        $scope.setActiveTime = function (newTime) {
            $(".time-buttons button").removeClass('active');
            $(".time-buttons #" + newTime + "days").addClass('active');
            $scope.activeTime = newTime;
            $scope.sortEvents();
        };

        // Sortowanie wydarzeń
        $scope.sortEvents = function () {

            var dateSort = [];
            var catSort = [];

            databaseRef.orderByChild("date").once("value", function (snap) {
                snap.forEach(function (data) {
                    var tmp = data.val();
                    var thisDate = new Date(tmp.date); // data wydarzenia
                    var today = new Date(); // dzisiejsza data
                    var time = thisDate - today; // różnica czasu w milisekundach

                    // 1000*60*60*24ms = 1 dzien
                    // Sprawdzenie daty w odpowiednim zakresie oraz czy data nie jest z przeszłości
                    if ((time < 1000 * 60 * 60 * 24 * $scope.activeTime) && (thisDate > today)) {
                        dateSort.push(tmp);
                    }
                });

                // Sortowanie po kategorii
                for (var j = 0; j < dateSort.length; j++) {

                    if (dateSort[j].category === $scope.activeCategory || $scope.activeCategory === "all") {
                        catSort.push(dateSort[j]);
                    }

                }

                $scope.events = catSort;
                // $scope.showStars();

            });
            $scope.events = catSort;

            $scope.showStars();

        };

        // FAVOURITES
        $scope.addFavourite = function (id) {

            if (localStorage.getItem(id)) {
                localStorage.removeItem(id);

            } else {
                localStorage.setItem(id, "favourite");
            }

            $scope.showStars();

        };

        $scope.showStars = function () {

            $('.panel').removeClass('favourite');

            var number = dateSort.length;

            for (var i = 0; i < number + 1 ; i++) {

                var event = localStorage.getItem(i.toString());

                if (event === "favourite") {

                    $('#event_' + i).parent().addClass("favourite");

                }

            }

        };

        $('document').ready(function () {
            $scope.showStars();
        });

        $scope.showFavourite = function () {
            $scope.events = dateSort;
            $('.panel').toggle();
            $('.panel.favourite').toggle();
        };

        $scope.addInterested = function (id) {
            for (var j = 0; j < dateSort.length; j++) {

                if (dateSort[j].id === id) {
                    dateSort[j].interested++;
                }

            }

        }

    });
    //Open panel search
    $scope.openNav = function openNav() {
        document.getElementById('search').style.left = '200px';
        document.getElementById('panel').style.left = '0px';
    };

    //Close panel search
    $scope.closeNav = function closeNav() {
        document.getElementById('search').style.left = '0px';
        document.getElementById('input-search').value = '';
        document.getElementById('panel').style.left = '-216px';
    };

}]);

app.controller('validateCtrl', function ($scope, $firebase) {
    $scope.minDatetimeLocal = new Date();
    //connect to Firebase database
    var databaseRef = new Firebase("https://organizer-event.firebaseio.com");
    $scope.events = $firebase(databaseRef).$asArray();

    $scope.submitForm = function (isValid) {
        if (isValid) {
            //decode date to JSON format
            var dateJSON = (new Date($scope.dataWydarzenia)).toJSON();

            // Save data in Firebase Database
            $scope.events.$add({
                id: $scope.events.length + 1,
                name: $scope.nameEvent,
                content: $scope.contentEvent,
                category: $scope.category,
                date: dateJSON,
                interested: 0
            });


            alert("Gratulacje, wydarzenie zostało poprawnie dodane");
            // location.href = "http://localhost:3000/"
        //
        }

        else {
            alert("Niestety wprowadzone dane nie są odpowiednie");

        }

    }

});