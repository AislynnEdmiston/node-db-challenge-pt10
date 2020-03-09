const express = require("express")
const db = require("../data/config")

const router = express.Router()

async function getAllProjects (req, res, next) {
    try {
        res.json(await db("projects"))
    } catch (err) {
        next(err)
    }
}

async function getProjectById (req, res, next) {
    try {
        const project = await db("projects")
            .where("id", req.params.id)
            .first()

        if (!project){
            return res.status(404).json({
                message: "Project not found"
            })
        }

        res.json(project)
    } catch (err) {
        next(err)
    }
}

async function addNewProject(req, res, next) {
    try {
        const projectData = req.body
        const [ id ] = await db("projects").insert(projectData)
        const newProject = await db("projects").where({ id })

        res.status(201).json(newProject)
    } catch (err) {
        next(err)
    }
}

router
    .get("/", getAllProjects)
    .get("/:id", getProjectById)
    .post("/", addNewProject)

module.exports = router