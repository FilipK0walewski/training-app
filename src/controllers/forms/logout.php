<?php

function logoutForm() {
    session_start();
    session_unset();
    session_destroy();
    
    $_SESSION['message'] = 'Succesfully logged out';
    header('Location: /');
}
