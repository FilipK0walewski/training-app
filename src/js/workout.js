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
    constructor(name, weight, numberOfSets, numberOfReps, sets = [], finished = false, failed = false) {
        this.name = name
        this.weight = weight
        this.numberOfSets = numberOfSets
        this.numberOfReps = numberOfReps
        this.sets = sets
        this.finished = finished
        this.failed = failed
    }

    getName() {
        return this.name
    }

    getCurrentSet() {
        if (this.sets.length === 0) return null
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
        if (this.sets.length < 2) return new Date()
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

    isCurrentSetFirst() {
        return this.sets.length === 1 ? true : false
    }

    isLastSetFinished() {
        if (this.sets.length === this.numberOfSets && this.getCurrentSet().isFinished() === true) return true
        return false
    }

    isCurrentSetStarted() {
        const currentSet = this.getCurrentSet()
        if (!currentSet) return false
        if (currentSet.startedAt === null) return false
        return true
    }

    isPreviousSetFailed() {
        if (this.sets.length <= 1) return false
        return this.getPreviousSet().isFailed()
    }

    isFinished() {
        return this.finished
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
        this.getCurrentSet().setAsFinished()
        if (!(this.numberOfSets === this.sets.length)) this.addNewSet()
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

    getNumberOfFinishedExercises () {
        return this.exercises.filter(e => e.finished === true).length
    }

    isCurrentSetStarted() {
        return this.getCurrentExercise().isCurrentSetStarted()
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

    setAsFinished() {
        this.finished = true
    }

    setAsNotFinished() {
        this.finished = false
    }

    isFinished() {
        return this.finished
    }

    addNewExercise(exerciseName, weight, numberOfSets, numberOfReps) {
        const newExercise = new Exercise(exerciseName, weight, numberOfSets, numberOfReps)
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
        this.getCurrentExercise().setAsFinished()
    }

    serialize() {
        return {
            exercises: this.exercises.map(exercise => exercise.serialize()),
            finished: this.finished
        }
    }

    isCurrentExerciseLastSet() {
        return this.getCurrentExercise().isLastSetFinished()
    }

    isTimeForNewExercise() {
        const currentExercise = this.getCurrentExercise()
        if (currentExercise === null) return true
        else if (currentExercise.isFinished() === true) return true
        else return false        
    }

    isStarted () {
        if (this.exercises.length === 0) return false
        return true 
    }

    isDuringExerciseSet() {
        return this.getCurrentExercise().isCurrentSetStarted()
    }

    getCurrentExerciseSetDuration() {
        return parseInt((new Date() - this.getCurrentExercise().getCurrentSetStartTime()) / 1000)
    }

    getCurrentExerciseBreakDuration() {
        return parseInt((new Date() - this.getCurrentExercise().getPreviousSetFinishTime()) / 1000)
    }

    isCurrentExerciseFirstSet() {
        return this.getCurrentExercise().isCurrentSetFirst()
    }

    isCurrentExercisePreviousSetFailed() {
        return this.getCurrentExercise().isPreviousSetFailed()
    }
}

export { Workout, Exercise, Set }