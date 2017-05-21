<?php
    $message = '';
    $error = '';
    if(isset($_POST["submit"])) {

            if (file_exists('events.json')) {
                $current_data = file_get_contents('events.json');
                $array_data = json_decode($current_data, true);

                $extra = array(
                    'id'            =>     count($array_data) + 1,
                    'name'          =>     $_POST["nameEvent"],
                    'date'          =>     $_POST["date"],
                    'content'       =>     $_POST['contentEvent'],
                    'category'      =>     $_POST["category"]
                );

                $array_data[] = $extra;
                $final_data = json_encode($array_data);
                if (file_put_contents('events.json', $final_data)) {
                    $message = "<label class='text-success'>Dodano wydarzenie</p>";
                }
            } else {
                $error = 'JSON File not exits';
            }

    }
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <title>Organizer Wydarzeń UEK</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-sanitize/1.6.4/angular-sanitize.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <link href="./favicon.ico" rel="Shortcut icon">
</head>
<body ng-app="app">

<header>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <a href="https://www.uek.krakow.pl/" target="_blank">
                    <img class="logo img-responsive" src="image/logo.png" alt="Uniwersytet Ekonomiczny w Krakowie">
                </a>
            </div>
            <div class="col-md-6">
                <h1 class="caption">Organizer wydarzeń UEK</h1>
            </div>
            <div class="col-md-3" ng-controller="dateCtrl">
                <div class="date"><i class="fa fa-calendar" aria-hidden="true" ></i> <h3>{{ data | date : "dd.MM.y" }}</h3></div>
                <div class="hour"><i class="fa fa-clock-o" aria-hidden="true"></i> <h3>{{ time | date : "HH:mm:ss" }}</h3></div>
            </div>
        </div>
    </div>
</header>

<main class="event-form">
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <h2>Dodaj nowe wydarzenie</h2>

                <form ng-cloak ng-controller="validateCtrl" name="addEventForm"

                      novalidate action="form.php" method="post">

                    <div ng-class="{ 'has-error' : addEventForm.nameEvent.$invalid && !addEventForm.nameEvent.$pristine }">
                        <input title="name" type="text" name="nameEvent" ng-model="nameEvent" class="form-control"
                               placeholder="Nazwa wydarzenia" ng-minlength="3" required/>
                        <p ng-show="addEventForm.nameEvent.$invalid && !addEventForm.nameEvent.$pristine"
                           class="help-block">Wprowadzona nazwa jest niepoprawna</p>
                    </div>

                    <input title="date" type="datetime-local" name="date" class="form-control"
                           placeholder="yyyy-MM-ddTHH:mm" min="{{ minDatetimeLocal | date : 'yyyy-MM-ddTHH:mm' }}"
                           required/>

                    <div ng-class="{ 'has-error' : addEventForm.contentEvent.$invalid && !addEventForm.nameEvent.$pristine }">
                        <textarea title="content" name="contentEvent" ng-model="contentEvent" class="form-control"
                                  placeholder="Treść" ng-minlength="35" required></textarea>
                        <p ng-show="addEventForm.contentEvent.$invalid && !addEventForm.contentEvent.$pristine"
                           class="help-block">Wprowadzony opis jest zbyt krótki</p>
                    </div>


                    <select title="Kategoria" name="category" class="form-control" required>
                        <option value="it">IT</option>
                        <option value="economy">Ekonomia</option>
                        <option value="sport">Sport</option>
                        <option value="charity">Charytywne</option>
                        <option value="autonomy">Samorząd</option>
                        <option value="entertainment">Rozrywka</option>
                    </select>

                    <input type="submit" name="submit" value="Dodaj nowe wydarzenie" class="btn btn-primary"/>

                </form>
            </div>
        </div>
    </div>
</main>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="js/app.js"></script>

</body>
</html>