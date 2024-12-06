<?php
require_once 'db.php';

function getWokrout() {
    global $conn;
}

function getWokrouts() {
    global $conn;
}

function addWorkout()
{
    global $conn;
    header('Content-Type: application/json');

    if (!isset($_SESSION['userId'])) {
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'message' => 'User is not authenticated.'
        ]);
        exit;
    }

    pg_query($conn, 'BEGIN');

    try {

        $data = json_decode(file_get_contents('php://input'), true);
        $workoutQuery = 'INSERT INTO workouts(user_id) VALUES ($1) RETURNING id';
        $exerciseQuery = 'INSERT INTO exercises (workout_id, name , weight, number_of_reps, number_of_sets, is_failed) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
        $setQuery = 'INSERT INTO sets (exercise_id, reps_done, is_failed, started_at, ended_at) VALUES ($1, $2, $3, $4, $5)';

        $workoutResult = pg_query_params($conn, $workoutQuery, array($_SESSION['userId']));
        $workoutId = pg_fetch_assoc($workoutResult)['id'];

        foreach ($data['exercises'] as $exercise) {
            $sets = $exercise['sets'];
            $isFailed = !array_filter($sets, fn($set) => $set['isFailed'] === true) ? 1 : 0;
            $exerciseResult = pg_query_params($conn, $exerciseQuery, array($workoutId, $exercise['name'], $exercise['weight'], $exercise['numberOfReps'], $exercise['numberOfSets'], $isFailed));
            $exerciseId = pg_fetch_assoc($exerciseResult)['id'];

            foreach ($sets as $set) {
                if (!$set['startedAt']) {
                    continue;
                }
                $repsDone = $set['failed'] === true ? 0 : $exercise['numberOfReps'];
                pg_query_params($conn, $setQuery, array($exerciseId, $repsDone, $set['failed'] === true ? 1 : 0, $set['startedAt'], $set['finishedAt']));
            }
        }

        pg_query($conn, 'COMMIT');
    } catch (Exception $e) {
        error_log($e);
        pg_query($conn, 'ROLLBACK');
    } finally {
        pg_close($conn);
    }

    echo json_encode([
        'status' => 'ok',
        'message' => 'Workout saved successfully.',
        'workoutId' => $workoutId,
    ]);
}
