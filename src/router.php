<?php

$uri = parse_url($_SERVER['REQUEST_URI'])['path'];

$routes = [
    '/' => 'controllers/home.php',
    '/about' => 'controllers/about.php',
    '/workout' => 'controllers/workout.php',
    '/login' => 'controllers/login.php',
    '/logout' => 'controllers/logout.php',
    '/register' => 'controllers/register.php',
    '/profile' => 'controllers/profile.php',
];

if (array_key_exists($uri, $routes)) {
    require $routes[$uri];
} else {
    require 'controllers/404.php';
}