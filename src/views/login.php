<h2>Log in</h2>

<?php
if (isset($_SESSION['newUser'])) {
    $newUser = $_SESSION['newUser'];
    echo "<p class=\"success-message\">Hi $newUser! Now you can log in!</p>";
    unset($_SESSION['newUser']);
}
?>

<?php
if (isset($errorMessage)) {
    echo "<p class=\"error-message\">$errorMessage</p>";
}
?>

<form action="/login" method="POST" class="flex-col">

    <div class="input-container">
        <input id="username" name="username" type="text" placeholder="username">
        <label for="username">username</label>
    </div>

    <div class="input-container">
        <input id="password" name="password" type="password" placeholder="password">
        <label for="password">password</label>
    </div>

    <button type="submit" class="btn-0">Log in</button>

</form>