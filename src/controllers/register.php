<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include('db.php');

    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirmedPassword = $_POST['confirmedPassword'];

    $check_username_query = 'SELECT 1 FROM users WHERE username = $1';
    $check_username_result = pg_query_params($conn, $check_username_query, array($username));

    if (pg_num_rows($check_username_result) > 0) {
        $errorMessage = "Username \"$username\" already exists. Please choose a different one.";
    } else {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        $query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
        $result = pg_query_params($conn, $query, array($username, $hashed_password));

        if ($result) {
            session_start();
            $_SESSION['newUser'] = $username;
            header('Location: /login');
            exit();
        } else {
            $errorMessage = 'Error: Unable to register the user.';
        }
    }

    pg_close($conn);
}

$pageTitle = 'Register';

require 'partials/header.php';
require 'views/register.php';
require 'partials/footer.php';