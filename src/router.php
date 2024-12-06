<?php
require_once 'controllers/views/index.php';

class Router {
    private $routes = [];

    public function addRoute($method, $route, $callback) {
        $this->routes[] = [
            'method' => $method,
            'route' => $route,
            'callback' => $callback
        ];
    }

    // Match the current URL
    public function match($url, $method) {
        foreach ($this->routes as $route) {
            // Check if the method matches (GET, POST, etc.)
            if ($method === $route['method']) {
                // Extract parameters from the route
                $pattern = preg_replace('/\{[a-zA-Z0-9_]+\}/', '([a-zA-Z0-9_]+)', $route['route']);
                $pattern = "#^" . $pattern . "$#";

                if (preg_match($pattern, $url, $matches)) {
                    array_shift($matches); // Remove the full match from the matches
                    return [
                        'callback' => $route['callback'],
                        'params' => $matches
                    ];
                }
            }
        }
        return null;
    }

    // Dispatch to the callback if the route is matched
    public function handleRequest($url, $method) {
        $match = $this->match($url, $method);
        if ($match) {
            call_user_func_array($match['callback'], $match['params']);
        } else {
            notFoundView();
        }
    }
}