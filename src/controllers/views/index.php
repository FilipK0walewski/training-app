<?php
require_once 'db.php';

function renderView($view, $data = [])
{
    extract($data);
    require_once 'partials/header.php';
    require_once 'views/' . $view . '.php';
    require_once 'partials/footer.php';
}

function aboutView()
{
    $data = ['pageTitle' => 'About page'];
    renderView('about', $data);
}

function homeView()
{
    $data = ['pageTitle' => 'Home page'];
    renderView('home', $data);
}

function loginView()
{
    if (isset($_SESSION['userId'])) {
        header('Location: /profile');
        exit();
    }

    $previousPage = parse_url($_SERVER['HTTP_REFERER'])['path'];
    if (strlen(trim($previousPage)) == 0) $previousPage = '/';
    if ($previousPage != '/register' && $previousPage != '/login') {
        $_SESSION['previousPage'] = $previousPage;
    }

    $data = ['pageTitle' => 'Sign in'];
    renderView('login', $data);
}

function notFoundView()
{
    $data = ['pageTitle' => 'Not found...'];
    renderView('404', $data);
}

function ServerErro()
{
    $data = ['pageTitle' => 'Internal server error'];
    renderView('500', $data);
}

function profileView()
{
    if (!isset($_SESSION['userId'])) {
        header('Location: /login');
        exit();
    }

    $data = ['pageTitle' => 'Your profile'];
    renderView('profile', $data);
}

function registerView()
{
    if (isset($_SESSION['userId'])) {
        header('Location: /profile');
        exit();
    }

    $data = ['pageTitle' => 'Sign up'];
    renderView('register', $data);
}

function workoutListView()
{
    if (!isset($_SESSION['userId'])) {
        echo ('Zaloguj sie');
    }

    global $conn;
    $query = 'SELECT id, date FROM workouts WHERE user_id = $1';
    $result = pg_query_params($conn, $query, array($_SESSION['userId']));
    $workouts = pg_fetch_all($result);
    $workoutsByDate = [];
    foreach ($workouts as $workout) {
        $workoutDate = $workout['date'];
        if (!isset($workoutsByDate[$workoutDate])) {
            $workoutsByDate[$workoutDate] = [$workout['id']];
        } else {
            $workoutsByDate[$workoutDate][] = $workout['id'];
        }
    }
    $data = ['pageTitle' => 'Your workout history', 'workouts' => $workoutsByDate];
    renderView('workoutList', $data);
}

function workoutDetailView($id)
{
    if (!isset($_SESSION['userId'])) {
        echo ('Zaloguj sie');
    }

    global $conn;
    $query = 'SELECT user_id FROM workouts WHERE id::text = $1';
    $result = pg_query_params($conn, $query, array($id));
    $workout = pg_fetch_assoc($result);

    if ($workout['user_id'] !== $_SESSION['userId']) {
        echo ('Nie twuj trening');
    }

    $query = 'SELECT e.id, e.name, e.weight, e.number_of_reps as reps, e.number_of_sets as sets, s.is_failed, s.started_at, s.ended_at 
        FROM exercises e join sets s on e.id = s.exercise_id and e.workout_id = $1 order by s.started_at';
    $result = pg_query_params($conn, $query, array($id));
    $sets = pg_fetch_all($result);

    $exercises = [];
    $previousSetEnd = null;
    foreach($sets as $set) {

        $exerciseName = $set['name'];
        if (!isset($exercises[$exerciseName])){
            $exercises[$exerciseName] = [
                'weight' => $set['weight'],
                'nOfSets'=> $set['sets'],
                'nOfReps'=> $set['reps'],
                'sets'=> []
            ];
        }

        $start = strtotime($set['started_at']);
        $end = strtotime($set['ended_at']);

        $break = 0;
        if ($previousSetEnd !== null) {
            $break = abs($start - $previousSetEnd);
        }


        $duration = abs($end - $start); // Calculate absolute duration in seconds
        $previousSetEnd = $end;
        // Default value for break

        $exercises[$exerciseName]['sets'][] = [
            'isFailed' => $set['is_failed'],
            'duration' => $duration,
            'break' => $break
        ];
    }

    $data = ['pageTitle' => 'Workout detail', 'exercises' => $exercises];
    renderView('workoutDetail', $data);
}

function workoutView()
{
    $data = ['pageTitle' => 'Workout...'];
    renderView('workout', $data);
}
