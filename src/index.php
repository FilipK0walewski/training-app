<?php
session_start();
require_once 'router.php';
require_once 'controllers/api/workout.php';
require_once 'controllers/forms/login.php';
require_once 'controllers/forms/logout.php';
require_once 'controllers/forms/register.php';
require_once 'controllers/views/index.php';

$router = new Router();

// views
$router->addRoute('GET', '/', 'homeView');
$router->addRoute('GET', '/about', 'aboutView');
$router->addRoute('GET', '/login', 'loginView');
$router->addRoute('GET', '/profile', 'profileView');
$router->addRoute('GET', '/register', 'registerView');
$router->addRoute('GET', '/workout', 'workoutView');
$router->addRoute('GET', '/workouts', 'workoutListView');
$router->addRoute('GET', '/workouts/{id}', 'workoutDetailView');

// forms
$router->addRoute('POST', '/login', 'loginForm');
$router->addRoute('GET', '/logout', 'logoutForm');
$router->addRoute('POST', '/register', 'registerForm');

// api
$router->addRoute('GET', '/api/users', 'getUsers');
$router->addRoute('POST', '/api/workouts', 'addWorkout');

$router->handleRequest($_SERVER['REQUEST_URI'], $_SERVER['REQUEST_METHOD']);