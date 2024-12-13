<?php

$host = $_ENV['POSTGRES_HOST'] ?? 'localhost';
$port = $_ENV['POSTGRES_PORT'] ?? '5432';
$dbname = $_ENV['POSTGRES_NAME'] ?? 'db';
$user = $_ENV['POSTGRES_USER'] ?? 'user';
$password = $_ENV['POSTGRES_PASSWORD'] ?? 'password';

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    error_log("Connection failed");
    $pageTitle = 'Internal server error';
    require_once 'partials/header.php';
    require_once 'views/500.php';
    require_once 'partials/footer.php';
    exit;
}