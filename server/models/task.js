const bcrypt = require('bcryptjs')
const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')


const projectSchema = new moongose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }, 
    assignedTo : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    completed: {
        type: Boolean,
        require: true,
        default: false
    },
    createDAT: {
        type: Date,
        default: Date.now 
    }
})

const model = moongose.model('project',projectSchema)
module.exports = projectSchema