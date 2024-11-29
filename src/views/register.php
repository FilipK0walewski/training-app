<h2>Create an account</h2>

<?php
if (isset($errorMessage)) {
    echo "<p class=\"error-message\">$errorMessage</p>";
}
?>

<form action="/register" method="POST" class="flex-col">
    <div class="input-container">
        <input id="username" name="username" type="text" placeholder="" required>
        <label for="username">username</label>
    </div>

    <div class="input-container">
        <input id="password" name="password" type="password" placeholder="" required>
        <label for="password">password</label>
    </div>

    <div class="input-container">
        <input id="confirmedPassword" name="confirmedPassword" type="password" placeholder="" required>
        <label for="confirmedPassword">confirm password</label>
    </div>

    <button type="submit" class="btn-0">Create account</button>
</form>

<div>
    Already have an account? <a href="/login">Sign in.</a>
</div>

<a href="/">home page</a>