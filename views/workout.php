<h1>Training with a fixed weight</h1>
<a id="homeUrl" href="/">go back</a>

<div id="workoutInfo" class="flex-col"></div>
<div id="counter" class="hidden flex-col"></div>


<table id="summaryTable" class="hidden">
    <thead>
        <tr>
            <th>Exercise</th>
            <th>Weight</th>
            <th>Sets done</th>
            <th>Sets goal</th>
            <th>Failed</th>
        </tr>
    </thead>
    <tbody id="summaryTbody">
    </tbody>
</table>

<div id="container" class="flex-col"></div>

<form id="exerciseForm" class="hidden input-wrapper">
    <input class="input" type="text" name="exerciseName" placeholder="exercise" value="bench press" required>
    <input class="input" type="number" name="exerciseWeight" placeholder="weight" value="100" step=".5" required>
    <!-- <input class="input" type="number" name="exerciseRepsNumber" placeholder="number of reps" value="5" required> -->
    <input class="input" type="number" name="exerciseSetNumber" placeholder="number of sets" value="4" required>
    <div class="button-wrapper">
        <button type="submit" class="btn">Start exercise!</button>
    </div>
</form>

<script type="module" src="js/main.js" async></script>