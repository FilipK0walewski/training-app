import { Workout, Exercise, Set } from './workout.js'

let workout = new Workout()

const loadWorkout = () => {
    const localWorkout = JSON.parse(localStorage.getItem('workout'))
    if (localWorkout) {
        const exercises = []
        localWorkout.exercises.forEach(e => {
            const sets = []
            e.sets.forEach(s => {
                let startedAt = s.startedAt === null ? null : new Date(s.startedAt)
                let finishedAt = s.finishedAt === null ? null : new Date(s.finishedAt)
                const set = new Set(startedAt, finishedAt, s.failed)
                sets.push(set)
            })
            const exercise = new Exercise(e.name, e.weight, e.numberOfSets, e.numberOfReps, sets, e.finished, e.failed)
            exercises.push(exercise)
        });
        workout = new Workout(exercises, localWorkout.finished)
    }
}

const save = () => {
    localStorage.setItem('workout', JSON.stringify(workout))
}

let counterIntervalId = null

const container = document.getElementById('container')
const counter = document.getElementById('counter')
const counterLabel = document.getElementById('counterLabel')
const counterNumber = document.getElementById('counterNumber')
const exerciseInfo = document.getElementById('exerciseInfo')
const summaryTable = document.getElementById('summaryTable')
const summaryTbody = document.getElementById('summaryTbody')

const exerciseForm = document.getElementById('exerciseForm')
exerciseForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const exerciseData = new FormData(exerciseForm)
    const exerciseName = exerciseData.get('exerciseName')
    const exerciseWeight = exerciseData.get('exerciseWeight')
    const exerciseSetNumber = parseInt(exerciseData.get('exerciseSetNumber'))
    const exerciseRepsNumber = parseInt(exerciseData.get('exerciseRepsNumber'))
    workout.addNewExercise(exerciseName, exerciseWeight, exerciseSetNumber, exerciseRepsNumber)
    update()
})

const clear = () => {
    container.innerHTML = ''
    exerciseInfo.innerHTML = ''
    hideCounter()
    hideExerciseForm()
    hideWorkoutSummary()
}

const hideExerciseForm = () => {
    if (!exerciseForm.classList.contains('hidden')) exerciseForm.classList.add('hidden')
}

const hideWorkoutSummary = () => {
    if (!summaryTable.classList.contains('hidden')) summaryTable.classList.add('hidden')
    summaryTbody.innerHTML = ''
}

const displayWorkoutSummary = () => {
    summaryTbody.innerHTML = ''
    for (let i = 0; i < workout.exercises.length; i++) {
        const tr = document.createElement('tr')
        const exercise = workout.exercises[i]
        const name = document.createElement('td')
        name.textContent = exercise.name
        tr.appendChild(name)

        const weight = document.createElement('td')
        weight.textContent = exercise.getWeight()
        tr.appendChild(weight)

        const setsDone = document.createElement('td')
        setsDone.textContent = exercise.getNumberOfSetsDone()
        tr.appendChild(setsDone)

        const setsGoal = document.createElement('td')
        setsGoal.textContent = exercise.getNumberOfSets()
        tr.appendChild(setsGoal)

        const isFailed = document.createElement('td')
        isFailed.textContent = exercise.isFailed() === true ? 'yes' : 'no'
        if (exercise.isFailed() === true) isFailed.classList.add('red')
        tr.appendChild(isFailed)

        summaryTbody.appendChild(tr)
        if (summaryTable.classList.contains('hidden')) summaryTable.classList.remove('hidden')
    }
}

const displayExerciseInfo = () => {
    const exercise = workout.getCurrentExercise()
    const exerciseName = document.createElement('h2')
    exerciseName.textContent = `Current exercise: ${exercise.getName()}`
    const setCount = document.createElement('p')
    setCount.textContent = `Set: ${exercise.getCurrentSetNumber()} / ${exercise.getNumberOfSets()}`
    exerciseInfo.appendChild(exerciseName)
    exerciseInfo.appendChild(setCount)
    if (exerciseInfo.classList.contains('hidden')) exerciseInfo.classList.remove('hidden')
}

const displayCounter = (text, initValue = 0) => {
    if (counterIntervalId !== null) return
    if (counter.classList.contains('hidden')) counter.classList.remove('hidden')
    if (counterIntervalId === null) {
        counterNumber.textContent = initValue
        counterLabel.textContent = `${text}:`
    }

    let count = initValue
    counterIntervalId = setInterval(() => {
        count += 1
        counterNumber.textContent = count
        counterLabel.textContent = `${text}:`
    }, 1000)
}

const hideCounter = () => {
    if (!counter.classList.contains('hidden')) counter.classList.add('hidden')
    if (counterIntervalId) {
        clearInterval(counterIntervalId)
        counterIntervalId = null
    }
}

