const project = require('../models/project')
const task = require('../models/task')

const controller = {
    async byId (req,res) {
        res.send({user: req.userId})
    },
    async create (req,res) {},
    async updateById (req,res) {
        res.send({user: req.userId})
    },
    async deleteById (req,res) {
        res.send({user: req.userId})
    }
}

module.expors = controller 
