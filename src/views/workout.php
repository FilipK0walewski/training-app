<h1>Training with a fixed weight</h1>
<a id="homeUrl" href="/">go back</a>

<div id="workoutInfo" class="flex-col"></div>

<div id="counter" class="hidden flex-col">
    <p id="counterLabel"></p>
    <div>
        <span id="counterNumber" class="huge-text"></span>
        <span>s</span>
    </div>
</div>


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

<form id="exerciseForm" class="hidden flex-col">
    <div class="input-container">
        <input id="exercise" class="input" type="text" name="exerciseName" placeholder="exercise" value="bench press" required>
        <label for="exercise">exercise</label>
    </div>

    <div class="input-container">
        <input id="weight" class="input" type="number" name="exerciseWeight" placeholder="weight" value="100" step=".5" required>
        <label for="weight">weight</label>
    </div>

    <div class="input-container">
        <input id="sets" class="input" type="number" name="exerciseSetNumber" placeholder="number of sets" value="4" required>
        <label for="sets">number of sets</label>
    </div>

    <button type="submit" class="btn-0">Start exercise!</button>
</form>

<script type="module" src="js/main.js" async></script>