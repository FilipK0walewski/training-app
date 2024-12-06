<?php
require_once('db.php');

function registerForm()
{
    global $conn;

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        return renderRegisterPage();
    }

    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $confirmedPassword = isset($_POST['confirmedPassword']) ? $_POST['confirmedPassword'] : '';

    if (empty($username) || empty($password) || empty($confirmedPassword)) {
        return renderRegisterPage('All fields are required.');
    }

    if ($password !== $confirmedPassword) {
        return renderRegisterPage('Passwords do not match.');
    }

    $check_username_query = 'SELECT 1 FROM users WHERE username = $1';
    $check_username_result = pg_query_params($conn, $check_username_query, array($username));

    if ($check_username_result && pg_num_rows($check_username_result) > 0) {
        return renderRegisterPage("Username \"$username\" already exists. Please choose a different one.");
    }

    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    $query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
    $result = pg_query_params($conn, $query, array($username, $hashed_password));

    if ($result) {
        session_start();
        $_SESSION['newUser'] = $username;
        header('Location: /login');
        exit();
    } else {
        return renderRegisterPage('Error: Unable to register the user.');
    }
}

function renderRegisterPage($errorMessage = '')
{
    extract(['pageTitle' => 'Sign up', 'errorMessage' => $errorMessage]);
    include 'partials/header.php';
    include 'views/register.php';
    include 'partials/footer.php';
}
