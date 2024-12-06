CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS workouts (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS exercises (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    workout_id INT,
    name VARCHAR(50) NOT NULL,
    weight REAL NOT NULL CHECK (weight > 0),
    number_of_reps SMALLINT NOT NULL CHECK (number_of_reps >= 1),
    number_of_sets SMALLINT NOT NULL CHECK (number_of_sets >= 1),
    is_failed BOOLEAN NOT NULL,
    CONSTRAINT fk_workout FOREIGN KEY(workout_id) REFERENCES workouts(id)
);

CREATE TABLE IF NOT EXISTS sets (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    exercise_id INT,
    reps_done SMALLINT NOT NULL CHECK(reps_done >= 0),
    is_failed BOOLEAN NOT NULL,
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercises(id)
);