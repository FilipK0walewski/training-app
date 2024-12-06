<h2>Workout detail</h2>

<?php foreach ($exercises as $exerciseName => $exercise): ?>
    <p><?php echo $exerciseName . ': ' . $exercise['nOfSets'] . ' x ' . $exercise['nOfReps'] . ' x ' . $exercise['weight'] . ' kg' ?></p>
    
    <table class="table-0">
        <thead>
            <tr>
                <th>Set number</th>
                <th>Failed</th>
                <th>Duration</th>
                <th>Break</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($exercise['sets'] as $index => $set): ?>
                <tr>
                    <td><?php echo $index + 1 ?></td>
                    <td class="<?php echo $set['isFailed'] === 't'? 'failed' : '' ?>" ><?php echo $set['isFailed'] === 't' ? 'yes' : 'no' ?></td>
                    <td><?php echo $set['duration'] ?>s</td>
                    <td><?php echo $set['break'] === 0 ? '' : $set['break'] . 's' ?></td>
                </tr>
            <?php endforeach ?>
        </tbody>
    </table>

<?php endforeach ?>