const user = require('../models/user')
const crypto = require("crypto")
const mailer = require('../modulos/mail')
const {jwtToken} = require('../config/config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Como o codigo nao ta limpo e foi mais da playlist, eu sentir que nao precisava documentar pois ja tava la

const controller = {
    async register (req,res,next) {
        const {email} = req.body
        if (await user.findone({email})){
            res.status('400').json({error: "Email already exist"})
        }
        
        try {
            const newUser = user.create(req.body)
            user.password = null
            return res.send(newUser)
        } catch {
            return res.status(400).json({error: "Registration failed"})
        }
    },
    async reset (req,res) {
        const { email, token, password }= req.body
        
        try {
            const User = user.findOne({token}).select('+passwordResetToken passwordResetExpires')
    
            if (!User){
                res.sendStatus(400).send("Perdi paciencia, deu erro")
            }
    
            if (token !== user.passwordResetToken) {
                res.sendStatus(400).send("Perdi paciencia, deu erro")
            }
    
            var now = new Date()
    
            if (now > user.passwordResetExpires) {
                res.sendStatus(400).send("Perdi paciencia, deu erro")
            }
            
            user.password = password
    
            await user.save()
    
            res.status(200)
    
    
        } catch (err) {
            res.sendStatus(400).send("Perdi paciencia, deu erro")
        }
    },
    async forget (req,res) {
        const { email } = req.body
    
        try {
            const User = user.findOne({ email })
    
            if (!User) {
                return res.status(400).json({error:"User not found"})
            }
    
            const token = crypto.randomBytes(20).toString('hex')
    
            const now = new Date()
            now.setHours(now.getHours + 1)
    
            await User.FindByIdAndUpdate(user,id,{'$set' : {
                passwordResetToken: token,
                passwordResetExpires: now
            }})
    
            mailer.sendMail({
                to: email,
                from: "jeanvdsroque@gmail.com",
                template: 'forgestPass',
                context: {token}
            }, (err)=> {
                if (err) {
                    console.log(err)
                    return res.status(400).json({erro:"Error quando resetar a senha, tente denovo"})
                }
            })
    
        } catch {
            res.status(400).json({error: "Error quando tentou recuperar a senha"})
        }
    },
    async login (req,res) {
        const { email, password } = req.body
    
        const user = await User.findone({email}).select('+password')
    
        if(!user) {
            res.status(400).json({error:"User not found"})
        }
    
        if (!await bcrypt.compare(password,user.password)){
            res.status(400).json({error:"User not found"})
        }
    
        var token = twt.sign({id:user.id},jwtToken, {
            expiresIn: 84900
        })
        res.status(200).json({token})
    }
}

module.exports = controller