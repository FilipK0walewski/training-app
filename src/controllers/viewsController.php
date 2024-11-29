<?php


function home()
{
    $data = [
        'title' => 'Welcome to the Home Page!',
        'message' => 'This is a simple PHP router example.'
    ];

    // Extract the array into variables
    extract($data);  // This creates $title and $message as variables
    include 'partials/header.php';
    include "views/home.php";
}

function about()
{
    include "../views/about.php";
}

function signIn() 
{
    include "../views/signIn.php";
}

function signUp() 
{
    include "../views/singUp.php";
}


function profile() 
{
    include "../views/profile.php";
}


function workout() 
{
    include "../views/workout.php";
}

include 'partials/footer.php';
