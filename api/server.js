const express = require("express")

const actionRouter = require("../data/routers/actionRouter")
const projectRouter = require("../data/routers/projectRouter")

const server = express()

function logger(req, res, next){
    let method = req.method;
    let url = req.url;
    let current_date = new Date();
    let status = res.statusCode;

    let log = `[${current_date}] ${method}:${url} ${status}`
    console.log(log)

    next()
}


server.use(express.json())
server.use(logger);

server.use("/api/actions", actionRouter)
server.use("/api/projects", projectRouter)

server.get("/", (req, res) => {
    res.send(`<h2>Sprint Challenge API, everything is working!<h2>`)
})

module.exports = server