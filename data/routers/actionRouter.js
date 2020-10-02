const express = require("express");
const Actions = require("../helpers/actionModel");

const router = express.Router();

router.get("/", validateAction, (req, res) => {
  Actions.get(req.params.id)
    .then((action) => {
        if(action){
            res.status(200).json(action)
          }else{
            res.status(404).json({ errorMessage: "action not found"})
          }
    })
    .catch((err) => {
      res.status(500).json({ error: "error retrieving the actions" });
    });
});

router.get("/:id", validateActionId, (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
      if(action){
        res.status(200).json(action)
      }else{
        res.status(404).json({ errorMessage: "action not found"})
      }
    })
    .catch(err => {
      res.status(500).json({ error: "error retrieving the action"})
    })
  });

router.post("/", (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json({ error: "error adding the action" })
    })
})

router.put("/:id", validateActionId, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json({ error: "error updating the action" })
    })
})

router.delete("/:id", validateActionId, (req, res) => {
    Actions.remove(req.params.id)
    .then(count => {
        if(count > 0){
            res.status(200).json(count)
        }else{
            res.status(404).json({ message: "the action could not be found" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "error removing the action" })
    })
})

function validateAction(req, res, next){
    if(req.body){
        next()
    }else{
        res.status(400).json({ message: "missing action data"})
    }
}

function validateActionId(req, res, next){
    if(req.params.id){
        req.user = req.params.id;
        next();
    }else if(req.params.id !== req.user){
        res.status(400).json({ message: "invalid action id" })
    }else{
        res.status(404).json({ message: " no action found with that id" })
    }
}

module.exports = router