<h2>Log in</h2>

<?php
if (isset($_SESSION['newUser'])) {
    $newUser = $_SESSION['newUser'];
    echo "<p>Hi $newUser! Now you can log in!</p>";
    unset($_SESSION['newUser']);
}
?>

<?php
if (isset($errorMessage)) {
    echo "<p>$errorMessage</p>";
}
?>

<form action="/login" method="POST">

    <div>
        <label for="username">username</label>
        <input id="username" name="username" type="text">
    </div>

    <div>
        <label for="password">password</label>
        <input id="password" name="password" type="password">
    </div>

    <button type="submit">Log in</button>

</form>