const bcrypt = require('bcryptjs')
const moongose = require('mongoose')

const userSchema = new moongose.Schema({
    name: {
        type:String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true 
    },
    password: {
        type: String,
        required: true,
        select: false 
    },
    passwordResetToken: {
        type: Date,
        select: false
    },
    createDAT: {
        type: Date,
        default: Date.now 
    }
})

userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash

    next();
})

const model = userSchema.model('User',userSchema)

module.exports = model