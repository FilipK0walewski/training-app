<h2>Create Your Account</h2>

<p class="text-center">Join us today to start your fitness journey! Fill in the details below to create your account and start tracking your progress.</p>

<?php if (isset($errorMessage)): ?>
    <p class="error-message text-center"><?php echo $errorMessage ?></p>
<?php endif ?>

<div class="flex-center">

    <form action="/register" method="POST" class="flex-col form-0">
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

</div>

<p class="text-center">
    Already have an account? <a href="/login">Sign in</a>.
</p>

<p class="text-center"><a href="/">Go back to home page</a></p>