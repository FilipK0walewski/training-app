<h1>Simple Workout App</h1>

<?php
if (isset($message)) {
    echo "<p>$message</p>";
    unset($_SESSION['message']);
}
?>

<a href="/workout">training with a fixed weight</a>

<?php
session_start();
if (!isset($_SESSION['userId'])) {
?>

<div>
    <a href="/login">sign in</a>
    or
    <a href="/register">create an account</a>
</div>

<?php
} else {
?>
<a href="/profile">your profile</a>
<?php
}
