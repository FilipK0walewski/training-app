<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include('db.php');

    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = 'SELECT id, username, password FROM users WHERE username = $1';
    $result = pg_query_params($conn, $query, array($username));

    if ($result) {
        $user = pg_fetch_assoc($result);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['userId'] = $user['id'];
            $_SESSION['username'] = $username;
            header('Location: /');
            exit();
        } else {
            $errorMessage = 'Invalid username or password.';
        }
    } else {
        $errorMessage = 'Error executing query.';
    }

    pg_close($conn);
}

if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_SESSION['userId'])) {
    header('Location: /profile');
}

$pageTitle = 'Login';

require 'partials/header.php';
require 'views/login.php';
require 'partials/footer.php';