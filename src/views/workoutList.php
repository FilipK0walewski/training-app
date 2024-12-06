<h1>Your Workout History</h1>

<?php if (!empty($workouts)): ?>
    <p>Below is a list of your past workouts. Click on any workout to view more details.</p>
    <ul>
        <?php foreach ($workouts as $workoutDate => $ids): ?>
            <li>
                <strong><?php echo $workoutDate ?>:</strong>
                <ul>
                    <?php foreach ($ids as $index => $id): ?>
                        <li>
                            <a href="/workouts/<?php echo $id; ?>">Workout <?php echo $index + 1; ?></a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </li>

        <?php endforeach; ?>
    </ul>
<?php else: ?>
    <p>You haven't logged any workouts yet. Start tracking your workouts today!</p>
<?php endif; ?>

<p>Go back to <a href="/profile">your profile</a>.</p>