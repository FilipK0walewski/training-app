<h2>Create an account</h2>

<?php
if (isset($errorMessage)) {
    echo "<p>$errorMessage</p>";
}
?>

<form action="/register" method="POST">
    <div>
        <label for="username">username</label>
        <input id="username" name="username" type="text" required>
    </div>

    <div>
        <label for="password">password</label>
        <input id="password" name="password" type="password" required>
    </div>

    <div>
        <label for="confirmedPassword">confirm password</label>
        <input id="confirmedPassword" name="confirmedPassword" type="password" required>
    </div>

    <button type="submit">Create account</button>
</form>