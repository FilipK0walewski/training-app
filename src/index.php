<?php

require_once 'router.php';  // Include the router file

// Create a new Router instance
$router = new Router();

// Define routes for the views
$router->get('/', 'viewsController@home'); // Route to the home function
$router->get('/about', 'viewsController@about'); // Route to the home function
$router->get('/', 'viewsController@home'); // Route to the home function
$router->get('/', 'viewsController@home'); // Route to the home function
$router->get('/', 'viewsController@home'); // Route to the home function
$router->get('/', 'viewsController@home'); // Route to the home function

$router->get('/about', 'homeController@about'); // Route to the about function

// Define routes for the API
$router->get('/api/user', 'apiController@getUser'); // Route to the API function

// Process the request and route it
$router->handleRequest($_SERVER['REQUEST_URI']);