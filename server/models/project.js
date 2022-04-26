const bcrypt = require('bcryptjs')
const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')


const projectSchema = new moongose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        red: 'User'
    },
    tasks: [{
        type: moongose.Schema.Types.ObjectId,
        ref: "Task"
    }],
    createDAT: {
        type: Date,
        default: Date.now 
    }
})

const model = moongose.model('project',projectSchema)
module.exports = projectSchema