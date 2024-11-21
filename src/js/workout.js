class Set {
    constructor(startedAt = null, finishedAt = null, failed = false) {
        this.startedAt = startedAt
        this.finishedAt = finishedAt
        this.failed = failed
    }

    getStartTime() {
        return this.startedAt
    }

    getFinishTime() {
        return this.finishedAt
    }

    getDuration() {
        return parseInt((this.finishedAt - this.startedAt) / 1000)
    }

    isStarted() {
        return this.startedAt === null ? false : true
    }

    isFinished() {
        return this.finishedAt === null ? false : true
    }

    isFailed() {
        return this.failed
    }

    setAsStarted() {
        this.startedAt = new Date()
    }

    setAsFinished() {
        this.finishedAt = new Date()
    }

    setAsFailed() {
        this.failed = true
    }

    setAsNotFailed() {
        this.failed = false
    }

    serialize() {
        return {
            startedAt: this.startedAt,
            finishedAt: this.finishedAt,
            failed: this.failed
        }
    }
}

class Exercise {
    constructor(name, weight, numberOfSets, sets = [], finished = false, failed = false) {
        this.name = name
        this.weight = weight
        this.numberOfSets = numberOfSets
        this.sets = sets
        this.finished = finished
        this.failed = failed
    }

    getCurrentSet() {
        return this.sets.at(-1)
    }

    getPreviousSet() {
        return this.sets.at(-2)
    }

    getSetByIndex(i) {
        return this.sets.at(i)
    }

    getCurrentSetNumber() {
        return this.sets.length
    }

    getCurrentSetStartTime() {
        return this.getCurrentSet().getStartTime()
    }

    getPreviousSetFinishTime() {
        return this.getPreviousSet().getFinishTime()
    }

    getNumberOfSets() {
        return this.numberOfSets
    }

    getNumberOfSetsDone() {
        return this.sets.filter(set => set.isFailed() === false).length
    }

    getWeight() {
        return this.weight
    }

    isOnFirstSet() {
        return this.sets.length === 1 ? true : false
    }

    isSetStarted() {
        return this.getCurrentSet().startedAt === null ? false : true
    }

    isLastSetFinished() {
        if (this.sets.length === this.numberOfSets && this.getCurrentSet().isFinished() === true) return true
        return false
    }

    isFinished() {
        return this.finished
        // if (this.finished === true) return true
        // else if (this.numberOfSets === this.sets.length && this.getCurrentSet().isFinished() === true) return true
        // else return false
    }

    isPreviousSetFailed() {
        if (this.sets.length <= 1) return false
        return this.getPreviousSet().isFailed()
    }

    isFailed() {
        return this.failed
    }

    setAsFinished() {
        this.finished = true
    }

    setCurrentSetAsFailed() {
        this.failed = true
        this.getCurrentSet().setAsFailed()
    }

    setPreviousSetAsFailed() {
        this.failed = true
        this.getPreviousSet().setAsFailed()
    }

    setPreviousSetAsNotFailed() {
        this.failed = false
        this.getPreviousSet().setAsNotFailed()
    }

    addNewSet() {
        const newSet = new Set()
        this.sets.push(newSet)
    }

    startCurrentSet() {
        this.getCurrentSet().setAsStarted()
    }

    finishCurrentSet() {
        console.log('finishCurrentSet', this.finished)
        this.getCurrentSet().setAsFinished()
        if (!(this.numberOfSets === this.sets.length)) this.addNewSet()
        console.log('finishCurrentSet', this.finished)
    }
}

class Workout {

    constructor(exercises = [], finished = false) {
        this.exercises = exercises
        this.finished = finished
    }

    getCurrentExercise() {
        if (this.exercises.length === 0) return null
        return this.exercises.at(-1)
    }

    getCurrentExerciseInfoAsHTML() {
        const currentExercise = this.getCurrentExercise()
        const container = document.createElement('div')
        const exerciseName = document.createElement('h2')
        exerciseName.textContent = currentExercise.name
        const setCount = document.createElement('p')
        setCount.textContent = `Set ${currentExercise.getCurrentSetNumber()} / ${currentExercise.numberOfSets}`
        container.appendChild(exerciseName)
        container.appendChild(setCount)
        return container
    }

    getNumberOfFinishedExercises () {
        return this.exercises.filter(e => e.finished === true).length
    }

    isCurrentSetStarted() {
        return this.getCurrentExercise().isSetStarted()
    }

    setCurrentSetAsFailed() {
        this.getCurrentExercise().setCurrentSetAsFailed()
    }

    setPreviousSetAsFailed() {
        this.getCurrentExercise().setPreviousSetAsFailed()
    }

    setPreviousSetAsNotFailed() {
        this.getCurrentExercise().setPreviousSetAsNotFailed()
    }

    isFinished() {
        return this.finished
    }

    addNewExercise(exerciseName, weight, numberOfSets) {
        const newExercise = new Exercise(exerciseName, weight, numberOfSets)
        newExercise.addNewSet()
        this.exercises.push(newExercise)
    }

    startCurrentSet() {
        this.getCurrentExercise().startCurrentSet()
    }

    finishCurrentSet() {
        this.getCurrentExercise().finishCurrentSet()
    }

    finishCurrentExercise() {
        console.log('finish current exercise')
        this.getCurrentExercise().setAsFinished()
    }

    finish() {
        this.finished = true
    }

    serialize() {
        return {
            exercises: this.exercises.map(exercise => exercise.serialize()),
            finished: this.finished
        }
    }
}

export { Workout, Exercise, Set }