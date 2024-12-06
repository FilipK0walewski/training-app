<?php
$host = 'db';
$port = '5432';
$dbname = 'db';
$user = 'user';
$password = 'password';

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
