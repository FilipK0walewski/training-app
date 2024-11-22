<h1>Simple Workout App</h1>
<a href="/workout">training with a fixed weight</a>

<?php
session_start();

if (isset($_SESSION['username'])) {
    echo $_SESSION['username'];
}

?>

<div>
    <a href="/login">sign in</a>
    or
    <a href="/register">create an account</a>
</div>