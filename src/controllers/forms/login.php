<?php
require_once('db.php');

function loginForm()
{
    global $conn;

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        return renderLoginPage();
    }

    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    if (empty($username) || empty($password)) {
        return renderLoginPage('Username and password are required.');
    }

    $query = 'SELECT id, username, password FROM users WHERE username = $1';
    print_r('1');
    $result = pg_query_params($conn, $query, array($username));
    print_r('2');

    if ($result) {
        $user = pg_fetch_assoc($result);
        if ($user && password_verify($password, $user['password'])) {
            session_regenerate_id(true);
            $_SESSION['userId'] = $user['id'];
            $_SESSION['username'] = $username;
            $location = $_SESSION['previousPage'] ?? '/';
            unset($_SESSION['previousPage']);
            header("Location: $location");
            return renderLoginPage();
        } else {
            return renderLoginPage('Invalid username or password.');
        }
    } else {
        return renderLoginPage('Error executing query. Please try again later.');
    }
}

function renderLoginPage($errorMessage = '')
{
    extract(['pageTitle' => 'Login Page', 'errorMessage' => $errorMessage]);
    include 'partials/header.php';
    include 'views/login.php';
    include 'partials/footer.php';
}
