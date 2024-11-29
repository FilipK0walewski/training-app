<?php

// $uri = parse_url($_SERVER['REQUEST_URI'])['path'];

// $routes = [
//     '/' => 'controllers/home.php',
//     '/about' => 'controllers/about.php',
//     '/workout' => 'controllers/workout.php',
//     '/login' => 'controllers/login.php',
//     '/logout' => 'controllers/logout.php',
//     '/register' => 'controllers/register.php',
//     '/profile' => 'controllers/profile.php',
//     '/api/users' => 'controllers/api.php'
// ];

// if (array_key_exists($uri, $routes)) {
//     require $routes[$uri];
// } else {
//     require 'controllers/404.php';
// }


class Router
{
    protected $routes = [];

    public function get($uri, $action)
    {
        $this->routes['GET'][$uri] = $action;
    }

    public function post($uri, $action)
    {
        $this->routes['POST'][$uri] = $action;
    }

    public function handleRequest($uri)
    {
        echo($uri);
        echo(PHP_URL_PATH);

        $method = $_SERVER['REQUEST_METHOD'];  // Get the HTTP method
        $uri = parse_url($uri, PHP_URL_PATH);  // Clean the URL (without query parameters)

        if (isset($this->routes[$method][$uri])) {
            // Extract the controller and function from the action string

            list($controller, $function) = explode('@', $this->routes[$method][$uri]);

            // Include the controller file
            $controllerFile = "controllers/{$controller}.php";
            echo($controllerFile);
            if (file_exists($controllerFile)) {
                require_once $controllerFile;

                // Call the function
                if (function_exists($function)) {
                    $function();
                } else {
                    $this->load404Page();
                    // echo "Function {$function} not found in {$controller}.";
                }
            } else {
                // echo "Controller file {$controller} not found.";
                $this->load404Page();
            }
        } else {
            // No route found, load the 404 page
            $this->load404Page();
        }
    }

    private function load404Page()
    {
        include "views/404.php";
    }
}
