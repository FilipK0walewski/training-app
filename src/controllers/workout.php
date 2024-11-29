<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    exit();
} else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $pageTitle = 'Workout...';
    require 'partials/header.php';
    require 'views/workout.php';
    require 'partials/footer.php';
}
