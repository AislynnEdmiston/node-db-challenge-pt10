const express = require("express")
const db = require("../data/config")

const router = express.Router({
    mergeParams: true
})

async function getAllTasks (req, res, next) {
    try {
        res.json(await db("tasks"))
    } catch (err) {
        next(err)
    }
}

async function getTaskById (req, res, next) {
    try {
        const task = await db("tasks")
            .where("id", req.params.id)
            .first()

        if (!task){
            return res.status(404).json({
                message: "task not found"
            })
        }

        res.json(task)
    } catch (err) {
        next(err)
    }
}

async function addNewTask(req, res, next) {
    try {
        const taskData = req.body
        const [ id ] = await db("tasks").insert(taskData)
        const newTask = await db("tasks").where({ id })

        res.status(201).json(newTask)
    } catch (err) {
        next(err)
    }
}

router
    .get("/", getAllTasks)
    .get("/:id", getTaskById)
    .post("/", addNewTask)

module.exports = router