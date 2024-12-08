import { Workout, Exercise, Set } from './workout.js'

let workout = new Workout()

const loadFromLocalStorage = () => {
    const localWorkout = JSON.parse(localStorage.getItem('workout'))
    console.log(localWorkout)
    if (localWorkout) {
        const exercises = []
        localWorkout.exercises.forEach(e => {
            console.log(e)
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

const container = document.getElementById('container')

const counter = document.getElementById('counter')
const counterLabel = document.getElementById('counterLabel')
const counterNumber = document.getElementById('counterNumber')

const workoutInfo = document.getElementById('workoutInfo')
const summaryTable = document.getElementById('summaryTable')
const summaryTbody = document.getElementById('summaryTbody')

let counterIntervalId = null

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

const clearContainer = () => {
    container.innerHTML = ''
    console.log('container clear')
}

const hideExerciseForm = () => {
    if (!exerciseForm.classList.contains('hidden')) exerciseForm.classList.add('hidden')
}

const displayExerciseForm = () => {
    if (exerciseForm.classList.contains('hidden')) exerciseForm.classList.remove('hidden')
    exerciseForm.reset()
}

const addSummary = () => {
    if (summaryTable.classList.contains('hidden')) summaryTable.classList.remove('hidden')
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
    }
}

const hideSummary = () => {
    if (!summaryTable.classList.contains('hidden')) summaryTable.classList.add('hidden')
    summaryTbody.innerHTML = ''
}

const addWorkoutInfo = () => {
    if (workoutInfo.classList.contains('hidden')) workoutInfo.classList.remove('hidden')
    workoutInfo.innerHTML = ''
    const htmlElements = workout.getCurrentExerciseInfoAsHTML()
    htmlElements.classList.add('flex-col')
    workoutInfo.appendChild(htmlElements)
}

const hideWorkoutInfo = () => {
    workoutInfo.innerHTML = ''
    if (!workoutInfo.classList.contains('hidden')) workoutInfo.classList.add('hidden')
}

const addCounter = (text, initValue = 0) => {
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

const resetCounter = () => {
    if (!counter.classList.contains('hidden')) counter.classList.add('hidden')
    if (counterIntervalId) {
        clearInterval(counterIntervalId)
        counterIntervalId = null
    }
}

const addButton = (text, callback) => {
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
    resetCounter()
    update()
}

const finishCurrentSet = () => {
    workout.finishCurrentSet()
    resetCounter()
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
    hideExerciseForm()
    update()
}

const resumeWorkout = () => {
    workout.setAsNotFinished()
    displayExerciseForm()
    update()
}

const addLoginMessage = () => {
    console.log('adding login message')
    const div = document.createElement('div')
    div.classList.add('flex-col')
    const p = document.createElement('p')
    p.textContent = 'In order to save your workouts you need to be signed in.'
    const a = document.createElement('a')
    a.textContent = 'sign in'
    a.href = '/login'
    div.appendChild(p)
    div.appendChild(a)
    container.appendChild(div)
    console.log('login message added')

}

const addSuccessSaveMessage = (workoutId) => {
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

const saveWorkout = () => {
    
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
            clearContainer()
            addSuccessSaveMessage(data.workoutId)
        }).catch(error => {
            if (error.message === 'Unauthorized') {
                addLoginMessage()
            } else {
                console.error('Error: ', error)
            }
        })
}

const abandonWorkout = () => {
    localStorage.removeItem('workout')
    workout = new Workout()
    hideSummary()
    update()
}

const saveToLocalStorage = () => {
    localStorage.setItem('workout', JSON.stringify(workout))
}

const update = () => {
    console.log('update')
    saveToLocalStorage()
    clearContainer()

    if (workout.isFinished() === true) {
        // workout is finished
        addSummary()
        addButton('Nevermind, bo back to workout.', resumeWorkout)
        addButton('End workout and save your progress.', saveWorkout)
        addButton('End workout without saving.', abandonWorkout)
        return
    }

    const currentExercise = workout.getCurrentExercise()
    if (currentExercise !== null && currentExercise.isLastSetFinished() === true && currentExercise.isFinished() === false) {
        const p = document.createElement('p')
        p.textContent = 'Last set is finished'
        container.appendChild(p)
        addButton('I failed', failLastSet)
        addButton('I did not fail', finishExercise)
        return
    } else if (workout.exercises.length === 0 || !currentExercise || currentExercise.isFinished() === true) {
        resetCounter()
        hideWorkoutInfo()
        displayExerciseForm()
        if (workout.exercises.length !== 0) {
            addButton('End workout', finishWorkout)
            addSummary()
        }
        return
    }

    hideSummary()
    hideExerciseForm()
    addWorkoutInfo()

    if (currentExercise.isSetStarted() === true) {
        const counterValue = parseInt((new Date() - currentExercise.getCurrentSetStartTime()) / 1000)
        addCounter('Set time', counterValue)
        addButton('Finish set', finishCurrentSet)
    } else {
        const isOnFirstSet = currentExercise.isOnFirstSet()
        const isPreviousSetFailed = currentExercise.isPreviousSetFailed()
        let buttonText = 'Start first set'

        if (isOnFirstSet === false) {
            buttonText = 'Start this set'
            const counterValue = parseInt((new Date() - currentExercise.getPreviousSetFinishTime()) / 1000)
            addCounter('Break time', counterValue)
        }

        if (isPreviousSetFailed === true) {
            addButton('Finish exercise now', finishExercise)
            addButton('Nevermind, keep going', undoFail)
            return
        } else if (isOnFirstSet === false) {
            addButton('Set previous set as failed', failSet)
        }

        addButton(buttonText, startCurrentSet)
    }
}

loadFromLocalStorage()
update()