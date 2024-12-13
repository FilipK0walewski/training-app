<h2>Sign in</h2>

<?php if (isset($_SESSION['newUser'])): ?>
    <p class="success-message text-center">Hi <?php echo $_SESSION['newUser'] ?>! Now you can log in!</p>
    <?php unset($_SESSION['newUser']) ?>
<?php endif ?>

<?php if (isset($errorMessage)): ?>
    <p class="error-message text-center"><?php echo $errorMessage ?></p>
<?php endif ?>

<div class="flex-center">

    <form action="/login" method="POST" class="flex-col form-0" autocomplete="off">

        <div class="input-container">
            <input id="username" name="username" type="text" placeholder="username" required>
            <label for="username">username</label>
        </div>

        <div class="input-container">
            <input id="password" name="password" type="password" placeholder="password" required>
            <label for="password">password</label>
        </div>

        <button type="submit" class="btn-0">Sign in</button>

    </form>

</div>

<p class="text-center">
    Don't have an account? <a href="/register">Sign up</a>.
</p>

<p class="text-center"><a href="/">Go back to home page</a></p>