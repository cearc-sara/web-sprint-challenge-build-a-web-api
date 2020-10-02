const express = require("express")

const Projects = require("../helpers/projectModel")

const router = express.Router()

router.get("/", validateProject, (req, res) => {
    Projects.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({ error: "error retrieving the projects" })
    })
})

router.get("/:id", validateProjectId, (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
      if(project){
        res.status(200).json(project)
      }else{
        res.status(404).json({ errorMessage: "project not found"})
      }
    })
    .catch(err => {
      res.status(500).json({ error: "error retrieving the project"})
    })
  });

router.get("/:id/actions", validateProject, validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(resp => {
        res.status(200).json(resp)
    })
    .catch(err => {
        res.status(500).json({ error: "project actions does not exist" })
    })
})
  
router.post("/", validateProject, (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json({ error: "error adding the project" })
    })
})

router.put("/:id", validateProjectId, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({ error: "error updating the project" })
    })
})

router.delete("/:id", validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(count => {
        if(count > 0){
            res.status(200).json(count)
        }else{
            res.status(404).json({ message: "the project could not be found" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "error removing the project" })
    })
})

function validateProject(req, res, next){
    if(req.body){
        next()
    }else{
        res.status(400).json({ message: "missing project data"})
    }
}

function validateProjectId(req, res, next){
    if(req.params.id){
        req.user = req.params.id;
        next();
    }else if(req.params.id !== req.user){
        res.status(400).json({ message: "invalid project id" })
    }else{
        res.status(404).json({ message: " no project found with that id" })
    }
}

module.exports = router