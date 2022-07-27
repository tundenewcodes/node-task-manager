const Task = require('../models/Tasks')
const asyncWrapper = require('../middleware/asyncWrapper')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async(req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({
        tasks
    })

})
const createTask = asyncWrapper(async(req, res) => {
    const task = await Task.create(req.body)
    res.status(200).json({ task })

})
const updateTask = asyncWrapper(async(req, res, next) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskId },
        req.body, { new: true, runValidators: true }
    )
    if (!task) {

        return next(
            createCustomError(
                `no task with the id of ${taskId} currently`,
                404
            )
        )
    }

    res.status(200).json({ task })

})
const deleteTask = asyncWrapper(async(req, res, next) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndDelete({ _id: taskId })
    if (!task) {
        return next(
            createCustomError(
                `no task with the id of ${taskId} currently`,
                404
            )
        )
    }
    res.status(200).json({ task })
        // res.status(200).send
        //res.status(200)json({task:null, success : true})
})
const getTask = asyncWrapper(async(req, res, next) => {
    const { id: taskId } = req.params
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
        return next(
            createCustomError(
                `no task with the id of ${taskId} currently`, 404
            )
        )

    }

    res.status(200).json({ task })

})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    deleteTask,
    updateTask
}