const displayButton = (text, callback) => {
    const button = document.createElement('button')
    button.classList.add('btn-0')
    button.textContent = text
    button.addEventListener('click', () => {
        button.disabled = true
        callback()
    })
    container.appendChild(button)
}

const startCurrentSet = () => {
    workout.startCurrentSet()
    update()
}

const finishCurrentSet = () => {
    workout.finishCurrentSet()
    update()
}

const failSet = () => {
    workout.setPreviousSetAsFailed()
    update()
}

const failLastSet = () => {
    workout.setCurrentSetAsFailed()
    workout.finishCurrentExercise()
    update()
}

const undoFail = () => {
    workout.setPreviousSetAsNotFailed()
    update()
}

const finishExercise = () => {
    workout.finishCurrentExercise()
    update()
}

const finishWorkout = () => {
    workout.setAsFinished()
    update()
}

const resumeWorkout = () => {
    workout.setAsNotFinished()
    displayNewExerciseForm()
    update()
}

const resetWorkout = () => {
    localStorage.removeItem('workout')
    workout = new Workout()
    update()
}

const displayLoginMessage = () => {
    const p = document.createElement('p')
    p.textContent = 'In order to save your workouts you need to be signed in.'
    p.classList.add('text-center')
    const a = document.createElement('a')
    a.textContent = 'sign in'
    a.href = '/login'
    container.appendChild(p)
    container.appendChild(a)
}

const displaySaveSuccessMessage = (workoutId) => {
    const div = document.createElement('div')
    div.classList.add('flex-col')
    const p = document.createElement('p')
    p.textContent = 'Your workout has been successfully saved.'
    const a0 = document.createElement('a')
    a0.textContent = 'All your workouts'
    a0.href = '/workouts'
    const a1 = document.createElement('a')
    a1.textContent = 'This workout'
    a1.href = `/workouts/${workoutId}`
    div.appendChild(p)
    div.appendChild(a0)
    div.appendChild(a1)
    container.appendChild(div)
}

const displaySaveErrorMessage = () => {
    const p = document.createElement('p')
    p.textContent = 'Something went no yes ;('
    p.classList.add('error-message')
    container.appendChild(p)
}

const saveWorkoutToServer = () => {
    fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout)
    })
        .then(response => {
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            return response.json()
        })
        .then(data => {
            clear()
            displaySaveSuccessMessage(data.workoutId)
            localStorage.removeItem('workout')
            workout = new Workout()
        }).catch(error => {
            console.log(error.message)
            if (error.message === 'Unauthorized') {
                displayLoginMessage()
            } else {
                displaySaveErrorMessage()
                console.error(error)
            }
        })
}

const displayWorkoutFinishChoices = () => {
    displayButton('Nevermind, bo back to workout.', resumeWorkout)
    displayButton('End workout and save your progress.', saveWorkoutToServer)
    displayButton('End workout without saving.', resetWorkout)
    displayWorkoutSummary()
}

const displayExerciseFinishChoices = () => {
    const p = document.createElement('p')
    p.textContent = 'Last set is finished'
    container.appendChild(p)
    displayButton('I failed', failLastSet)
    displayButton('I did not fail', finishExercise)
}

const displayNewExerciseForm = () => {
    if (exerciseForm.classList.contains('hidden')) exerciseForm.classList.remove('hidden')
    exerciseForm.reset()
    if (workout.isStarted() === true) {
        displayButton('End workout', finishWorkout)
        displayWorkoutSummary()
    }
}

const update = () => {
    save()
    clear()

    if (workout.isFinished() === true) {
        displayWorkoutFinishChoices()
        return
    }

    if (workout.isTimeForNewExercise() === true) {
        displayNewExerciseForm()
        return
    }

    displayExerciseInfo()

    if (workout.isCurrentExerciseLastSet() === true) {
        displayExerciseFinishChoices()
        return
    }

    if (workout.isDuringExerciseSet()) {
        const setDuration = workout.getCurrentExerciseSetDuration()
        displayCounter('Set time', setDuration)
        displayButton('Finish set', finishCurrentSet)
    } else {
        const breakDuration = workout.getCurrentExerciseBreakDuration()
        const isFirstSet = workout.isCurrentExerciseFirstSet()
        const isPreviousSetFailed = workout.isCurrentExercisePreviousSetFailed()

        if (!isFirstSet) {
            displayCounter('Break', breakDuration);
            if (!isPreviousSetFailed) displayButton('Set previous set as failed', failSet);
        }

        if (isPreviousSetFailed) {
            displayButton('Finish exercise now', finishExercise);
            displayButton('Nevermind, keep going', undoFail);
        } else {
            displayButton('Start set', startCurrentSet);
        }
    }
}

loadWorkout()
update()