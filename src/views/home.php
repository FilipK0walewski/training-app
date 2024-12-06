<h1>Simple Workout App</h1>

<?php
if (isset($message)) {
    echo "<p>$message</p>";
    unset($_SESSION['message']);
}
?>

<p>Welcome to Simple Workout App! Achieve your fitness goals with ease by tracking your workouts, setting goals, and staying motivated. Whether you're just starting out or you're an experienced lifter, our app is here to help you track and improve your performance every step of the way.</p>

<p>
    Start your fitness journey by training with a fixed weight.
    This is just one of the training options available to you, with more to come soon!
    Focus on building strength and tracking your progress over time.
    <a href="/workout">Start your workout</a>.
</p>

<?php
session_start();
if (!isset($_SESSION['userId'])) {
?>

    <p>
        To track your workout history and progress,
        <a href="/register">create an account</a>
        or
        <a href="/login">sign in</a>.
    </p>

<?php
} else {
?>
    <p>
        Welcome back <?php echo $_SESSION['username'] ?>! You are now logged in. To view your workout history and progress,
        <a href="/profile">go to your profile</a>.
    </p>
<?php
}
?>

<p><a href="/about">Learn more about us</a>.</p>